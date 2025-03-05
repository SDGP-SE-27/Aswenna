from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import timedelta, date
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import FertilizerSchedule, Crop
from .serializers import FertilizerScheduleSerializer
from django.contrib.auth.models import User

# ✅ Get all crop schedules dynamically
def get_crop_schedule():
    return {
        "Bitter Gourd": [
            {"time": "Basal", "urea": 75, "tsp": 200, "mop": 60},
            {"time": "After 4 Weeks", "urea": 75, "tsp": None, "mop": 60},
            {"time": "After 8 Weeks", "urea": 75, "tsp": None, "mop": 60},
        ],
        "Papaya": [
            {"time": "Two days before planting", "urea": 60, "tsp": 40, "mop": 130},
            {"time": "Every 3 days after 3 months", "urea": 9, "tsp": 0.5, "mop": None},
            {"time": "Every 3 days afterwards", "urea": 2.5, "tsp": 0.5, "mop": 5.0},
        ],
        "Pineapple": [
            {"time": "Basal", "urea": None, "tsp": None, "mop": None},
            {"time": "1 MAP", "urea": 10, "tsp": 7, "mop": 15},
            {"time": "After 3-4 M", "urea": 10, "tsp": 7, "mop": 5},
        ],
        "Brinjal": [
            {"time": "Basal", "urea": 75, "tsp": 395, "mop": 85},
            {"time": "After 4 Weeks", "urea": 75, "tsp": None, "mop": None},
            {"time": "After 8 Weeks", "urea": 75, "tsp": None, "mop": None},
        ],
        "Ladies Fingers": [
            {"time": "Basal (2-3 days before planting)", "urea": 50, "tsp": 195, "mop": 25},
            {"time": "2 weeks later", "urea": 50, "tsp": None, "mop": 25},
            {"time": "5 weeks later", "urea": 100, "tsp": None, "mop": 50},
            {"time": "8 weeks later", "urea": 100, "tsp": None, "mop": 50},
        ],
        "Long Beans": [
            {"time": "Basal (3 days before)", "urea": 35, "tsp": 130, "mop": 35},
            {"time": "After a month", "urea": 55, "tsp": None, "mop": 35},
        ],
        "Snake Gourd": [
            {"time": "Basal (2-3 before opening)", "urea": 75, "tsp": 200, "mop": 60},
            {"time": "4 weeks after", "urea": 75, "tsp": None, "mop": 60},
            {"time": "8 weeks after", "urea": 75, "tsp": None, "mop": 60},
        ],
    }

@csrf_exempt
@api_view(['POST'])
def login_user(request):
    """Custom login to authenticate users and return reminders on login."""
    data = json.loads(request.body.decode('utf-8'))
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        
        # ✅ Fetch reminders (2 days before application date)
        today = date.today()
        reminders = FertilizerSchedule.objects.filter(
            farmer=user, 
            application_date=today + timedelta(days=2)
        )
        serializer = FertilizerScheduleSerializer(reminders, many=True)

        return JsonResponse({
            'token': token.key,
            'user_id': user.id,  # ✅ Send user ID in response
            'message': 'Login successful',
            'reminders': serializer.data
        })
    
    return JsonResponse({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def receive_schedule(request):
    """Receives fertilizer schedule from frontend and saves it."""
    try:
        data = json.loads(request.body.decode('utf-8'))
        user_id = request.user.id  # ✅ Get user ID
        crop_name = data.get('cropType')
        fertilizer_type = data.get('fertilizerType')
        application_date = data.get('applicationDate')

        if not application_date:
            return JsonResponse({'status': 'error', 'message': 'Application date is required'}, status=400)

        crop, created = Crop.objects.get_or_create(name=crop_name)

        # ✅ Store schedule with user ID
        FertilizerSchedule.objects.create(
            farmer=request.user,  
            crop=crop,
            fertilizer_type=fertilizer_type,
            application_date=application_date
        )

        return JsonResponse({'status': 'success', 'message': 'Schedule saved successfully'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_schedule_history(request):
    """Fetch past fertilizer schedules of the logged-in farmer."""
    schedules = FertilizerSchedule.objects.filter(farmer=request.user)
    serializer = FertilizerScheduleSerializer(schedules, many=True)
    return Response(serializer.data)