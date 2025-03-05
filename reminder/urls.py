from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_user, name="login_user"),  # ✅ New login API
    path("receive-schedule/", views.receive_schedule, name="receive_schedule"),
    path("get-schedule-history/", views.get_schedule_history, name="get_schedule_history"),
]