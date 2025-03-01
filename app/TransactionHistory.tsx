import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import AsyncStorage from "@react-native-async-storage/async-storage";



type TransactionHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'TransactionHistory'
>;

type Transaction = {
    expense_type?: string;
    income_type?: string;
    amount: number;
    date: string;
    description?: string;
  };

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigation = useNavigation<TransactionHistoryScreenProp>();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Stored Token:", token);
      
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        return;
      }
  
      const response = await fetch('https://api.aswenna.site/personalFinanceTracker/transaction-history/', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Add the Authorization header
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
      } else if (response.status === 401) {
        Alert.alert("Unauthorized", "Your session has expired. Please log in again.");
        // Optionally, navigate to the login screen here
      } else {
        Alert.alert("Error", "Failed to fetch transactions. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
        <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
        >
        <Text style={styles.backButtonText}>←Back</Text>
        </TouchableOpacity>

      <Text style={styles.header}>Transaction History</Text>

      {transactions.length === 0 ? (
        <Text style={styles.noTransactionsText}>No transactions available.</Text>
      ) : (
        transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionCard}>
            <Text style={styles.transactionType}>
              {transaction.expense_type || transaction.income_type}
            </Text>
            <Text style={styles.transactionAmount}>Amount: Rs. {transaction.amount}</Text>
            <Text style={styles.transactionDate}>
              Date: {new Date(transaction.date).toDateString()}
            </Text>
            {transaction.description && (
              <Text style={styles.transactionDescription}>
                Description: {transaction.description}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D9FAD9',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noTransactionsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default TransactionHistory;
