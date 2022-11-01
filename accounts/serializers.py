from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from .models import TrainerProfile, ClientProfile


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = TokenModel
        fields = ('key', 'is_superuser', 'id',)


class TrainerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerProfile
        fields = '__all__'


class ClientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = '__all__'
