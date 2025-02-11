// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { PieChart } from 'react-native-chart-kit';

// const SeasonalReport = () => {
//   const navigation = useNavigation();
//   const [reportData, setReportData] = useState({
//     total_income: 0,
//     total_expense: 0,
//     balance: 0,
//   });

//   useEffect(() => {
//     fetchSeasonalReport();
//   }, []);

//   const fetchSeasonalReport = async () => {
//     try {
//       const token = await AsyncStorage.getItem("accessToken");
//       const response = await fetch("http://127.0.0.1:8000/personalFinanceTracker/seasonal-report/", {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setReportData(data);
//       } else {
//         Alert.alert("Error", "Failed to fetch report.");
//       }
//     } catch (error) {
//       console.error("Error fetching report:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Seasonal Report</Text>
//       <Text>Total Income: Rs. {reportData.total_income}</Text>
//       <Text>Total Expense: Rs. {reportData.total_expense}</Text>
//       <Text>Balance: Rs. {reportData.balance}</Text>

//       {/* Pie Chart */}
//       <PieChart
//         data={[
//           { name: "Income", amount: reportData.total_income, color: "green", legendFontColor: "#000", legendFontSize: 15 },
//           { name: "Expenses", amount: reportData.total_expense, color: "red", legendFontColor: "#000", legendFontSize: 15 },
//           { name: "Balance", amount: reportData.balance, color: "blue", legendFontColor: "#000", legendFontSize: 15 },
//         ]}
//         width={300}
//         height={220}
//         chartConfig={{
//           backgroundColor: "#f5f5f5",
//           backgroundGradientFrom: "#ffffff",
//           backgroundGradientTo: "#ffffff",
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           decimalPlaces: 2,
//         }}
//         accessor="amount"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         absolute
//       />
//       <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
//         <Text style={styles.buttonText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   button: { marginTop: 20, backgroundColor: "#FFD700", padding: 10, borderRadius: 10 },
//   buttonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
// });

// export default SeasonalReport;


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const SeasonalReport = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);
//   const [reportData, setReportData] = useState({
//     total_income: 0,
//     total_expense: 0,
//     balance: 0,
//   });

//   const fetchSeasonalReport = async () => {
//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem("accessToken");
//       if (!token) {
//         Alert.alert("Error", "You need to log in first.");
//         return;
//       }

//       const formattedStart = startDate.toISOString().split("T")[0];
//       const formattedEnd = endDate.toISOString().split("T")[0];

//       const response = await fetch(
//         `http://127.0.0.1:8000/personalFinanceTracker/seasonal-report/?start_date=${formattedStart}&end_date=${formattedEnd}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setReportData(data);
//       } else {
//         Alert.alert("Error", "Failed to fetch seasonal report.");
//       }
//     } catch (error) {
//       console.error("Error fetching seasonal report:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Seasonal Report</Text>

//       <Text>Select Start Date:</Text>
//       <DateTimePicker
//         value={startDate}
//         mode="date"
//         display="default"
//         onChange={(event, selectedDate) => setStartDate(selectedDate || startDate)}
//       />

//       <Text>Select End Date:</Text>
//       <DateTimePicker
//         value={endDate}
//         mode="date"
//         display="default"
//         onChange={(event, selectedDate) => setEndDate(selectedDate || endDate)}
//       />

//       <TouchableOpacity style={styles.button} onPress={fetchSeasonalReport}>
//         <Text style={styles.buttonText}>Generate Report</Text>
//       </TouchableOpacity>

//       {loading ? (
//         <ActivityIndicator size="large" color="green" />
//       ) : reportData ? (
//         <View style={styles.reportContainer}>
//           <Text>Total Income: Rs. {reportData.total_income}</Text>
//           <Text>Total Expense: Rs. {reportData.total_expense}</Text>
//           <Text>Balance: Rs. {reportData.balance}</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   button: { marginTop: 20, backgroundColor: "#FFD700", padding: 10, borderRadius: 10 },
//   buttonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
//   reportContainer: { marginTop: 20 },
// });

// export default SeasonalReport;

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
        `http://127.0.0.1:8000/personalFinanceTracker/seasonal-report/?start_date=${startDate}&end_date=${endDate}`,
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

      <Text style={styles.label}>Enter Start Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-01-01"
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text style={styles.label}>Enter End Date (YYYY-MM-DD):</Text>
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
          <Text>Total Income: Rs. {reportData.total_income}</Text>
          <Text>Total Expense: Rs. {reportData.total_expense}</Text>
          <Text>Balance: Rs. {reportData.balance}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginBottom: 15,
  },
  button: { marginTop: 20, backgroundColor: "#FFD700", padding: 10, borderRadius: 10 },
  buttonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  reportContainer: { marginTop: 20 },
});

export default SeasonalReport;
