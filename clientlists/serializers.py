from rest_framework import serializers
from .models import Request, ClientList


class RequestSerializer(serializers.ModelSerializer):
    first_name = serializers.ReadOnlyField(
        source='user.clientprofile.first_name')
    last_name = serializers.ReadOnlyField(
        source='user.clientprofile.last_name')
    client_profile = serializers.ReadOnlyField(source='user.clientprofile.id')
    author_avatar = serializers.ImageField(
        source='user.clientprofile.avatar', read_only=True)

    class Meta:
        model = Request
        fields = '__all__'


class ClientListSerializer(serializers.ModelSerializer):
    # trainerprofile = serializers.ReadOnlyField(source='user.trainerprofile.id')

    class Meta:
        model = ClientList
        # fields = '__all__'
        exclude = ('user',)
        # depth = 1
