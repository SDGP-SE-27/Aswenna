import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type Instructor = {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  image?: any; // Image is optional
};

const InstructorsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultImage = require("../assets/images/default_profile.png"); // Ensure you have this file

  useEffect(() => {
    // Simulating API call to fetch instructors without images
    setTimeout(() => {
      setInstructors([
        {
          id: 1,
          name: "Dr. Sunil Perera",
          specialty: "Soil Fertility Specialist",
          phone: "+94 77 123 4567",
        },
        {
          id: 2,
          name: "Ms. Kamala Jayawardena",
          specialty: "Pest Control Expert",
          phone: "+94 76 234 5678",
        },
        {
          id: 3,
          name: "Dr. Rohan Silva",
          specialty: "Crop Disease Consultant",
          phone: "+94 71 345 6789",
        },
      ]);
      setLoading(false);
    }, 1500); // Simulating API delay
  }, []);

  const handleCallInstructor = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agricultural Instructors</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={instructors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.instructorCard}>
              <Image
                source={defaultImage} // Use default image for now
                style={styles.instructorImage}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCallInstructor(item.phone)}
                >
                  <Text style={styles.callButtonText}>Call {item.phone}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Homepage")}
      >
        <Text style={styles.backButtonText}>← Back to homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  instructorCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  instructorImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  specialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  callButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  callButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InstructorsScreen;
