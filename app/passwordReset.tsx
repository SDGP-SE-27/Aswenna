import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NavigationProp } from '@react-navigation/native';

export default function PasswordResetScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Function to validate email
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Function to handle password reset
  const handlePasswordReset = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    // Simulating API call
    Alert.alert(
      "Reset Link Sent",
      `A password reset link has been sent to ${email}. Please check your inbox.`,
      [{ text: "OK" }]
    );

  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your registered email address, and we'll send you a password reset link.
      </Text>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address*</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555",
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  resetButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
