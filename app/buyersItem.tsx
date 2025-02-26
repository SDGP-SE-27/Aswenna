import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type BuyersItemScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "buyersItem"
>;

const ShopItemsScreen = () => {
  const navigation = useNavigation<BuyersItemScreenProp>();
  const items = [
    { id: 1, name: 'Long Bean' },
    { id: 2, name: 'Bitter Gourd' },
    { id: 3, name: 'Snake Gourd' },
    { id: 4, name: 'Brinjals' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Buyer Items</Text>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Choose Your Farm Types</Text>
      </View>

      {/* Map through the items and create TouchableOpacity for each */}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => navigation?.navigate('ItemDetails', { 
            item: { 
            id: item.id,  
            price: 0, // add a default price
            stock: 0, // add a default stock
            availability: false // add a default availability
          }
        })}
        >
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  headerContainer: {
    backgroundColor: '#CFFFC2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ShopItemsScreen;
