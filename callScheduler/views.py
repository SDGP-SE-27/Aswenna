from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime, timedelta, date
from django.conf import settings
from dateutil.relativedelta import relativedelta # Import for calculating dates
from twilio.rest import Client  # Import Twilio client
from .models import FertilizerSchedule

# Define the crops and fertilizer schedules in a dictionary
CROP_SCHEDULES = {
    "Bitter Gourd": {
        "fertilizer_applications": [
            {"time": "Basal", "urea": 75, "tsp": 200, "mop": 60},
            {"time": "After 4 Weeks", "urea": 75, "tsp": None, "mop": 60},
            {"time": "After 8 Weeks", "urea": 75, "tsp": None, "mop": 60},
        ]
    },
    "Papaya": {
        "fertilizer_applications": [
            {"time": "Two days before planting", "urea": 60, "tsp": 40, "mop": 130},
            {"time": "every 3 days after 3 months", "urea": 9, "tsp": 0.5, "mop": None},
            {"time": "Every 3 days afterwards", "urea": 2.5, "tsp": 0.5, "mop": 5.0},
        ]
    },
    "Pineapple": {  # "Dry & Intermediate Zone Specification"
        "fertilizer_applications": [
            {"time": "Basal", "urea": None, "tsp": None, "mop": None},
            {"time": "1 MAP", "urea": 10, "tsp": 7, "mop": 15},
            {"time": "After 3-4 M", "urea": 10, "tsp": 7, "mop": 5},
        ]
    },
    "Brinjal": {
        "fertilizer_applications": [
            {"time": "Basal", "urea": 75, "tsp": 395, "mop": 85},
            {"time": "After 4 Weeks", "urea": 75, "tsp": None, "mop": None},
            {"time": "After 8 Weeks", "urea": 75, "tsp": None, "mop": None},
        ]
    },
    "Ladies Fingers": {
        "fertilizer_applications": [
            {"time": "Basal (2-3 days before planting)", "urea": 50, "tsp": 195, "mop": 25},
            {"time": "2 weeks later", "urea": 50, "tsp": None, "mop": 25},
            {"time": "5 weeks later", "urea": 100, "tsp": None, "mop": 50},
            {"time": "8 weeks later", "urea": 100, "tsp": None, "mop": 50},
        ]
    },
    "Long Beans": {
        "fertilizer_applications": [
            {"time": "Basal (3 days before)", "urea": 35, "tsp": 130, "mop": 35},
            {"time": "After a month", "urea": 55, "tsp": None, "mop": 35},
        ]
    },
    "Snake Gourd": {
        "fertilizer_applications": [
            {"time": "Basal (2-3 before opening)", "urea": 75, "tsp": 200, "mop": 60},
            {"time": "4 weeks after", "urea": 75, "tsp": None, "mop": 60},
            {"time": "8 weeks after", "urea": 75, "tsp": None, "mop": 60},
        ]
    },
}

# Twilio Account Information (Replace with your actual credentials)
TWILIO_ACCOUNT_SID = "ACe9083eb05f973a4b39765c402fc08248"  # Replace with your Account SID
TWILIO_AUTH_TOKEN = "9df028d2478f5c679ec6997a0b1b1516"  # Replace with your Auth Token
TWILIO_PHONE_NUMBER = "+15419408863"  # Replace with your Twilio phone number

reminders = []

def get_user_phone_number(user_id):
    """Mock function to return a test phone number."""
    return "+94767627455"

def send_sms(to_phone_number, message):
    """Sends an SMS message using Twilio."""
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            to=to_phone_number,
            from_=TWILIO_PHONE_NUMBER,
            body=message
        )
        print(f"SMS sent to {to_phone_number}. SID: {message.sid}")
        return True
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return False

def emulate_call(phone_number, crop_type, fertilizer_type, application_date):
    """Simulates a call to remind about fertilizer application."""
    print(f"Emulated Call to {phone_number}: Fertilizer reminder for {fertilizer_type} for {crop_type} on {application_date}.")

def calculate_reminder_dates(application_time):
    """Determines the reminder date based on application schedule."""
    today = date.today()

    if "before planting" in application_time.lower():
        days_before = int(application_time.split("days before")[0].strip() or 2)
        application_date = today
        reminder_date = application_date - timedelta(days=days_before)
    elif "week" in application_time.lower():
        weeks_after = int(application_time.split("week")[0].replace("After", "").strip())
        application_date = today + relativedelta(weeks=weeks_after)
        reminder_date = application_date - timedelta(days=2)
    elif "month" in application_time.lower():
        months_after = int(application_time.split("month")[0].replace("After", "").strip())
        application_date = today + relativedelta(months=months_after)
        reminder_date = application_date - timedelta(days=2)
    else:
        application_date = today
        reminder_date = today - timedelta(days=1)

    return application_date, reminder_date

@csrf_exempt
def receive_schedule(request):
    """Receives and processes the fertilizer schedule from the frontend and saves it to the database."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            crop_type = data.get('cropType')

            if crop_type in CROP_SCHEDULES:
                applications = CROP_SCHEDULES[crop_type]['fertilizer_applications']

                for application in applications:
                    try:
                        application_date, reminder_date = calculate_reminder_dates(application['time'])

                        fertilizer_types = []
                        if application.get('urea') is not None:
                            fertilizer_types.append(f"Urea ({application['urea']} kg/ha)")
                        if application.get('tsp') is not None:
                            fertilizer_types.append(f"TSP ({application['tsp']} kg/ha)")
                        if application.get('mop') is not None:
                            fertilizer_types.append(f"MOP ({application['mop']} kg/ha)")

                        fertilizer_type_str = ", ".join(fertilizer_types)

                        # Save to database
                        FertilizerSchedule.objects.create(
                            crop_type=crop_type,
                            fertilizer_type=fertilizer_type_str,
                            application_date=application_date,
                            call_made=False  # Default value
                        )

                        if reminder_date >= date.today():
                            reminders.append({
                                'reminder_date': reminder_date,
                                'fertilizer_type': fertilizer_type_str,
                                'application_date': application_date,
                                'crop_type': crop_type,
                            })
                        else:
                            print(f"Skipping reminder for {application['time']} because it has passed.")

                    except Exception as e:
                        print(f"Error processing application: {application}. Error: {e}")
                        continue

                return JsonResponse({'status': 'success', 'message': 'Schedule received and reminders set.'}, status=201)
            else:
                return JsonResponse({'status': 'error', 'message': 'Crop not found'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

def check_reminders():
    """Checks for due reminders and triggers emulated calls."""
    today = date.today()
    for reminder in reminders:
        if reminder['reminder_date'] == today:
            phone_number = get_user_phone_number(1)
            emulate_call(phone_number, reminder['crop_type'], reminder['fertilizer_type'], reminder['application_date'])
            reminders.remove(reminder)

@csrf_exempt
def get_schedule_history(request):
    """Fetches the fertilizer schedule history from the database."""
    history = list(FertilizerSchedule.objects.all().values())
    return JsonResponse({"history": history})