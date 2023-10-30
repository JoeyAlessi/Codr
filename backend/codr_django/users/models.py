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
    username = models.CharField(max_length=150, blank=True, null=True)
    content = models.CharField(max_length=2000, default="", blank=True, null=True) 
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    likes = models.IntegerField(default=0, blank=True, null=True) 
    users_liked = models.ManyToManyField(User, related_name="posts_liked", through="Vote")

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    content = models.CharField(max_length=80,default="",blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date_voted = models.DateTimeField(auto_now_add=True) 

    class Meta:
        unique_together=["user", "post"]

class FriendRequest(models.Model):
    request_id = models.AutoField(primary_key=True)

    from_user = models.ForeignKey(
        User, 
        related_name='friend_requests_sent', 
        on_delete=models.CASCADE
    )
    # The user to whom the friend request was sent
    to_user = models.ForeignKey(
        User, 
        related_name='friend_requests_received', 
        on_delete=models.CASCADE
    )

# unique will delete similar entries if they are detected
    class Meta:
        unique_together = ['from_user', 'to_user']

class FriendShip(models.Model):
    request_id = models.AutoField(primary_key=True)

    user_one = models.ForeignKey(
        User, 
        related_name='friend_one', 
        on_delete=models.CASCADE
    )
    # The user to whom the friend request was sent
    user_two = models.ForeignKey(
        User, 
        related_name='friend_two', 
        on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):
        # Ensure user_one's ID is always less than user_two's ID
        if self.user_one_id > self.user_two_id:
            self.user_one, self.user_two = self.user_two, self.user_one
        
        super(FriendShip, self).save(*args, **kwargs)
    class Meta:
        unique_together = ['user_one', 'user_two']
    

