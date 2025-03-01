from django.db import models

# Create your models here.
class FertilizerSchedule(models.Model):
     crop_type = models.CharField(max_length=100)
     fertilizer_type = models.CharField(max_length=200, blank=True, null=True) #Store the type of fertilizer
     application_date = models.DateField()
     call_made = models.BooleanField(default=False) # To track if an SMS was sent

     def __str__(self):
         return f"{self.crop_type} - {self.application_date} - {self.fertilizer_type}"
