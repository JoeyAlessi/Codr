from django.shortcuts import render
from django.contrib.auth.models import User  # django already has a built in user model

from django.contrib.auth.hashers import (
    make_password,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializer import UserSerializer


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if not all([username, password, email]):
            return Response(
                {"Error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(username) < 6:
            return Response(
                {"Error": "Username must be at least 6 characters long"},
            )

        user = User.objects.create(**request.data)
        print(f"USER : {user}")
        user = UserSerializer(user)

        return Response(user.data)


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        print(username)
        print(password)

        user = authenticate(
            username=username, password=password
        )  # checks if the username and password are valid
        print(user)

        # looks up the username
        # checks the password
        # if username is found:
        # check provided password against password in db

        if user:  # user exists
            print("EXISTS")
            if not all([username, password]):
                return Response(
                    {"Error": "All fields are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if user is not None:
                return Response({"Success": "User Authentication"})
            else:
                return Response({"Error": "Invalid Username and Password"})

        else:  # user does not exist (throw error)
            print("DOESN'T EXIST")
            return Response(
                {"Error": "Invalid credentials (PUSSYFART)."},
            )
