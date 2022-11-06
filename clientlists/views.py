from rest_framework import generics
from .models import Request
from .serializers import RequestSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthorOrTrainer

# Create your views here.


class RequestListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RequestSerializer

    def get_queryset(self):
        trainerprofile = self.kwargs['trainerprofile']
        return Request.objects.filter(trainerprofile=trainerprofile)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RequestDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrTrainer,)
    serializer_class = RequestSerializer
    queryset = Request.objects.all()
