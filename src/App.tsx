import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import ChatsOverviewScreen from './screens/chat/ChatsOverviewScreen';
import SplashScreen from './screens/SplashScreen';
import AddChatRoomScreen from './screens/chat/AddChatRoomScreen';
import ChatScreen from './screens/chat/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';

type RootStackParamList = {
  Login: undefined;
  ChatsOverview: undefined;
  Splash: undefined;
  AddChatRoom: undefined;
  ChatScreen: {chatRoom: object} | undefined;
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChatsOverview" component={ChatsOverviewScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        {/* <Stack.Screen name="AddChatRoom" component={AddChatRoomScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
