from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TopicsOfInterest, Post, Comment


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
        fields = ("post_id", "user", "content", "username", "likes", "users_liked", "date")


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ("post", "user", "content", "date","username")
