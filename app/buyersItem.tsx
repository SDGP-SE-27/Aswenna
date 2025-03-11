import React, { useEffect } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type BuyersItemScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "buyersItem"
>;

const ShopItemsScreen = () => {
  const navigation = useNavigation<BuyersItemScreenProp>();
  useEffect(() => {
            navigation.setOptions({ headerShown: false }); 
          }, [navigation]);
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

    <ScrollView>  
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Choose Your Crop Types</Text>
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
    </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
          <Image source={require("../assets/images/home_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification2")} >
          <Image source={require("../assets/images/disease_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.navigate("PersonalTrackerMain")} >
          <Image source={require("../assets/images/finance_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
          <Image source={require("../assets/images/profile_icon.png")} style={styles.footerIcon} />
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
    paddingLeft: 50, 
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
