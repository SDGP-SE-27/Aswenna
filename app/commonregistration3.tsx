import React, { ChangeEventHandler, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity , Image} from 'react-native';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import {MaterialIcons} from '@expo/vector-icons'; 

const RegisterScreen3: React.FC = () => {
    const [imageSelecetd , setSelectedImage] = useState<string | null>(null);

    const[fontsLoaded] = useFonts({'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),});
    const[fontsLoaded2] = useFonts({'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),});
    const[fontsLoaded3] = useFonts({'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),});

    const pickImage = async () =>{
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
        if(!permissionResult.granted){
            Alert.alert("Permission to access the gallery");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1], // Ensures a square crop
            quality: 1, // Maximum quality
        });
        
          
          

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri); // Access the URI from the assets array
        }    
    }; 
    

    const handleSkip = () => {
        console.log("skipped profile picture uploading");
        setSelectedImage(null);
    };

    const handleConfirm = async () => {
        if(!imageSelecetd){
            Alert.alert("Select an image"); 
            return; 
        }

        try {
            const formData = new FormData();
            
            formData.append("profilePicture", {
              uri: imageSelecetd, // The URI of the selected image
              name: "farmer.jpg", // File name
              type: "image/jpeg", // MIME type
            } as unknown as Blob); // Type assertion to handle compatibility with React Native
          
            // Example: Sending this data to an API
            const response = await fetch('https://your-api-endpoint.com/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
            });
          
            if (!response.ok) {
              throw new Error('Upload failed');
            }
          
            Alert.alert('Success', 'Profile picture uploaded successfully!');
          } catch (error) {
            Alert.alert('Error', 'Failed to upload profile picture. Please try again.');
          }
    }    

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (!permissionResult.granted) {
              Alert.alert('Permission to access the camera is required');
              return;     
          
    }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1], // Ensures a square crop
        quality: 1, // Maximum quality
      });

    }

    return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
            <Text style={[styles.title, {fontFamily: 'Poppins-Bold'}]}>Registration</Text>  

        
          <Text style={[styles.label , {fontFamily: 'Poppins-Bold'}]}>Upload Profile Picture</Text>
    
          {/* Image Preview */}
          <View style={styles.imageContainer}>
            {imageSelecetd ? (
              <Image source={{ uri: imageSelecetd }} style={styles.image} />
            ) : (
              <Text style={styles.placeholder}>No Image Selected</Text>
            )}
          </View>
    
          {/* Action Buttons */}
      
        <View style={styles.buttonContainer}>
            {/* Upload Button */}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={[styles.buttonText , {fontFamily: 'Poppins-SemiBold'}]}>Upload</Text>
            </TouchableOpacity>
    
            {/* Skip Button */}
            <TouchableOpacity style={styles.button} onPress={handleSkip}>
              <Text style={[styles.buttonText,{fontFamily: 'Poppins-SemiBold'}]}>Skip</Text>
            </TouchableOpacity>
    
            {/* Confirm Button */}
            <TouchableOpacity
              style={[styles.button ]}// Disable button if no image
              onPress={handleConfirm}
              disabled={!imageSelecetd}
            >
              <Text style={[styles.buttonText,{fontFamily: 'Poppins-SemiBold'}]}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cameraIcon} onPress={openCamera}>
                <MaterialIcons name="camera-alt" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
        </View>
       
    </ScrollView>    
    );
   
    };

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#ffff',
          },
    
        formContainer: {
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#CFFFC2',
            padding: 20,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            fontFamily: 'poppins',
            fontSize: 20,
        },

        imageContainer: {
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 2,
            borderColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: "#fff",
            marginLeft: 100 , 
        },

          image: {
            width: 150,
            height: 150,
            borderRadius: 75,
          },

          placeholder: {
            fontSize: 16,
            color: "#aaa",
          },

          buttonContainer: {
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
            padding: 10 , 
          }, 

          title: {
            fontSize: 32,
            fontWeight: 'heavy',
            marginBottom: 20,
            textAlign: 'center',
            fontFamily: 'poppins',
            
          },

          button: {
            backgroundColor: '#51B936', 
            borderRadius: 20,
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
            padding: 5,
            fontFamily: 'poppins',
            fontSize: 18,
          },

          buttonText: {
            color: "#fff",
            fontSize: 16,
            backgroundColor: '#51B936'
          },

          label: {
            fontSize: 20,
            marginVertical: 10,
            fontFamily: 'poppins',
            textAlign: 'center',
            color: 'F5F5F5'
            
          },

          cameraIcon: {
            position: 'absolute',
            marginBottom:220 , // Adjust the vertical position
            marginLeft: 200, // Adjust the horizontal position
            backgroundColor: '#51B936',
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }  
        
});
        export default RegisterScreen3;