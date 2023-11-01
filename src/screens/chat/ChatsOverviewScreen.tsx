import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import tw from 'twrnc';

interface ChatsOverviewScreenProps {
  navigation: any;
}

const ChatsOverviewScreen: React.FC<ChatsOverviewScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setLoading(false);
      if (!currentUser) {
        navigation.replace('Login');
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [navigation]);

  function logoutHandler() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));

    navigation.replace('Login');
  }

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Pressable onPress={logoutHandler}>
          <Text>Welcome {user?.displayName}, Logout</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ChatsOverviewScreen;
