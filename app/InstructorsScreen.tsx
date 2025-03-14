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
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type Instructor = {
  id: number;
  name: string;
  specialty: string;
  phone: string;
};

const InstructorsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultImage = require("../assets/images/default_profile.png"); // Ensure this file exists

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      setInstructors([
        { id: 1, name: "Mr. Sunil Perera", specialty: "Colombo District", phone: "+94 77 123 4567" },
        { id: 2, name: "Ms. Kamala Jayawardena", specialty: "Kaluthara District", phone: "+94 76 234 5678" },
        { id: 3, name: "Mr. Rohan Silva", specialty: "Gampaha District", phone: "+94 71 345 6789" },
        { id: 4, name: "Ms. Priya Fernando", specialty: "Galle District", phone: "+94 77 456 7890" },
        { id: 5, name: "Mr. Nimal Perera", specialty: "Matara District", phone: "+94 77 567 8901" },
        { id: 6, name: "Mr. Ajith Fernando", specialty: "Hambanthota District", phone: "+94 71 654 6789" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleCallInstructor = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agricultural Instructors</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <FlatList
            data={instructors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.instructorCard}>
                <Image source={defaultImage} style={styles.instructorImage} />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.specialty}>{item.specialty}</Text>
                  <TouchableOpacity style={styles.callButton} onPress={() => handleCallInstructor(item.phone)}>
                    <Text style={styles.callButtonText}>Call {item.phone}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>

      {/* Back Button to Homepage */}
      <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.navigate("Homepage")}>
        <Text style={styles.backButtonText}>Back to Homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  scrollContainer: { paddingBottom: 100 }, // Extra space for scrolling
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", flex: 1, paddingLeft: 35 },
  backButton: { marginRight: 10,
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
    textAlign: "center",},
  backText: { fontSize: 25, fontWeight: "bold" },
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
  instructorImage: { width: 70, height: 70, borderRadius: 50, marginRight: 15 },
  infoContainer: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  specialty: { fontSize: 14, color: "#666", marginBottom: 5 },
  callButton: { backgroundColor: "#4CAF50", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, alignItems: "center", marginTop: 5 },
  callButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  backButtonBottom: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    position: "absolute",
    width: "90%",
    bottom: 15,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  backButtonText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
});

export default InstructorsScreen;
