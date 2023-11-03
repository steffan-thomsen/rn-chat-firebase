import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {FC, useLayoutEffect} from 'react';
import auth from '@react-native-firebase/auth';

import tw from 'twrnc';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    auth().onAuthStateChanged(currentUser => {
      if (!currentUser) {
        navigation.replace('Login');
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
    </View>
  );
};

export default SplashScreen;
