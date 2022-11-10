from rest_framework import generics
from django.db.models import Q
from .models import Request, ClientList, Session
from .serializers import SessionSerializer, RequestSerializer, ClientListReadSerializer, ClientListWriteSerializer, ClientListDetailReadSerializer, ClientSessionSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthorOrTrainer, IsTrainer, IsTrainerOrReadOnly

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


class SessionListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsTrainer,)
    serializer_class = SessionSerializer

    def get_queryset(self):
        trainerprofile = self.kwargs['trainerprofile']
        return Session.objects.filter(trainerprofile=trainerprofile).order_by('date', 'time')

    def perform_create(self, serializer):
        # import pdb
        # pdb.set_trace()
        serializer.save(user=self.request.user)


class ClientSessionListAPIView(generics.ListAPIView):
    permission_classes = (IsTrainerOrReadOnly,)
    serializer_class = ClientSessionSerializer

    def get_queryset(self):
        clientprofile = self.kwargs['clientprofile']
        return Session.objects.filter(clientprofile=clientprofile).order_by('date', 'time')


class SessionListFilteredAPIView(generics.ListCreateAPIView):
    permission_classes = (IsTrainer,)
    serializer_class = SessionSerializer

    # def get_serializer_class(self):
    #     method = self.request.method
    #     if method == 'PUT' or method == 'POST':
    #         return SessionWriteSerializer
    #     else:
    #         return SessionReadSerializer

    def get_queryset(self):
        trainerprofile = self.kwargs['trainerprofile']
        clientprofile = self.kwargs['clientprofile']
        return Session.objects.filter(Q(trainerprofile=trainerprofile) & Q(clientprofile=clientprofile)).order_by('date', 'time')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SessionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsTrainer,)
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
