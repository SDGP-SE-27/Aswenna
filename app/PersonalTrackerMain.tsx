import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PersonalFinanceTracker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Finance Tracker</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Enter date:</Text>
        <View style={styles.dateInputContainer}>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

          <TouchableOpacity style={styles.calendarIcon}>
            <Ionicons name="calendar" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Choose Category:</Text>
        <View style={styles.categoryButtons}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Expense</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>See Reports:</Text>
        <View style={styles.reportButtons}>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>End of Season</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomNav}>
             <TouchableOpacity style={styles.navButton}>
               <Image
                 source={require('../assets/icons/home.png')}
                 style={styles.navIcon}
               />
             </TouchableOpacity>
             <TouchableOpacity style={styles.navButton}>
               <Image
                 source={require('../assets/icons/disease_navbar.png')}
                 style={styles.navIcon}
               />
             </TouchableOpacity>
             <TouchableOpacity style={styles.navButton}>
               <Image
                 source={require('../assets/icons/price_navbar.png')}
                 style={styles.navIcon}
               />
             </TouchableOpacity>
             <TouchableOpacity style={styles.navButton}>
               <Image
                 source={require('../assets/icons/profile.png')}
                 style={styles.navIcon}
               />
             </TouchableOpacity>
           </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dateInput: {
    flex: 1,
    marginRight: 5,
  },
  calendarIcon: {
    marginLeft: 5,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  reportButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  reportButtonText: {
    color: 'black',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#90EE90',
    padding: 10,
  },
  navButton: {
    // Add styling for navigation buttons
  },
  navIcon: {
    width: 30,
    height: 30,
  },
 
});

export default PersonalFinanceTracker;