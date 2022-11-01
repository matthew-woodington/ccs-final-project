from django.urls import path
from .views import ClientProfileDetailAPIView, ClientProfileListAPIView, TrainerProfileDetailAPIView, TrainerProfileListAPIView

app_name = 'accounts'

urlpatterns = [
    path('profiles/trainers/',
         TrainerProfileListAPIView.as_view(), name='trainer_list'),
    path('profiles/trainers/<int:pk>/', TrainerProfileDetailAPIView.as_view(),
         name='trainer_profile'),
    path('profiles/clients/', ClientProfileListAPIView.as_view(), name='client_list'),
    path('profiles/clients/<int:pk>/', ClientProfileDetailAPIView.as_view(),
         name='client_profile'),
]
