from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, ShopViewSet, update_item, get_shops, add_item

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'shops', ShopViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('update_item/<int:item_id>/', update_item, name='update_item'),
    path('add_item/<int:item_id>/', add_item, name='add_item'),
    path('get_shops/', get_shops, name='get_shops'),
]
