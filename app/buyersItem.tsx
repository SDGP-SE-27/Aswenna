import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
    { id: 1, name: 'Long Bean', image: require('../assets/images/long_bean.jpg') },
    { id: 2, name: 'Bitter Gourd', image: require('../assets/images/bitter_gourd.jpg') },
    { id: 3, name: 'Snake Gourd', image: require('../assets/images/snake_gourd.jpg') },
    { id: 4, name: 'Brinjals', image: require('../assets/images/brinjals.jpg') },
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
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
           
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation?.navigate('buyergomap')}
            >
              {/* Image Component */}
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          
      ))}
    </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
          <Image source={require("../assets/images/home-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification2")} >
          <Image source={require("../assets/images/disease-icon.png")} style={styles.footerIcon} />
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
    marginHorizontal: 50,
    marginVertical: 35,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 15,
    alignItems: "center",
    marginHorizontal: 10,
  },
  item: {
    width: "48%",
    height: 110,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  itemText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemImage: { 
    width: 55, 
    height: 55, 
    marginBottom: 10, 
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
