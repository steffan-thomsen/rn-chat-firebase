import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

interface ChatRoomCardProps {
  chatRoom: {
    _id: string;
    chatName: string;
    chatDescription: string;
    user: string;
  };
}

type Nav = {
  navigate: (value: string) => void;
};

const ChatRoomCard: React.FC<ChatRoomCardProps> = ({chatRoom}) => {
  const navigation = useNavigation<Nav>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen', {chatRoom})}
      style={tw`w-full flex-1 flex-row items-center justify-start py-2 px-2 mb-2`}>
      <View style={tw`flex-1 items-start justify-start `}>
        <Text style={tw`text-base font-semibold`}>{chatRoom.chatName}</Text>
        <Text style={tw`text-[#333] text-sm`}>{chatRoom.chatDescription}</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/images/chevron_right.png')}
          style={tw`w-4 h-4`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomCard;
