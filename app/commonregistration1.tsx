import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import Chooserole from "./Chooserole";


type commonregistration1ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'commonregistration1'
>;

  // State for inputs and errors
const commonregistration1 = () => {
    const navigation = useNavigation<commonregistration1ScreenProp>();
    const route = useRoute<RouteProp<RootStackParamList, "Chooserole">>();
    const {role} = route.params; 
    const [username, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [district, setDistrict] = useState<string>("district");
    const [errors, setErrors] = useState({
      username: "",
      phoneNumber: "",
      address: "",
      district: "",
      
    });
    

  // Validation Functions
const validatePhoneNumber = (phoneNumber: string) =>
    /^[0-9]{10}$/.test(phoneNumber);


const handleSubmit = async (): Promise<boolean> => {
  let isValid = true; // Assume inputs are valid initially
  const newErrors = { username: "", phoneNumber: "", address: "", district: "" };

  // Name validation
  if (!username.trim()) {
      newErrors.username = "Name is required.";
      isValid = false;
  }

  // Phone number validation
  if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
  } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
      isValid = false;
  }

  // Address validation
  if (!address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
  }

  // District validation
  if (!district || district === "district") {
      newErrors.district = "Please select a district.";
      isValid = false;
  }

  setErrors(newErrors);
  return isValid;
                              
// Update the errors state
};  

  // if (!isValid) {
  //     return false; // Return early if validations fail
  // }
  
//   try {
//       const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//               username,
//               phone_number: phoneNumber,
//               address,
//               district,
//           }),
//       });

//       if (response.ok) {
//           Alert.alert("Registration Successful", `Welcome, ${name}!`);
//           return true;
//       } else {
//           const errorData = await response.json();
//           console.error("Error:", errorData);
//           Alert.alert("Error", "Failed to register. Please try again.");
//       }
//   } catch (error) {
//       console.error("Error:", error);
//       Alert.alert("Error", "Cannot connect to the server. Please try again later.");
//   }

//   return false; // Return false if API call fails


 
  
return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <View style={styles.formContainer}>
        {/* Name Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            style={[styles.input, errors.username ? styles.inputError : null]}
            placeholder="Enter your name"
            value={username}
            onChangeText={setName}
          />
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
        </View>

        {/* Phone Number Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number*</Text>
          <TextInput
            style={[styles.input, errors.phoneNumber ? styles.inputError : null]}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          {errors.phoneNumber ? (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          ) : null}
        </View>

        {/* Address Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address*</Text>
          <TextInput
            style={[styles.input, errors.address ? styles.inputError : null]}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
          {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
        </View>

        {/* District Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>District*</Text>
          <Picker
            selectedValue={district}
            onValueChange={(value) => setDistrict(value)}
            style={[styles.picker, errors.district ? styles.inputError : null]}
          >
            <Picker.Item label="Select District" value="district" />
            <Picker.Item label="Colombo" value="Colombo" />
            <Picker.Item label="Gampaha" value="Gampaha" />
            <Picker.Item label="Kalutara" value="Kalutara" />
            <Picker.Item label="Galle" value="Galle" />
            <Picker.Item label="Matara" value="Matara" />
            <Picker.Item label="Hambanthota" value="Hambanthota" />
          </Picker>
          {errors.district ? (
            <Text style={styles.errorText}>{errors.district}</Text>
          ) : null}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
        style={styles.button}
        onPress={async () => {
        const isValid = await handleSubmit(); // Await the result of handleSubmit
        if (isValid) {
            navigation.navigate("commonregistration2" , {
                username, 
                phoneNumber, 
                address,
                district, 
                Email : " ", 
                Password: " ",
                role: role.trim(),
            }); 
             // Navigate only if successful
        }
         }}
        >
        <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

      </View>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#CFFFC2",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize : 20,

  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  picker: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
  },

  button: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default commonregistration1;


