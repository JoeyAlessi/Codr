from django.shortcuts import render
from django.contrib.auth.models import User #django already has a built in user model
from django.contrib.auth.hashers import make_password #this is for hashing the password a user creates to ensure privacy
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# class UserRegisterView(APIView):
#     def post (self, request):
        
#         username = request.data.get('username')
#         password = make_password(request.data.get('password')) #hashes the password
#         email = request.data.get('email')
    
#         if not all([username,password, email]):
#             return Response({"Error": "All fields are required"}, status = status.HTTP_400_BAD_REQUEST)
#         user = User(username=username, password=password, email=email)
#         user.save()

#         return Response({"Message": "User created successfully"}, status = status.HTTP_201_CREATED)

class HelloWorld(APIView):
    def get(self, request):
        return Response({"message:": "Hello World"})