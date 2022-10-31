from django.urls import path
from .views import TrainerProfileListAPIView

app_name = 'profiles'

urlpatterns = [
    path('profiles/', TrainerProfileListAPIView.as_view(), name='trainer_list'),
]
