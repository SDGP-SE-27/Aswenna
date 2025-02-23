import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Switch } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define Navigation Params
type RootStackParamList = {
  ItemDetails: { item: { id: number; price: number; stock: number; availability: boolean } };
};

// Define Props Type
type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;

// Phone Number Validation Function
const isValidPhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{10}$/; // Ensures exactly 10 digits
  return phoneRegex.test(phone);
};

// Fix the component with proper type annotation
const ItemDetails = ({ route }: { route: ItemDetailsScreenRouteProp }) => {
  const item = route?.params?.item || { id: 0, price: 0, stock: 0, availability: false };

  const [price, setPrice] = useState(item.price.toString());
  const [stock, setStock] = useState(item.stock.toString());
  const [availability, setAvailability] = useState(item.availability);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopAddress, setShopAddress] = useState('');

  const handleAvailabilityChange = (value: boolean) => {
    setAvailability(value);
  };

  const updateItemDetails = async () => {
    if (!price || !stock || !phoneNumber || !shopAddress) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    const updatedPrice = parseFloat(price);
    const updatedStock = parseInt(stock, 10);

    if (isNaN(updatedPrice) || isNaN(updatedStock)) {
      Alert.alert('Error', 'Invalid price or stock value');
      return;
    }

    try {
      const API_BASE_URL = 'http://10.0.2.2:8000'; // Use 10.0.2.2 for Android Emulator

      const response = await fetch(`${API_BASE_URL}/shop/items/${item.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: updatedPrice,
          stock: updatedStock,
          availability,
          seller_phone: phoneNumber,
          shop_address: shopAddress,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Item details updated successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to update item details');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      Alert.alert('Error', 'Something went wrong, please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Stock:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />

      <Text style={styles.label}>Availability:</Text>
      <View style={styles.switchContainer}>
        <Text>{availability ? 'In Stock' : 'Out of Stock'}</Text>
        <Switch value={availability} onValueChange={handleAvailabilityChange} />
      </View>

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        maxLength={10}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={styles.label}>Shop Address:</Text>
      <TextInput
        style={styles.input}
        value={shopAddress}
        onChangeText={setShopAddress}
      />

      <Button title="Update Item" onPress={updateItemDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 50, backgroundColor: "white" , margin:10 , marginTop: 75, borderRadius: 20},
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 5, borderRadius: 5 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
});

export default ItemDetails;
