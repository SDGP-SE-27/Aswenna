import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    (async () => {
      let permissionResponse = await Location.requestForegroundPermissionsAsync();
      if (permissionResponse.status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required for this feature.");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords); // ✅ No TypeScript error now
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 6.9271, // Default to Colombo
          longitude: location ? location.longitude : 79.8612,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <>
            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You" />
            <Circle
              center={{ latitude: location.latitude, longitude: location.longitude }}
              radius={1000} // 1km range
              strokeColor="rgba(0, 255, 0, 0.5)"
              fillColor="rgba(0, 255, 0, 0.2)"
            />
          </>
        )}

        {/* Example Shop Markers */}
        <Marker coordinate={{ latitude: 6.9303, longitude: 79.8612 }} title="Shop 1" />
        <Marker coordinate={{ latitude: 6.9253, longitude: 79.8655 }} title="Shop 2" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});

export default MapScreen;
