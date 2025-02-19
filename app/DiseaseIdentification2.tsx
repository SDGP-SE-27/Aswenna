import React from 'react';
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

  const handleNavigation = (cropName: string) => {
    navigation.navigate('DiseaseIdentification', { crop: cropName }); // Pass the selected crop to the next screen
  };

  const crops: Crop[] = [
    { name: 'Banana', image: require('../assets/images/banana.jpg') },
    { name: 'Mango', image: require('../assets/images/tom_jc_mango.jpg') },
    { name: 'Papaya', image: require('../assets/images/Papaya.png') },
    { name: 'Snake Gourd', image: require('../assets/images/snakeGourd.jpg') },
    { name: 'Eggplant', image: require('../assets/images/eggPlant.jpg') },
    { name: 'Okra', image: require('../assets/images/okra.jpg') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Crop</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 20 },
  header: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  cropContainer: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cropImage: { width: 75, height: 75, resizeMode: 'contain' },
  cropName: { fontSize: 16, fontWeight: 'bold' },
});

export default DiseaseIdentification2;