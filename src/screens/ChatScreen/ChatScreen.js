import React, {useState, useCallback, useEffect} from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {Color} from '../../constants/colors';

import Send from 'react-native-vector-icons/Feather';
import Attachment from 'react-native-vector-icons/Entypo';

const ChatScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const {imageUri, name, price} = route.params;
  console.log('=======>', imageUri, name, price);
  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: Color.splashWhite,
          borderTopColor: '#E8E8E8',
          borderTopWidth: 1,
          padding: 5,
          margin: 20,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }}
      />
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <>
      <View
        style={{
          // height: '15%',
          backgroundColor: Color.splashWhite,
          padding: 20,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: 'gray',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,

          elevation: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{
              height: 25,
              width: 25,
              justifyContent: 'center',
              top: 15,
            }}
            source={require('../../assets/Icons/back.png')}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 50, width: 50, left: 20, borderRadius: 5}}
            source={imageUri}
          />
          <View style={{left: 35}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Color.darkOrange,
                fontSize: 15,
              }}>
              {price}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 5,
                fontSize: 15,
              }}>
              {name}
            </Text>
          </View>
        </View>
      </View>
      <GiftedChat
        messagesContainerStyle={{
          backgroundColor: 'white',
          height: '100%',
          paddingVertical: 120,
        }}
        showAvatarForEveryMessage={true}
        alwaysShowSend={true}
        renderSend={() => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: Color.darkOrange,
                padding: 15,
                borderRadius: 30,
              }}>
              <Send name="send" size={20} color="white" />
            </TouchableOpacity>
          );
        }}
        renderBubble={props => {
          return (
            <View
              style={{
                backgroundColor: Color.darkOrange,
                width: '70%',
                padding: 30,
                borderRadius: 20,
              }}>
              <Text>Hello</Text>
            </View>
          );
        }}
        renderActions={() => {
          return (
            <TouchableOpacity
              style={{
                // backgroundColor: Color.darkOrange,
                padding: 10,
                borderRadius: 30,
              }}>
              <Attachment name="attachment" size={20} color="black" />
            </TouchableOpacity>
          );
        }}
        placeholder="Send Message"
        messages={messages}
        onSend={messages => onSend(messages)}
        renderInputToolbar={props => customtInputToolbar(props)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};

export default ChatScreen;