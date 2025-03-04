import React, { useEffect, useState } from "react";
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
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type SeasonalReportScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'SeasonalReport'
>;

const SeasonalReport = () => {
  const navigation = useNavigation<SeasonalReportScreenProp>();
  const [startDate, setStartDate] = useState(""); // Change to string
  const [endDate, setEndDate] = useState(""); // Change to string
  const [loading, setLoading] = useState(false);
  useEffect(() => {
                navigation.setOptions({ headerShown: false }); 
            }, [navigation]);
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('PersonalTrackerMain')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seasonal Report</Text>
      </View>
            
      <View style={styles.mainContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
    paddingLeft: 50, 
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
