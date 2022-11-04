from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, TrainerProfile, ClientProfile, Review

# Register your models here.
admin.site.register(User)
admin.site.register(TrainerProfile)
admin.site.register(ClientProfile)
admin.site.register(Review)
