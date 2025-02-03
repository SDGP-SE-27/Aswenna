import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-chart-kit";

type ReportData = {
  total_income: number;
  total_expenses: number;
  balance: number;
  income_breakdown?: { [key: string]: number }; // Optional income breakdown
  expense_breakdown?: { [key: string]: number }; // Optional expense breakdown
};


const MonthlyReport = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/personalFinanceTracker/monthly-report/",
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
        Alert.alert("Error", "Failed to fetch report.");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Monthly Report</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#51b936" />
      ) : reportData ? (
        <>
        <Text>Total Income: {reportData?.total_income ?? "Loading..."}</Text>
        <Text>Total Expenses: {reportData?.total_expenses ?? "Loading..."}</Text>
        <Text>Balance: {reportData?.balance ?? "Loading..."}</Text>

        {reportData?.expense_breakdown && (
          <Text>Expense Breakdown: {JSON.stringify(reportData.expense_breakdown)}</Text>
        )}

          {/* Pie Chart */}
          <PieChart
            width={300}
            height={200}
            backgroundColor="#ffff"

            chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            paddingLeft="15"
            absolute

            data={[
              {
                name: "Income",
                amount: reportData.total_income,
                color: "green",
                legendFontColor: "#000",
                legendFontSize: 14,
              },
              {
                name: "Expenses",
                amount: reportData.total_expenses,
                color: "red",
                legendFontColor: "#000",
                legendFontSize: 14,
              },
              {
                name: "Balance",
                amount: reportData.balance,
                color: "blue",
                legendFontColor: "#000",
                legendFontSize: 14,
              },
            ]}

          />
        </>
      ) : (
        <Text>No data available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  text: { fontSize: 18, marginBottom: 5 },
  subHeader: { fontSize: 20, fontWeight: "bold", marginTop: 10, color: "#333" },
  
});

export default MonthlyReport;
