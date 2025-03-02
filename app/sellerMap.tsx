import React, { useState, useEffect } from 'react';
import { Alert, Button, Linking, Pressable, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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
  const [location, setLocation] = useState<Location | null>(null);

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

export default App;
