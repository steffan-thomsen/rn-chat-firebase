import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import ChatsOverviewScreen from './screens/chat/ChatsOverviewScreen';
import SplashScreen from './screens/SplashScreen';
import ChatScreen from './screens/chat/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type RootStackParamList = {
  Login: undefined;
  ChatsOverview: undefined;
  Splash: undefined;
  AddChatRoom: undefined;
  ChatScreen: {chatRoom: object} | undefined;
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatsOverview" component={ChatsOverviewScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (!currentUser) {
        setUser(null);
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
