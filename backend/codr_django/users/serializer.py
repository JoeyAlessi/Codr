from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TopicsOfInterest


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicsOfInterest
        fields = ("name", "id")
