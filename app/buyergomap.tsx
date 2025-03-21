import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AsyncStorage from "@react-native-async-storage/async-storage";

type BuyerGoMapScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "buyergomap"
>;

interface Shop {
  shop_name: string;
  address: string;
  contact_number: string;
  items: Item[];
}

interface Item {
  id: number;
  name: string;
  price: number;
  stock: number;
  availability: boolean;
  shop: number;
}

interface ItemDetailsProps {
  item: {
    id: number;
    price: number;
    stock: number;
    availability: boolean;
  };
}


const ShopScreen = () => {
  const navigation = useNavigation<BuyerGoMapScreenProp>();
  const [shops, setShops] = useState<Shop[]>([]);
  
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  useEffect(() => {
        navigation.setOptions({ headerShown: false }); 
      }, [navigation]);
      
  const itemDetails: ItemDetailsProps = {
    item: {
      id: 1,
      price: 10.00,
      stock: 50,
      availability: true,
    },
  };


  useEffect(() => {
    fetchShops();
  }, []);

  
  const fetchShops = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("accessToken");
  
      if (!token) {
        Alert.alert("Authentication Error", "No access token found. Please log in again.");
        console.error("No token found in storage.");
        return;
      }
  
      // Make API request with proper headers
      const response = await fetch('https://api.aswenna.site/shop/shops/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.trim()}`,  // Ensure no extra spaces
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          Alert.alert("Session Expired", "Please log in again.");
          console.error("Unauthorized: Token may be invalid or expired.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse and store shop data
      const data: Shop[] = await response.json();
      setShops(data);
    } catch (error) {
      console.error("Could not fetch shops:", error);
      Alert.alert("Error", "Failed to load shop data.");
    }
  };
  

  const handleGoToShop = (shop: Shop) => {
    setSelectedShop(shop);
    // Implement navigation to map screen or shop details here
    console.log("Navigating to shop:", shop.shop_name);
    navigation.navigate('sellerMap');  // Example: Navigate to a map screen
  };


  const products = shops.flatMap(shop =>
    shop.items.map(item => ({
      id: item.id,
      name: item.name,
      availability: item.availability ? 'Available' : 'Out of Stock',
      price: item.price,
      address: shop.address,
      contact: shop.contact_number,
      stock: item.stock.toString(),
      shop: shop.shop_name,
    }))
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkButton} onPress={() => handleGoToShop({shop_name: "shopname", address:"address", contact_number:"123",items:[]})}>
        <Text style={styles.buttonText}>Check & Go to Shop</Text>
      </TouchableOpacity>

      {/* Table with fixed header */}
      <ScrollView horizontal>
        <View style={styles.table}>
          {/* Fixed Table Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.tableHeader, styles.wideColumn]}>Product</Text>
            <Text style={styles.tableHeader}>Availability</Text>
            <Text style={styles.tableHeader}>Price (Rs.)</Text>
            <Text style={styles.tableHeader}>Stock (kg)</Text>
            <Text style={[styles.tableHeader, styles.wideColumn]}>Shop Address</Text>
            <Text style={[styles.tableHeader, styles.wideColumn]}>Contact</Text>
            <Text style={styles.tableHeader}>Action</Text>
          </View>

          {/* Scrollable Table Body */}
          <ScrollView style={styles.scrollableTable}>
            {products.map((product, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={[styles.tableCell, styles.wideColumn]}>{product.name}</Text>
                <Text style={styles.tableCell}>{product.availability}</Text>
                <Text style={styles.tableCell}>Rs.{product.price}</Text>
                <Text style={styles.tableCell}>{product.stock} kg</Text>
                <Text style={[styles.tableCell, styles.wideColumn]}>{product.address}</Text>
                <Text style={[styles.tableCell, styles.wideColumn]}>{product.contact}</Text>
                <TouchableOpacity style={styles.goButton} onPress={() => handleGoToShop({ shop_name: product.shop, address: product.address, contact_number: product.contact, items: [] })}>
                  <Text style={styles.goButtonText}>Go To Shop</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,
    padding: 22,
    backgroundColor: '#F0FFF0'
  },
  backText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10
  },
  backButton: {
    marginRight: 10,
    borderColor: "#DDD",
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 13,
    paddingRight: 15,
    paddingBottom: 5,
    marginBottom: 20,
    textAlign: "center",
    width: "14%",
    backgroundColor: '#fff',
    shadowColor: "#000", 
    shadowOffset: { width: 2, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 6, 
    elevation: 6,
  },
    backButtonText: {
    fontSize: 25,
    fontWeight: "bold"
  },
  checkButton: { backgroundColor: '#32CD32', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#79b09d',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    paddingVertical: 10,
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    minWidth: 100,
    color: '#fff',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    minWidth: 100,
    fontSize: 14,
    color: '#333',
  },
  wideColumn: {
    minWidth: 120,
  },

  scrollableTable: { maxHeight: 300 }, // Allows vertical scrolling of rows while keeping headers fixed

  goButton: { backgroundColor: '#32CD32', padding: 5, borderRadius: 5, alignItems: 'center', margin: 5, minWidth: 100 },
  goButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default ShopScreen;

function setSelectedShop(shop: Shop) {
  throw new Error('Function not implemented.');
}
