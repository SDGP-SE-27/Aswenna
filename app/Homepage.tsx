import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, Platform } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

// Scale function to create responsive sizes
const scale = (size: number) => (width / 375) * size;

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
  const [confirmation, setConfirmation] = useState(false);
  const [userName, setUserName] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]); // ✅ Stores fetched reminders
  const [showModal, setShowModal] = useState(false); //
  const [fetchedOnce, setFetchedOnce] = useState(false); //

  useEffect(() => {
    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("username");
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Error retrieving user name:", error);
      }
    };
    getUserName();
  }, []);

  const handleReminderClick = async () => {
    // await fetchFertilizerReminders(); //          Fetch reminders first
    navigation.navigate("FertilizerHistory"); // ✅ Navigate to FertilizerHistory page
  };

  interface Reminder {
    crop_type: string;
    fertilizer: string;
    application_date: string;
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    if (!fetchedOnce) {
      checkFertilizerReminders();
      setFetchedOnce(true); // ✅ Ensure fetch happens only once
    }
  }, []);
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

      const response = await fetch(
        `https://api.aswenna.site/api/homepage/farmland/${username}/`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Farmland Data:", data); // Debugging log

        setUserData({
          cropType: data.crop_type || "Not set",
          landArea: data.land_area ? `${data.land_area}` : "Not set",
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
    await fetchUserFarmland(); // ✅ Ensure latest data is fetched
    setModalVisible(true);
  };


  const handleProfileClick = async () => {
    navigation.navigate("UserProfile");
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

      const response = await fetch(
        "https://api.aswenna.site/api/homepage/reset-password/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ new_password: newPassword }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Password reset successfully!");
        setNewPassword(""); // Clear input
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const categories: {
    icon: any;
    label: string;
    screen: keyof RootStackParamList | null;
  }[] = [
    {
      icon: require("../assets/icons/disease_identification.png"),
      label: "Disease Identification",
      screen: "DiseaseIdentification2",
    },
    {
      icon: require("../assets/icons/priceprediction.png"),
      label: "Price Prediction",
      screen: "MarketPrice1",
    },
    {
      icon: require("../assets/icons/fertilizer_sellers.png"),
      label: "Fertilizer Sellers",
      screen: "buyersItem",
    },
    {
      icon: require("../assets/icons/supplement_reminder.png"),
      label: "Supplement Reminder",
      screen: "FertilizerSchedule",
    },
    {
      icon: require("../assets/icons/personal_finance_tracker.png"),
      label: "Personal Finance Tracker",
      screen: "PersonalTrackerMain",
    },
    {
      icon: require("../assets/icons/weather_alerts.png"),
      label: "Weather Alerts",
      screen: "WeatherForecast",
    },
  ];

  interface Reminder {
    crop: { name: string };
    fertilizer_type: string;
    application_date: string;
  }

  const checkFertilizerReminders = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch(
        "https://api.aswenna.site/reminder/get-schedule-history/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const fetchedReminders: Reminder[] = await response.json();
        console.log("Fetched Reminders:", fetchedReminders);
        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 2); // ✅ Target date = today + 2 days

        const upcomingReminders = fetchedReminders.filter((reminder) => {
          const reminderDate = new Date(reminder.application_date);

          return (
            reminderDate.getFullYear() === targetDate.getFullYear() &&
            reminderDate.getMonth() === targetDate.getMonth() &&
            reminderDate.getDate() === targetDate.getDate()
          );
        });

        if (upcomingReminders.length > 0) {
          setReminders(upcomingReminders); // ✅ Store reminders in state
          setShowModal(true); // ✅ Show Modal with reminders
        } else {
          console.log("No reminders for the selected date.");
        }
      } else {
        console.error(
          "Failed to fetch reminders. Response Text:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error checking reminders:", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fertilizer Reminder</Text>
            {reminders.map((reminder, index) => (
              <View key={index} style={styles.reminderItem}>
                <Text style={styles.reminderText}>
                  Crop: {reminder.crop?.name || "Unknown Crop"}
                </Text>
                <Text style={styles.reminderText}>
                  Fertilizer: {reminder.fertilizer_type}
                </Text>
                <Text style={styles.reminderText}>
                  Application Date:{" "}
                  {new Date(reminder.application_date).toDateString()}
                </Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuClick}>
          <Image
            source={require("../assets/icons/menu.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>Hi {userName}! 👋</Text>
          <Text style={styles.subText}>Enjoy our services!</Text>
        </View>

        <TouchableOpacity onPress={handleReminderClick}>
          <Image
            source={require("../assets/icons/reminder.png")}
            style={styles.remindericon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleProfileClick}>
          <Image
            source={require("../assets/icons/farmer_2.png")}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.banner}
          onPress={() => navigation.navigate("InstructorsScreen")}
        >
          <Image
            source={require("../assets/images/banner.jpg")}
            style={styles.bannerImage}
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Need Farming Guidance?</Text>
            <Text style={styles.bannerSubtitle}>
              Contact Agricultural Experts now!
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryBox}
              onPress={() => {
                if (item.screen) {
                  const screenName = item.screen as keyof RootStackParamList;
                  navigation.navigate(screenName);
                } else {
                  Alert.alert("Feature under development.");
                }
              }}
            >
              <Image source={item.icon} style={styles.categoryIcon} />
              <Text
                style={[
                  styles.categoryLabel,
                  { fontFamily: "Poppins-SemiBold" },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Farmland Details</Text>
            <Text style={styles.modalText}>Crop Type: {userData.cropType}</Text>
            <Text style={styles.modalText}>
              Land Area: {userData.landArea} sq.ft
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profile Details Modal */}
      <Modal
        visible={profileModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Farmer Profile</Text>
            {loading ? (
              <ActivityIndicator size="large" color="green" />
            ) : (
              <>
                <Text style={styles.modalText}>
                  Username: {userDetails.username}
                </Text>
                <Text style={styles.modalText}>Email: {userDetails.email}</Text>
                <Text style={styles.modalText}>
                  Phone: {userDetails.phone_number}
                </Text>

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
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={handlePasswordReset}
                    >
                      <Text style={styles.buttonText}>Confirm Reset</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => setShowPasswordInput(true)}
                  >
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.logOutButton}
                  onPress={() => setConfirmation(true)}
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}> Logout </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setProfileModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

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

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
          <Image
            source={require("../assets/images/home_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DiseaseIdentification2")}
        >
          <Image
            source={require("../assets/images/disease_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("PersonalTrackerMain")}
        >
          <Image
            source={require("../assets/images/finance_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
          <Image
            source={require("../assets/images/profile_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 0,
    overflow: 'hidden', // Prevent any potential overflow
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    height: height * 0.1,
    paddingHorizontal: scale(5),
  },
  icon: {
    width: scale(35),
    height: scale(35),
    tintColor: "#000",
  },
  remindericon: {
    width: scale(35),
    height: scale(35),
    tintColor: "#000",
    left: 10,
    top: 5,
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
  },
  greetingText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1A1A1A',
  },
  subText: {
      fontSize: 14,
      color: '#808080', 
      marginTop: 4,
  },
  profileIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
  },
  banner: {
    backgroundColor: "#4CAF50",
    borderRadius: scale(10),
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: height * 0.15,
    overflow: "hidden",
    padding: scale(15),
    marginTop: scale(10),
    marginBottom: scale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  bannerImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(10),
    marginRight: scale(10),
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: scale(14),
    fontWeight: "bold",
    color: "#FFF",
  },
  bannerSubtitle: {
    fontSize: scale(12),
    color: "#FFF",
    marginTop: scale(4),
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.5,
    paddingBottom: scale(20),
    width: "100%",
  },
  categoryContainer: {
    width: width < 375 ? "48%" : "45%", // Adjust for smaller screens
    alignItems: "center",
    height: height * 0.2,
    marginVertical: scale(5),
  },
  categoryBox: {
    width: "90%",
    height: scale(110),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
    paddingVertical: scale(10),
    borderRadius: scale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: scale(5),
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  categoryIcon: {
    width: scale(45),
    height: scale(45),
    marginBottom: scale(5),
    tintColor: "green",
  },
  categoryLabel: {
    marginTop: scale(4),
    fontSize: scale(13),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    flexWrap: 'wrap',
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "#fff",
    padding: scale(20),
    borderRadius: scale(10),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: "bold",
    marginBottom: scale(10),
  },
  modalText: {
    fontSize: scale(16),
    marginBottom: scale(5),
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
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: width * 0.7,
    marginBottom: 15,
    fontSize: scale(14),
  },
  confirmButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: scale(12),
    backgroundColor: "#DFFFD8",
    position: "absolute",
    
    width: "90%",
    bottom: scale(15),
    alignSelf: "center",
    borderRadius: scale(30),
    elevation: Platform.OS === 'android' ? 5 : 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  footerIcon: {
    width: scale(30),
    height: scale(30),
  },

  logOutButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  reminderItem: {
     marginBottom: 10,
     padding: 10,
     borderWidth: 1,
     borderColor: "#CCC",
     borderRadius: 5,
     width: "100%",
   },
   reminderText: { 
     fontSize: 16 
   },
   closeButtonText: { 
     color: "#FFF", 
     fontWeight: "bold" 
   },

});

export default Homepage;
