from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# created class topic to retrieve topics from frontend, assume it works for now
class TopicsOfInterest(models.Model):
    topics = ArrayField(
        ArrayField(models.CharField(max_length=100, default="")), default=list
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
   
    content = models.CharField(max_length=2000, default="", blank=True, null=True) 
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)


    # likes = models.IntegerField(default=0, blank=True, null=True) idk how to implement
    # comments = models.CharField(default=0, blank=True, null=True) idk how to implement
     # users_liked = models.ManyToManyField(User, related_name="posts_liked", through="Vote") idk how to implement
    # title = models.CharField(max_length=50)


class UserFollowing(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE) # person who is following others

    following_user_id = models.ForeignKey(User,on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'following_user_id'], name='unique_followers')
        ]

