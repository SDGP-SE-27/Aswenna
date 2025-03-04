import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FertilizerHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "FertilizerHistory"
>;

type FertilizerReminder = {
  crop : {name : string};
  fertilizer_type: string;
  application_date: string;
};

const Fertilizerhistory = () => {
  const [reminders, setReminders] = useState<FertilizerReminder[]>([]);
  const navigation = useNavigation<FertilizerHistoryScreenProp>();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Stored Token:", token);
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        return;
      }

      const response = await fetch(
        "https://api.aswenna.site/reminder/get-schedule-history/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        if (Array.isArray(data)) {
          setReminders(data);
        } else {
          setReminders([]); // Fallback to an empty array if the API response is unexpected
        }
      } else if (response.status === 401) {
        Alert.alert(
          "Unauthorized",
          "Your session has expired. Please log in again."
        );
        // Optionally, navigate to the login screen here
      } else {
        Alert.alert("Error", "Failed to fetch transactions. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Fertilizer Application History</Text>

      {reminders.length === 0 ? (
        <Text style={styles.noRemindersText}>No reminders received.</Text>
      ) : (
        reminders.map((reminder, index) => (
          <View key={index} style={styles.reminderView}>
            <Text style={styles.cropType}>Crop: {reminder.crop.name}</Text>
            <Text style={styles.fertilizerType}>
              Fertilizer: {reminder.fertilizer_type}
            </Text>
            <Text style={styles.fertlizerDate}>
              Application Date:{" "}
              {new Date(reminder.application_date).toDateString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D9FAD9",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noRemindersText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  reminderView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cropType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  fertilizerType: {
    fontSize: 16,
    marginBottom: 5,
  },
  fertlizerDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});
export default Fertilizerhistory;
