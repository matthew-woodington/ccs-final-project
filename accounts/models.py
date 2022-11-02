from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    pass


class TrainerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE, blank=True)
    is_verified = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='profiles/', null=True)
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)
    certs = models.CharField(max_length=225, null=True)
    specialties = models.CharField(max_length=225, null=True)
    business = models.CharField(max_length=225, null=True)
    location = models.CharField(max_length=225, null=True)
    bio = models.TextField(null=True)
    email = models.EmailField(max_length=225, null=True)
    instagram = models.CharField(max_length=225, null=True, blank=True)
    twitter = models.CharField(max_length=225, null=True, blank=True)
    facebook = models.CharField(max_length=225, null=True, blank=True)
    personal_site = models.URLField(max_length=225, null=True, blank=True)

    IN_PERSON = 'In Person'
    ONLINE = 'Online'
    BOTH = 'In Person & Online'
    TYPE_OPTIONS = [
        (IN_PERSON, 'In Person'),
        (ONLINE, 'Online'),
        (BOTH, 'In Person & Online'),
    ]
    training_type = models.CharField(
        max_length=20,
        choices=TYPE_OPTIONS,
        default=IN_PERSON,
    )

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class ClientProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profiles/', null=True)
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)
