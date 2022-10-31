from django.db import models
from django.conf import settings

# Create your models here.


class TrainerProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    is_verified = models.BooleanField(default=False)
