import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type DiseaseIdentificationScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiseaseIdentification'
>;

const DiseaseIdentification = () => {
  const navigation = useNavigation<DiseaseIdentificationScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "DiseaseIdentification">>();
  const { crop } = route.params; // Get selected crop from previous screen
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      navigation.setOptions({ headerShown: false }); 
    }, [navigation]);
    
  // Function to open the camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // Function to open the gallery
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // Function to send the image to the backend
  const sendImageToServer = async () => {
    if (!image) {
      Alert.alert("Error", "Please select an image.");
      return;
    }
    setLoading(true);
  
    const formData = new FormData();
  
    // Convert image URI to Blob
    const response = await fetch(image);
    const blob = await response.blob();
  
    formData.append("file", blob, "photo.jpg");
  
    // Map crop names to their respective API endpoints
    const cropEndpoints: { [key: string]: string } = {
      "Banana": "https://api.aswenna.site/api/disease_detection/predict/banana/",
      "Mango": "https://api.aswenna.site/api/disease_detection/predict/mango/",
      "Papaya": "https://api.aswenna.site/api/disease_detection/predict/papaya/",
      "Snake Gourd":"https://api.aswenna.site/api/disease_detection/predict/snake_gourd/",
      "Eggplant": "https://api.aswenna.site/api/disease_detection/predict/eggplant/",
      "Okra": "https://api.aswenna.site/api/disease_detection/predict/okra/",
    };
  
    // Get the corresponding endpoint based on the selected crop
    const apiUrl = cropEndpoints[crop];
  
    if (!apiUrl) {
      Alert.alert("Error", "Invalid crop selected.");
      setLoading(false);
      return;
    }
  
    try {
      const result = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
  
      const data = await result.json();
      setLoading(false);
  
      if (data.disease === "Unknown") {
        navigation.navigate("ChatScreen", { message: data.message });
      } else {
        navigation.navigate("IdentifiedDisease", {
          disease: data.disease,
          confidence: data.confidence,
        });
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to identify disease. Please try again.");
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Disease Identification Header */}
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('DiseaseIdentification2')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Disease Identification</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subHeader}>{crop}</Text>

        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <View style={styles.rowContainer}>
           <Image source={require("../assets/images/camera_icon.png")} style={styles.icon} />
           <Text style={styles.buttonText}>   Take a Photo</Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
            <View style={styles.rowContainer}>
            <Image source={require("../assets/images/gallery_icon.png")} style={styles.icon} />
            <Text style={styles.buttonText}>   Upload from Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>

        {image && (
          <View style={styles.imageContainer}>
            <Text style={styles.previewText}>Selected Image:</Text>
            <Image source={{ uri: image }} style={styles.previewImage} />
          </View>
        )}

        {image && (
          <TouchableOpacity style={styles.proceedButton} onPress={sendImageToServer} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Processing..." : "Proceed"}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
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
    paddingLeft: 40, 
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
 
  headerText: { fontSize: 22, fontWeight: "bold" },
  subHeader: { textAlign: "center", fontSize: 20, fontWeight: "semibold", marginBottom: 20, backgroundColor: "#F0FFF0", },
  buttonContainer: { flexDirection: "column", marginBottom: 10, justifyContent: "flex-start" },
  button: { backgroundColor: "#4CAF50", padding: 16, borderRadius: 8, alignItems: "center", flex: 1, marginHorizontal: 10, marginVertical: 10 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  icon: {
    width: 50,
    height: 50,
  },
  imageContainer: { alignItems: "center", marginTop: 20 },
  previewText: { fontSize: 16, fontWeight: "bold" },
  previewImage: { width: 200, height: 200, borderRadius: 8 },
  proceedButton: { backgroundColor: "#2196F3", padding: 16, borderRadius: 8, marginTop: 20, alignItems: "center" },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DiseaseIdentification;
