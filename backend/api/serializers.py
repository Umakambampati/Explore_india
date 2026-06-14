from rest_framework import serializers
from .models import State,Place,City,Food,Event

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'
class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class StateFullSerializer(serializers.ModelSerializer):
    places = PlaceSerializer(many=True, read_only=True)
    foods = FoodSerializer(many=True, read_only=True)
    events = EventSerializer(many=True, read_only=True)
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = State
        fields = '__all__'