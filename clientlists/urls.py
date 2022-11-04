from django.urls import path
from .views import RequestListAPIView

app_name = 'client_lists'

urlpatterns = [
    path('requests/<int:trainerprofile>/',
         RequestListAPIView.as_view(), name='request_list'),
]
