import { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SendScreen from "./screens/SendScreen";
import QRCodeScreen from "./screens/QRCodeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function App() {
  const [isInitial, setIsInitial] = useState(false);
  const [initialScreen, setInitialScreen] = useState("Welcome");

  useEffect(() => {
    AsyncStorage.getItem("account").then((accountStr) => {
      if (accountStr) {
        setInitialScreen("Home");
      } else {
        setInitialScreen("Welcome");
      }

      setIsInitial(true);
    });
  }, []);

  if (isInitial) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialScreen}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SendETH" component={SendScreen} />
          <Stack.Screen name="Qrcode" component={QRCodeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default App;