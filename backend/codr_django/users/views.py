from django.shortcuts import render
from django.contrib.auth.models import User  # django already has a built in user model

from django.contrib.auth.hashers import (
    make_password,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

# from backend.codr_django.users.serializer import UserSerializer


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        user = User.objects.create(**request.data)
        print(f"USER : {user}")
        # user = UserSerializer(user)

        if not all([username, password, email]):
            return Response(
                {"Error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(user.data)

class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        if not all ([username, password]):
            return Response(
                {"Error": "All fields are required"}, status = status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({"Success": "User Authentication"})
        else:
            return Response({"Error": "Invalid Username and Password"})

