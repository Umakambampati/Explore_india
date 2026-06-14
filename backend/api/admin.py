from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import State, City, Place, Food, Hotel, Event, Review, Itinerary, ItineraryDay, ItineraryStop

admin.site.register(State)
admin.site.register(City)
admin.site.register(Place)
admin.site.register(Food)
admin.site.register(Hotel)
admin.site.register(Event)
admin.site.register(Review)
admin.site.register(Itinerary)
admin.site.register(ItineraryDay)
admin.site.register(ItineraryStop)