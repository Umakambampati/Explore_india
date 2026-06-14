from django.urls import path
from .views import StateListView,StateDetailView,PlaceListView,PlaceDetailView,CityListView,CityeDetailView,FoodListView,EventListView,search,StateFullDetailView

urlpatterns = [
    path('states/', StateListView.as_view(), name='state-list'),
    path('states/<slug:slug>/', StateDetailView.as_view(), name='state-detail'),
    path('places/',PlaceListView.as_view(),name='place_list'),
    path('places/<slug:slug>/',PlaceDetailView.as_view(),name='place_detail'),
    path('cities/',CityListView.as_view(),name='city_list'),
    path('cities/<slug:slug>/',CityeDetailView.as_view(),name='city_detail'),
    path('food/',FoodListView.as_view(),name='food-list'),
    path('event/',EventListView.as_view(),name='event_list'),
    path('search/', search, name='search'),
    path('states/<slug:slug>/full/', StateFullDetailView.as_view(), name='state-full-detail')
]