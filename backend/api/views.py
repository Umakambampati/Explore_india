from django.shortcuts import render

# Create your views here.
import os
from rest_framework import generics
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import State,Place,City,Food,Event,Review
from .serializers import StateSerializer,PlaceSerializer,CitySerializer,FoodSerializer,EventSerializer,StateFullSerializer,ReviewSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


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

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')

    if not username or not password:
        return Response(
            {'error': 'Username and password required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    return Response(
        {'message': 'Account created successfully'},
        status=status.HTTP_201_CREATED
    )


@api_view(['GET'])
def get_reviews(request, slug):
    place = Place.objects.get(slug=slug)
    reviews = Review.objects.filter(place=place)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_review(request, slug):
    if not request.user.is_authenticated:
        return Response(
            {'error': 'Please login to write a review'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    place = Place.objects.get(slug=slug)

    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, place=place)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def ai_chat(request):
    user_message = request.data.get('message', '')

    if not user_message:
        return Response({'error': 'Message is required'}, status=400)

    try:
        from groq import Groq

        # Fetch real data from your database
        states = State.objects.all().values('name', 'famous_for', 'best_season')
        places = Place.objects.all().values('name', 'category', 'famous_for')[:50]

        # Convert to simple text
        states_text = "\n".join([
            f"- {s['name']}: famous for {s['famous_for']}, best season {s['best_season']}"
            for s in states
        ])

        places_text = "\n".join([
            f"- {p['name']} ({p['category']}): {p['famous_for']}"
            for p in places
        ])

        client = Groq(api_key=os.getenv('GROQ_API_KEY'))

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are a helpful travel assistant for Explore India website.
You ONLY answer questions related to travel, tourism, places, food, festivals, hotels and trip planning in India.

If someone asks anything unrelated to Indian tourism — like coding, politics, personal advice, math etc — politely say:
"I'm only able to help with travel and tourism questions about India. Please ask me about places, food, festivals or trip planning!"

Here are the states available on our website:
{states_text}

Here are the places available on our website:
{places_text}

Always recommend places from the above list when possible.
Keep answers short, friendly and helpful."""
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        return Response({'reply': completion.choices[0].message.content})

    except Exception as e:
        return Response({'error': str(e)}, status=500)