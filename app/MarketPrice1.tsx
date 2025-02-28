import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";

type MarketPrice1ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "MarketPrice1"
>;

type Crop = {
  name: string;
  image: any;
};

const MarketPrice1 = () => {
  const navigation = useNavigation<MarketPrice1ScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "MarketPrice1">>();
  const [category, setCategory] = useState<string | null>(null);
  const crops: Crop[] = [
    {
      name: "long_beans",
      image: require("../assets/images/long_bean.jpg"),
    },
    {
      name: "bitter_gourd",
      image: require("../assets/images/bitter_gourd.jpg"),
    },
    {
      name: "snake_gourd",
      image: require("../assets/images/snake_gourd.jpg"),
    },
    {
      name: "brinjals",
      image: require("../assets/images/brinjals.jpg"),
    },
    {
      name: "lady_finger_okra",
      image: require("../assets/images/lady_finger_okra.jpg"),
    },
  ];

  const handleNavigation = (cropName: string) => {
    // console.log("Navigating to MarketPrice3 with:", cropName);
    navigation.navigate("MarketPrice3", { cropName });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Homepage")}
        style={styles.backButton}
      ></TouchableOpacity>

      {/* Crop Selection */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Select a Crop</Text>
        <View style={styles.gridContainer}>
          {crops.map((crop, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cropContainer}
              onPress={() => handleNavigation(crop.name)}
            >
              <Image source={crop.image} style={styles.cropImage} />
              <Text style={styles.cropName}>{crop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {/* fruits Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("MarketPrice2")}
            style={styles.fruitsButton}
          >
            <Text style={styles.fruitsButtonText}>For Fruits</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
          <Image
            source={require("../assets/images/home_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DiseaseIdentification2")}
        >
          <Image
            source={require("../assets/images/disease_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("PersonalTrackerMain")}
        >
          <Image
            source={require("../assets/images/finance_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
          <Image
            source={require("../assets/images/profile_icon.png")}
            style={styles.footerIcon}
          />
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
  backButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  cropSelectionContainer: {
    padding: 20,
  },
  cropItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cropImageContainer: {
    backgroundColor: "#F0FFF0",
    borderRadius: 15,
    padding: 5,
    marginRight: 15,
  },
  cropImage: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },
  cropName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fruitsButton: {
    alignItems: "center",
    backgroundColor: "#F5DEB3",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginTop: 90,
    marginLeft: 70,
    marginRight: 70,
  },
  fruitsButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#E0F8E0",
    borderTopWidth: 1,
    borderTopColor: "#d3d3d3",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#DFFFD8",
    position: "absolute",
    width: "90%",
    bottom: 30,
    alignSelf: "center",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cropContainer: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default MarketPrice1;
