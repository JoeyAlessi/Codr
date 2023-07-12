from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Topic

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ("name", "id")
    
