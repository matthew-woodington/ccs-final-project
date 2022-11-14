from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import TrainerProfile, ClientProfile, Review, HeadlinePost


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('is_trainer', 'is_client',)


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    id = serializers.ReadOnlyField(source='user.id')
    is_trainer = serializers.ReadOnlyField(source='user.is_trainer')
    is_client = serializers.ReadOnlyField(source='user.is_client')
    trainer_avatar = serializers.ImageField(
        source='user.trainerprofile.avatar')
    client_avatar = serializers.ImageField(source='user.clientprofile.avatar')
    trainer_profile = serializers.ReadOnlyField(
        source='user.trainerprofile.id')
    client_profile = serializers.ReadOnlyField(
        source='user.clientprofile.id')

    class Meta:
        model = TokenModel
        fields = ('key', 'is_superuser', 'id',
                  'is_trainer', 'is_client', 'trainer_avatar', 'client_avatar', 'trainer_profile', 'client_profile')


class CustomRegisterSerializer(RegisterSerializer):
    is_trainer = serializers.BooleanField(default=False)
    is_client = serializers.BooleanField(default=False)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['is_trainer'] = self.validated_data.get('is_trainer', False)
        data_dict['is_client'] = self.validated_data.get('is_client', False)

        return data_dict


class TrainerProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = TrainerProfile
        fields = '__all__'
        read_only_fields = ['is_verified']


class ClientProfileSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = ClientProfile
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    author_avatar = serializers.ImageField(
        source='user.clientprofile.avatar', read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class TrainerClientViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerProfile
        fields = ('avatar', 'first_name', 'last_name',)


class HeadlinePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeadlinePost
        fields = '__all__'
        lookup_field = 'trainerprofile'
