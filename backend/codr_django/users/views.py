from django.shortcuts import render
from django.contrib.auth.models import User  # django already has a built in user model

from django.contrib.auth.hashers import (
    make_password,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# from backend.codr_django.users.serializer import UserSerializer


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        print(**request.data)
        username = request.data.get("username")
        password = make_password(request.data.get("password"))
        email = request.data.get("email")

        user = User.objects.create(**request.data)
        print(user)
        # user = UserSerializer(user)

        if not all([username, password, email]):
            return Response(
                {"Error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(user.data)
