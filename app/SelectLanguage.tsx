import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const SelectLanguage = () => {
  const [language, setLanguage] = useState<string>("English");
  const navigation = useNavigation();

  const[fontsLoaded] = useFonts({'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),});
    const[fontsLoaded2] = useFonts({'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),});
    const[fontsLoaded3] = useFonts({'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),});

  const handleNext = () => {
    console.log("Selected Language:", language);
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Aswenna!</Text>
        <Text style={styles.localLanguageTitle}>
          අස්වැන්න මහගෙදරට සාදරයෙන් පිළිගනිමු
        </Text>
      </View>

      {/* Updated Container */}
      <View style={styles.listContainer}>
        <Text style={styles.prompt}>
          Please Select your language!!{"\n"}
          <Text style={styles.localPrompt}>කරුණාකර ඔබේ භාෂාව තෝරන්න!!</Text>
        </Text>

        {/* Radio Buttons */}
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setLanguage("English")}
        >
          <View
            style={
              language === "English"
                ? styles.radioSelected
                : styles.radioUnselected
            }
          />
          <Text style={styles.radioText}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setLanguage("සිංහල")}
        >
          <View
            style={
              language === "සිංහල"
                ? styles.radioSelected
                : styles.radioUnselected
            }
          />
          <Text style={styles.radioText}>සිංහල</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={require("../assets/images/select.png")} // Replace with your image path
          style={styles.footerImage}
        />
        <Text style={styles.footerText}>Powered By Innovatech.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  localLanguageTitle: {
    fontSize: 20,
    color: "#4CAF50",
    textAlign: "center",
    marginTop:9,
  },
  listContainer: {
    borderColor: "#dcd5d5eb",
    shadowColor: "#dcd5d5eb",
    borderRadius: 10,
    flexDirection: "column",
    borderWidth: 1,
    borderBottomWidth: 5,
    margin: 5,
    alignItems: "center",
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
    paddingTop: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // For Android shadow
  },
  prompt: {
    fontSize: 16.5,
    textAlign: "center",
    marginBottom: 11,
  },
  localPrompt: {
    fontSize: 16.5,
    color: "#666",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50",
    marginRight: 8,
  },
  radioUnselected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 8,
  },
  radioText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerImage: {
    marginTop:12,
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  footerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
});

export default SelectLanguage;
