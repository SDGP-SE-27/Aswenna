import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";

function AIDashBoard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [addFarmerModalVisible, setAddFarmerModalVisible] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<string[] | null>(null);
  const [newFarmer, setNewFarmer] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [farmerList, setFarmerList] = useState<string[][]>([
    ["John Doe", "123456789", "District 01"],
    ["Tim Smith", "987654321", "District 02"],
    ["Alan Jones", "000000001", "District 03"],
  ]);

  const fetchFarmerById = (id: string) => {
    const farmer = farmerList.find((farmer) => farmer[1] === id);
    if (farmer) {
      setSelectedFarmer(farmer);
    } else {
      console.log("Farmer not found");
    }
  };

  const ValidateAddFarmer = () => {
    let empty = false;

    if (newFarmer === "") {
      setIsEmpty(true);
      empty = true;
    } else {
      setIsEmpty(false);
    }

    if (isNaN(Number(newFarmer))) {
      setIsInvalid(true);
      empty = true;
    } else {
      setIsInvalid(false);
    }
  };

  const FarmerDetails = () => {
    return farmerList.map((farmer) => (
      <View style={styles.farmer} key={farmer[1]}>
        <Image
          source={require("../assets/icons/farmer_2.png")}
          style={styles.farmer_icon}
        />
        <View style={{ flexDirection: "column", paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              DisplayPopUp(farmer[1]);
            }}
          >
            <Text style={{ fontSize: 20 }}>{farmer[0]}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 15 }}>{farmer[1]}</Text>
            <Text style={{ fontSize: 15, paddingLeft: 10 }}>{farmer[2]}</Text>
          </View>
        </View>
        <Image
          source={require("../assets/images/camera_icon.png")}
          style={styles.chat_icon}
        />
      </View>
    ));
  };

  const DisplayPopUp = (farmerId: string) => {
    fetchFarmerById(farmerId);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Image
          source={require("../assets/icons/farmer_2.png")}
          style={styles.user_icon}
        />
      </View>

      <View style={styles.horizontalLine} />
      <FarmerDetails />

      {/* Modal for viewing farmer details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <BlurView style={styles.absoluteBlur} intensity={10} tint="light" />
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontWeight: "bold" }}> X </Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Farmer Details</Text>
            {selectedFarmer && (
              <>
                <Text style={styles.modelContent}>
                  Name: {selectedFarmer[0]}
                </Text>
                <Text style={styles.modelContent}>ID: {selectedFarmer[1]}</Text>
                <Text style={styles.modelContent}>
                  District: {selectedFarmer[2]}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for adding a new farmer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addFarmerModalVisible}
        onRequestClose={() => {
          setAddFarmerModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <BlurView style={styles.absoluteBlur} intensity={10} tint="light" />
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAddFarmerModalVisible(false)}
            >
              <Text style={{ fontWeight: "bold" }}> X </Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Farmer</Text>
            <TextInput
              placeholder="ID"
              style={[
                styles.input,
                isEmpty && styles.incorrectField,
                isInvalid && styles.incorrectField,
              ]}
              value={newFarmer}
              onChangeText={(text) => setNewFarmer(text)}
              keyboardType="numeric"
            />

            {isEmpty && (
              <Text style={styles.emptyFieldText}>
                Please enter a value for ID
              </Text>
            )}

            {isInvalid && (
              <Text style={styles.emptyFieldText}>Please enter a valid ID</Text>
            )}
            <Button title="Add Farmer" onPress={ValidateAddFarmer} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.newFarmer}
        onPress={() => setAddFarmerModalVisible(true)}
      >
        <Image
          source={require("../assets/images/apple_icon.png")}
          style={styles.add_icon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default AIDashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "100%",
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    borderColor: "black",
    borderWidth: 1,
    position: "absolute",
    left: "45%",
    transform: [{ translateX: -50 }],
  },

  user_icon: {
    width: 50,
    height: 50,
    marginLeft: "auto",
  },

  farmer_icon: {
    width: 50,
    height: 50,
  },

  farmer: {
    margin: 7,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    borderBottomWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },

  chat_icon: {
    width: 35,
    height: 35,
    marginLeft: "auto",
    borderRadius: 10,
    shadowColor: "black",
  },

  newFarmer: {
    margin: 7,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    borderBottomWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },

  add_icon: {
    width: 20,
    height: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },

  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgba(255, 0, 0, 0.88)",
  },

  modelContent: {
    padding: 2,
  },

  absoluteBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  newFarmerInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    width: "80%",
  },

  incorrectField: {
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 10,
  },

  newFarmerContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "100%",
  },

  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
    marginTop: 10,
  },

  emptyFieldText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
