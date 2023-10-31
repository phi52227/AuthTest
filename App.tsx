// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import Phone from './screens/Phone';
import Address from './screens/Address';
import Menu from './screens/Menu';
import CompareAddr from './screens/CompareAddr';
import PhoenAuth from './screens/PhoneAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Phone" component={Phone} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="CompareAddr" component={CompareAddr} />
        <Stack.Screen name="PhoneAuth" component={PhoenAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
