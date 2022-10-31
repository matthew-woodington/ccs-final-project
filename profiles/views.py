from rest_framework import generics
from .models import TrainerProfile
from .serializers import TrainerProfileSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.


class TrainerProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer
