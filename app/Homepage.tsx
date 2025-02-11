// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   TextInput,
// } from "react-native";

// const categories = [
//   {
//     icon: require("../assets/icons/disease identification.png"),
//     label: "Disease Identification",
//     screen: "DiseaseIdentification",
//   },
//   {
//     icon: require("../assets/icons/priceprediction.png"),
//     label: "Price Prediction",
//     screen: "PricePrediction",
//   },
//   {
//     icon: require("../assets/icons/fertilizer sellers.png"),
//     label: "Fertilizer Sellers",
//     screen: "", // Add corresponding screen here
//   },
//   {
//     icon: require("../assets/icons/supplement reminder.png"),
//     label: "Supplement Reminder",
//     screen: "", // Add corresponding screen here
//   },
//   {
//     icon: require("../assets/icons/personal finance tracker.png"),
//     label: "Personal Finance Tracker",
//     screen: "PersonalTracker", // Add corresponding screen here
//   },
//   {
//     icon: require("../assets/icons/weather alerts.png"),
//     label: "Weather Alerts",
//     screen: "", // Add corresponding screen here
//   },
// ];

// const Homepage = ({ navigation }: any) => {
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/icons/menu.png")}
//             style={styles.icon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/icons/reminder.png")}
//             style={styles.remindericon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/icons/farmer 2.png")}
//             style={styles.profileIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchBar}>
//         <Image
//           source={require("../assets/icons/search.png")}
//           style={styles.searchIcon}
//         />
//         <TextInput
//           placeholder="Search any categories"
//           placeholderTextColor="#000"
//           style={[styles.searchInput, { fontFamily: "Poppins-Regular" }]}
//         />
//       </View>

//       {/* Categories Section */}
//       <View style={styles.categories}>
//         {categories.map((item, index) => (
//           <View key={index} style={styles.categoryContainer}>
//             {/* Box with Icon */}
//             <TouchableOpacity
//               style={styles.categoryBox}
//               onPress={() => {
//                 if (item.screen) navigation.navigate(item.screen);
//               }}
//             >
//               <Image source={item.icon} style={styles.categoryIcon} />
//             </TouchableOpacity>

//             {/* Label Below the Box */}
//             <Text
//               style={[styles.categoryLabel, { fontFamily: "Poppins-SemiBold" }]}
//             >
//               {item.label}
//             </Text>
//           </View>
//         ))}
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/icons/home.png")}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/icons/disease_navbar.png")}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/icons/price_navbar.png")}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image
//             source={require("../assets/icons/profile.png")}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // Styles (unchanged)
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#ffff" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 15,
//   },
//   icon: { width: 25, height: 25, tintColor: "#000" },
//   remindericon: { width: 25, height: 25, tintColor: "#000", left: 90, top: 5 },
//   profileIcon: { width: 35, height: 35, borderRadius: 50 },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#d4ffb6",
//     margin: 15,
//     borderRadius: 30,
//     paddingHorizontal: 15,
//   },
//   searchIcon: { width: 20, height: 20, tintColor: "#333", marginRight: 10 },
//   searchInput: { flex: 1, fontSize: 16, color: "#0000" },
//   categories: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginHorizontal: 15,
//   },
//   categoryBox: {
//     width: "60%",
//     alignItems: "center",
//     marginVertical: 10,
//     backgroundColor: "#ffff",
//     paddingVertical: 15,
//     borderRadius: 20,
//     borderColor: "#51b936",
//     borderWidth: 7,
//   },
//   categoryContainer: { alignItems: "center", marginVertical: 10, width: "45%" },
//   categoryIcon: { width: 50, height: 50, marginBottom: 10, tintColor: "green" },
//   categoryLabel: {
//     marginTop: 5,
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#000",
//     textAlign: "center",
//   },
//   bottomNav: {


//       flexDirection: "row",
//       justifyContent: "space-around",
//       backgroundColor: "#d4ffb6",
//       paddingVertical: 15,
//       position: "absolute", // Fix it to the bottom
//       bottom: 0,           // Align to the bottom of the screen
//       width: "100%",       // Make it span the full width
  
//   },
//   navIcon: { width: 25, height: 25, tintColor: "green" },
// });

// export default Homepage;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import {useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Homepage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({ cropType: "", landArea: "" });

  useEffect(() => {
    fetchUserFarmland(); // Fetch farmland details when component loads
  }, []);

  // const fetchUserFarmland = async () => {
  //   try {
  //     const username = await AsyncStorage.getItem("username");
  
  //     if (!username) {
  //       Alert.alert("Error", "User is not logged in.");
  //       return;
  //     }
  
  //     const cropType = await AsyncStorage.getItem("cropType");
  //     const landArea = await AsyncStorage.getItem("landArea");
  
  //     setUserData({
  //       cropType: cropType || "Not set",
  //       landArea: landArea || "Not set",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching farmland details:", error);
  //     Alert.alert("Error", "Something went wrong. Try again.");
  //   }
  // };

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

  
  
  // Call fetchUserData when clicking the menu button
//   const handleMenuClick = async () => {
//     await fetchUserFarmland(); 
//     setModalVisible(true);
// };

const handleMenuClick = async () => {
  await fetchUserFarmland();  // ✅ Ensure latest data is fetched
  setModalVisible(true);
};

  const categories: { icon: any; label: string; screen: keyof RootStackParamList | null }[] = [
    { icon: require("../assets/icons/disease_identification.png"), label: "Disease Identification", screen: "DiseaseIdentification2" },
    { icon: require("../assets/icons/priceprediction.png"), label: "Price Prediction", screen: "MarketPrice1" },
    { icon: require("../assets/icons/fertilizer_sellers.png"), label: "Fertilizer Sellers", screen: "Fertilizerseller" },
    { icon: require("../assets/icons/supplement_reminder.png"), label: "Supplement Reminder", screen: "SupplementReminder1" },
    { icon: require("../assets/icons/personal_finance_tracker.png"), label: "Personal Finance Tracker", screen: "PersonalTrackerMain" },
    { icon: require("../assets/icons/weather_alerts.png"), label: "Weather Alerts", screen: "Weather" },
  ]

  return (    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuClick}>
          <Image source={require("../assets/icons/menu.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/icons/reminder.png")} style={styles.remindericon} />
        </TouchableOpacity>
        <TouchableOpacity>
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
                if (item.screen) {
                  navigation.navigate(item.screen);
                } else {
                  Alert.alert("Feature under development.");
                }
              }}
            >
              <Image source={item.icon} style={styles.categoryIcon} />
            </TouchableOpacity>
            <Text style={[styles.categoryLabel, { fontFamily: "Poppins-SemiBold" }]}>
              {item.label}
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
    width: 25, 
    height: 25, 
    tintColor: "#000" 
  },
  remindericon: { 
    width: 25, 
    height: 25, 
    tintColor: "#000", 
    left: 90, 
    top: 5 
  },
  profileIcon: { 
    width: 35, 
    height: 35, 
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
  },
  categoryContainer: { 
    alignItems: "center", 
    marginVertical: 10, 
    width: "45%" 
  },
  categoryIcon: { 
    width: 50, 
    height: 50, 
    marginBottom: 10, 
    tintColor: "green" 
  },
  categoryLabel: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "600",
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
});

export default Homepage; 