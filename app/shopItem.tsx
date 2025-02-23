import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ShopItemsScreen = ({ navigation }: { navigation: any }) => {
  // List of items
  const items = ['Long Bean', 'Bitter Gourd', 'Snake Gourd', 'Brinjals'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.headerText}>Shop Items</Text>
      </View>

      {/* Map through the items and create TouchableOpacity for each */}
      <View style={styles.itemContainer}>
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
  // headerContainer: {
  //   backgroundColor: 'green',
  //   padding: 10,
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   marginBottom: 20,
  // },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 80,
  },
  item: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    
  },
  itemText: {
    fontSize: 16,
  },
  itemContainer: {
    width: '100%',
    backgroundColor: '#CFFFC2',
    padding: 50,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 20,
  }
});

export default ShopItemsScreen; 