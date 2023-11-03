import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import tw from 'twrnc';
import LoadingOverlay from '../components/LoadingOverlay';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (!currentUser) {
        setUser(null);
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  const logoutHandler = () => {
    setLoading(true);

    auth()
      .signOut()
      .then(() => console.log('user logged out!'))
      .catch((error: any) => console.log('error: ', error));
  };

  return (
    <>
      {loading && <LoadingOverlay message="Logging you out..." />}
      {!loading && (
        <View style={tw`flex-1 bg-white`}>
          <View style={[tw`w-full bg-black px-4 py-6 h-8`, {flex: 0.25}]}>
            <View style={tw`flex-row items-start px-4 py-12`}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../assets/images/chevron_left_light.png')}
                  style={tw`w-8 h-4`}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={tw`w-full h-full bg-white rounded-tl-[90px] flex-1 items-center justify-start py-6 px-6 -mt-24 relative`}>
            <Image
              source={{uri: user?.photoURL || undefined}}
              resizeMode="contain"
              style={tw`rounded-full h-24 w-24`}
            />
            <View style={tw`py-4 items-center`}>
              <Text style={tw`text-black font-semibold text-base`}>
                {user?.displayName}
              </Text>
              <Text style={tw`text-black font-semibold text-sm`}>
                {user?.email}
              </Text>
            </View>
            <TouchableOpacity onPress={logoutHandler}>
              <View style={tw`flex-row items-center gap-2`}>
                <Image
                  source={require('../assets/images/logout.png')}
                  style={tw`h-8 w-8`}
                />
                <Text style={tw`text-black font-semibold text-base`}>
                  Log out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;
