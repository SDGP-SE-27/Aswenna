// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {Picker} from '@react-native-picker/picker';
// import { RootStackParamList } from './types';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useRoute, RouteProp } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import TransactionHistory from './TransactionHistory';


// type IncomeScreenRouteProp = RouteProp<RootStackParamList, 'PersonalTrackerIncome'>;

// type PersonalTrackerMainScreenProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'PersonalTrackerIncome'
// >;

// const PersonalTrackerIncome = () => {
//   const navigation = useNavigation<PersonalTrackerMainScreenProp>();
//   const [incomeType, setIncomeType] = useState('');
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const route = useRoute<IncomeScreenRouteProp>();
//   const [date, setDate] = useState<Date>(new Date());
//   const [showPicker, setShowPicker] = useState(false);
 

//   const handleReset = () => {
//     setIncomeType('');
//     setAmount('');
//     setDescription('');
//   };

//   const handleDateChange = (event: any, selectedDate?: Date) => {
//     setShowPicker(false); // Hide picker after selection
//     if (selectedDate) {
//       setDate(selectedDate); // Update date state
//     }
//   }  


//   const handleConfirm = async () => {
//     if (!incomeType || !amount) {
//       Alert.alert('Error', 'Please enter a valid amount.');
//       return;
//     }

//     if(isNaN(Number(amount))){
//       Alert.alert('Error' , 'Amount must be valid number'); 
//       return;

//     }

//     const data = {
//       income_type: incomeType,
//       amount: parseFloat(amount), // Ensure amount is a number
//       description,
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:8000/personalFinanceTracker/add-income', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
       
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         Alert.alert('Success', responseData.message || 'Income saved successfully!');
//         handleReset(); // Reset fields after successful save
//       } else {
//         const errorData = await response.json();
//         console.error('Error saving income:', errorData);
//         Alert.alert('Error', 'Failed to save the income. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'Cannot connect to the server. Please try again later.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.backButtonText}>←Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.header}>Personal Finance Tracker</Text>
      
//       <Text style={styles.label1}>Choose Date</Text>

//       <TouchableOpacity
//         style={styles.dateButton}
//         onPress={() => setShowPicker(true)}
//       >
//         <Text style={styles.dateButtonText}>
//           {date.toISOString().split('T')[0]} {/* Display selected date */}
//         </Text>
//       </TouchableOpacity>
      
//       {showPicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default" // "spinner" or "calendar"
//           onChange={handleDateChange}
//         />
//       )} 
      
//       <View style={styles.form}>
//         <Text style={styles.label}>Choose income type:</Text>
//         <View style={styles.picker}>
//           <Picker
//             selectedValue={incomeType}
//             onValueChange={(itemValue: React.SetStateAction<string>) => setIncomeType(itemValue)}
//           >
//             <Picker.Item label="Harvesting income" value="Harvesting income" />
//             <Picker.Item label="Other income" value="Other income" />
//             {/* Add more options here */}
//           </Picker>
//         </View>

//         <Text style={styles.label}>Enter amount (Rs.):</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           value={amount}
//           onChangeText={(text) => setAmount(text)}
//         />

//         <Text style={styles.label}>Enter description (optional):</Text>
//         <TextInput
//           style={styles.textArea}
//           value={description}
//           onChangeText={(text) => setDescription(text)}
//           multiline
//           numberOfLines={4}
//         />

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
//             <Text style={styles.buttonText}>Reset</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
//             <Text style={styles.buttonText}>Confirm</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.addTransactionButton}>
//           <Text style={styles.buttonText}>Add new transaction</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//         style={styles.transactionHistory}
//         onPress={() => navigation.navigate('TransactionHistory')}
//         >
//         <Text style={styles.transactionHistoryText}>Transaction History</Text>
//         </TouchableOpacity>


//       </View>
//     </ScrollView>
//   );
// };

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
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PersonalTrackerIncomeScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'PersonalTrackerIncome'
>;

const PersonalTrackerIncome = () => {
  const navigation = useNavigation<PersonalTrackerIncomeScreenProp>();

  // States for form fields
  const [incomeType, setIncomeType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({
    incomeType: '',
    amount: '',
    date: '',
  });

  // Reset form fields
  const handleReset = () => {
    setIncomeType('');
    setAmount('');
    setDescription('');
    setDate('');
    setErrors({ incomeType: '', amount: '', date: '' }); // Clear errors
  };

  // Validation and submission
  const handleSubmit = async (): Promise<boolean> => {
    let isValid = true;
    const newErrors = { incomeType: '', amount: '', date: '' };

    // Validate expense type
    if (!incomeType) {
      newErrors.incomeType = 'Income type is required.';
      isValid = false;
    }

    // Validate amount
    if (!amount) {
      newErrors.amount = 'Amount is required.';
      isValid = false;
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a valid positive number.';
      isValid = false;
    }

    // Validate date
    if (!date.trim()) {
      newErrors.date = 'Date is required.';
      isValid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      newErrors.date = 'Date must be in YYYY-MM-DD format.';
      isValid = false;
    }

    // Update errors state
    setErrors(newErrors);

    // Stop submission if validation fails
    if (!isValid) return false;

    // Prepare data for submission
    const data = {
      income_type: incomeType,
      amount: parseFloat(amount),
      description: description || '',
      date: date,
    };

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        setErrors({ ...newErrors, amount: 'You need to log in first.' });
        return false;
      }

      const response = await fetch('http://127.0.0.1:8000/personalFinanceTracker/add-income/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        handleReset(); // Reset form after successful submission
        return true;
      } else {
        const errorData = await response.json();
        console.error('Error saving income:', errorData);
        setErrors({ ...newErrors, amount: 'Failed to save the income. Please try again.' });
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ ...newErrors, amount: 'Cannot connect to the server. Please try again later.' });
      return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("PersonalTrackerMain")}
      >
        <Text style={styles.backButtonText}>←Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Personal Finance Tracker</Text>

      {/* Date Input */}
      <Text style={styles.label}>Enter Date:</Text>
      <TextInput
        style={[styles.input, errors.date ? styles.inputError : null]}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}

      {/* Expense Type Picker */}
      <Text style={styles.label}>Choose Income Type:</Text>
      <View style={[styles.picker, errors.incomeType ? styles.inputError : null]}>
        <Picker
          selectedValue={incomeType}
          onValueChange={(itemValue: React.SetStateAction<string>) => setIncomeType(itemValue)}
        >
          <Picker.Item label="Select an income type" value="" />
          <Picker.Item label="Harvesting income" value="Harvesting income" />
          <Picker.Item label="Other income" value="Other income" />
        </Picker>
      </View>
      {errors.incomeType ? <Text style={styles.errorText}>{errors.incomeType}</Text> : null}

      {/* Amount Input */}
      <Text style={styles.label}>Enter Amount:</Text>
      <TextInput
        style={[styles.input, errors.amount ? styles.inputError : null]}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}

      {/* Description Input */}
      <Text style={styles.label}>Enter Description (Optional):</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={5}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.transactionHistory}
        onPress={() => navigation.navigate('TransactionHistory')}
      >
        <Text style={styles.transactionHistoryText}>Transaction History</Text>
      </TouchableOpacity>
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
  label1: {
    fontSize: 16,
    marginRight:250,
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
  dateButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 18,
    marginRight: 250,
    marginBottom: 10
  },
  dateButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default PersonalTrackerIncome;



