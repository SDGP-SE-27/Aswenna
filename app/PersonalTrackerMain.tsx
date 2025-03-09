import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
      navigation.setOptions({ headerShown: false }); 
    }, [navigation]);
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

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Finance Tracker</Text>
      </View>
      
      <View style={styles.mainContainer}>
  
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
      </View>
      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
                  <Image
                    source={require("../assets/images/home_icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification2")}>
                  <Image
                    source={require("../assets/images/disease_icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate("PersonalTrackerMain")}>
                  <Image
                    source={require("../assets/images/finance_icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                  <Image
                    source={require("../assets/images/profile_icon.png")}
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
    paddingLeft: 30, 
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
