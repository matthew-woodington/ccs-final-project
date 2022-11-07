from rest_framework import generics
from .models import Request, ClientList
from .serializers import RequestSerializer, ClientListReadSerializer, ClientListWriteSerializer, ClientListDetailReadSerializer, ClientListDetailWriteSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthorOrTrainer, IsTrainer

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


class ClientListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsTrainer,)

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return ClientListWriteSerializer
        else:
            return ClientListReadSerializer

    def get_queryset(self):
        trainerprofile = self.kwargs['trainerprofile']
        return ClientList.objects.filter(trainerprofile=trainerprofile)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ClientListDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsTrainer,)
    queryset = ClientList.objects.all()
    serializer_class = ClientListDetailReadSerializer

    # def get_serializer_class(self):
    #     method = self.request.method
    #     if method == 'PUT' or method == 'PATCH':
    #         return ClientListDetailWriteSerializer
    #     else:
    #         return ClientListDetailReadSerializer
