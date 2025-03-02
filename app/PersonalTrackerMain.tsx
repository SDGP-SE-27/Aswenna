import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';

type PersonalTrackerMainScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'PersonalTrackerMain'
>;

const PersonalTrackerMain = () => {
  const navigation = useNavigation<PersonalTrackerMainScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "Homepage">>();
  const [category, setCategory] = useState<string | null>(null);() => {

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    if (selectedCategory === 'Income') {
      navigation.navigate('PersonalTrackerIncome');
    } else if (selectedCategory === 'Expense') {
      navigation.navigate('PersonalTrackerExpense');
    }
  }  
};

return (
    <View style={styles.container}>

      <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
      >
 
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Personal Finance Tracker</Text>
  
      <View style={styles.subcontainer}>
      {/* choose category */}
      <Text style={styles.label}>Choose Category:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.categoryButton}
           onPress={() => navigation.navigate('PersonalTrackerIncome')}
        >
          <Text style={styles.buttonText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate('PersonalTrackerExpense')}
        >
          <Text style={styles.buttonText}>Expense</Text>
        </TouchableOpacity>
      </View>


      {/* Reports section */}
      <Text style={styles.label1}>See Reports </Text>
      <View style={styles.reportsContainer}>

        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('WeeklyReport')}>
          <Text style={styles.buttonText}>Weekly</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('MonthlyReport')}>
          <Text style={styles.buttonText}>Monthly</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('SeasonalReport')}>
          <Text style={styles.buttonText}>End of Season</Text>
        </TouchableOpacity>

        </View>

      </View>

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
                  <Image
                    source={require("../assets/images/home-icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification2")}>
                  <Image
                    source={require("../assets/images/disease-icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate("PersonalTrackerMain")}>
                  <Image
                    source={require("../assets/images/finance-icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
                  <Image
                    source={require("../assets/images/profile-icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    fontSize: 20,
    color: '#000',
    marginVertical: 10,
    fontWeight: 'semibold',
    marginTop: 50, 
  },
    label1: {
    fontSize: 20,
    color: '#000',
    marginVertical: 10,
    fontWeight: 'semibold', 
    marginTop: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  reportsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  reportButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flex:1,
    marginHorizontal: 5,
    alignItems: 'center',
    marginTop: 15
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#DFFFD8",
    position: "absolute",
    width: "90%",
    bottom: 15,
    alignSelf: "center",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#E0F8E0',
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
    bottom: 0
  },
  subcontainer:{
    backgroundColor: '#77CB61', 
    padding:30, 
    paddingBottom: 200, 
    borderRadius: 15
  }
});

export default PersonalTrackerMain;
