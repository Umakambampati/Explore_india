from django.urls import path
from .views import StateListView,StateDetailView,PlaceListView,PlaceDetailView,CityListView,CityeDetailView,FoodListView,EventListView,search,StateFullDetailView,register,get_reviews, add_review,ai_chat

urlpatterns = [
    path('states/', StateListView.as_view(), name='state-list'),
    path('states/<slug:slug>/', StateDetailView.as_view(), name='state-detail'),
    path('places/',PlaceListView.as_view(),name='place_list'),
    path('places/<slug:slug>/',PlaceDetailView.as_view(),name='place_detail'),
    path('places/<slug:slug>/reviews/', get_reviews, name='get-reviews'),
    path('places/<slug:slug>/add-review/', add_review, name='add-review'),
    path('cities/',CityListView.as_view(),name='city_list'),
    path('cities/<slug:slug>/',CityeDetailView.as_view(),name='city_detail'),
    path('food/',FoodListView.as_view(),name='food-list'),
    path('event/',EventListView.as_view(),name='event_list'),
    path('search/', search, name='search'),
    path('states/<slug:slug>/full/', StateFullDetailView.as_view(), name='state-full-detail'),
    path('register/', register, name='register'),
    path('ai-chat/', ai_chat, name='ai-chat'),
]