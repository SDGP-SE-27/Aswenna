import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ShopItemsScreen = ({ navigation }: { navigation: any }) => {
  // List of items
  const items = ['Long Bean', 'Bitter Gourd', 'Snake Gourd', 'Brinjals'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Choose Your Farm Types</Text>
      </View>

      {/* Map through the items and create TouchableOpacity for each */}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => navigation?.navigate('ItemDetails', { item: item })}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  headerContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ShopItemsScreen;
