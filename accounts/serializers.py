from pyexpat import model
from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import TrainerProfile, ClientProfile, User


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('is_trainer', 'is_client',)


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    id = serializers.ReadOnlyField(source='user.id')
    is_trainer = serializers.ReadOnlyField(source='user.is_trainer')
    is_client = serializers.ReadOnlyField(source='user.is_client')

    class Meta:
        model = TokenModel
        fields = ('key', 'is_superuser', 'id', 'is_trainer', 'is_client',)


class CustomRegisterSerializer(RegisterSerializer):
    is_trainer = serializers.BooleanField(default=False)
    is_client = serializers.BooleanField(default=False)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['is_trainer'] = self.validated_data.get('is_trainer', False)
        data_dict['is_client'] = self.validated_data.get('is_client', False)

        return data_dict


class TrainerProfileSerializer(serializers.ModelSerializer):
    date_joined = serializers.ReadOnlyField(source='user.date_joined')

    class Meta:
        model = TrainerProfile
        fields = '__all__'


class ClientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = '__all__'
