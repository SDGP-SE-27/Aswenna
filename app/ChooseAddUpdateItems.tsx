import React, { useEffect } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShopItemsScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
      navigation.setOptions({ headerShown: false }); 
    }, [navigation]);
    
  // List of items
  const items = [
    { label: 'ADD ITEMS', screen: 'AddItemScreen' },
    { label: 'UPDATE ITEMS', screen: 'UpdateItemScreen' }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>ADD or UPDATE Shop Items</Text>
      </View>

      {/* Map through the items and create TouchableOpacity for each */}
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.item} 
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.itemBox}>
            <Text style={[styles.itemText, styles.alignLeft]}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity>
          <Image source={require("../assets/images/home_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Image source={require("../assets/images/disease_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Image source={require("../assets/images/finance_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Image source={require("../assets/images/profile_icon.png")} style={styles.footerIcon} />
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