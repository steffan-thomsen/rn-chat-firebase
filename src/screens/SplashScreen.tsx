import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {FC, useLayoutEffect} from 'react';
import auth from '@react-native-firebase/auth';

import tw from 'twrnc';

const SplashScreen: FC = ({navigation}: any) => {
  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    auth().onAuthStateChanged(currentUser => {
      if (!currentUser) {
        navigation.replace('Login');
      } else {
        navigation.replace('ChatsOverview');
      }
    });
  };
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image
        source={require('../assets/images/NTO-logo.png')}
        style={tw`w-24 h-24`}
        resizeMode="contain"
      />
      <ActivityIndicator size={'large'} color={'#000'} />
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
