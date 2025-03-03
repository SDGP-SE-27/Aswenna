from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Crop(models.Model):
    """Store crop names in the database instead of hardcoding them."""
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class FertilizerSchedule(models.Model):
    """Store fertilizer schedules for farmers based on user ID."""
    farmer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Link schedule to a farmer
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE)  # Link schedule to a crop
    fertilizer_type = models.CharField(max_length=200, blank=True, null=True)
    application_date = models.DateField()

    def __str__(self):
        return f"{self.farmer.username} - {self.crop.name} - {self.application_date}"