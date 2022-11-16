from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.


class User(AbstractUser):
    is_trainer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)


class TrainerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE, blank=True)
    is_verified = models.BooleanField(default=True)
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


class HeadlinePost(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE, blank=True)
    trainerprofile = models.OneToOneField(
        TrainerProfile, on_delete=models.CASCADE, blank=True)
    post_image1 = models.ImageField(upload_to='posts/', null=True, blank=True)
    post_title1 = models.CharField(max_length=225, null=True, blank=True)
    post_caption1 = models.CharField(max_length=225, null=True, blank=True)
    post_image2 = models.ImageField(upload_to='posts/', null=True, blank=True)
    post_title2 = models.CharField(max_length=225, null=True, blank=True)
    post_caption2 = models.CharField(max_length=225, null=True, blank=True)
    post_image3 = models.ImageField(upload_to='posts/', null=True, blank=True)
    post_title3 = models.CharField(max_length=225, null=True, blank=True)
    post_caption3 = models.CharField(max_length=225, null=True, blank=True)

    def __str__(self) -> str:
        return self.user.username


class ClientProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profiles/', null=True)
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    text = models.TextField(null=True)
    trainerprofile = models.ForeignKey(
        TrainerProfile, on_delete=models.CASCADE, blank=True)
    rating = models.IntegerField()
    created_on = models.DateTimeField(auto_now_add=True, null=True)
