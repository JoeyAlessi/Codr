from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=100, default="")
    password = models.CharField(max_length=18, default="")
    email = models.CharField(max_length=50, default="")
    is_admin = models.BooleanField(default=False, blank=True)
