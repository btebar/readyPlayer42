import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ObjectDetection from './ObjectDetection';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerShown={false}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={ObjectDetection}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;