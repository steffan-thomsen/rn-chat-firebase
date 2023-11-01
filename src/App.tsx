import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import ChatsOverviewScreen from './screens/chat/ChatsOverviewScreen';

type RootStackParamList = {
  Login: undefined;
  ChatsOverview: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChatsOverview" component={ChatsOverviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
