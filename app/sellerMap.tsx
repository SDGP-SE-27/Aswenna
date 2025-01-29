import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const SellerMap = () => {
  const [sellers, setSellers] = useState([
    {
      id: '1',
      name: 'Seller 1',
      latitude: 6.927079,
      longitude: 79.861244,
    },
    // Add more sellers here
  ]);

  const [region, setRegion] = useState({
    latitude: 6.927079,
    longitude: 79.861244,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {sellers.map(seller => (
          <Marker
            key={seller.id}
            coordinate={{
              latitude: seller.latitude,
              longitude: seller.longitude,
            }}
            title={seller.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default SellerMap;
