import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";
import { getMainColorOfGraphicItem } from "recharts/types/util/ChartUtils";

type MonthlyReportScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "MonthlyReport"
>;

type ReportData = {
  total_income: number;
  total_expenses: number;
  balance: number;
  income_breakdown?: { [key: string]: number }; // Optional income breakdown
  expense_breakdown?: { [key: string]: number }; // Optional expense breakdown
};


const MonthlyReport = () => {
  const navigation = useNavigation<MonthlyReportScreenProp>();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
            navigation.setOptions({ headerShown: false }); 
        }, [navigation]);
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
        "https://api.aswenna.site/personalFinanceTracker/monthly-report/",
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('PersonalTrackerMain')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Monthly Report</Text>
      </View>
      <View style={styles.mainContainer}>
    
      <View style={styles.subcontainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#51b936" />
      ) : reportData ? (
        <>
        <Text style={styles.label}>Total Income: {reportData?.total_income ?? "Loading..."}</Text>
        <Text style={styles.label}>Total Expenses: {reportData?.total_expenses ?? "Loading..."}</Text>
        <Text style={styles.label}>Balance: {reportData?.balance ?? "Loading..."}</Text>

        {reportData?.expense_breakdown && (
          <Text>Expense Breakdown: {JSON.stringify(reportData.expense_breakdown)}</Text>
        )}

          {/* Pie Chart */}
          <PieChart
            width={300}
            height={200}
            backgroundColor="#77CB61"

            chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            paddingLeft="5"
            absolute

            data={[
              {
                name: "Income",
                amount: reportData.total_income,
                color: "yellow",
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
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff" },
  mainContainer: {
    padding: 20,
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
    paddingLeft: 60, 
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
  text: { fontSize: 18, marginBottom: 5 },
  subHeader: { fontSize: 20, fontWeight: "bold", marginTop: 10, color: "#333" },
  subcontainer:{
    backgroundColor: '#77CB61', 
    paddingLeft:70, 
    paddingRight: 70,
    paddingTop: 50,
    paddingBottom: 200, 
    borderRadius: 15,
    marginTop: 50
  },
  label :{
    fontSize: 18,
     marginBottom: 5, 
     fontWeight: 'semibold',
     margin: 15, 
     alignItems: 'center'
  },
  
});

export default MonthlyReport;
