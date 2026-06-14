from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import State,Place,City,Food,Event
from .serializers import StateSerializer,PlaceSerializer,CitySerializer,FoodSerializer,EventSerializer,StateFullSerializer

class StateListView(generics.ListAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class StateDetailView(generics.RetrieveAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    lookup_field = 'slug'

class PlaceListView(generics.ListAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        queryset = Place.objects.all()
        state = self.request.query_params.get('state')
        category = self.request.query_params.get('category')

        if state:
            queryset = queryset.filter(state__slug=state)
        if category:
            queryset = queryset.filter(category=category)

        return queryset

class PlaceDetailView(generics.RetrieveAPIView):
    queryset=Place.objects.all()
    serializer_class = PlaceSerializer
    lookup_field = 'slug'

class CityListView(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class CityeDetailView(generics.RetrieveAPIView):
    queryset=City.objects.all()
    serializer_class = CitySerializer
    lookup_field = 'slug'

class FoodListView(generics.ListAPIView):
    serializer_class = FoodSerializer

    def get_queryset(self):
        queryset = Food.objects.all()
        state = self.request.query_params.get('state')

        if state:
            queryset = queryset.filter(state__slug=state)

        return queryset

class EventListView(generics.ListAPIView):

    serializer_class=EventSerializer
    def get_queryset(self):
        query_set=Event.objects.all()
        state = self.request.query_params.get('state')

        if state:
            query_set = query_set.filter(state__slug=state)

        return query_set


@api_view(['GET'])
def search(request):
    query = request.query_params.get('q', '')
    if not query:
        return Response({'states': [], 'places': []})
    states = State.objects.filter(
        Q(name__icontains=query) |
        Q(famous_for__icontains=query) |
        Q(capital__icontains=query)
    )
    places = Place.objects.filter(
        Q(name__icontains=query) |
        Q(category__icontains=query) |
        Q(famous_for__icontains=query)
    )
    cities = City.objects.filter(
    Q(name__icontains=query) |
    Q(description__icontains=query)
)
    return Response({
        'states': StateSerializer(states, many=True).data,
        'places': PlaceSerializer(places, many=True).data,
        'cities': CitySerializer(cities, many=True).data,
    })

class StateFullDetailView(generics.RetrieveAPIView):
    queryset = State.objects.all()
    serializer_class = StateFullSerializer
    lookup_field = 'slug'