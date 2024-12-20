import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/commonjs/src/types';

// Define the structure of a Crop object
type Crop = {
  name: string;
  image: any; // You might want to use a more specific type for image resources
};

// Define the RootStackParamList (for navigation)
type RootStackParamList = {
  MarketPrice2: undefined;
  // ... other screens in your app
};

// Define the props for this screen component
type MarketPrice2Props =NativeStackScreenProps<
  RootStackParamList,
  'MarketPrice2'
>;

const MarketPrice2: React.FC<MarketPrice2Props> = ({navigation, route, }) => {

  const crops: Crop[] = [
    
    {
      name: 'Pineapple',
      image: require('./assets/Pineapple.png'),
    },
    {
      name: 'TOM JC Mango',
      image: require('./assets/tom_jc_Mango.png'),
    },
   
    {
      name: 'Papaya',
      image: require('./assets/papaya.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
                <Image source={crop.image} style={styles.cropImage} />
              </View>
              <Text style={styles.cropName}>{crop.name}</Text>
            </TouchableOpacity>
          ))}

          {/* fruits Button */}
          <TouchableOpacity
            style={styles.fruitsButton}
            onPress={() => {
              /* Navigate to the fruits screen */
            }}
          >
            <Image
              source={require('./assets/left_arrow.png')}
              style={styles.fruitsButtonArrow}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
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
    resizeMode: 'contain',
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
    resizeMode: 'contain',
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

export default MarketPrice2;