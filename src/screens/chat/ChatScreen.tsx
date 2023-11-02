import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import tw from 'twrnc';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';

import {firestoreDB} from '../../config/firebase.config';

interface ChatScreenProps {
  route: any;
  navigation: any;
}

interface Message {
  _id: string;
  chatRoomId: string;
  timeStamp: any;
  message: string;
  user: {
    name: string | null | undefined;
    avatar: string | null | undefined;
    email: string | null | undefined;
  };
}

const ChatScreen: FC<ChatScreenProps> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[] | null>(null);
  const {chatRoom} = route.params;

  const TextInputRef = useRef<TextInput>(null);

  const openKeyboardHandler = () => {
    if (TextInputRef.current) {
      TextInputRef.current.focus();
    }
  };

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc: Message = {
      _id: id,
      chatRoomId: chatRoom._id,
      timeStamp,
      message,
      user: {
        name: user?.displayName || null,
        avatar: user?.photoURL || null,
        email: user?.email || null,
      },
    };
    setMessage('');
    try {
      await addDoc(
        collection(doc(firestoreDB, 'chatRooms', chatRoom._id), 'messages'),
        _doc,
      );
      console.log('Message added successfully!');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestoreDB, 'chatRooms', chatRoom._id, 'messages'),
      orderBy('timeStamp', 'asc'),
    );

    const unsubscribe = onSnapshot(msgQuery, querySnap => {
      const updMsg: Message[] = querySnap.docs.map(
        doc => doc.data() as Message,
      );
      setMessages(updMsg);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [chatRoom._id]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (!currentUser) {
        navigation.replace('Login');
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={tw`flex-1`}>
      <View style={[tw`w-full bg-black px-4 py-6 h-8`, {flex: 0.25}]}>
        <View style={tw`flex-row items-center justify-between px-4 py-12`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/chevron_left_light.png')}
              style={tw`w-8 h-4`}
            />
          </TouchableOpacity>
          <View style={tw`flex-row items-center justify-center`}>
            <View>
              <Text style={tw`text-white text-lg`}>
                {chatRoom.chatName.length > 10
                  ? `${chatRoom.chatName.slice(0, 16)}...`
                  : chatRoom.chatName}
              </Text>
            </View>
          </View>
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
        style={tw`w-full h-full bg-white rounded-tl-[90px] flex-1 py-6 px-4 -mt-24`}>
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={160}>
          <ScrollView>
            {isLoading ? (
              <View style={tw`w-full flex items-center justify-center`}>
                <ActivityIndicator size={'large'} color={'#000'} />
              </View>
            ) : (
              <>
                {messages?.map((msg, i) =>
                  msg.user.email === user?.email ? (
                    <View style={tw`m-1`} key={i}>
                      <View
                        style={[
                          tw`px-4 py-2 relative rounded-xl bg-black w-auto items-end`,
                          {alignSelf: 'flex-end'},
                        ]}>
                        <Text style={tw`text-white text-base font-semibold`}>
                          {msg.message}
                        </Text>
                      </View>
                      <View style={{alignSelf: 'flex-end'}}>
                        {msg?.timeStamp?.seconds && (
                          <Text style={tw`text-[12px] font-semibold`}>
                            {new Date(
                              parseInt(msg?.timeStamp?.seconds) * 1000,
                            ).toLocaleTimeString('da-DK', {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: false,
                            })}
                          </Text>
                        )}
                      </View>
                    </View>
                  ) : (
                    <>
                      <View key={i} style={{alignSelf: 'flex-start'}}>
                        <View
                          style={tw`flex-row items-center justify-center gap-2`}>
                          <Image
                            source={{uri: msg?.user?.avatar || undefined}}
                            resizeMode="cover"
                            style={tw`h-12 w-12 rounded-full`}
                          />
                          <View style={tw`m-1`}>
                            <View
                              style={[
                                tw`px-4 py-2 relative rounded-xl bg-white border shadow-md w-auto items-end`,
                                {alignSelf: 'flex-start'},
                              ]}>
                              <Text
                                style={tw`text-white text-base font-semibold`}>
                                {msg.message}
                              </Text>
                            </View>
                            <View style={{alignSelf: 'flex-start'}}>
                              {msg?.timeStamp?.seconds && (
                                <Text style={tw`text-[12px] font-semibold`}>
                                  {new Date(
                                    parseInt(msg?.timeStamp?.seconds) * 1000,
                                  ).toLocaleTimeString('da-DK', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false,
                                  })}
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    </>
                  ),
                )}
              </>
            )}
          </ScrollView>
          <View
            style={tw`w-full px-8 flex-row items-center justify-center gap-2`}>
            <View
              style={tw`flex-row items-center justify-start bg-gray-200 rounded-xl px-4 py-2 gap-4`}>
              <TouchableOpacity
                style={tw`items-center justify-center`}
                onPress={openKeyboardHandler}>
                <Image
                  source={require('../../assets/images/smile.png')}
                  style={tw`h-6 w-6`}
                />
              </TouchableOpacity>
              <TextInput
                style={tw`flex-1 text-base h-8 text-black font-semibold items-center justify-center pb-0 pt-0`}
                placeholder="Type your message"
                placeholderTextColor={'#999'}
                value={message}
                onChangeText={text => setMessage(text)}
              />
            </View>
            <TouchableOpacity onPress={sendMessage}>
              <Image
                source={require('../../assets/images/send.png')}
                style={tw`h-8 w-8`}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;
