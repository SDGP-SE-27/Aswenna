// // import React, { useState } from "react";
// // import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
// // import { Ionicons } from '@expo/vector-icons'
// // import DateTimePickerModal from "react-native-modal-datetime-picker";

// // const PersonalFinanceTracker = ({navigation}: any) => {
// //   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

// //   const showDatePicker = () => {
// //     setDatePickerVisibility(true);
// //   };

// //   const hideDatePicker = () => {
// //     setDatePickerVisibility(false);
// //   };

// //   const handleConfirm = (date: any) => {
// //     console.warn("A date has been picked: ", date);
// //     hideDatePicker();
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <TouchableOpacity style={styles.backButton}>
// //           <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.navigate("Home")} />
// //         </TouchableOpacity>
// //         <Text style={styles.title}>Personal Finance Tracker</Text>
// //       </View>

// //       <View style={styles.content}>
// //         <Text style={styles.label}>Enter date:</Text>
// //         <View style={styles.dateInputContainer}>
// //         <DateTimePickerModal
// //         isVisible={isDatePickerVisible}
// //         mode="date"
// //         onConfirm={handleConfirm}
// //         onCancel={hideDatePicker}
// //       />

// //           <TouchableOpacity style={styles.calendarIcon}>
// //             <Ionicons name="calendar" size={24} color="black" />
// //           </TouchableOpacity>
// //         </View>

// //         <Text style={styles.label}>Choose Category:</Text>
// //         <View style={styles.categoryButtons}>
// //           <TouchableOpacity style={styles.categoryButton}>
// //             <Text style={styles.categoryButtonText}>Income</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.categoryButton}>
// //             <Text style={styles.categoryButtonText}>Expense</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <Text style={styles.label}>See Reports:</Text>
// //         <View style={styles.reportButtons}>
// //           <TouchableOpacity style={styles.reportButton}>
// //             <Text style={styles.reportButtonText}>Weekly</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.reportButton}>
// //             <Text style={styles.reportButtonText}>Monthly</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.reportButton}>
// //             <Text style={styles.reportButtonText}>End of Season</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>

