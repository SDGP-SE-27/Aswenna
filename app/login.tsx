
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type loginScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;
 
const login = () => {
  const navigation = useNavigation<NavigationProp>();

  // State for input and errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const checkStoredToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("Token Retrieved from AsyncStorage:", token);
  };
  useEffect(() => { checkStoredToken(); }, []);


  const fetchProtectedData = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    const response = await fetch("http://127.0.0.1:8000/protected-endpoint/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
  };

  const navigateBasedOnRole = async (role: string) => {
    console.log("navigateBasedOnRole() called with role:", role);

    if (!navigation) {
        console.error("Navigation object is undefined!");
        return;
    }

    if (role === "farmer") {
        console.log("Navigating to Homepage...");
        navigation.reset({
            index: 0,
            routes: [{ name: "Homepage" }],
        });
    } else if (role === "seller") {
        console.log("Navigating to SellerDashboard...");
        navigation.reset({
            index: 0,
            routes: [{ name: "shopItem" }],
        });
    } else {
        console.error(" Unknown role:", role);
        Alert.alert("Error", "Unknown role. Redirecting to login.");
        navigation.navigate("login", {username});
    }
};


const handleLogin = async () => {
  let isValid = true;
  const newErrors = { username: "", password: "" };

  if (!username) {
      newErrors.username = "Username is required.";
      isValid = false;
  }
  if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
  }

  setErrors(newErrors);
  if (!isValid) return;

  try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login Response Data:", data);  

      if (response.status === 200) {
          console.log(" Received Role:", data.role);
          console.log(" Received Username:", data.username);

          await AsyncStorage.setItem("accessToken", data.access);
          await AsyncStorage.setItem("username", data.username);
          await AsyncStorage.setItem("role", data.role);

          console.log("Stored Role in AsyncStorage:", await AsyncStorage.getItem("role"));

          console.log("Calling navigateBasedOnRole()...");
          navigateBasedOnRole(data.role);
      } else if (response.status === 401) {
          console.log("Login Failed");
          setErrors({ ...newErrors, password: "Incorrect password. Please try again." });
          Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      } else {
          Alert.alert("Error", "Something went wrong. Please try again later.");
      }
  } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Unable to connect to the server.");
  }
};


  return (
    <View style={styles.container}>


      {/* Logo */}
      <Image source={require("../assets/images/login-aswenna-logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Log In</Text>

       {/* Input Fields */}
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Username*</Text>
        <TextInput
          style={[styles.input, errors.username ? styles.inputError : null]}
          placeholder="Enter phone number or email"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password*</Text>
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        <TouchableOpacity onPress={() => navigation.navigate("passwordReset", { email: username })}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

  

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Google and Apple Sign-In Buttons */}
      <View style={styles.socialButtonContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/google-icon.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/apple-icon.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign-Up */}
      <View style={styles.signUpContainer}>
        <Text>Don’t have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F0FFF0",
  },
  backButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 20,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
  },

  errorText: {
    color: "red",
    fontSize: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  forgotPassword: {
    color: "#007BFF",
    textAlign: "right",
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  socialButtonContainer: {
    flexDirection: "column", // Arrange the buttons vertically
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Add spacing from other elements
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    width: 132,
    height: 20,
  },
  socialIcon: {
    alignItems: "center",
    width: 132,
    height: 30,
    justifyContent: "center",
    
  },

  inputError: { 
    borderColor: "red" 
  },
  
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signUpText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default login;

