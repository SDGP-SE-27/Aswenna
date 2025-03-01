import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from './types';

// Define Props Type
type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ItemDetails">;

// Phone Number Validation Function
const isValidPhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{10}$/; // Ensures exactly 10 digits
  return phoneRegex.test(phone);
};

// Fix the component with proper type annotation
const ItemDetails = ({ route }: { route: ItemDetailsScreenRouteProp }) => {
  const navigation = useNavigation<NavigationProp>();
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
      const API_BASE_URL = 'http://localhost:8000';

      const response = await fetch(`${API_BASE_URL}/shop/update_item/${item.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: updatedPrice,
          stock: updatedStock,
          availability,
          contact_number: phoneNumber, // Changed to match backend field
          address: shopAddress, // Changed to match backend field
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Item details updated successfully');
      } else {
        try {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Failed to update item details');
        } catch (jsonError) {
          // If the response is not JSON, show a generic error message
          Alert.alert('Error', 'Failed to update item details.  Please check your backend.');
          console.error("Response was not JSON:", await response.text()); // Log the raw response
        }
      }
    } catch (error) {
      console.error('Error updating item:', error);
      Alert.alert('Error', 'Something went wrong, please try again later');
    }
  };

  return (
    <View style={styles.newContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('shopItem')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Item Details</Text>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  newContainer: {
    flex: 1,
    backgroundColor: '#DFFFD8',
  },
  container: { padding: 50, backgroundColor: "white" , margin:30 , marginTop: 75, borderRadius: 20},
  header: {
    fontSize: 24,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    alignItems: "center",
    paddingLeft: 80,
  },
  backButton: {
    marginRight: 10,
    marginBottom: 25,
    borderColor: "#DDD",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 25,
    paddingLeft: 13,
    paddingRight: 15,
    paddingBottom: 5,
    textAlign: "center"
  },
    backText: {
    fontSize: 25,
    fontWeight: "bold"
  },
  label: { fontSize: 16, fontWeight: 'bold', marginVertical: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 5, borderRadius: 5 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
});

export default ItemDetails;