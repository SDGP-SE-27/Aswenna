import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type FertlizerScheduleScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "FertilizerSchedule"
>;

const FertilizerSchedule = () => {
  const navigation = useNavigation<FertlizerScheduleScreenProp>();
  const [cropType, setCropType] = useState("Bitter Gourd");
  const [fertilizer, setFertilizer] = useState("Urea");
  const [applicationDate, setApplicationDate] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
      navigation.setOptions({ headerShown: false }); 
    }, [navigation]);

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
        setSuccessMessage("✅ Fertlizer Schedule saved successfully!");
      } else {
        setSuccessMessage("❌ Failed to save fertilizer schedule. Try again.");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      setSuccessMessage("⚠️ Error. Something went wrong.");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fertilizer Schedule</Text>
      </View>
    <View style={styles.container}>
      <Text style={styles.label}>Select Crop Type</Text>
      <Picker
        selectedValue={cropType}
        onValueChange={(itemValue) => setCropType(itemValue)}
      >
        <Picker.Item label="Bitter Gourd" value="Bitter Gourd" />
        <Picker.Item label="Snake Gourd" value="Snake Gourd" />
        <Picker.Item label="Ladies Fingers" value="Ladies Fingers" />
        <Picker.Item label="Eggplant" value="Eggplant" />
        <Picker.Item label="Papaya" value="Papaya" />
        <Picker.Item label="Pineapple" value="Pineapple" />
        <Picker.Item label="Mango" value="Mango" />
        <Picker.Item label="Banana" value="Banana" />
      </Picker>

      <Text style={styles.label}>Select Fertilizer</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fertilizer}
          onValueChange={(itemValue) => setFertilizer(itemValue)} style={styles.picker} mode="dropdown"
        >
          <Picker.Item label="Urea" value="Urea" />
          <Picker.Item label="Compost" value="Compost" />
          <Picker.Item label="DAP" value="DAP" />
          <Picker.Item label="NPK" value="NPK" />
        </Picker>
      </View>
      <Text style={styles.label}>Application Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-03-05"
        value={applicationDate}
        onChangeText={setApplicationDate}
      />

        <TouchableOpacity style={styles.saveButton} onPress={submitSchedule}>
          <Text style={styles.saveButtonText}>SAVE SCHEDULE</Text>
        </TouchableOpacity>

        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#D9FAD9',
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
    paddingLeft: 30, 
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
  container: {
    backgroundColor: "#ffffff",
    margin: 25,
    padding: 25,
    borderRadius: 15,
    marginTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: "bold",
    color: "#37474F",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  successMessage: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E7D32", 
  },
});

export default FertilizerSchedule;
