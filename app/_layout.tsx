// //  import React from "react";
// //  import { NavigationContainer } from "@react-navigation/native";
// //  import { createNativeStackNavigator } from "@react-navigation/native-stack";
// //  import LoginScreen from "../app/login"; // Assuming index.tsx is in the "app" folder
// //  import PasswordResetScreen from "./passwordReset"; // Assuming passwordReset.tsx is in the "app" folder
// //  import Homepage from "./Homepage";
// //  import DiseaseIdentificationScreen from "./DiseaseIdentification";
// //  import MarketPrice1 from "./MarketPrice1";

// //  const Stack = createNativeStackNavigator();

// //  export default function App() {
// //    return (
// //       <Stack.Navigator initialRouteName="Home">
// //          <Stack.Screen name="Login" component={LoginScreen} />
// //          <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
// //          <Stack.Screen name="Home" component={Homepage} /> 
// //          <Stack.Screen name="DiseaseIdentification" component={DiseaseIdentificationScreen} /> 
// //          <Stack.Screen name="MarketPrice" component={MarketPrice1 as React.ComponentType<{}>} /> 
// //          {/*<Stack.Screen name="Profile" component={Profile} />*/}  
// //       </Stack.Navigator>
// //    );
// // }


// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../app/login"; // Adjust path as needed
// import PasswordResetScreen from "./passwordReset"; // Adjust path as needed
// import Homepage from "./Homepage"; // Adjust path as needed
// import DiseaseIdentificationScreen from "./DiseaseIdentification"; // Adjust path as needed
// import MarketPrice1 from "./MarketPrice1"; // Adjust path as needed

// const Stack = createNativeStackNavigator();

// export default function Layout() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
//       <Stack.Screen name="Home" component={Homepage} />
//       <Stack.Screen name="DiseaseIdentification" component={DiseaseIdentificationScreen} />
//       <Stack.Screen name="MarketPrice" component={MarketPrice1 as React.ComponentType<{}>} />
//     </Stack.Navigator>
//   );
// }


import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}