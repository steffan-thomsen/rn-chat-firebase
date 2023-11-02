import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import tw from 'twrnc';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {firestoreDB} from '../../config/firebase.config';

const AddChatRoomScreen: FC = ({navigation}: any) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [addChatTitle, setAddChatTitle] = useState('');
  const [addChatDescription, setAddChatDescription] = useState('');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (!currentUser) {
        navigation.replace('Login');
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [navigation]);

  const addChatRoomHandler = async () => {
    let id = `${Date.now()}`;

    const _doc = {
      _id: id,
      user: user?.displayName,
      chatName: addChatTitle,
      chatDescription: addChatDescription,
    };

    if (addChatTitle !== '') {
      setDoc(doc(firestoreDB, 'chatRooms', id), _doc)
        .then(() => {
          setAddChatTitle('');
          navigation.replace('ChatsOverview');
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
  };
  return (
    <View style={tw`flex-1`}>
      <View style={[tw`w-full bg-black px-4 py-6 `, {flex: 0.25}]}>
        <View style={tw`flex-row items-center justify-between px-4 py-12`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/chevron_left_light.png')}
              style={tw`w-8 h-4`}
            />
          </TouchableOpacity>
          <View>
            <Image
              source={{uri: user?.photoURL || undefined}}
              resizeMode="contain"
              style={tw`w-12 h-12 rounded-full`}
            />
          </View>
        </View>
      </View>

      <View
        style={tw`w-full h-full bg-white rounded-tl-[90px] flex-1 py-6 px-4 -mt-10`}>
        <View style={tw`w-full px-4 py-4 flex-wrap `}>
          <View
            style={tw`w-full flex items-center justify-between px-4 py-3 rounded-full border border-gray-300 mb-2`}>
            <TextInput
              style={tw`text-lg h-12 w-full -mt-3`}
              placeholder="Add title to chat room"
              placeholderTextColor={'#999'}
              onChangeText={text => setAddChatTitle(text)}
              value={addChatTitle}
            />
          </View>
          <View
            style={tw`w-full flex items-center justify-between px-4 py-3 rounded-full border border-gray-300 mb-2`}>
            <TextInput
              style={tw`text-lg h-12 w-full -mt-3`}
              placeholder="Add description to chat room"
              placeholderTextColor={'#999'}
              onChangeText={text => setAddChatDescription(text)}
              value={addChatDescription}
            />
          </View>
          <TouchableOpacity
            onPress={addChatRoomHandler}
            style={tw`shadow-lg bg-black p-3 rounded-full w-full mb-8`}>
            <Text
              style={tw`text-white text-lg text-center items-center justify-center`}>
              Add ChatRoom
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddChatRoomScreen;
