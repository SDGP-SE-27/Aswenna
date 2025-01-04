import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';
import { NavigationProp } from '@react-navigation/native';

export default function Buildyourfarmland({ navigation }: { navigation: NavigationProp<any> }) {
  const [cropType, setcropType] = useState<string>('');
  const [landarea, setLlandarea] = useState<string>('');

  const[fontsLoaded] = useFonts({'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),});
  const[fontsLoaded2] = useFonts({'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),});
  const[fontsLoaded3] = useFonts({'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),});



  const handleSubmit = (): void => {
    if (!cropType || !landarea) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Building the farmland is succesfully completed ', `CropType: ${cropType}\nLandarea: ${landarea}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

    <View style={styles.container}>
    <Text style={[styles.title, {fontFamily: 'Poppins-Bold'}]}>Build your</Text>
    <Text style={[styles.title, {fontFamily: 'Poppins-Bold'}]}> Farmland</Text>  
    </View>

      <View style={styles.formContainer}>
        <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Crop Type*</Text>
        
        <Picker
          selectedValue={cropType}
          onValueChange={(value) => setcropType(value)}
          style= {[styles.picker,{fontFamily:'Poppins-Regular'}]}
          
        >
            
          <Picker.Item label="Long beans" value="Long beans" />
          <Picker.Item label="Bitter gourd" value="Bitter gourd" />
          <Picker.Item label="Snake gourd" value="Snake gourd" />
          <Picker.Item label="Brinjals" value="Brinjals" />
          <Picker.Item label="TOM EJC" value="TOM EJC" />
          <Picker.Item label="Pineapple" value="Pineapple" />
          <Picker.Item label="Papaya" value="Papaya" />
        </Picker>

        <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Land area*</Text>
        <TextInput
            style= {[styles.input,{fontFamily:'Poppins-Regular'}]}
            value={landarea}
            onChangeText={setLlandarea}
        />

      
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={[styles.button ,{fontFamily: 'Poppins-SemiBold'}]}>Next</Text>
        </TouchableOpacity>  

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={[styles.button ,{fontFamily: 'Poppins-SemiBold'}]}>Add another crop</Text>
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
    maxWidth: 400,
    backgroundColor: '#CFFFC2',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'poppins',
    fontSize: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'poppins',
    
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'poppins',
    color: 'F5F5F5'
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    fontFamily: 'poppins',
  },

  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    padding: 10,
    fontFamily: 'poppins',
  },

  button: {
    backgroundColor: '#51B936', 
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    color: '#ffff',
    fontFamily: 'poppins',
    fontSize: 18,
  }



});


        