from rest_framework import generics
from .models import TrainerProfile, ClientProfile
from .serializers import TrainerProfileSerializer, ClientProfileSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .permissions import IsUserOrReadOnly

# Create your views here.


class TrainerProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer


class TrainerProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer


class ClientProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer


class ClientProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
