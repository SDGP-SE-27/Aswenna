import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AsyncStorage from "@react-native-async-storage/async-storage";


type ShopItemScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "shopItem"
>;

const ShopItemsScreen = () => {
  const navigation = useNavigation<ShopItemScreenProp>();
  const [confirmation, setConfirmation] = useState (false);
  const items = [
    { id: 1, name: 'URIA'},
    { id: 2, name: 'POSPATA'},
    { id: 2, name: 'NITROGEN'},
    { id: 2, name: 'AMMONIA'},
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('login', { username: '' })} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity> */}

      <Modal visible={confirmation} transparent={true} animationType="fade">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Confirm Action</Text>
                  <Text style={styles.modalText}>
                    Are you sure you want to log out?
                  </Text>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={async () => {
                      await handleLogout(); // Log out the user
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }],
                      }); // Navigate to the login screen
                    }}
                  >
                    <Text style={styles.buttonText}>Confirm Logout</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setConfirmation(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

        <TouchableOpacity
                        // style={styles.logOutButton}
                        style={styles.backButton}
                        onPress={() => setConfirmation(true)}
                      >
                        <Text style={{ color: "#fff", fontSize: 16 }}> {"<"} </Text>
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
            <Image source={require("../assets/images/home_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
                  
        <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification2")} >
          <Image source={require("../assets/images/disease_icon.png") } style={styles.footerIcon} />
        </TouchableOpacity>
                  
        <TouchableOpacity onPress={() => navigation.navigate("PersonalTrackerMain")} >
          <Image source={require("../assets/images/finance_icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
                  
        <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: "#51b936",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ShopItemsScreen; 