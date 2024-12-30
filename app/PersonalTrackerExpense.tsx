import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const PersonalFinanceTracker = () => {
  const navigation = useNavigation();
  const [expenseType, setExpenseType] = useState('Land Preparation expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleReset = () => {
    setAmount('');
    setDescription('');
  };

  const handleConfirm = () => {
    console.log('Expense Confirmed:', { expenseType, amount, description });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Personal Finance Tracker</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Choose expense type:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={expenseType}
            onValueChange={(itemValue: React.SetStateAction<string>) => setExpenseType(itemValue)}
          >
            <Picker.Item label="Land Preparation expense" value="Land Preparation expense" />
            <Picker.Item label="Other Expense" value="Other Expense" />
            {/* Add more options here */}
          </Picker>
        </View>

        <Text style={styles.label}>Enter amount (Rs.):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <Text style={styles.label}>Enter description (optional):</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addTransactionButton}>
          <Text style={styles.buttonText}>Add new transaction</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.transactionHistory}>
          <Text style={styles.transactionHistoryText}>Transaction History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D9FAD9',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#FFE4B5',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  confirmButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addTransactionButton: {
    backgroundColor: '#A8E4A0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  transactionHistory: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  transactionHistoryText: {
    textAlign: 'center',
  },
});

export default PersonalFinanceTracker;
