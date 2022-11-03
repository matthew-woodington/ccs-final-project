from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, TrainerProfile, ClientProfile

# Register your models here.
admin.site.register(User)
admin.site.register(TrainerProfile)
admin.site.register(ClientProfile)
