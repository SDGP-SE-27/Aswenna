// Feature folder for front end


import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { NavigationProp } from '@react-navigation/native';

export default function LoginScreen({ navigation }: { navigation: NavigationProp<any> }) {

  // Validations

  // State for input and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Validation Functions
  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const validatePassword = (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@$!%*?&]/.test(password);

  const handleLogin = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      Alert.alert("Login Successful", `Welcome, ${email}!`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backButton}>  
        <Text>{"<"}</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require("../assets/images/login-aswenna-logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Log In</Text>

       {/* Input Fields */}
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone number or Email*</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Enter phone number or email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
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
        <TouchableOpacity onPress={() => navigation.navigate("PasswordResetScreen", { email: email })}>
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
