// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Alert,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { useRoute, RouteProp } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "./types";
// import Buildyourfarmland from "./Buildyourfarmland";

// type commonregistration3ScreenProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "commonregistration3"
// >;

// const commonregistration3 = ({
//   navigation,
// }: {
//   navigation: commonregistration3ScreenProp;
// }) => {
//   const [imageSelected, setSelectedImage] = useState<string | null>(null);
//   const route = useRoute<RouteProp<RootStackParamList, "commonregistration2">>();
//   const { username, phoneNumber, address, district, Email, Password } = route.params;

//   // Function to pick an image from the gallery
//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission to access the gallery is required.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   // Function to skip image upload
//   const handleSkip = () => {
//     console.log("Skipped profile picture uploading.");
//     setSelectedImage(null);
//   };

//   // Confirm and submit all data to the backend
//   const handleConfirm = async () => {
//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("phone_number", phoneNumber);
//     formData.append("address", address);
//     formData.append("district", district);
//     formData.append("email", Email);
//     formData.append("password", Password);

//     // console.log("data from 1 and 2");

//     if (imageSelected) {
//       const localUri = imageSelected;
//       const filename = localUri.split('/').pop(); // Extract file name from the path
//       const match = /\.(\w+)$/.exec(filename ?? "");
//       const fileType = match ? `image/${match[1]}` : `image`;
    
//       formData.append("profile_picture", {
//         uri: localUri,
//         name: filename ?? "profile.jpg",
//         type: fileType,
//       } as any);
//     }
    

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
//         method: "POST",
//          // Do not manually set Content-Type
//       });

//       if (response.ok) {
//         Alert.alert("Success", "User registered successfully!", [
//           { text: "OK", onPress: () => navigation.navigate("Buildyourfarmland") },
//         ]);
//       } else {
//         const errorData = await response.json();
//         console.error("Error:", errorData);
//         Alert.alert("Error", "Failed to register. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Alert.alert("Error", "Something went wrong. Please try again later.");
//     }
//   };

//   const openCamera = async () => {
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission to access the camera is required.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Registration</Text>

//         <View style={styles.formContainer}>
//           <Text style={styles.label}>Upload Profile Picture</Text>

//           {/* Image Preview */}
//           <View style={styles.imageContainer}>
//             {imageSelected ? (
//               <Image source={{ uri: imageSelected }} style={styles.image} />
//             ) : (
//               <Text style={styles.placeholder}>No Image Selected</Text>
//             )}
//           </View>

//           {/* Action Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={pickImage}>
//               <Text style={styles.buttonText}>Upload</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleSkip}>
//               <Text style={styles.buttonText}>Skip</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleConfirm}>
//               <Text style={styles.buttonText}>Confirm</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.cameraIcon} onPress={openCamera}>
//               <MaterialIcons name="camera-alt" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };
//   const styles = StyleSheet.create({
//         container: {
//             flexGrow: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: 20,
//             backgroundColor: '#ffff',
//           },
    
//         formContainer: {
//             width: '100%',
//             maxWidth: 400,
//             backgroundColor: '#CFFFC2',
//             padding: 20,
//             borderRadius: 20,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,
//             elevation: 5,
//             fontFamily: 'poppins',
//             fontSize: 20,
//         },

//         imageContainer: {
//             width: 150,
//             height: 150,
//             borderRadius: 75,
//             borderWidth: 2,
//             borderColor: "#ccc",
//             justifyContent: "center",
//             alignItems: "center",
//             marginBottom: 20,
//             backgroundColor: "#fff",
//             marginLeft: 100 , 
//         },

//           image: {
//             width: 150,
//             height: 150,
//             borderRadius: 75,
//           },

//           placeholder: {
//             fontSize: 16,
//             color: "#aaa",
//           },

//           buttonContainer: {
//             flexDirection: "column",
//             justifyContent: "space-around",
//             width: "100%",
//             padding: 10 , 
//           }, 

//           title: {
//             fontSize: 32,
//             fontWeight: 'heavy',
//             marginBottom: 20,
//             textAlign: 'center',
//             fontFamily: 'poppins',
            
//           },

//           button: {
//             backgroundColor: '#51B936', 
//             borderRadius: 20,
//             alignItems: 'center',
//             marginTop: 5,
//             marginBottom: 5,
//             padding: 5,
//             fontFamily: 'poppins',
//             fontSize: 18,
//           },

//           buttonText: {
//             color: "#fff",
//             fontSize: 16,
//             backgroundColor: '#51B936'
//           },

//           label: {
//             fontSize: 20,
//             marginVertical: 10,
//             fontFamily: 'poppins',
//             textAlign: 'center',
//             color: 'F5F5F5'
            
//           },

//           cameraIcon: {
//             position: 'absolute',
//             marginBottom:220 , // Adjust the vertical position
//             marginLeft: 200, // Adjust the horizontal position
//             backgroundColor: '#51B936',
//             width: 40,
//             height: 40,
//             borderRadius: 20,
//             justifyContent: 'center',
//             alignItems: 'center',
//             elevation: 5,
//           }  
        
// });

// export default commonregistration3; 
       