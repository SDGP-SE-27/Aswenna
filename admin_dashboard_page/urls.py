from django.urls import path
from . import views

urlpatterns = [
    path('<str:crop_name>', views.get_prices, name='get_prices'),
    path('<str:crop_name>/add', views.add_price, name='add_price'),
    path('<str:crop_name>/update', views.update_price, name='update_price'),
    path('<str:crop_name>/delete/<str:date>', views.delete_price, name='delete_price'),
]
