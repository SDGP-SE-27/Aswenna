<<<<<<< HEAD
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Google Maps Integration (Sri Lanka)</Text>

      {/* Button to open Google Maps with live location */}
      <Pressable
        onPress={() => redirectToGoogleMaps(location.latitude, location.longitude)}
        style={{ margin: 10, padding: 10, backgroundColor: '#007bff' }}
      >
        <Text style={{ color: 'white' }}>Open Google Maps (Live Location)</Text>
      </Pressable>

      {/* Button to open Google Maps with Directions from live location to Kandy */}
      <Button
        title="Get Directions (Live Location to Kandy)"
        onPress={() => openGoogleMapsWithDirections(location.latitude, location.longitude, 7.2906, 80.6337)} // Live location to Kandy coordinates
      />

      {/* Button to show confirmation modal before opening Google Maps */}
      <Button
        title="Confirm Redirect to Google Maps (Galle)"
        onPress={() => confirmRedirect('https://www.google.com/maps/search/?api=1&query=Galle,+Sri+Lanka')}
      />
    </View>
  );
};

export default App;
=======
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import MapView, { Marker, Circle } from "react-native-maps";
// import * as Location from "expo-location";

// const MapScreen = () => {
//   const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

//   useEffect(() => {
//     (async () => {
//       let permissionResponse = await Location.requestForegroundPermissionsAsync();
//       if (permissionResponse.status !== "granted") {
//         Alert.alert("Permission Denied", "Location access is required for this feature.");
//         return;
//       }

//       let userLocation = await Location.getCurrentPositionAsync({});
//       setLocation(userLocation.coords);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: location?.latitude || 6.9271, // Default to Colombo
//           longitude: location?.longitude || 79.8612,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//       >
//         {location && (
//           <>
//             <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You" />
//             <Circle
//               center={{ latitude: location.latitude, longitude: location.longitude }}
//               radius={1000} // 1km range
//               strokeColor="rgba(0, 255, 0, 0.5)"
//               fillColor="rgba(0, 255, 0, 0.2)"
//             />
//           </>
//         )}

//         {/* Example Shop Markers */}
//         <Marker coordinate={{ latitude: 6.9303, longitude: 79.8612 }} title="Shop 1" />
//         <Marker coordinate={{ latitude: 6.9253, longitude: 79.8655 }} title="Shop 2" />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { width: "100%", height: "100%" },
// });

// export default MapScreen;
>>>>>>> db07f7999b7b1086e82724c80c62239ef6a20d72
