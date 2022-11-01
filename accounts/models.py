from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    pass


class TrainerProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    is_verified = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='profiles/', null=True)
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)
    certs = models.CharField(max_length=225, null=True)
    specialties = models.CharField(max_length=225, null=True)
    bio = models.TextField(null=True)
    email = models.EmailField(max_length=225, null=True)
    instagram = models.CharField(max_length=225, null=True)
    twitter = models.CharField(max_length=225, null=True)
    facebook = models.CharField(max_length=225, null=True)
    personal_site = models.URLField(max_length=225, null=True)
    joined_on = models.DateTimeField(auto_now_add=True, null=True)


class ClientProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profiles/', null=True)
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)
