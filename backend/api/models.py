from django.db import models
from django.contrib.auth.models import User


# 1. STATE
class State(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    capital = models.CharField(max_length=100)
    region = models.CharField(max_length=50)
    description = models.TextField()
    banner_image = models.URLField(blank=True)
    best_season = models.CharField(max_length=100)
    famous_for = models.CharField(max_length=200)
    language = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# 2. CITY (belongs to State)
class City(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')
    description = models.TextField(blank=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


# 3. PLACE (belongs to City and State)
class Place(models.Model):
    CATEGORY_CHOICES = [
        ('heritage', 'Heritage'),
        ('beach', 'Beach'),
        ('wildlife', 'Wildlife'),
        ('spiritual', 'Spiritual'),
        ('hills', 'Hills'),
        ('nature', 'Nature'),
        ('adventure', 'Adventure'),
    ]
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='places')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='places')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.URLField(blank=True)
    best_time = models.CharField(max_length=100)
    famous_for = models.CharField(max_length=200)

    def __str__(self):
        return self.name


# 4. FOOD (belongs to State)
class Food(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='foods')
    category = models.CharField(max_length=50)
    description = models.TextField()
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


# 5. HOTEL (belongs to City)
class Hotel(models.Model):
    PRICE_CHOICES = [
        ('budget', 'Budget'),
        ('mid', 'Mid Range'),
        ('luxury', 'Luxury'),
    ]
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='hotels')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='hotels')
    price_range = models.CharField(max_length=20, choices=PRICE_CHOICES)
    rating = models.FloatField()
    description = models.TextField()
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


# 6. EVENT (belongs to State)
class Event(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    image = models.URLField(blank=True)
    date_start = models.DateField(null=True, blank=True)
    date_end = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# 7. REVIEW (belongs to Place and User)
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField()
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.place.name}"


# 8. ITINERARY (belongs to State)
class Itinerary(models.Model):
    title = models.CharField(max_length=200)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='itineraries')
    duration_days = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.title


# 9. ITINERARY DAY (belongs to Itinerary)
class ItineraryDay(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='days')
    day_number = models.IntegerField()
    title = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.itinerary.title} - Day {self.day_number}"


# 10. ITINERARY STOP (belongs to ItineraryDay and Place)
class ItineraryStop(models.Model):
    day = models.ForeignKey(ItineraryDay, on_delete=models.CASCADE, related_name='stops')
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    order = models.IntegerField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.day} - {self.place.name}"
