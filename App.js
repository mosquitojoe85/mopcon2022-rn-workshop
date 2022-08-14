import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from "react";

const useCountdown = (defaultCount = 0, ms = 1000) => {
  const [count, setCount] = useState(defaultCount);

  useEffect(() => {
    const timmer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, ms);
    return () => clearInterval(timmer);
  }, []);
  return [count, setCount];
};

function HomeScreen({ navigation }) {
  const [count] = useCountdown(0, 1000);
  const [anotherCount] = useCountdown(0, 500);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>You countdown {count} times</Text>
      <Text>You countdown {anotherCount} times</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;