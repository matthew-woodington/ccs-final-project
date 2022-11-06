from rest_framework import serializers
from .models import Request


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
