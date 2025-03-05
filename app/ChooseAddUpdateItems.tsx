import React, { useEffect } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";

type ChooseAddUpdateItemScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChooseAddUpdateItems"
>;

const ShopItemsScreen = () => {
  const navigation = useNavigation<ChooseAddUpdateItemScreenProp>();
  useEffect(() => {
      navigation.setOptions({ headerShown: false }); 
    }, [navigation]);
    
  // List of items
  const item1 = [
    { label: 'ADD ITEMS', screen: 'AddItemScreen' }
  ];
  const item2 = [
    { label: 'UPDATE ITEMS', screen: 'UpdateItemScreen' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('shopItem')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Items</Text>
      </View>
      <View style={styles.bodyContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>ADD or UPDATE Shop Items</Text>
      </View>

      {/* Map through the items and create TouchableOpacity for each */}
      {item1.map((item1, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.item} 
          onPress={() => navigation.navigate('addItems',{ item: { id: 1, price: 0, stock: 0, availability: false } })}
        >
          <View style={styles.itemBox}>
            <Text style={[styles.itemText, styles.alignLeft]}>{item1.label}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {item2.map((item2, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.item} 
          onPress={() => navigation?.navigate({ name: 'ItemDetails', params: { item: { id: 1, price: 0, stock: 0, availability: false } } })}
        >
          <View style={styles.itemBox}>
            <Text style={[styles.itemText, styles.alignLeft]}>{item2.label}</Text>
          </View>
        </TouchableOpacity>
      ))}

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    fontSize: 25,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    flex: 1, 
    paddingLeft: 70, 
  },
  backButton: { 
    marginRight: 10,
    backgroundColor: "#fff", 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: "#DDD", 
    shadowColor: "#000", 
    shadowOffset: { width: 2, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 6, 
    elevation: 6,
    paddingLeft: 13, 
    paddingRight: 15,
    paddingBottom: 5, 
    textAlign: "center",
  },
    backText: { 
    fontSize: 25, 
    fontWeight: "bold"
  },
  bodyContainer: {
    padding: 20,
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
    color: 'white',
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemBox: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#DFFFD8",
    position: "absolute",
    width: "90%",
    bottom: 15,
    alignSelf: "center",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default ShopItemsScreen;