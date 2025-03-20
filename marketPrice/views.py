from django.http import JsonResponse
from django.shortcuts import render
# from django.contrib.auth.decorators import login_required

from .models import LongBeans, BitterGourd, SnakeGourd, LadyFingerOkra, Brinjals, Pineapple, Papaya  # Import all relevant models

# @login_required  # Ensures only logged-in users can access this view
def get_data(model):
    try:
        prices = list(
            model.objects.values("date", "retail_price", "predicted_price")
        )

        if not prices:
            return JsonResponse(
                {"message": f"No data available for {model.__name__}", "prices": []},
                status=200
            )

        return JsonResponse({"prices": prices}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

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

        model = model_mapping.get(crop)
        if model:
            return get_data(model)
        else:
            return JsonResponse({"error": "Invalid crop name"}, status=400)
