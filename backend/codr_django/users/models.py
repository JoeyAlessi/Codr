from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


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


class Post(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    # users_liked = models.ManyToManyField(User, related_name="posts_liked", through="Vote") idk how to implement
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=2000, default="", blank=True, null=True)
    # likes = models.IntegerField(default=0, blank=True, null=True) idk how to implement
    # comments = models.CharField(default=0, blank=True, null=True) idk how to implement
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