// //       <View style={styles.bottomNav}>
// //              <TouchableOpacity style={styles.navButton}>
// //                <Image
// //                  source={require('../assets/icons/home.png')}
// //                  style={styles.navIcon}
// //                />
// //              </TouchableOpacity>
// //              <TouchableOpacity style={styles.navButton}>
// //                <Image
// //                  source={require('../assets/icons/disease_navbar.png')}
// //                  style={styles.navIcon}
// //                />
// //              </TouchableOpacity>
// //              <TouchableOpacity style={styles.navButton}>
// //                <Image
// //                  source={require('../assets/icons/price_navbar.png')}
// //                  style={styles.navIcon}
// //                />
// //              </TouchableOpacity>
// //              <TouchableOpacity style={styles.navButton}>
// //                <Image
// //                  source={require('../assets/icons/profile.png')}
// //                  style={styles.navIcon}
// //                />
// //              </TouchableOpacity>
// //            </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F0F0F0',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //   },
// //   backButton: {
// //     marginRight: 10,
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   content: {
// //     padding: 20,
// //   },
// //   label: {
// //     fontSize: 16,
// //     marginBottom: 5,
// //   },
// //   dateInputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 5,
// //     paddingHorizontal: 10,
// //   },
// //   dateInput: {
// //     flex: 1,
// //     marginRight: 5,
// //   },
// //   calendarIcon: {
// //     marginLeft: 5,
// //   },
// //   categoryButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 10,
// //   },
// //   categoryButton: {
// //     flex: 1,
// //     backgroundColor: '#4CAF50',
// //     borderRadius: 5,
// //     padding: 10,
// //     alignItems: 'center',
// //   },
// //   categoryButtonText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //   },
// //   reportButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     marginTop: 10,
// //   },
// //   reportButton: {
// //     backgroundColor: '#E0E0E0',
// //     borderRadius: 5,
// //     padding: 10,
// //     alignItems: 'center',
// //   },
// //   reportButtonText: {
// //     color: 'black',
// //   },
// //   bottomNav: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     backgroundColor: '#90EE90',
// //     padding: 10,
// //   },
// //   navButton: {
// //     // Add styling for navigation buttons
// //   },
// //   navIcon: {
// //     width: 30,
// //     height: 30,
// //   },
 
// // });

// //  export default PersonalFinanceTracker;

// import React, { useState } from "react";
// import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// interface Report {
//   type: string;
//   total: number;
// }

// const PersonalTrackerMain = ({ navigation }: any) => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [reports, setReports] = useState<Report[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [date, setDate] = useState<string | null>(null);

//   const BASE_URL = "http://127.0.0.1:8000"; // Replace with your backend URL in production

//   // Fetch reports based on report type
//   const fetchReports = async (reportType: string) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/finance/reports/?type=${reportType}`);
//       if (response.ok) {
//         const data = await response.json();
//         setReports(data);
//       } else {
//         console.error("Failed to fetch reports:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//     }
//   };

//   // Handle navigation when category is selected
//   const handleCategorySelection = (category: string) => {
//     // if (!date) {
//     //   alert("Please select a date first.");
//     //   return;
//     // }

//     if (category === "Income") {
//       navigation.navigate("PersonalTrackerIncome", { date });
//     } else if (category === "Expense") {
//       navigation.navigate("PersonalTrackerExpense", { date });
//     }
//   };

//   // Date picker handlers
//   const showDatePicker = () => {
//     console.log("Date picker opened!");
//     setDatePickerVisibility(true);
//   };
//   const hideDatePicker = () => setDatePickerVisibility(false);

//   const handleConfirm = (pickedDate: Date) => {
//     setDate(pickedDate.toISOString().split("T")[0]);
//     hideDatePicker();
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Personal Finance Tracker</Text>
//       </View>

//       <View style={styles.container}>
//         <Text style={styles.label}>Enter Date:</Text>
//         <TouchableOpacity style={styles.calendarButton} onPress={showDatePicker}>
//           <Ionicons name="calendar" size={24} color="white" />
//           <Text style={styles.buttonText}>Pick a Date</Text>
//         </TouchableOpacity>

//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           onConfirm={handleConfirm}
//           onCancel={hideDatePicker}
//         />

//         {date && <Text style={styles.selectedDate}>Selected Date: {date}</Text>}

//         <Text style={styles.label}>Choose Category:</Text>
//         <View style={styles.categoryButtons}>
//           <TouchableOpacity
//             style={[
//               styles.categoryButton,
//               selectedCategory === "Income" && styles.selectedButton,
//             ]}
//             onPress={() => handleCategorySelection("Income")}
//           >
//             <Text style={styles.categoryButtonText}>Income</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.categoryButton,
//               selectedCategory === "Expense" && styles.selectedButton,
//             ]}
//             onPress={() => handleCategorySelection("Expense")}
//           >
//             <Text style={styles.categoryButtonText}>Expense</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>Reports:</Text>
//         <View>
//           {reports.map((report, index) => (
//             <Text key={index} style={styles.label}>
//               {report.type || `Report ${index + 1}`}: {report.total || 0}
//             </Text>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#ffff",
//   },
//   calendarButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: { color: "white", marginLeft: 10, fontWeight: "bold" },
//   selectedDate: { marginTop: 20, fontSize: 16 },
//   header: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1000,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     backgroundColor: "#fff",
//   },
//   backButton: { marginRight: 10 },
//   title: { fontSize: 20, fontWeight: "bold" },
//   label: { fontSize: 16, marginBottom: 5, marginTop: 20 },
//   categoryButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
//   categoryButton: {
//     flex: 1,
//     backgroundColor: "#4CAF50",
//     borderRadius: 5,
//     padding: 10,
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   selectedButton: { backgroundColor: "#388E3C" },
//   categoryButtonText: { color: "white", fontWeight: "bold" },
// });

// export default PersonalTrackerMain;


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
      <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Personal Finance Tracker</Text>

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
      <Text style={styles.label}>See Reports:</Text>
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

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
                  <Image
                    source={require("../assets/images/home-icon.png")}
                    style={styles.footerIcon}
                  />
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification")}>
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
    backgroundColor: '#77CB61',
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
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
  },

  dateButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  dateButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#DFFFD8",
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0
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
  },
});

export default PersonalTrackerMain;
