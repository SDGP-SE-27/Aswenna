import React, { useEffect } from "react";
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

  useEffect(() => {
        navigation.setOptions({ headerShown: false }); 
      }, [navigation]);
      
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Disease Identification Result</Text>
      </View>

      <View style={styles.mainContainer}>
      <View style={styles.resultContainer}>
        <Text style={styles.diseaseLabel}>Identified Disease:</Text>
        <Text style={styles.diseaseName}>{disease}</Text>

        <Text style={styles.confidenceLabel}>Confidence:</Text>
        <Text style={styles.confidence}>{(confidence * 100).toFixed(2)}%</Text>
      </View>

      <TouchableOpacity
        style={styles.bottomBackButton}
        onPress={() => navigation.navigate("DiseaseIdentification2")}
      >
        <Text style={styles.backButtonText}>Back to Crop Selection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomBackButton}
        onPress={() => navigation.navigate("InstructorsScreen")}
      >
        <Text style={styles.backButtonText}>Contact agricultural instructor</Text>
      </TouchableOpacity>
      </View>
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
    paddingLeft: 10, 
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
    alignItems: "center",
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
  bottomBackButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000", 
    shadowOffset: { width: 2, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 6, 
    elevation: 6,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IdentifiedDisease;
