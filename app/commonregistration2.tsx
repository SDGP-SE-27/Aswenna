// import React, { ChangeEventHandler, useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity , Image} from 'react-native';
// import { useFonts } from 'expo-font';
// import { NavigationProp } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from './types';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useRoute, RouteProp } from '@react-navigation/native';
// import commonregistration1 from './commonregistration1';


// type commonregistration2ScreenProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'commonregistration2'
// >;

// const commonregistration2 = () => {
//     const navigation = useNavigation<commonregistration2ScreenProp>();
//     const route = useRoute<RouteProp<RootStackParamList, "commonregistration2">>();
//     const { username, phoneNumber, address, district } = route.params;
//     const [Email, setEmail] = useState<string>('');
//     const [Password, setPassword] = useState<string>('');
//     const [ConfirmPassword, setConfirmPassword] = useState<string>('');
//     const[emailError , setEmailError] = useState<string>(''); 
//     const[passwordError, setPasswordError] = useState<string>('');
//     const [errors, setErrors] = useState({
//           Email:  "",
//           Password: "",
          
//     });      

//     const validateEmail = (email: string): boolean => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//       };

//     const validatePasswords = () : boolean =>{
//         return Password == ConfirmPassword
//     }; 

//     const handleSubmit = async (): Promise<boolean> => {
//       let isValid = true; // Assume inputs are valid initially
//       const newErrors = { Email: "", Password: "", ConfirmPassword: ""};


//       if (!Email.trim()) {
//         newErrors.Email = "Email is required.";
//         isValid = false;
//       }

//       if (!Password.trim()) {
//         newErrors.Password = "Password is required.";
//         isValid = false;
//       }


//      if (!isValid) {
//           return false; // Return early if validations fail
//       }
    
//       try {
//           const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                   Email,
//                   Password,
//                   ConfirmPassword,
                  
//               }),
//           });
    
//           if (response.ok) {
//               Alert.alert("Registration Successful");
//               return true;
//           } else {
//               const errorData = await response.json();
//               console.error("Error:", errorData);
//               Alert.alert("Error", "Failed to register. Please try again.");
//           }
//       } catch (error) {
//           console.error("Error:", error);
//           Alert.alert("Error", "Cannot connect to the server. Please try again later.");
//       }
    
//       return false; // Return false if API call fails
    
    
//     }

//     return (
//         <ScrollView contentContainerStyle={styles.container}>

//         <View style={styles.container}>
//         <Text style={[styles.title, {fontFamily: 'Poppins-Bold'}]}>Registration</Text>
        

//         <View style={styles.formContainer}>
        
//             <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Email*</Text>
//             <View >
//                 <Image
//                     source={require("../assets/icons/email.png")}
//                     style={styles.icon}
//                 />
//                 <TextInput
//                     style={[styles.input,{fontFamily: 'Poppins-Regular'}]} 
//                     placeholder='email'
//                     value={Email}
//                     onChangeText={setEmail}
//                 />    

//             </View>
              
            
//             {emailError && <Text style={styles.errorText}>{emailError}</Text>}
    
          
//             <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Password*</Text>
//             <TextInput
//               style= {[styles.input,{fontFamily:'Poppins-Regular'}]}
//               placeholder="password"
//               value={Password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
    

//             <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Confirm Password*</Text>
//             <TextInput
//               style= {[styles.input,{fontFamily:'Poppins-Regular'}]}
//               placeholder="Confirm password"
//               value={ConfirmPassword}
//               onChangeText={setConfirmPassword}
//               secureTextEntry
//             />

//             {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
    
    
//             {/* Submit Button */}
//             <TouchableOpacity
//               style={styles.button}
//               onPress={async () => {
//               const isValid = await handleSubmit(); // Await the result of handleSubmit
//               if (isValid) {
//                 navigation.navigate("commonregistration3", {
//                       username, 
//                       phoneNumber,
//                       address,
//                       district,
//                       Email, 
//                       Password
//                 }); // Navigate only if successful
//               }
//               }}
//               >
//             <Text style={styles.buttonText}>Next</Text>
//             </TouchableOpacity>



