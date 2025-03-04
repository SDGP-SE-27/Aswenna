import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Crop = {
  name: string;
  image: any;
};

type DiseaseIdentification2ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiseaseIdentification2'
>;

const DiseaseIdentification2 = () => {
  const navigation = useNavigation<DiseaseIdentification2ScreenProp>();

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); 
  }, [navigation]);

  const handleNavigation = (cropName: string) => {
    navigation.navigate('DiseaseIdentification', { crop: cropName }); // Pass the selected crop to the next screen
  };

  const crops: Crop[] = [
    { name: 'Banana', image: require('../assets/images/banana.jpg') },
    { name: 'Mango', image: require('../assets/images/tom_jc_mango.jpg') },
    { name: 'Papaya', image: require('../assets/images/papaya.png') },
    { name: 'Snake Gourd', image: require('../assets/images/snakeGourd.jpg') },
    { name: 'Eggplant', image: require('../assets/images/egg_plant.jpg') },
    { name: 'Okra', image: require('../assets/images/okra.jpg') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a crop</Text>
      </View>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {crops.map((crop, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cropContainer}
            onPress={() => handleNavigation(crop.name)}
          >
            <Image source={crop.image} style={styles.cropImage} />
            <Text style={styles.cropName}>{crop.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

            {/* Bottom Navigation (Placeholder) */}
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
                <Image
                  source={require("../assets/images/home_icon.png")}
                  style={styles.footerIcon}
                />
              </TouchableOpacity>
      
              <TouchableOpacity
                onPress={() => navigation.navigate("DiseaseIdentification2")}
              >
                <Image
                  source={require("../assets/images/disease_icon.png")}
                  style={styles.footerIcon}
                />
              </TouchableOpacity>
      
              <TouchableOpacity
                onPress={() => navigation.navigate("PersonalTrackerMain")}
              >
                <Image
                  source={require("../assets/images/finance_icon.png")}
                  style={styles.footerIcon}
                />
              </TouchableOpacity>
      
              <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
                <Image
                  source={require("../assets/images/profile_icon.png")}
                  style={styles.footerIcon}
                />
              </TouchableOpacity>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: 20,marginBottom: 80 },
  cropContainer: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    shadowColor: "#000", 
    shadowOffset: { width: 2, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 6, 
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    fontSize: 25,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    flex: 1, 
    paddingLeft: 70, 
  },
  backButton: { 
    marginRight: 10,
    backgroundColor: "#fff", 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: "#DDD", 
    shadowColor: "#000", 
    shadowOffset: { width: 2, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 6, 
    elevation: 6,
    paddingLeft: 13, 
    paddingRight: 15,
    paddingBottom: 5, 
    textAlign: "center", 
  },
    backText: { 
    fontSize: 25, 
    fontWeight: "bold"
  },
  cropImage: { width: 75, height: 75, resizeMode: 'contain' },
  cropName: { fontSize: 16, fontWeight: 'bold' },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#DFFFD8",
    position: "absolute",
    width: "90%",
    bottom: 15,
    alignSelf: "center",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default DiseaseIdentification2;