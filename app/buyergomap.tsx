import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ShopScreen = ({ navigation }) => {
  const products = [
    { name: 'URIA', availability: 'Available', price: '10.00', address: 'Shop A', contact: '078 16 390 72', stock: '50' },
    { name: 'POSPATA', availability: 'Out of Stock', price: '15.00', address: 'Shop B', contact: '078 16 390 73', stock: '0' },
    { name: 'POTASH', availability: 'Available', price: '20.00', address: 'Shop C', contact: '078 16 390 74', stock: '30' },
    { name: 'NITROGEN', availability: 'Available', price: '25.00', address: 'Shop D', contact: '078 16 390 75', stock: '20' },
    { name: 'AMMONIA', availability: 'Out of Stock', price: '18.00', address: 'Shop E', contact: '078 16 390 76', stock: '0' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>◀ Back</Text>
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
              <View key={index} style={styles.tableRow}>
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  backText: { fontSize: 18, color: 'black', marginBottom: 10 },
  checkButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

  table: { borderWidth: 1, borderColor: '#000', minWidth: 600, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', backgroundColor: '#ddd', paddingVertical: 10, borderBottomWidth: 2, borderColor: '#000' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000', alignItems: 'center' },

  tableHeader: { flex: 1, fontWeight: 'bold', padding: 10, textAlign: 'center', minWidth: 100 },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', minWidth: 100 },
  wideColumn: { minWidth: 120 },

  scrollableTable: { maxHeight: 300 }, // Allows vertical scrolling of rows while keeping headers fixed
  
  goButton: { backgroundColor: 'red', padding: 5, borderRadius: 5, alignItems: 'center', margin: 5, minWidth: 100 },
  goButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default ShopScreen;
