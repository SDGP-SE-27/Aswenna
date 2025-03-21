from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
import pandas as pd
import joblib
from pathlib import Path

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

@api_view(["POST"])
@permission_classes([AllowAny])
def predict_price(request, crop_name):
    if request.method != 'POST':
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)
    
    try:
        # Handle both wrapped and unwrapped data formats
        if 'data' in request.data:
            data = request.data['data']
        else:
            data = request.data
        
        # Convert single values to lists
        required_fields = ['ncpi_food', 'ncpi_non_food', 'ncpi_all_items']
        date_field = 'date' if 'date' in data else 'dates'  # Handle both date and dates field names
        
        # Validate and convert fields
        processed_data = {}
        for field in required_fields:
            if field not in data:
                return JsonResponse({"error": f"Missing required field: {field}"}, status=400)
            value = data[field]
            processed_data[field] = [value] if not isinstance(value, list) else value
        
        # Handle dates
        if date_field not in data:
            return JsonResponse({"error": "Missing required field: date/dates"}, status=400)
        date_value = data[date_field]
        processed_data['date'] = [date_value] if not isinstance(date_value, list) else date_value
        
        # Ensure all lists have the same length
        list_lengths = [len(value) for value in processed_data.values()]
        if len(set(list_lengths)) != 1:
            return JsonResponse({"error": "All input values must have the same length"}, status=400)
        
        # Convert dates to ordinal
        ordinal_dates = convert_dates_to_ordinal(processed_data['date'])
        
        # Create DataFrame
        df = convert_to_dataframe(
            ncpi_food=processed_data['ncpi_food'],
            ncpi_non_food=processed_data['ncpi_non_food'],
            ncpi_all_items=processed_data['ncpi_all_items'],
            date=ordinal_dates
        )
        
        # Get predictions based on crop name
        if crop_name.lower() == 'long_beans':
            predictions = predict_long_beans(df)

        elif crop_name.lower() == 'bitter_gourd':
            predictions = predict_bitter_gourd(df)

        elif crop_name.lower() == 'papaya':
            predictions = predict_papaya(df)

        elif crop_name.lower() == 'okra':
            predictions = predict_okra(df)

        elif crop_name.lower() == 'brinjals':
            predictions = predict_brinjals(df)

        elif crop_name.lower() == 'pineapple':
            predictions = predict_pineapple(df)

        elif crop_name.lower() == 'snake_gourd':
            predictions = predict_snake_gourd(df)
            
        else:
            return JsonResponse({"error": f"Predictions not available for {crop_name}"}, status=400)
        
        # Return predictions with corresponding dates
        response_data = {
            "data": {
                "predictions": predictions,
                "dates": processed_data['date']
            }
        }
        
        return JsonResponse(response_data)
        
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def convert_dates_to_ordinal(dates):
    dates_series = pd.to_datetime(dates)
    ordinal_dates = dates_series.map(lambda x: x.toordinal()).tolist()
    return ordinal_dates

def convert_to_dataframe(ncpi_food, ncpi_non_food, ncpi_all_items, date):
    df = pd.DataFrame({
        'ncpi_food': ncpi_food,
        'ncpi_non_food': ncpi_non_food,
        'ncpi_all_items': ncpi_all_items,
        'date': date
    })
    return df

# --------------------------------
# ✅ Long Beans Prediction Endpoint
# --------------------------------
def predict_long_beans(df):
    model_path = Path(__file__).parent / 'ml_models' / 'etr_long_beans_model.pkl'
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        raise Exception("Model file not found")
    
    # Make predictions
    features = df[['ncpi_food', 'ncpi_non_food', 'ncpi_all_items', 'date']]
    predictions = model.predict(features)
    
    return predictions.tolist()

# --------------------------------
# ✅ Brinjals Prediction Endpoint
# --------------------------------
def predict_brinjals(df):
    model_path = Path(__file__).parent / 'ml_models' / 'etr_brinjals_model.pkl'
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        raise Exception("Model file not found")
    
    # Make predictions
    feature_order = ['date', 'ncpi_food', 'ncpi_non_food', 'ncpi_all_items']
    features = df[feature_order]
    predictions = model.predict(features)
    
    return predictions.tolist()

# --------------------------------
# ✅ Okra Prediction Endpoint
# --------------------------------
def predict_okra(df):
    model_path = Path(__file__).parent / 'ml_models' / 'etr_okra_model.pkl'
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        raise Exception("Model file not found")
    
    # Make predictions
    # Ensure features are in the correct order as used during training
    feature_order = ['date', 'ncpi_food', 'ncpi_non_food', 'ncpi_all_items']
    features = df[feature_order]
    predictions = model.predict(features)
    
    return predictions.tolist()

# --------------------------------
# ✅ Pineapple Prediction Endpoint
# --------------------------------
def predict_pineapple(df):
    model_path = Path(__file__).parent / 'ml_models' / 'etr_pineapple_model.pkl'
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        raise Exception("Model file not found")
    
    # Make predictions
    feature_order = ['date', 'ncpi_food', 'ncpi_non_food', 'ncpi_all_items']
    features = df[feature_order]
    predictions = model.predict(features)
    
    return predictions.tolist()

# --------------------------------
# ✅ Snake Gourd Prediction Endpoint
# --------------------------------
def predict_snake_gourd(df):
    model_path = Path(__file__).parent / 'ml_models' / 'etr_snake_gourd_model.pkl'
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        raise Exception("Model file not found")
    
    # Make predictions
    feature_order = ['date', 'ncpi_food', 'ncpi_non_food', 'ncpi_all_items']
    features = df[feature_order]
    predictions = model.predict(features)
    
    return predictions.tolist()

# --------------------------------
# ✅ Bitter Gourd Prediction Endpoint
# --------------------------------
def predict_bitter_gourd(df):
    model_path = Path(__file__).parent / 'ml_models' / 'etr_bitter_gourd_model.pkl'
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        raise Exception("Model file not found")
    
    # Make predictions
    feature_order = ['date', 'ncpi_food', 'ncpi_non_food', 'ncpi_all_items']
    features = df[feature_order]
    predictions = model.predict(features)
    
    return predictions.tolist()

# --------------------------------
# ✅ Papaya Prediction Endpoint
# --------------------------------
def predict_papaya(df):
    model_path = Path(__file__).parent / 'ml_models' / 'etr_papaya_model.pkl'
    try:
        model = joblib.load(model_path)
    except FileNotFoundError:
        raise Exception("Model file not found")
    
    # Make predictions
    feature_order = ['date', 'ncpi_food', 'ncpi_non_food', 'ncpi_all_items']
    features = df[feature_order]
    predictions = model.predict(features)
    
    return predictions.tolist()