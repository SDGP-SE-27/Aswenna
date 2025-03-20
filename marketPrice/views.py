from django.http import JsonResponse
from django.shortcuts import render
import logging

from .models import LongBeans, BitterGourd, SnakeGourd, LadyFingerOkra, Brinjals, Pineapple, Papaya  # Import all relevant models

# Configure logging
logger = logging.getLogger(__name__)

def get_data(model):
    try:
        prices = model.objects.values("date", "retail_price", "predicted_price").order_by("date")  # Sort by latest date
        
        if not prices:
            return JsonResponse(
                {"message": f"No data available for {model.__name__}", "prices": []},
                status=200
            )

        return JsonResponse({"prices": list(prices)}, status=200)

    except Exception as e:
        logger.error(f"Error fetching data for {model.__name__}: {str(e)}")
        return JsonResponse({"error": "Internal server error"}, status=500)

def crop(request, crop):
    if request.method == 'GET':
        model_mapping = {
            "long_beans": LongBeans,
            "bitter_gourd": BitterGourd,
            "snake_gourd": SnakeGourd,
            "lady_finger_okra": LadyFingerOkra,
            "brinjals": Brinjals,
            "pineapple": Pineapple,
            "papaya": Papaya
        }

        model = model_mapping.get(crop.lower())  # Ensure case insensitivity
        if model:
            return get_data(model)
        else:
            return JsonResponse({"error": "Invalid crop name"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)  # Handle non-GET requests
