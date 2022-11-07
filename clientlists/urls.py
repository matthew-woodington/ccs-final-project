from django.urls import path
from .views import RequestListAPIView, RequestDetailAPIView, ClientListAPIView

app_name = 'client_lists'

urlpatterns = [
    path('requests/trainer/<int:trainerprofile>/',
         RequestListAPIView.as_view(), name='requests_list'),
    path('requests/<int:pk>/', RequestDetailAPIView.as_view(), name='request'),
    path('clientlists/trainer/<int:trainerprofile>/',
         ClientListAPIView.as_view(), name='client_list'),
]
