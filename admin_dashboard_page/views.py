from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime

from .models import (
    LongBeans, BitterGourd, SnakeGourd, 
    LadyFingerOkra, Brinjals, Pineapple, Papaya
)

MODEL_MAPPING = {
    "long_beans": LongBeans,
    "bitter_gourd": BitterGourd,
    "snake_gourd": SnakeGourd,
    "lady_finger_okra": LadyFingerOkra,
    "brinjals": Brinjals,
    "pineapple": Pineapple,
    "papaya": Papaya
}

def validate_price_data(data):
    """Validate the price entry data."""
    required_fields = ['date', 'retail_price', 'ncpi_food', 'ncpi_non_food', 'ncpi_all_items', 'predicted_price']
    
    # Check if all required fields are present
    if not all(field in data for field in required_fields):
        return False, "Missing required fields"
    
    # Validate data types
    try:
        datetime.strptime(data['date'], '%Y-%m-%d')
        float(data['retail_price'])
        float(data['ncpi_food'])
        float(data['ncpi_non_food'])
        float(data['ncpi_all_items'])
        float(data['predicted_price'])
    except (ValueError, TypeError):
        return False, "Invalid data types"
    
    return True, None

@api_view(["GET"])
@permission_classes([AllowAny])
def get_prices(request, crop_name):
    """Get all price entries for a specific crop."""
    try:
        model = MODEL_MAPPING.get(crop_name.lower())
        if not model:
            return JsonResponse({"error": "Invalid crop name"}, status=400)

        prices = list(
            model.objects.values(
                "date", 
                "retail_price", 
                "ncpi_food", 
                "ncpi_non_food", 
                "ncpi_all_items", 
                "predicted_price"
            ).order_by('-date')
        )

        if not prices:
            return JsonResponse(
                {"message": f"No data available for {model.__name__}", "prices": []},
                status=200
            )

        return JsonResponse({"prices": prices})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(["POST"])
@permission_classes([AllowAny])
def add_price(request, crop_name):
    """Add a new price entry for a specific crop."""
    try:
        model = MODEL_MAPPING.get(crop_name.lower())
        if not model:
            return JsonResponse({"error": "Invalid crop name"}, status=400)

        data = json.loads(request.body)
        is_valid, error = validate_price_data(data)
        
        if not is_valid:
            return JsonResponse({"error": error}, status=400)

        # Check if entry already exists for this date
        if model.objects.filter(date=data['date']).exists():
            return JsonResponse({"error": "Entry already exists for this date"}, status=400)

        new_entry = model.objects.create(
            date=data['date'],
            retail_price=data['retail_price'],
            ncpi_food=data['ncpi_food'],
            ncpi_non_food=data['ncpi_non_food'],
            ncpi_all_items=data['ncpi_all_items'],
            predicted_price=data['predicted_price']
        )

        return JsonResponse({
            "message": "Price entry added successfully",
            "date": new_entry.date.strftime('%Y-%m-%d')
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(["PUT"])
@permission_classes([AllowAny])
def update_price(request, crop_name):
    """Update a price entry for a specific crop."""
    try:
        model = MODEL_MAPPING.get(crop_name.lower())
        if not model:
            return JsonResponse({"error": "Invalid crop name"}, status=400)

        data = json.loads(request.body)
        is_valid, error = validate_price_data(data)
        
        if not is_valid:
            return JsonResponse({"error": error}, status=400)

        entry = model.objects.filter(date=data['date']).first()
        if not entry:
            return JsonResponse({"error": "Entry not found"}, status=404)

        # Update the fields
        entry.retail_price = data['retail_price']
        entry.ncpi_food = data['ncpi_food']
        entry.ncpi_non_food = data['ncpi_non_food']
        entry.ncpi_all_items = data['ncpi_all_items']
        entry.predicted_price = data['predicted_price']
        entry.save()

        return JsonResponse({
            "message": "Price entry updated successfully",
            "date": entry.date.strftime('%Y-%m-%d')
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(["DELETE"])
@permission_classes([AllowAny])
def delete_price(request, crop_name, date):
    """Delete a price entry for a specific crop."""
    try:
        model = MODEL_MAPPING.get(crop_name.lower())
        if not model:
            return JsonResponse({"error": "Invalid crop name"}, status=400)

        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return JsonResponse({"error": "Invalid date format. Use YYYY-MM-DD"}, status=400)

        entry = model.objects.filter(date=date_obj).first()
        if not entry:
            return JsonResponse({"error": "Entry not found"}, status=404)

        deleted_date = entry.date.strftime('%Y-%m-%d')
        entry.delete()

        return JsonResponse({
            "message": "Price entry deleted successfully",
            "date": deleted_date
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
