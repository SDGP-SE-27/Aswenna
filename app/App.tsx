import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";


import Homepage from "./Homepage";
import DiseaseIdentificationScreen from "./DiseaseIdentification";
import commonregistration1 from "./commonregistration1";
import commonregistration2 from "./commonregistration2";
import chatscreen from "./ChatScreen";
import login from "./login"; 
// import SelectLanguage from "./SelectLanguage";
import PersonalTrackerExpense from "./PersonalTrackerExpense";
import PersonalTrackerIncome from "./PersonalTrackerIncome";
import PersonalTrackerMain from "./PersonalTrackerMain";
import TransactionHistory from "./TransactionHistory";
import Buildyourfarmland from "./Buildyourfarmland";
import Chooserole from "./Chooserole";
import MarketPrice1 from "./MarketPrice1";
import MarketPrice2 from "./MarketPrice2";
// import MarketPrice3 from "./MarketPrice3";
import SupplementReminder1 from "./SupplementReminder1";
import SupplementReminder2 from "./SupplementReminder2";
import passwordReset from "./passwordReset";
import DiseaseIdentification2 from "./DiseaseIdentification2";
import WeeklyReport from "./WeeklyReport";
import MonthlyReport from "./MonthlyReport";
import SeasonalReport from "./SeasonalReport";
import seller_dashboard from "./seller_dashboard";
import WeatherForecast from "./WeatherForecast"
import NotifiScreen from "./NotifiScreen";
import shopItem from "./shopItem";
import ItemDetails from "./ItemDetails";
import buyergomap from "./buyergomap";
import buyersItem from "./buyersItem";


const Stack = createNativeStackNavigator<RootStackParamList>() ;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Homepage} />
        {/* <Stack.Screen name="Notifications" component={FertilizerRemindersScreen} /> */}
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="commonregistration1"  component={commonregistration1}/>
        <Stack.Screen name="commonregistration2" component={commonregistration2} /> 
        <Stack.Screen name="DiseaseIdentification" component={DiseaseIdentificationScreen} />
        <Stack.Screen name="Buildyourfarmland" component={Buildyourfarmland} />
        
        {/* <Stack.Screen name="Chatscreen" component={chatscreen} /> */}
        <Stack.Screen name = "PersonalTrackerMain" component={PersonalTrackerMain}/>
        <Stack.Screen name = "PersonalTrackerIncome" component={PersonalTrackerIncome}/>
        <Stack.Screen name = "PersonalTrackerExpense" component={PersonalTrackerExpense} />
        <Stack.Screen name = "TransactionHistory" component={TransactionHistory}/>
        {/* <Stack.Screen name = "SelectLanguage" component={SelectLanguage}/> */}
        <Stack.Screen name = "Chooserole" component={Chooserole}/>
        <Stack.Screen name="MarketPrice1" component={MarketPrice1}/>
        <Stack.Screen name= "MarketPrice2" component={MarketPrice2}/>
        {/* <Stack.Screen name= "MarketPrice3" component={MarketPrice3}/> */}
        <Stack.Screen name = "SupplementReminder1" component={SupplementReminder1}/>
        <Stack.Screen name = "SupplementReminder2" component={SupplementReminder2}/>
        <Stack.Screen name ="passwordReset" component={passwordReset}/>
        <Stack.Screen name="DiseaseIdentification2" component={DiseaseIdentification2}/>
        <Stack.Screen name = "WeeklyReport" component={WeeklyReport}/>
        <Stack.Screen name = "MonthlyReport" component={MonthlyReport}/>
        <Stack.Screen name = "SeasonalReport" component={SeasonalReport}/>
        <Stack.Screen name="seller_dashboard" component={seller_dashboard}/>
        <Stack.Screen name = "WeatherForecast" component = {WeatherForecast}/>
        <Stack.Screen name="NotifiScreen" component={NotifiScreen} />
        <Stack.Screen name= "shopItem" component={shopItem}/>
        <Stack.Screen name= "ItemDetails" component={ItemDetails}/>
        <Stack.Screen name= "buyergomap" component={buyergomap}/>
        <Stack.Screen name= "buyersItem" component={buyersItem}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
