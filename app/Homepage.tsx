import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal, 
  ActivityIndicator
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import {useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";



type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Homepage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({ cropType: "", landArea: "" });
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
    fetchUserFarmland(); // Fetch farmland details when component loads
  }, []);


  const fetchUserFarmland = async () => {
    try {
        const username = await AsyncStorage.getItem("username");

        if (!username) {
            Alert.alert("Error", "User is not logged in.");
            return;
        }

        console.log("Fetching farmland details for:", username); // Debugging log

        const response = await fetch(`http://127.0.0.1:8000/api/homepage/farmland/${username}/`);

        if (response.ok) {
            const data = await response.json();
            console.log("Fetched Farmland Data:", data); // Debugging log

            setUserData({
                cropType: data.crop_type || "Not set",
                landArea: data.land_area ? `${data.land_area} sq.ft` : "Not set",
            });
        } else {
            const errorData = await response.json();
            console.error("Error fetching farmland data:", errorData);
            Alert.alert("Error", errorData.error || "Failed to fetch data.");
        }
    } catch (error) {
        console.error("Error fetching farmland details:", error);
        Alert.alert("Error", "Something went wrong. Try again.");
    }
};

const handleMenuClick = async () => {
  await fetchUserFarmland();  // ✅ Ensure latest data is fetched
  setModalVisible(true);
};


const fetchUserDetails = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      Alert.alert("Error", "You need to log in first.");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/homepage/user-details/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUserDetails(data);
      setProfileModalVisible(true);
    } else {
      Alert.alert("Error", "Failed to fetch user details.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  } finally {
    setLoading(false);
  }
};

const handleProfileClick = async () => {
  await fetchUserDetails();
};


const handlePasswordReset = async () => {
  if (!newPassword || newPassword.length < 6) {
    Alert.alert("Error", "Password must be at least 6 characters long.");
    return;
  }

  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      Alert.alert("Error", "You need to log in first.");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/homepage/reset-password/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_password: newPassword }),
    });

    if (response.ok) {
      Alert.alert("Success", "Password reset successfully!");
      setNewPassword("");  // Clear input
      setShowPasswordInput(false); 
    } else {
      const errorData = await response.json();
      Alert.alert("Error", errorData.error || "Failed to reset password.");
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};


  const categories: { icon: any; label: string; screen: keyof RootStackParamList | null }[] = [
    { icon: require("../assets/icons/disease_identification.png"), label: "Disease Identification", screen: "DiseaseIdentification2" },
    { icon: require("../assets/icons/priceprediction.png"), label: "Price Prediction", screen: "MarketPrice1" },
    { icon: require("../assets/icons/fertilizer_sellers.png"), label: "Fertilizer Sellers", screen: "Fertilizerseller" },
    { icon: require("../assets/icons/supplement_reminder.png"), label: "Supplement Reminder", screen: "SupplementReminder1" },
    { icon: require("../assets/icons/personal_finance_tracker.png"), label: "Personal Finance Tracker", screen: "PersonalTrackerMain" },
    { icon: require("../assets/icons/weather_alerts.png"), label: "Weather Alerts", screen: "WeatherForecast" },
  ];

  return (    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuClick}>
          <Image source={require("../assets/icons/menu.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/icons/reminder.png")} style={styles.remindericon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfileClick}>
          <Image source={require("../assets/icons/farmer_2.png")} style={styles.profileIcon} />
        </TouchableOpacity>

      </View>

      <View style={styles.searchBar}>
        <Image source={require("../assets/icons/search.png")} style={styles.searchIcon} />
        <TextInput
          placeholder="Search any categories"
          placeholderTextColor="#000"
          style={[styles.searchInput, { fontFamily: "Poppins-Regular" }]}
        />
      </View>

      <View style={styles.categories}>
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryBox}
              onPress={() => {
                if (item.screen && typeof item.screen === 'string') {
                  const screenName = item.screen as keyof RootStackParamList;
                  navigation.navigate(screenName);
                } else {
                  Alert.alert("Feature under development.");
                }
              }}
            >
              <Image source={item.icon} style={styles.categoryIcon} />
            </TouchableOpacity>
            <Text style={[styles.categoryLabel, { fontFamily: "Poppins-SemiBold" }]}>{item.label}
            </Text>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Farmland Details</Text>
            <Text style={styles.modalText}>Crop Type: {userData.cropType}</Text>
            <Text style={styles.modalText}>Land Area: {userData.landArea} sq.ft</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profile Details Modal */}
      <Modal visible={profileModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Farmer Profile</Text>
            {loading ? (
              <ActivityIndicator size="large" color="green" />
            ) : (
              <>
                <Text style={styles.modalText}>Username: {userDetails.username}</Text>
                <Text style={styles.modalText}>Email: {userDetails.email}</Text>
                <Text style={styles.modalText}>Phone: {userDetails.phone_number}</Text>

                {/* Show password input only when button is clicked */}
                {showPasswordInput ? (
                  <>
                    <TextInput
                      placeholder="Enter New Password"
                      secureTextEntry
                      style={styles.input}
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={handlePasswordReset}>
                      <Text style={styles.buttonText}>Confirm Reset</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.resetButton} onPress={() => setShowPasswordInput(true)}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.closeButton} onPress={() => setProfileModalVisible(false)}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>   
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#ffff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  icon: { 
    width: 40,
    height: 40,
    tintColor: "#000", 
    
  },
  remindericon: { 
    width: 40,
    height: 40,
    tintColor: "#000", 
    left: 90, 
    top: 5 
  },
  profileIcon: { 
    width: 40,
    height: 40,
    borderRadius: 50 
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4ffb6",
    margin: 15,
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: "#333", 
    marginRight: 10 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: "#0000" 
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 15,
    margin: 40
  },
  categoryBox: {
    width: "60%",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#ffff",
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: "#51b936",
    borderWidth: 7,
    margin:40
  },
  categoryContainer: { 
    alignItems: "center", 
    marginVertical: 10, 
    width: "45%" ,
    
    
  },
  categoryIcon: { 
    width: 50, 
    height: 50, 
    marginBottom: 10, 
    tintColor: "green" 
  },
  categoryLabel: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
  },
  screen: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
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
  resetButton: { 
    backgroundColor: "#FFD700", 
    padding: 10, 
    borderRadius: 10, 
    marginTop: 10 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginBottom: 15,
    fontSize: 16,
  },
  confirmButton: {
     backgroundColor: "#ff6347", 
     padding: 10, 
     borderRadius: 10, 
     marginTop: 10 
  },
});

export default Homepage; 