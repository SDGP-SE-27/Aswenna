import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'; 

type BuildyourfarmlandScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Buildyourfarmland'
>;

const Buildyourfarmland = () => {
  const navigation = useNavigation<BuildyourfarmlandScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "Buildyourfarmland">>();  // Get route params
  const username = route.params?.username || "";
  const [cropType, setCropType] = useState<string>('');
  const [landArea, setLandArea] = useState<string>('');
  useEffect(() => {
                  navigation.setOptions({ headerShown: false }); 
              }, [navigation]);
              
  const [errors, setErrors] = useState({ cropType: '', landArea: '' });

  /** ✅ Function to validate input fields */
  const validateFields = (): boolean => {
    let isValid = true;
    const newErrors = { cropType: '', landArea: '' };

    if (!cropType.trim()) {
      newErrors.cropType = 'Crop Type is required.';
      isValid = false;
    }

    if (!landArea.trim()) {
      newErrors.landArea = 'Land area is required.';
      isValid = false;
    } else if (isNaN(Number(landArea))) {
      newErrors.landArea = 'Land area must be a valid number.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /** ✅ Function to submit farmland data */
  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
        const response = await fetch('https://api.aswenna.site/farmland/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,  // ✅ Send username received from registration
                crop_type: cropType,
                land_area: parseFloat(landArea),
            }),
        });

        if (response.ok) {
            Alert.alert('Success', 'Farmland details saved successfully!');
            navigation.navigate("login", { username }); // Redirect to login after success
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            Alert.alert('Error', errorData.error || 'Failed to save data.');
        }
    } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Something went wrong. Try again.');
    }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.title}>
        <Text style={[styles.title]}>Build your Farmland</Text>
      </View>

      <View style={styles.formContainer}>

        {/* Crop Type Picker */}
        <Text style={styles.label}>Crop Type*</Text>
        <Picker
          selectedValue={cropType}
          onValueChange={(value) => setCropType(value)}
          style={[styles.picker, errors.cropType ? styles.inputError : null]}
        >
          <Picker.Item label="Long beans" value="Long beans" />
          <Picker.Item label="Bitter gourd" value="Bitter gourd" />
          <Picker.Item label="Snake gourd" value="Snake gourd" />
          <Picker.Item label="Brinjals" value="Brinjals" />
          <Picker.Item label="TOM EJC" value="TOM EJC" />
          <Picker.Item label="Pineapple" value="Pineapple" />
          <Picker.Item label="Papaya" value="Papaya" />
        </Picker>
        {errors.cropType ? <Text style={styles.errorText}>{errors.cropType}</Text> : null}

        {/* ✅ Land Area Input */}
        <Text style={styles.label}>Land area in sq.ft*</Text>
        <TextInput
          style={[styles.input, errors.landArea ? styles.inputError : null]}
          placeholder="Enter your land area"
          keyboardType="numeric"
          value={landArea}
          onChangeText={setLandArea}
        />
        {errors.landArea ? <Text style={styles.errorText}>{errors.landArea}</Text> : null}

        {/* ✅ Submit Button */}
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffff',
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#CFFFC2',
    padding: 50,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'poppins',
    fontSize: 20,
    marginBottom: 50,
    position: 'fixed'
  },
  title: {
    fontSize: 32,
    marginBottom: 300,
    textAlign: 'center',
    fontWeight: "bold",
  
    
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    
  },

  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontFamily: 'poppins',
  },

  button: {
    backgroundColor: '#51B936', 
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 5,
    padding: 15,
    color: '#ffff',
    fontFamily: 'poppins',
    
  }, 
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
254
export default Buildyourfarmland;


        