from dataclasses import field
from rest_framework import serializers
from .models import TrainerProfile


class TrainerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerProfile
        fields = '__all__'
