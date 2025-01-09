import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";
import { NavigationProp } from "@react-navigation/native";

export default function commonregistration1({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });
  const [fontsLoaded2] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });
  const [fontsLoaded3] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  const handleSubmit = (): void => {
    if (!name || !phoneNumber || !address || !district) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    Alert.alert(
      "Registration Success",
      `Name: ${name}\nPhone: ${phoneNumber}\nAddress: ${address}\nDistrict: ${district}`
    );
    navigation.navigate("CommonRegistration2");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={[styles.title, { fontFamily: "Poppins-Bold" }]}>
          Registration
        </Text>
      </View>

      <View style={styles.formContainer}>
        {/* Name Field */}
        <Text style={[styles.label, { fontFamily: "Poppins-Bold" }]}>
          Name*
        </Text>
        <TextInput
          style={[styles.input, { fontFamily: "Poppins-Regular" }]}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />

        {/* Phone Number Field */}
        <Text style={[styles.label, { fontFamily: "Poppins-Bold" }]}>
          Phone Number*
        </Text>
        <TextInput
          style={[styles.input, { fontFamily: "Poppins-Regular" }]}
          placeholder="phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={[styles.label, { fontFamily: "Poppins-Bold" }]}>
          Address*
        </Text>
        <TextInput
          style={[styles.input, { fontFamily: "Poppins-Regular" }]}
          placeholder="address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={[styles.label, { fontFamily: "Poppins-Bold" }]}>
          District*
        </Text>
        <Picker
          selectedValue={district}
          onValueChange={(value) => setDistrict(value)}
          style={[styles.picker, { fontFamily: "Poppins-Regular" }]}
        >
          <Picker.Item label="district" value="district" />
          <Picker.Item label="Colombo" value="Colombo" />
          <Picker.Item label="Gampaha" value="Gampaha" />
          <Picker.Item label="Kalutara" value="Kalutara" />
          <Picker.Item label="Galle" value="Galle" />
          <Picker.Item label="Matara" value="Matara" />
          <Picker.Item label="Hambanthota" value="Hambanthota" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={[styles.button, { fontFamily: "Poppins-SemiBold" }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffff",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#CFFFC2",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: "poppins",
    fontSize: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "poppins",
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "poppins",
    color: "F5F5F5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    fontFamily: "poppins",
  },

  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    padding: 10,
    fontFamily: "poppins",
  },

  button: {
    backgroundColor: "#51B936",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    color: "#ffff",
    fontFamily: "poppins",
    fontSize: 18,
  },
});
