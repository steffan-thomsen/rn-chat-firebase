import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

const ChatsOverviewScreen = ({navigation}: any) => {
  useLayoutEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.replace('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View>
      <Text>Protected Screen</Text>
    </View>
  );
};

export default ChatsOverviewScreen;
