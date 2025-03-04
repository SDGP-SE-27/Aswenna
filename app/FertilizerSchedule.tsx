import React, { useState } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const FertilizerSchedule = () => {
  const [cropType, setCropType] = useState("Bitter Gourd");
  const [fertilizer, setFertilizer] = useState("Urea");
  const [applicationDate, setApplicationDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitSchedule = async () => {
    try {
      const token = (await AsyncStorage.getItem("accessToken"))?.trim();
      console.log("Token:", token);
      if (!token) {
        Alert.alert("Error", "Please log in first.");
        return;
      }

      const checkStoredToken = async () => {
        const storedToken = await AsyncStorage.getItem("accessToken");
        console.log("Stored Token in AsyncStorage:", storedToken);
      };
      checkStoredToken();

      const response = await fetch(
        "https://api.aswenna.site/reminder/receive-schedule/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cropType: cropType,
            fertilizerType: fertilizer,
            applicationDate: applicationDate,
          }),
        }
      );
      console.log("Request Headers:", {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        setSuccessMessage("Fertlizer Schedule saved successfully!");
      } else {
        setSuccessMessage("Failed to save fertilizer schedule. Try again.");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      setSuccessMessage("Error. Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Crop Type</Text>
      <Picker
        selectedValue={cropType}
        onValueChange={(itemValue) => setCropType(itemValue)}
      >
        <Picker.Item label="Bitter Gourd" value="Bitter Gourd" />
        <Picker.Item label="Papaya" value="Papaya" />
        <Picker.Item label="Pineapple" value="Pineapple" />
      </Picker>

      <Text style={styles.label}>Select Fertilizer</Text>
      <Picker
        selectedValue={fertilizer}
        onValueChange={(itemValue) => setFertilizer(itemValue)}
      >
        <Picker.Item label="Urea" value="Urea" />
        <Picker.Item label="Compost" value="Compost" />
        <Picker.Item label="DAP" value="DAP" />
        <Picker.Item label="NPK" value="NPK" />
      </Picker>

      <Text style={styles.label}>Application Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-03-05"
        value={applicationDate}
        onChangeText={setApplicationDate}
      />

      <Button title="Save Schedule" onPress={submitSchedule} />
      {successMessage ? <Text style = {styles.successMessage}>{successMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#77CB61",
    margin: 20,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 50,
    paddingBottom: 70,
    borderRadius: 15,
    marginTop: 150,
  },

  label: {
    fontSize: 18,
    marginVertical: 15,
    marginRight: 0,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  successMessage: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "green", 
  },
});

export default FertilizerSchedule;
