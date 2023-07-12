from django.shortcuts import render
from django.contrib.auth.models import User  # django already has a built in user model
from django.contrib.auth.hashers import (
    make_password,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

from Codr.backend.codr_django.users.models import UserInterest
from .serializer import UserSerializer


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        confirmPass = request.data.get("confirmPass")
        email = request.data.get("email")

        if not all([username, password, email]):
            return Response(
                {"Error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif password != confirmPass:
            return Response(
                {"Error": "Passwords don't match."},
            )
        elif len(username) < 6:
            return Response(
                {"Error": "Username must be at least 6 characters long"},
            )

        user = User.objects.create_user(
            username=username, email=email, password=password
        )

        print(f"USER : {user}")
        user = UserSerializer(user)

        return Response(user.data)


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "NONE")
        password = request.data.get("password", "NONE")

        if username != "NONE" and password != "NONE":
            potential_username = User.objects.get(username=username)
            first_id = potential_username.id

            potential_password = User.objects.get(password=password)
            second_id = potential_password.id

            if first_id == second_id:  # user exists
                return Response({"Message": "User Exists"})

        return Response(
            {"Error": "Invalid credentials."},
        )

    class UserInterestView(APIView):
        def post(self, request, *args, **kwargs):
            user = User.objects.get(username=request.data.get("user"))
            topics = request.data.get("topics")

            user_interest = UserInterest.objects.create(user=user)
            





    