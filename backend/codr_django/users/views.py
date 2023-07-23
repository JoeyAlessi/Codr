import json
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import PostSerializer, UserSerializer
from .models import Post, TopicsOfInterest
from django.contrib.auth.models import User
import jwt
from dotenv import load_dotenv  # used for accessing secret key
import os
import datetime
from django.http import HttpResponse, JsonResponse
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

        if not all([user_name, user_password, user_confirm_pass, user_email]):
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
        # elif User.objects.filter(email=user_email).exists():
        #     return Response(
        #         {"Error": "Email already in use."},
        #         status=status.HTTP_409_CONFLICT,
        #     )

        user = User.objects.create_user(
            username=user_name, email=user_email, password=user_password
        )  # Automatically creates user ID

        # Create JWT token for new user
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        serialized_user = UserSerializer(user).data

        # Set the JWT token as a cookie
        response = Response({"Message": "Register Successful", "User": serialized_user})
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=token,
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
        )
        print("COOKIES", response.cookies)
        print(response.__dict__)

        return response


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        print("COOKIE", request.COOKIES)
        username = request.data.get("username")
        password = request.data.get("password")

        print("username", username)
        print("password", password)

        if not username and not password:
            return Response(
                {"Error": "Both username and password required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not username:
            return Response(
                {"Error": "Username required to login."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not password:
            return Response(
                {"Error": "Password required to login."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(username=username, password=password)

        if user:
            print("USER:", user)
            print("PASSWORD:", password)

            if request.COOKIES:
                decoded_key = jwt.decode(
                    jwt=request.COOKIES["JWT_TOKEN"],
                    key="JWT_TOKEN",
                    algorithms="HS256",
                )
                print("DECODED_KEY", decoded_key)

            #     serialized_user = UserSerializer(user).data
            #     refresh = RefreshToken.for_user(user)
            #     token = str(refresh.access_token)
            #     response = HttpResponse(
            #         {"Message": "Login Successful", "User": serialized_user}
            #     )

            #     response.set_cookie(
            #         key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            #         value=token,
            #         httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            #         samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            #         secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            #         expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            #     )
            #     return response
            # else:
            #     return Response()
        else:
            return Response(
                {"Error": "Invalid Credentials."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserInterestView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        user_id = (User.objects.filter(username=user_name).first()).id

        print("USERNAME", user_name)
        print("ID", user_id)

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
