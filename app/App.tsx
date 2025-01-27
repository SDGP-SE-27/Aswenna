import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeScreen from "./Homepage";
import DiseaseIdentificationScreen from "./DiseaseIdentification";
import MarketPrice1 from "./MarketPrice1";
import MarketPredictionScreen2 from "./MarketPrice2";
import MarketPredictionScreen3 from "./MarketPrice3";
import commonregistration1 from "./commonregistration1";
import commonregistration2 from "./commonregistration2";
import commonregistration3 from "./commonregistration3";
import buildfarmland from "./Buildyourfarmland";
import chatscreen from "./ChatScreen";
import login from "./login";
import passwordReset from "./passwordReset";
import PersonalTrackerexpense from "./PersonalTrackerExpense";
import PersonalTrackerIncome from "./PersonalTrackerIncome";
import PersonalFinanceTracker from "./PersonalTrackerMain";
import SelectLanguage from "./SelectLanguage";
import CropListScreen from "./SupplementReminder1";
import ReminderHistoryScreen from "./SupplementReminder2";
import Welcome from "./Welcome";
import Buildyourfarmland from "./Buildyourfarmland";
// import Chooserole from "./Chooserole";
import WeatherForecasting from "./WeatherForecast";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen name="Home" component={Homepage}/> */}
        <Stack.Screen name="login" component={login}/>
        <Stack.Screen name="CommonRegistration1" component={commonregistration1} />
        <Stack.Screen name="CommonRegistration2" component={commonregistration2} />
        <Stack.Screen name= "CommonRegistration3" component={commonregistration3}/>
        {/* <Stack.Screen name= "CommonRegistration3" component={PersonalFinanceTracker}/> */}
        <Stack.Screen name="DiseaseIdentification" component={DiseaseIdentificationScreen} />
        <Stack.Screen name="Buildyourfarmland" component={Buildyourfarmland} />
        <Stack.Screen name="Chatscreen" component={chatscreen} />
        <Stack.Screen name="WeatherForcast" component={WeatherForecasting} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}