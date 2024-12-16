import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';

// Define the structure of a Crop object
type Crop = {
  name: string;
  image: any; // You might want to use a more specific type for image resources
};

const MarketPrice1 = () => {
  const crops: Crop[] = [
    {
      name: 'Long Bean',
      image: require('./assets/Long_Bean.png'),
    },
    {
      name: 'Bitter Gourd',
      image: require('./assets/Bitter_Gourd.png'),
    },
    {
      name: 'Snake Gourd',
      image: require('./assets/Snake_Gourd.png'),
    },
    {
      name: 'Brinjals',
      image: require('./assets/Brinjals.png'),
    },
    {
      name: 'Lady Finger Okra',
      image: require('./assets/Lady_Finger_Okra.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* ADD THIS: Hide default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('./assets/left_arrow.png')} // Replace with your arrow image
            style={styles.backButtonArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Market Price Prediction</Text>
      </View>

      {/* Crop Selection */}
      <ScrollView>
        <View style={styles.cropSelectionContainer}>
          <Text style={styles.sectionTitle}>Select your crop</Text>
          {/* Crop Items */}
          {crops.map((crop, index) => (
            <TouchableOpacity key={index} style={styles.cropItem}>
              <View style={styles.cropImageContainer}>
                {/* FIX: Use resizeMode as a direct prop */}
                <Image
                  source={crop.image}
                  style={styles.cropImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.cropName}>{crop.name}</Text>
            </TouchableOpacity>
          ))}

          {/* Vegetables Button */}
          <TouchableOpacity style={styles.fruitsButton}>
            <Image
              source={require('./assets/right_arrow.png')}
              style={styles.fruitsButtonArrow}
              resizeMode="contain"
            />
            <Text style={styles.fruitsButtonText}>Fruits</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>🔗</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>💲</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  backButtonArrow: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cropSelectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#FAEBD7',
    padding: 10,
    borderRadius: 10,
  },
  cropItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // FIX: Use boxShadow instead of shadow* properties
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.15)',
    elevation: 5, // This is for Android
  },
  cropImageContainer: {
    backgroundColor: '#F0FFF0',
    borderRadius: 15,
    padding: 5,
    marginRight: 15,
  },
  cropImage: {
    width: 75,
    height: 75,
    // FIX: Remove resizeMode from here
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fruitsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5DEB3',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  fruitsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  fruitsButtonArrow: {
    width: 20,
    height: 20,
    // FIX: Remove resizeMode from here
    transform: [{ rotate: '180deg' }],
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#E0F8E0',
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemText: {
    fontSize: 24,
  },
});

export default MarketPrice1;