import json
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .authenticate import CustomAuthentication
from .serializer import PostSerializer, UserSerializer
from .models import Post, TopicsOfInterest
from django.contrib.auth.models import User
import jwt
from dotenv import load_dotenv  # used for accessing secret key
import os
import datetime
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import AllowAny

# Load variables from .env file into environment variables
load_dotenv()

# Access environment variables
secret_key = os.getenv("SECRET_KEY")


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        response = Response()
        username = request.data.get("username", None)
        password = request.data.get("password", None)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)
                response.set_cookie(
                    key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                    value=data["access"],
                    expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                    secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                    httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                    samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                )
                csrf.get_token(request)
                response.data = {"Success": "Login successfully", "data": data}
                return response
            else:
                return Response(
                    {"No active": "This account is not active!!"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            return Response(
                {"Invalid": "Invalid username or password!!"},
                status=status.HTTP_404_NOT_FOUND,
            )


class UserInfo(APIView):
    def get(self, request, *args, **kwargs):
        needed_user = User.objects.filter()


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        user_password = request.data.get("password")
        user_confirm_pass = request.data.get("confirmPass")
        user_email = request.data.get("email")

        print("USERNAME", user_name)
        print("PASSWORD", user_password)
        print("EMAIL", user_email)

        if not all([user_name, user_password, user_email]):
            return Response(
                {"Error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif user_password != user_confirm_pass:
            return Response(
                {"Error": "Passwords don't match."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif len(user_name) < 6:
            return Response(
                {"Error": "Username must be at least 6 characters long"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif User.objects.filter(username=user_name).exists():
            return Response(
                {"Error": "Username taken."},
                status=status.HTTP_409_CONFLICT,
            )

        # Getting current date
        current_date = datetime.date.today()

        # Calculate the date one week from now and convert to string
        one_week_from_now = json.dumps(
            (current_date + datetime.timedelta(weeks=1)), default=str
        )

        user = User.objects.create_user(
            username=user_name, email=user_email, password=user_password
        )  # automatically creates user ID
        payload_data = {
            "id": user.id,
            "username": user_name,
            "email": user_email,
            "expiration_date": one_week_from_now,
        }  # payload for jwt token
        token = jwt.encode(payload=payload_data, key=secret_key)

        # refresh = RefreshToken.for_user(user)
        # user_token = str(refresh.access_token)

        response = HttpResponse("Register Successful")
        response.set_cookie(key="jwt_token", value=token)
        print("RESPONSE:", response.cookies)

        serializer = UserSerializer(user)
        return Response({"response": response.cookies})
        # return Response(
        #     {"User": serializer.data, "jwt_token": token},
        #     status=status.HTTP_201_CREATED,
        # )


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        print("RECEIVED REQUEST")
        data = request.data
        response = Response()
        username = data.get("username", None)
        password = data.get("password", None)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)
                response.set_cookie(
                    key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                    value=data["access"],
                    expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                    secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                    httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                    samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                )
                csrf.get_token(request)
                response.data = {"Success": "Login successfully", "data": data}
                return response
            else:
                return Response(
                    {"No active": "This account is not active!!"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            return Response(
                {"Invalid": "Invalid username or password!!"},
                status=status.HTTP_404_NOT_FOUND,
            )


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Create the user
        user = User.objects.create(username=username, password=make_password(password))
        user.save()

        # Generate a JWT token for the new user
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        # Initialize the CustomAuthentication class and authenticate the request
        auth_class = CustomAuthentication()
        validated_token = auth_class.get_validated_token(access)

        # Set the JWT token as a cookie
        response = Response({"detail": "User successfully registered"})
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(access),
            httponly=True,
            samesite="none",
            secure=True,
        )

        return response


class UserInterestView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        print("USERNAME", user_name)
        user_id = (User.objects.filter(username=user_name).first()).id

        user_interests = request.data.get("interests")

        user_interests = TopicsOfInterest.objects.create(
            user_id=user_id, topics=user_interests
        )

        return Response({"Message", "Interests updated"})


class PostView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        post_title = request.data.get("title")
        post_content = request.data.get("content")

        user_id = (User.objects.filter(username=user_name).first()).id

        new_post = Post.objects.create(
            user=user_id, title=post_title, content=post_content
        )

        serialized_post = PostSerializer(new_post)
        return Response(serialized_post.data)
