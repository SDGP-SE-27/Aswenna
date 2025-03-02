from rest_framework import serializers
from .models import FertilizerSchedule

class FertilizerScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FertilizerSchedule
        fields = ['id', 'crop_type', 'fertilizer_type', 'application_date', 'call_made', 'phone_number']