from django.urls import path
from .views import ClientProfileDetailAPIView, ClientProfileListAPIView, TrainerProfileDetailAPIView, TrainerProfileListAPIView, UserListAPIView, TrainerReviewsListAPIView, HeadlinePostListAPIView, HeadlinePostDetailAPIView, verify_trainer, get_filtered_profiles

app_name = 'accounts'

urlpatterns = [
    path('users/', UserListAPIView.as_view(), name='user_list'),
    path('profiles/trainers/',
         TrainerProfileListAPIView.as_view(), name='trainer_list'),
    path('profiles/trainers/<int:pk>/', TrainerProfileDetailAPIView.as_view(),
         name='trainer_profile'),
    path('profiles/clients/', ClientProfileListAPIView.as_view(), name='client_list'),
    path('profiles/clients/<int:pk>/', ClientProfileDetailAPIView.as_view(),
         name='client_profile'),
    path('profiles/trainers/<int:trainerprofile>/reviews/',
         TrainerReviewsListAPIView.as_view()),
    path('profiles/trainers/<int:pk>/verify/', verify_trainer),
    path('profiles/filter/', get_filtered_profiles, name='filtered_trainer_list'),
    path('profiles/trainers/headlineposts/',
         HeadlinePostListAPIView.as_view(), name='all_headline_posts'),
    path('profiles/trainers/<int:trainerprofile>/headlinepost/',
         HeadlinePostDetailAPIView.as_view(), name='headline_post'),
]
