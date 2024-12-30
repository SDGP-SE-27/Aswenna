import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the structure of a Crop object
type Crop = {
  name: string;
  image: any; // You might want to use a more specific type for image resources
};

// Define the RootStackParamList (for navigation)
type RootStackParamList = {
  MarketPrice1: undefined;
  // ... other screens in your app
};

// Define the props for this screen component
type MarketPrice1Props = NativeStackScreenProps<
  RootStackParamList,
  'MarketPrice1'
>;

const MarketPrice1: React.FC<MarketPrice1Props> = ({
  navigation,
  route,
}) => {
  const crops: Crop[] = [
    {
      name: 'Long Bean',
      image: require('../assets/images/long_bean.jpg'),
    },
    {
      name: 'Bitter Gourd',
      image: require('../assets/images/bitter_gourd.jpg'),
    },
    {
      name: 'Snake Gourd',
      image: require('../assets/images/snake_gourd.jpg'),
    },
    {
      name: 'Brinjals',
      image: require('../assets/images/brinjals.jpg'),
    },
    {
      name: 'Lady Finger Okra',
      image: require('../assets/images/lady_finger_okra.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text>{"<"}</Text>;  // Replace with your arrow image
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

          {/* Vegetables Button */}
          <TouchableOpacity
            style={styles.fruitsButton}
            onPress={() => {
              /* Navigate to the Vegetables screen */
            }}
          >

            <View style={styles.backButtonContainer}>
              <TouchableOpacity style={styles.backButton}>  
                <Text> Fruits &lt;</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.fruitsButtonText}>Fruits</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.footer}>
                      <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
                      <Image
                          source={require("../assets/images/home-icon.png")}
                          style={styles.footerIcon}
                      />
                      </TouchableOpacity>
      
                      <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
                      <Image
                          source={require("../assets/images/disease-icon.png")}
                          style={styles.footerIcon}
                      />
                      </TouchableOpacity>
      
                      <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
                      <Image
                          source={require("../assets/images/finance-icon.png")}
                          style={styles.footerIcon}
                      />
                      </TouchableOpacity>
      
                      <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
                      <Image
                          source={require("../assets/images/profile-icon.png")}
                          style={styles.footerIcon}
                      />
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
  backButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  backButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginTop: 20,
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

export default MarketPrice1;