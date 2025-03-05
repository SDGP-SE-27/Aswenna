from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Shop, Item
from .serializers import ShopSerializer, ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

@api_view(['POST'])
def update_item(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    serializer = ItemSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def add_item(request, item_id):
    item = get_object_or_404(Item, id=item_id)
    serializer = ItemSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_shops(request):
    shops = Shop.objects.prefetch_related('item_set').all()
    data = [{
        'shop_name': shop.name,
        'address': shop.address,
        'contact_number': shop.contact_number,
        'items': ItemSerializer(shop.item_set.all(), many=True).data
    } for shop in shops]
    return Response(data)
