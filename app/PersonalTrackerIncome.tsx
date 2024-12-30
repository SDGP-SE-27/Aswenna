import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function PersonalTrackerIncome({ navigation }: any): React.JSX.Element {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false); // Close picker immediately on Android
    }
    if (selectedDate) {
      setDate(selectedDate); // Update date only if a valid date is selected
    }
  };
  

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => {
            if (navigation) navigation.goBack(); // Navigate back if navigation prop exists
          }}
        >
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal Finance Tracker</Text>
      </View>

      <View style={styles.body}>
        {/* Date Picker */}
        <Text style={styles.label}>Enter date :</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}

        {/* Category Buttons */}
        <Text style={styles.label}>Choose Category</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Reports Buttons */}
        <Text style={styles.label}>See Reports</Text>
        <View style={styles.reportContainer}>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportText}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportText}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportText}>End of Season</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/home-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/disease-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/finance-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/profile-icon.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backArrow: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    backgroundColor: "#D5F5DC",
    margin: 16,
    borderRadius: 10,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
  },
  reportContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  reportButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  reportText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#D5F5DC",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
