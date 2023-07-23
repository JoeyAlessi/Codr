from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TopicsOfInterest, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicsOfInterest
        fields = ("name", "id")


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("username", "title", "content")