//           </View>
//           </View>
//         </ScrollView>
//       );
//     };

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";
import BuildyourFarmland from "./Buildyourfarmland";
import seller_dashBoard from "./seller_dashboard";


type commonregistration2ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "commonregistration2"
>;

const commonregistration2 = () => {
  const navigation = useNavigation<commonregistration2ScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "commonregistration1">>();

  const { username, phoneNumber, address, district ,role} = route.params; 
  console.log("Received role in commonregistration2:", role);

  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState({ Email: "", Password: "", ConfirmPassword: "" });

  // Function to validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to check if passwords match
  const validatePasswords = (): boolean => {
    return Password === ConfirmPassword;
  };

  const navigateBasedOnRole = () => {
    if (role === "farmer") {
        navigation.navigate("Buildyourfarmland", { username });  // ✅ Farmers go to Buildyourfarmland
    } else {
        navigation.navigate("login", { username });  // ✅ Sellers go to SellerDashboard
    } 
};


  // Function to handle registration submission
  const handleSubmit = async (): Promise<boolean> => {
    let isValid = true;
    const newErrors = { Email: "", Password: "", ConfirmPassword: "" };

    if (!Email.trim()) {
        newErrors.Email = "Email is required.";
        isValid = false;
    }
    if (!Password.trim()) {
        newErrors.Password = "Password is required.";
        isValid = false;
    }
    if (!ConfirmPassword.trim() || Password !== ConfirmPassword) {
        newErrors.ConfirmPassword = "Passwords do not match.";
        isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return false;

    console.log("Sending role to backend:", role);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
            method: "POST", // ✅ Ensure POST method is used
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, 
                phone_number: phoneNumber,
                address,
                district,
                email: Email,
                password: Password,
                role
            }),
        });

        if (response.ok) {
          Alert.alert(
              "Registration Successful",
              `You have registered as a ${role}.`,
              [{ text: "OK", onPress: () => navigateBasedOnRole() }]  // ✅ Navigate after clicking OK
          );
          return true;
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
            Alert.alert("Error", "Failed to register. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "Cannot connect to the server. Please try again later.");
    }

    return false;
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={[styles.title]}>Registration</Text>

        <View style={styles.formContainer}>
          {/* Email Input */}
          <Text style={[styles.label]}>Email*</Text>
          <View>
            {/* <Image source={require("../assets/icons/email.png")} style={styles.icon} /> */}
            <TextInput
              style={[styles.input]}
              placeholder="Enter your Email"
              value={Email}
              onChangeText={setEmail}
            />
          </View>
          {errors.Email ? <Text style={styles.errorText}>{errors.Email}</Text> : null}

          {/* Password Input */}
          <Text style={[styles.label]}>Password*</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter your Password"
            value={Password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.Password ? <Text style={styles.errorText}>{errors.Password}</Text> : null}

          {/* Confirm Password Input */}
          <Text style={[styles.label]}>Confirm Password*</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter your Confirm password"
            value={ConfirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.ConfirmPassword ? <Text style={styles.errorText}>{errors.ConfirmPassword}</Text> : null}

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const isValid = await handleSubmit();
              if (isValid) {
                navigateBasedOnRole();  // ✅ Navigate based on the role
              }
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffff',
        
      },

      formContainer: {
        width: '100%',
        backgroundColor: '#CFFFC2',
        padding: 50,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontSize: 20,
      },

      title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: 'center'
      },

      label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
        textAlign: "left"
      },

      input: {
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#FFFFFF', 
        margin: 10, 
        textAlign: "left",
        width: 230,
       
      },
    
    
      button: {
        backgroundColor: "#32CD32",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
      },

      errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
      }, 

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    }

    });
    export default commonregistration2;
   