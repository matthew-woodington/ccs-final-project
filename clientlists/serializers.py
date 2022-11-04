from rest_framework import serializers
from .models import Request


class RequestSerializer(serializers.ModelSerializer):
    first_name = serializers.ReadOnlyField(
        source='accounts.user.clientprofile.first_name')
    last_name = serializers.ReadOnlyField(
        source='accounts.user.clientprofile.last_name')

    class Meta:
        model = Request
        fields = '__all__'
