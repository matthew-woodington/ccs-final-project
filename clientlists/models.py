from django.db import models
from django.conf import settings
from accounts.models import TrainerProfile

# Create your models here.


class Request(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    text = models.TextField(null=True)
    trainerprofile = models.ForeignKey(
        TrainerProfile, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.user.username
