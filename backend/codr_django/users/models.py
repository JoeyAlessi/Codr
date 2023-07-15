from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# Create your models here.


# created class topic to retrieve topics from frontend, assume it works for now
class TopicsOfInterest(models.Model):
    topics = ArrayField(
        ArrayField(models.CharField(max_length=100, default="")), default=list
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class User(models.Model):
    username = models.CharField(max_length=100, default="")
    password = models.CharField(max_length=18, default="")
    email = models.CharField(max_length=50, default="")
    is_admin = models.BooleanField(default=False, blank=True)
    friends = models.ManyToManyField("self", blank=True)
    following = models.ManyToManyField(
        "self", symmetrical=False, related_name="followers", blank=True
    )
    
# created class topic to retrieve topics from frontend, assume it works for now
