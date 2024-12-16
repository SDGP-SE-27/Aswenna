// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./index"; // Assuming index.tsx is in the "app" folder
// import PasswordResetScreen from "./passwordReset"; // Assuming passwordReset.tsx is in the "app" folder

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


//http://localhost:8081/_sitemap

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import HomeScreen from "./HomeScreen";
import DiseaseIdentificationScreen from "./DiseaseIdentification";
//import MarketPredictionScreen from "./MarketPredictionScreen";
//import ProfileScreen from "./ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/*<Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="DiseaseIdentification" component={DiseaseIdentificationScreen} />
       {/*} <Stack.Screen name="MarketPrediction" component={MarketPredictionScreen} /> */}
       {/*} <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
