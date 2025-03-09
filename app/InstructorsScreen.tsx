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
        navigation.setOptions({ headerShown: false }); 
      }, [navigation]);

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('DiseaseIdentification2')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agricultural Instructors</Text>
      </View>

      <View style={styles.mainContainer}>
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

      </View>

      <TouchableOpacity
        style={styles.backButtonBottom}
        onPress={() => navigation.navigate("Homepage")}
      >
        <Text style={styles.backButtonText}>Back to homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
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
    paddingLeft: 35, 
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
  backButtonBottom: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    position: "absolute",
    justifyContent: "space-around",
    width: "90%",
    bottom: 15,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default InstructorsScreen;
