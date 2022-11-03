from rest_framework import generics
from .models import TrainerProfile, ClientProfile, User
from .serializers import TrainerProfileSerializer, ClientProfileSerializer, CustomUserDetailsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser
from .permissions import IsUserOrReadOnly

# Create your views here.


class UserListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = CustomUserDetailsSerializer


class TrainerProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    # queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer

    def get_queryset(self):
        return TrainerProfile.objects.filter(is_verified=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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
