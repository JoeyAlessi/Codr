import json
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import PostSerializer, UserSerializer
from .models import Post, TopicsOfInterest
from django.contrib.auth.models import User
import jwt
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status


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
        elif User.objects.filter(email=user_email).exists():
            return Response(
                {"Error": "Email already in use."},
                status=status.HTTP_409_CONFLICT,
            )

        user = User.objects.create_user(
            username=user_name, email=user_email, password=user_password
        )  # Automatically creates user ID

        # Create JWT token for new user using User Table
        serialized_user = UserSerializer(user).data

        token = jwt.encode(
            key=settings.SIMPLE_JWT["SIGNING_KEY"],
            algorithm="HS256",
            payload=serialized_user,
        )

        print("TOKEN", token)

        # Set the JWT token as a cookie
        response = Response({"Message": "Register Successful", "User": serialized_user})
        response.set_cookie(
            key=settings.SIMPLE_JWT["SIGNING_KEY"],
            value=token,
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
        )
        print("COOKIES", response.cookies)

        return response


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        print("USERNAME", username)
        print("PASSWORD", password)

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

        user = User.objects.filter(username=username).first()
        print("USER", user)

        if user is None:
            return Response(
                data="Username not found.", status=status.HTTP_411_LENGTH_REQUIRED
            )

        if check_password(password, user.password):
            print("USER:", user)
            print("PASSWORD:", password)

        serialized_user = UserSerializer(user).data

        token = jwt.encode(
            key=settings.SIMPLE_JWT["SIGNING_KEY"],
            algorithm="HS256",
            payload=serialized_user,
        )

        print("TOKEN", token)

        # Set the JWT token as a cookie
        response = Response({"Message": "Login Successful", "User": serialized_user})
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=token,
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
        )
        print("COOKIES", response.cookies)

        return response


class AuthenticateTokenView(APIView):
    # >:(
    def post(self, request, *args, **kwargs):
        jwt_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        print("COOKIE", request.COOKIES)

        # if Cookies exist, decode cookie and return user info
        if jwt_token is not None:
            token = str(jwt_token)
            print("TOKEN", token)

            decoded_key = jwt.decode(
                jwt=token,
                key=settings.SIMPLE_JWT["SIGNING_KEY"],
                algorithms="HS256",
            )
            print("DECODED_KEY", decoded_key)
            return Response({"Message": "User cookie found.", "User": decoded_key})
        # else user has no token and return nothing
        else:
            return Response(
                {"Error": "No token found."}, status=status.HTTP_400_BAD_REQUEST
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
