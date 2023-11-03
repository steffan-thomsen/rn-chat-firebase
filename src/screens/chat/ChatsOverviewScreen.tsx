import React, {useState, FC, useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import tw from 'twrnc';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {firestoreDB} from '../../config/firebase.config';
import ChatRoomCard from '../../components/chat/ChatRoomCard';

interface ChatsOverviewScreenProps {
  navigation: any;
}

interface ChatRoom {
  _id: string;
  chatName: string;
  chatDescription: string;
  user: string;
}

const ChatsOverviewScreen: React.FC<ChatsOverviewScreenProps> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[] | null>(null);

  useEffect(() => {
    const chatRoomQuery = query(
      collection(firestoreDB, 'chatRooms'),
      orderBy('_id', 'desc'),
    );

    const unsubscribeChatRooms = onSnapshot(chatRoomQuery, querySnapShot => {
      const getChatRooms = querySnapShot.docs.map(
        doc => doc.data() as ChatRoom,
      );
      setChatRooms(getChatRooms);
      setIsLoading(false);
    });

    return unsubscribeChatRooms;
  }, [navigation]);

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
    <View style={tw`flex-1`}>
      <SafeAreaView>
        <View
          style={tw`w-full flex-row items-center justify-between px-4 py-2`}>
          <Image
            source={require('../../assets/images/NTO-logo.png')}
            resizeMode="contain"
            style={tw`w-12 h-12`}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image
              source={{uri: user?.photoURL || undefined}}
              resizeMode="contain"
              style={tw`w-14 h-14 rounded-full`}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={tw`w-full px-4 pt-4`}>
          <View style={tw`w-full flex-1 justify-start items-start`}>
            {isLoading ? (
              <View style={tw`w-full flex items-center justify-center`}>
                <ActivityIndicator size={'large'} color={'#000'} />
              </View>
            ) : (
              <>
                {chatRooms && chatRooms?.length > 0 ? (
                  chatRooms.map(chatRoom => (
                    <ChatRoomCard key={chatRoom._id} chatRoom={chatRoom} />
                  ))
                ) : (
                  <View style={tw`w-full flex-1 justify-start items-start`}>
                    <Text>There are currently no Chat rooms available</Text>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChatsOverviewScreen;
