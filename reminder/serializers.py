from rest_framework import serializers
from .models import FertilizerSchedule, Crop

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ['id', 'name']

class FertilizerScheduleSerializer(serializers.ModelSerializer):
    crop = CropSerializer()  # ✅ Now returns crop details instead of just ID

    class Meta:
        model = FertilizerSchedule
        fields = ['id', 'farmer', 'crop', 'fertilizer_type', 'application_date']