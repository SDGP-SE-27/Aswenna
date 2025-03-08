import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

// Define navigation prop
 type IdentifiedDiseaseScreenProp = NativeStackNavigationProp<
   RootStackParamList,
   "IdentifiedDisease"
 >;

const IdentifiedDisease = () => {
  const navigation = useNavigation<IdentifiedDiseaseScreenProp>();
  const route = useRoute();
  const { disease, confidence } = route.params as { disease: string; confidence: number };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Disease Identification Result</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.diseaseLabel}>Identified Disease:</Text>
        <Text style={styles.diseaseName}>{disease}</Text>

        <Text style={styles.confidenceLabel}>Confidence:</Text>
        <Text style={styles.confidence}>{(confidence * 100).toFixed(2)}%</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("DiseaseIdentification2")}
      >
        <Text style={styles.backButtonText}>Back to Crop Selection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("InstructorsScreen")}
      >
        <Text style={styles.backButtonText}>Contact agricultural instructor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  resultContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 4,
    width: "100%",
  },
  diseaseLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  diseaseName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginVertical: 10,
  },
  confidenceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginTop: 10,
  },
  confidence: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2196F3",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
    width: "100%",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IdentifiedDisease;
