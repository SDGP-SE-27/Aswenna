from rest_framework import serializers
from .models import Shop, Item, AddItem

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class AddItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = AddItem
        fields = '__all__'

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

