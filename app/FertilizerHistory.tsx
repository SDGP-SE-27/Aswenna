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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fertilizer Application History</Text>
      </View>

      <View style={styles.mainContainer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D9FAD9",
    
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
    paddingLeft: 15, 
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
  mainContainer: {
    padding: 20,
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
