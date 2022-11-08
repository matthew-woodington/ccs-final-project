from django.db import models
from django.conf import settings
from accounts.models import TrainerProfile, ClientProfile
import datetime

# Create your models here.


class Request(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    text = models.TextField(null=True)
    trainerprofile = models.ForeignKey(
        TrainerProfile, on_delete=models.CASCADE, blank=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.user.username


class ClientList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    trainerprofile = models.ForeignKey(
        TrainerProfile, on_delete=models.CASCADE, blank=True)
    clientprofile = models.ForeignKey(
        ClientProfile, on_delete=models.CASCADE, blank=True)
    note = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.username


class Session(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True)
    trainerprofile = models.ForeignKey(
        TrainerProfile, on_delete=models.CASCADE, blank=True)
    clientprofile = models.ForeignKey(
        ClientProfile, on_delete=models.CASCADE, blank=True)
    date = models.DateField(default=datetime.date.today)
    time = models.TimeField(default=datetime.time)
    details = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.clientprofile.first_name
