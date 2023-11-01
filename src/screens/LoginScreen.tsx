import React, {FC, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import tw from 'twrnc';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {useNavigation} from '@react-navigation/native';

const LoginScreen: FC = ({navigation}: any) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '796074681554-0u979m1a7dc8u3hfodu80napq3tjpl2r.apps.googleusercontent.com',
    });
  });
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log('credential: ', googleCredential);
      await auth().signInWithCredential(googleCredential);

      if (googleCredential.token) {
        navigation.replace('Test');
      }
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
    }
  };

  const handleFBBtnClick = (event: GestureResponderEvent) => {
    console.log('click fb btn');
  };
  return (
    <View
      style={tw`flex justify-between items-center bg-black h-full w-full pt-28`}>
      <View
        style={tw`w-full h-full bg-white rounded-tl-[90px] flex items-center justify-between py-6 px-6 mt-6`}>
        <Image
          source={require('../assets/images/NTO-logo.png')}
          style={tw`h-32 w-32 shadow-md`}
        />
        <Text style={tw`text-xl font-bold my-10`}>Welcome to the NTO Chat</Text>
        <View style={tw`mt-24 flex-1 w-full px-4`}>
          <TouchableOpacity
            onPress={signInWithGoogle}
            style={tw`shadow-lg bg-white p-3 rounded-full w-full mb-8`}>
            <View style={tw`flex-row justify-center items-center px-8 gap-4`}>
              <Image
                source={require('../assets/images/google_icon.png')}
                style={tw`h-8 w-8`}
              />
              <Text style={tw`text-center text-gray-600 text-lg font-bold`}>
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFBBtnClick}
            style={tw`shadow-lg bg-white p-3 rounded-full w-full mb-8`}>
            <View style={tw`flex-row justify-center items-center px-8 gap-4`}>
              <Image
                source={require('../assets/images/facebook_icon.png')}
                style={tw`h-8 w-8`}
              />
              <Text style={tw`text-center text-gray-600 text-lg font-bold`}>
                Sign in with Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
