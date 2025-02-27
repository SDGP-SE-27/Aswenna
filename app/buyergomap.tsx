import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type BuyerGoMapScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "buyergomap"
>;

const itemDetails = {
  item: {
    id: 1, // replace with the actual id
    price: 10.00, // replace with the actual price
    stock: 50, // replace with the actual stock
    availability: true, // replace with the actual availability
  },
};

const ShopScreen = () => {
  const navigation = useNavigation<BuyerGoMapScreenProp>();
  const products = [
    { name: 'URIA', availability: 'Available', price: '10.00', address: 'Shop A', contact: '078 16 390 72', stock: '50' },
    { name: 'POSPATA', availability: 'Out of Stock', price: '15.00', address: 'Shop B', contact: '078 16 390 73', stock: '0' },
    { name: 'POTASH', availability: 'Available', price: '20.00', address: 'Shop C', contact: '078 16 390 74', stock: '30' },
    { name: 'NITROGEN', availability: 'Available', price: '25.00', address: 'Shop D', contact: '078 16 390 75', stock: '20' },
    { name: 'AMMONIA', availability: 'Out of Stock', price: '18.00', address: 'Shop E', contact: '078 16 390 76', stock: '0' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ItemDetails', itemDetails)}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkButton}>
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
                <TouchableOpacity style={styles.goButton}>
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
    backgroundColor: '#fff'
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
