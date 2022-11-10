import os
import urllib.parse
import requests
import json
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import TrainerProfile, ClientProfile, User, Review
from .serializers import TrainerProfileSerializer, ClientProfileSerializer, CustomUserDetailsSerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser, AllowAny
from .permissions import IsUserOrReadOnly

# Create your views here.


def filter_trainer_profiles_distance(trainerprofiles, origin, distance_radius):

    def get_profile_location(trainerprofile):
        return trainerprofile.location

    locations = list(map(get_profile_location, trainerprofiles))
    string_locations = ('|').join(locations)
    url_locations = urllib.parse.quote(string_locations)

    api_key = os.environ['GOOGLE_API_KEY']

    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={url_locations}&units=imperial&key={api_key}"

    # payload = {}
    # headers = {}
 
    response = requests.request("GET", url, headers={}, data={})
    # print('response', response)
    data = json.loads(response.text)

    distance_dict = data['rows'][0]['elements']

    distance_str_list = []
    for i in range(len(distance_dict)):
        distance_str_list.append(distance_dict[i]['distance']['text'])

    distance_int_list = []
    for i in range(len(distance_str_list)):
        distance_int_list.append(
            float((distance_str_list[i].replace(' mi', ''))))

    # print(distance_int_list)
    # print(type(distance_int_list[0]))
    # print(type(distance_radius))
    # print(trainerprofiles)

    filtered_profiles = []
    for (index, integer) in enumerate(distance_int_list):
        try:
            if integer < int(distance_radius):
                filtered_profiles.append(trainerprofiles[index])
        except:
            pass

    return filtered_profiles
    # print(filtered_profiles)


def filter_trainer_profiles(request):
    origin = request.GET.get('origin')
    distance_radius = request.GET.get('distance')

    trainerprofiles = TrainerProfile.objects.filter(
        is_verified=True)

    return filter_trainer_profiles_distance(trainerprofiles, origin, distance_radius)


@ api_view(['GET'],)
@ permission_classes([AllowAny],)
def get_filtered_profiles(request):
    profiles = filter_trainer_profiles(request)
    # print('profiles', profiles)
    results = TrainerProfileSerializer(profiles, many=True).data

    return Response(results)


class UserListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = CustomUserDetailsSerializer


class TrainerProfileListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
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

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ClientProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer


class TrainerReviewsListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsUserOrReadOnly,)
    serializer_class = ReviewSerializer

    def get_queryset(self):
        trainerprofile = self.kwargs['trainerprofile']
        return Review.objects.filter(trainerprofile=trainerprofile)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@ api_view(['POST'])
@ permission_classes([IsAdminUser, ])
def verify_trainer(self):
    pass
