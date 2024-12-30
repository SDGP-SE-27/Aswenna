 import React from "react";
 import { NavigationContainer } from "@react-navigation/native";
 import { createNativeStackNavigator } from "@react-navigation/native-stack";
 import LoginScreen from "../app/login"; // Assuming index.tsx is in the "app" folder
 import PasswordResetScreen from "./passwordReset"; // Assuming passwordReset.tsx is in the "app" folder
 import Homepage from "./Homepage";
 import DiseaseIdentificationScreen from "./DiseaseIdentification";
 import MarketPrice1 from "./MarketPrice1";

 const Stack = createNativeStackNavigator();

 export default function App() {
   return (
      <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
         <Stack.Screen name="Home" component={Homepage} /> 
         <Stack.Screen name="DiseaseIdentification" component={DiseaseIdentificationScreen} /> 
         <Stack.Screen name="MarketPrice" component={MarketPrice1 as React.ComponentType<{}>} /> 
         {/*<Stack.Screen name="Profile" component={Profile} />*/}  
      </Stack.Navigator>
   );
}
