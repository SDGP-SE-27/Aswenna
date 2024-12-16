import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function DiseaseIdentificationScreen({ navigation }: any) {
  const [image, setImage] = useState<string | null>(null);

  // Function to open the camera
  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required to take a photo.");
      return;
    }

    // Open the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to open the gallery
  const pickImageFromGallery = async () => {
    // Request gallery permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery access is required to upload an image.");
      return;
    }

    // Open the gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            {/* Disease Identification Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.backButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Disease Identification</Text>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.buttonContainer}>
                    {/* Take a Photo Button */}
                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Image source={require("../assets/images/camera-icon.png")} style={styles.icon} />
                        <Text style={styles.buttonText}>Take a Photo</Text>
                    </TouchableOpacity>

                    {/* Upload from Gallery Button */}
                    <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
                        <Image source={require("../assets/images/gallery-icon.png")} style={styles.icon} />
                        <Text style={styles.buttonText}>Upload from Gallery</Text>
                    </TouchableOpacity>
                </View>
            

            {/* Display Selected Image */}
            {image && (
                <View style={styles.imageContainer}>
                <Text style={styles.previewText}>Selected Image:</Text>
                <Image source={{ uri: image }} style={styles.previewImage} />
                </View>
            )}
            </ScrollView>
            
                {/* Bottom Navigation */} 
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image
                    source={require("../assets/images/home-icon.png")}
                    style={styles.footerIcon}
                />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification")}>
                <Image
                    source={require("../assets/images/disease-icon.png")}
                    style={styles.footerIcon}
                />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("MarketPrediction")}>
                <Image
                    source={require("../assets/images/finance-icon.png")}
                    style={styles.footerIcon}
                />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                    source={require("../assets/images/profile-icon.png")}
                    style={styles.footerIcon}
                />
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
}

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
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    marginRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 9,
    paddingRight: 9,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerText: {
    flex: 1, 
    textAlign: "center", 
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: "space-between", 
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  icon: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  previewText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#DFFFD8",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});
