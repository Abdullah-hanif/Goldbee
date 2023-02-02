import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  MessageImage,
} from 'react-native-gifted-chat';
import {Color} from '../../constants/colors';

import Send from 'react-native-vector-icons/Feather';
import Attachment from 'react-native-vector-icons/Entypo';

import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Base_Url} from '../../api/Api';

const ChatScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [messages, setMessages] = useState([]);
  const {imageUri, name, price, productName, listingId, withId} = route.params;
  console.log('=======>', imageUri, name, price);

  const getAllMessges = async () => {
    const userId = await AsyncStorage.getItem('uid');
    await fetch(`${Base_Url}/get-chat-history`, {
      method: 'POST',
      body: JSON.stringify({user_id: userId, listing_id: '20', with_id: 2}),
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        // setMessages(respo?.data);

        console.log(respo, 'UPDATE PROFILE=====>');
      })
      .catch(error => {
        console.error(error);
      });
  };

  // getAllMessges();

  useEffect(() => {
    getAllMessges();
  }, []);

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        placeholderTextColor="#000000"
        containerStyle={styles.inputToolBar}
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

  const onSend = messages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  return (
    <>
      <View style={styles.container}>
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
            source={{uri: imageUri}}
          />
          <View style={{left: 35}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Color.darkOrange,
                fontSize: 15,
              }}>
              ${price}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 5,
                fontSize: 15,
              }}>
              {productName}
            </Text>
          </View>
        </View>
      </View>
      <GiftedChat
        messagesContainerStyle={{
          backgroundColor: 'white',
          height: '100%',

          // paddingVertical: 120,
        }}
        showAvatarForEveryMessage={true}
        alwaysShowSend={true}
        renderSend={() => {
          return (
            <TouchableOpacity
              onPress={onSend}
              style={{
                backgroundColor: Color.darkOrange,
                padding: 15,
                right: 10,
                borderRadius: 30,
              }}>
              <Send name="send" size={20} color="white" />
            </TouchableOpacity>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'white',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: Color.splashWhite,
                  bottom: '100%',
                  marginBottom: 10,
                  width: '70%',
                  padding: 20,
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },

                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                },
                right: {
                  backgroundColor: Color.darkOrange,

                  width: '70%',
                  padding: 20,
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },

                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                },
              }}
            />
          );
        }}
        renderChatFooter={() => {
          return (
            <View
              style={{
                // height: '30%',
                // backgroundColor: 'blue',
                justifyContent: 'center',
              }}></View>
          );
        }}
        renderActions={() => {
          return (
            <TouchableOpacity
              onPress={() => onSend()}
              style={{
                // backgroundColor: Color.darkOrange,
                padding: 15,
                alignItems: 'center',
                borderRadius: 30,
              }}>
              <Attachment name="attachment" size={20} color="black" />
            </TouchableOpacity>
          );
        }}
        placeholder={t('common:sendmessage')}
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

const styles = StyleSheet.create({
  container: {
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

    elevation: 26,
  },
  inputToolBar: {
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
  },
});

export default ChatScreen;

// import {StyleSheet, Text, View} from 'react-native';
// import React, {useState, useCallback, useEffect} from 'react';
// import {GiftedChat} from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Base_Url} from '../../api/Api';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);

//   // useEffect(() => {
//   //   setMessages([
//   //     {
//   //       _id: 1,
//   //       text: 'Hi developer',
//   //       createdAt: new Date(),
//   //       user: {
//   //         _id: 2,
//   //         name: 'React Native',
//   //         avatar: 'https://placeimg.com/140/140/any',
//   //       },
//   //     },
//   //   ]);
//   // }, []);

//   const getAllMessges = async () => {
//     const userId = await AsyncStorage.getItem('uid');
//     await fetch(`${Base_Url}/get-chat-history`, {
//       method: 'POST',
//       body: JSON.stringify({user_id: userId, listing_id: '20', with_id: 2}),
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         // const res = data.json();
//         // const respo = data;
//         setMessages(data?.data);
//         // const msgs = data?.data?.map((item, index) => {
//         //   setMessages([
//         //     {
//         //       _id: item.id,
//         //       text: item?.text,
//         //       createdAt: new Date(),
//         //       user: {
//         //         _id: 2,
//         //         name: 'React Native',
//         //         avatar: 'https://placeimg.com/140/140/any',
//         //       },
//         //     },
//         //   ]);
//         // });

//         // const map = msgs.map((numb, index) => {
//         //   return numb;
//         // });

//         console.log(msgs, 'thired PROFILE=====>');

//         // setMessages([
//         //   {
//         //     _id: msgs.id,
//         //     text: msgs?.text,
//         //     createdAt: new Date(),
//         //     user: {
//         //       _id: 2,
//         //       name: 'React Native',
//         //       avatar: 'https://placeimg.com/140/140/any',
//         //     },
//         //   },
//         // ]);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   // getAllMessges();

//   useEffect(() => {
//     getAllMessges();
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);
//   return (
//     <>
//       <View>
//         {messages.map(items => {
//           return (
//             <>
//               <Text>he</Text>
//             </>
//           );
//         })}
//       </View>
//     </>
//     // <GiftedChat
//     //   messages={messages}
//     //   onSend={messages => onSend(messages)}
//     //   user={{
//     //     _id: 9934,
//     //     name: 'akif',

//     //     avatar: 'https://placeimg.com/140/140/any',
//     //   }}
//     // />
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({});
