from django.urls import path
from .views import RequestListAPIView, RequestDetailAPIView, ClientListAPIView, ClientListDetailAPIView, SessionListAPIView, ClientSessionListAPIView

app_name = 'client_lists'

urlpatterns = [
    path('requests/trainer/<int:trainerprofile>/',
         RequestListAPIView.as_view(), name='requests_list'),
    path('requests/<int:pk>/', RequestDetailAPIView.as_view(), name='request'),
    path('clientlists/trainer/<int:trainerprofile>/',
         ClientListAPIView.as_view(), name='client_list'),
    path('clientlists/<int:pk>/', ClientListDetailAPIView.as_view(),
         name='client_list_detail'),
    path('sessions/trainer/<int:trainerprofile>/',
         SessionListAPIView.as_view(), name='trainer_session_view'),
    path('sessions/client/<int:clientprofile>/',
         ClientSessionListAPIView.as_view(), name='client_session_view'),
]
