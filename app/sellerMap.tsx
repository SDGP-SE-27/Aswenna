import React, { useState, useEffect } from 'react';
import { Alert, Button, Linking, Pressable, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Location {
  latitude: number;
  longitude: number;
}

const redirectToGoogleMaps = (lat: number, lng: number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  Linking.openURL(url)
    .catch(err => console.error('Failed to open Google Maps', err));
};

const openGoogleMapsWithDirections = (originLat: number, originLng: number, destLat: number, destLng: number) => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
  Linking.openURL(url)
    .catch(err => console.error("Failed to open Google Maps", err));
};

const confirmRedirect = (url: string) => {
  Alert.alert(
    "Open Google Maps",
    "Do you want to open this location in Google Maps?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Open", onPress: () => Linking.openURL(url) },
    ]
  );
};

const App = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location | null>(null);
  useEffect(() => {
      navigation.setOptions({ headerShown: false }); 
    }, [navigation]);

  useEffect(() => {
    // Get the user's current location
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords); // Explicitly setting coordinates as Location type
      },
      (error) => {
        console.warn(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Getting your current location...</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>      
              <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor:"white", justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Google Maps Integration (Sri Lanka)</Text>

      {/* Button to open Google Maps with live location */}
      <Pressable
        onPress={() => redirectToGoogleMaps(location.latitude, location.longitude)}
        style={{ margin: 10, padding: 10, backgroundColor: '#007bff' }}
      >
        <Text style={{ color: 'white' }}>Open Google Maps (Live Location)</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
      marginRight: 10,
      borderColor: "#DDD",
      borderWidth: 2,
      borderRadius: 15,
      paddingLeft: 13,
      paddingRight: 15,
      paddingBottom: 5,
      marginBottom: 20,
      textAlign: "center",
      width: "14%",
      backgroundColor: '#fff',
      shadowColor: "#000", 
      shadowOffset: { width: 2, height: 4 }, 
      shadowOpacity: 0.15, 
      shadowRadius: 6, 
      elevation: 6,
    },
      backButtonText: {
      fontSize: 25,
      fontWeight: "bold"}}
    );

export default App;
