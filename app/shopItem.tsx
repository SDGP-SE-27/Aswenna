import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ShopItemScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "shopItem"
>;

const ShopItemsScreen = () => {
  const navigation = useNavigation<ShopItemScreenProp>();
  const items = [
    { id: 1, name: 'URIA'},
    { id: 2, name: 'POSPATA'},
    { id: 2, name: 'NITROGEN'},
    { id: 2, name: 'AMMONIA'},
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('login', { username: '' })} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
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

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
            <Image source={require("../assets/images/home-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
                  
        <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification2")} >
          <Image source={require("../assets/images/disease-icon.png") } style={styles.footerIcon} />
        </TouchableOpacity>
                  
        <TouchableOpacity onPress={() => navigation.navigate("PersonalTrackerMain")} >
          <Image source={require("../assets/images/finance-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
                  
        <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
          <Image source={require("../assets/images/profile-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
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
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 80,
  },

  backButton: { 
    marginRight: 10,
    borderColor: "#DDD", 
    borderWidth: 2, 
    borderRadius: 15, 
    paddingLeft: 13, 
    paddingRight: 15,
    paddingBottom: 5, 
    textAlign: "center", 
    width: "14%",
  },
    backButtonText: { 
    fontSize: 25, 
    fontWeight: "bold" 
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
    fontWeight: 'semibold',
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