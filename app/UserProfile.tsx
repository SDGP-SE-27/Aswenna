import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import { verticalScale, moderateScale } from "react-native-size-matters";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;

const UserProfile = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone_number: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserData] = useState({ cropType: "", landArea: "" });
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
        navigation.setOptions({ headerShown: false }); 
      }, [navigation]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserData(); // fetching user data
    fetchUserFarmland(); // fetching user farmland data
  }, []);

  // Load User data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        return;
      }

      const response = await fetch(
        "https://api.aswenna.site/api/homepage/user-details/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        Alert.alert("Error", "Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load Users Farmland data from AsyncStorage
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

  const handleEditToggle = async () => {
    if (isEditing) {
      // Save updated profile
      try {
        await axios.put("https://your-api-url.com/api/user-profile", userData);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  // Reset password functionality
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

  // log out functionality
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("username");
      Alert.alert("Logged Out", "You have been logged out successfully.");
      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Something went wrong during logout.");
    }
  };

  // loading data
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#1b9a2c" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
          <Text style={styles.headerTitle}>User Profile</Text>
      </View>

      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <Image
            source={require("../assets/icons/farmer_2.png")}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userDetails.username}
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, username: text })
            }
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userDetails.email}
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, email: text })
            }
            editable={isEditing}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact No</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userDetails.phone_number}
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, phone_number: text })
            }
            editable={isEditing}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Crop Type</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userData.cropType}
            onChangeText={(text) => setUserData({ ...userData, cropType: text })}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Land Area</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userData.landArea}
            onChangeText={(text) => setUserData({ ...userData, landArea: text })}
            editable={isEditing}
          />
        </View>

      <View>
      <TouchableOpacity onPress={handlePasswordReset}>
        {/* <Text style={styles.buttonText}>Reset Password</Text> */}
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
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={handleEditToggle}
      >
        <Text style={styles.buttonText}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "red" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
  mainContainer: {
    padding: 20,
    flex: 1,
    alignItems: "center",  

  },
  profileIcon: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    marginBottom: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#666",
  },
  button: {
    backgroundColor: "#1b9a2c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#1b9a2c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  logOutButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: "#35993a",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default UserProfile;

