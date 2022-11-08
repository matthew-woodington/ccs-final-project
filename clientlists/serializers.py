from rest_framework import serializers
from .models import Request, ClientList, Session
from accounts.serializers import ClientProfileSerializer, TrainerClientViewSerializer


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


class ClientListWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientList
        exclude = ('user',)


class ClientListReadSerializer(serializers.ModelSerializer):
    clientprofile = ClientProfileSerializer()

    class Meta:
        model = ClientList
        exclude = ('user',)
        # depth = 1


# class ClientListDetailWriteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ClientList
#         exclude = ('user',)


class ClientListDetailReadSerializer(serializers.ModelSerializer):
    clientprofile = ClientProfileSerializer()

    class Meta:
        model = ClientList
        exclude = ('user',)


class SessionReadSerializer(serializers.ModelSerializer):
    clientprofile = ClientProfileSerializer()

    class Meta:
        model = Session
        fields = '__all__'


class ClientSessionReadSerializer(serializers.ModelSerializer):
    clientprofile = ClientProfileSerializer()
    trainerprofile = TrainerClientViewSerializer()

    class Meta:
        model = Session
        fields = '__all__'


class SessionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
