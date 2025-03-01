import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SeasonalReport = () => {
  const [startDate, setStartDate] = useState(""); // Change to string
  const [endDate, setEndDate] = useState(""); // Change to string
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });

  const fetchSeasonalReport = async () => {
    if (!startDate || !endDate) {
      Alert.alert("Error", "Please enter both start and end dates!");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        return;
      }

      const response = await fetch(
        `https://api.aswenna.site/personalFinanceTracker/seasonal-report/?start_date=${startDate}&end_date=${endDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      } else {
        Alert.alert("Error", "Failed to fetch seasonal report.");
      }
    } catch (error) {
      console.error("Error fetching seasonal report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seasonal Report</Text>
      <View style={styles.subcontainer}>

      <Text style={styles.label}>Enter Start Date              (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-01-01"
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text style={styles.label}>Enter End Date              (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-01-31"
        value={endDate}
        onChangeText={setEndDate}
      />

      <TouchableOpacity style={styles.button} onPress={fetchSeasonalReport}>
        <Text style={styles.buttonText}>Generate Report</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : reportData ? (
        <View style={styles.reportContainer}>
          <Text style={styles.label1}>Total Income: Rs. {reportData.total_income}</Text>
          <Text style={styles.label1}>Total Expense: Rs. {reportData.total_expense}</Text>
          <Text style={styles.label1}>Balance: Rs. {reportData.balance}</Text>
        </View>
      ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 15, fontWeight: 'semibold' },
  input: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginBottom: 18,
  },
  button: { marginTop: 20, backgroundColor: "#FFD700", padding: 10, borderRadius: 10, alignItems: 'center' },
  buttonText: { fontSize: 16, color: "#000", fontWeight: "bold" },
  reportContainer: { marginTop: 20, justifyContent: 'center' },
  subcontainer:{
    backgroundColor: '#77CB61', 
    paddingLeft:70, 
    paddingRight: 70,
    paddingTop: 50,
    paddingBottom: 200, 
    borderRadius: 15,
    marginTop: 50
  },
  label1: { fontSize: 18, marginBottom: 15, fontWeight: 'bold' },
});

export default SeasonalReport;
