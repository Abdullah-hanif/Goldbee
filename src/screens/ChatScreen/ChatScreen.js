// import React, {useState, useCallback, useEffect} from 'react';
// import {
//   View,
//   Image,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {
//   GiftedChat,
//   InputToolbar,
//   Bubble,
//   MessageImage,
// } from 'react-native-gifted-chat';
// import {Color} from '../../constants/colors';

// import Send from 'react-native-vector-icons/Feather';
// import Attachment from 'react-native-vector-icons/Entypo';

// import {useTranslation} from 'react-i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Base_Url} from '../../api/Api';

// const ChatScreen = ({navigation, route}) => {
//   const {t} = useTranslation();
//   const [messages, setMessages] = useState([]);
//   const {imageUri, name, price, productName, listingId, withId} = route.params;
//   console.log('=======>', imageUri, name, price);

//   const getAllMessges = async () => {
//     const userId = await AsyncStorage.getItem('uid');
//     await fetch(`${Base_Url}/get-chat-history`, {
//       method: 'POST',
//       body: JSON.stringify({user_id: userId, listing_id: '20', with_id: 2}),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         setMessages(
//           data?.data?.map((data, index) => {
//             return {
//               _id: data?.id,
//               text: data?.text,
//               createdAt: new Date(),
//               user: {
//                 _id: Math.random() * 1000,
//                 name: data?.text,
//                 avatar: 'https://placeimg.com/140/140/any',
//               },
//             };
//           }),
//         );

//         console.log(respo, 'UPDATE PROFILE=====>');
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   // getAllMessges();

//   useEffect(() => {
//     getAllMessges();
//   }, []);

// const CustomtInputToolbar = props => {
//   return (
//     <InputToolbar
//       {...props}
//       placeholderTextColor="#000000"
//       containerStyle={styles.inputToolBar}
//     />
//   );
// };

//   const onSend = messages => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   };

//   return (
//     <>
// <View style={styles.container}>
//   <TouchableOpacity onPress={() => navigation.goBack()}>
//     <Image
//       style={{
//         height: 25,
//         width: 25,
//         justifyContent: 'center',
//         top: 15,
//       }}
//       source={require('../../assets/Icons/back.png')}
//     />
//   </TouchableOpacity>
//   <View style={{flexDirection: 'row'}}>
//     <Image
//       style={{height: 50, width: 50, left: 20, borderRadius: 5}}
//       source={{uri: imageUri}}
//     />
//     <View style={{left: 35}}>
//       <Text
//         style={{
//           fontWeight: 'bold',
//           color: Color.darkOrange,
//           fontSize: 15,
//         }}>
//         ${price}
//       </Text>
//       <Text
//         style={{
//           fontWeight: 'bold',
//           color: 'black',
//           top: 5,
//           fontSize: 15,
//         }}>
//         {productName}
//       </Text>
//     </View>
//   </View>
// </View>
//       <GiftedChat
//         messagesContainerStyle={{
//           backgroundColor: 'white',
//           height: '100%',

//           // paddingVertical: 120,
//         }}
//         renderAvatar={() => {}}
//         showAvatarForEveryMessage={true}
//         alwaysShowSend={true}
// renderSend={() => {
//   return (
//     <TouchableOpacity
//       onPress={onSend}
//       style={{
//         backgroundColor: Color.darkOrange,
//         padding: 15,
//         right: 10,
//         borderRadius: 30,
//       }}>
//       <Send name="send" size={20} color="white" />
//     </TouchableOpacity>
//   );
// }}
//         renderBubble={props => {
//           return (
//             <Bubble
//               {...props}
//               textStyle={{
//                 right: {
//                   color: 'white',
//                 },
//               }}
//               wrapperStyle={{
//                 left: {
//                   backgroundColor: Color.splashWhite,
//                   bottom: '100%',
//                   marginBottom: 10,
//                   width: '70%',
//                   padding: 20,
//                   borderRadius: 20,
//                   shadowColor: '#000',
//                   shadowOffset: {
//                     width: 0,
//                     height: 2,
//                   },

//                   shadowOpacity: 0.25,
//                   shadowRadius: 3.84,

//                   elevation: 5,
//                 },
//                 right: {
//                   backgroundColor: 'orange',
//                   bottom: '100%',
//                   marginBottom: 10,
//                   width: '70%',
//                   padding: 20,
//                   borderRadius: 20,
//                   shadowColor: '#000',
//                   shadowOffset: {
//                     width: 0,
//                     height: 2,
//                   },

//                   shadowOpacity: 0.25,
//                   shadowRadius: 3.84,

//                   elevation: 5,
//                 },
//               }}
//             />
//           );
//         }}
//         renderChatFooter={() => {
//           return (
//             <View
//               style={{
//                 // height: '30%',
//                 // backgroundColor: 'blue',
//                 justifyContent: 'center',
//               }}></View>
//           );
//         }}
// renderActions={() => {
//   return (
//     <TouchableOpacity
//       onPress={() => onSend()}
//       style={{
//         // backgroundColor: Color.darkOrange,
//         padding: 15,
//         alignItems: 'center',
//         borderRadius: 30,
//       }}>
//       <Attachment name="attachment" size={20} color="black" />
//     </TouchableOpacity>
//   );
// }}
//         placeholder={t('common:sendmessage')}
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         renderInputToolbar={props => CustomtInputToolbar(props)}
//         user={[
//           {
//             _id: Math.random() * 1000,
//             text: 'Hello developer',
//             createdAt: new Date(),
//             user: {
//               _id: 2,
//               name: 'React Native',
//               avatar: 'https://placeimg.com/140/140/any',
//             },
//           },
//         ]}
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // height: '15%',
//     backgroundColor: Color.splashWhite,
//     padding: 20,
//     flexDirection: 'row',
//     borderBottomWidth: 0.5,
//     borderColor: 'gray',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.44,
//     shadowRadius: 10.32,

//     elevation: 26,
//   },
//   inputToolBar: {
//     backgroundColor: Color.splashWhite,

//     borderTopColor: '#E8E8E8',
//     borderTopWidth: 1,

//     padding: 5,
//     margin: 20,
//     borderRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,

//     elevation: 6,
//   },
// });

// export default ChatScreen;

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  Send,
} from 'react-native-gifted-chat';
import { Color } from '../../constants/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_Url } from '../../api/Api';
import Icon from "react-native-vector-icons//Feather"

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderID] = useState(0);
  const listingId = route?.params.listingId;
  const receiverId = route.params.withId
  const withProfilePic = route.params.profilePic
  const postPic = route.params.imageUri
  const productName = route.params.productName
  const productPrice = route.params.price

  const CustomtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        placeholderTextColor="#000000"
        containerStyle={styles.inputToolBar}
      />
    );
  };
  const getAllMessges = async () => {
    const userId = await AsyncStorage.getItem('uid');
    setSenderID(userId);
    console.log(receiverId);
    await fetch(`${Base_Url}/get-chat-history`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        listing_id: listingId,
        with_id: receiverId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const filteredArr = data.data.sort((a, b) => a._id - b._id)
          .reverse()
        setMessages(
          filteredArr.map((chatMessage) => {
            return {
              _id: chatMessage.id,
              text: chatMessage.text,
              createdAt: chatMessage.created_at,
              user: {
                _id: chatMessage.sender_id,
              }
            }
          })
        )
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllMessges()
  }, [messages]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    const { text } = messages[0];
    sendMessage(text);
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Icon
          name="send"
          style={{ marginBottom: 5, marginRight: 5 }}
          size={36}
          color={Color.darkOrange}
        />
      </Send>
    )
  }
  const sendMessage = async (text) => {
    const userId = await AsyncStorage.getItem('uid');

    await fetch(`${Base_Url}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: userId,
        receiver_id: receiverId,
        listing_id: listingId,
        text: text,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data?.message)
      })
      .catch(error => {
        console.error(error)
      });
  };


  const CustomAvatar = (props) => {
    return (
      <View style={{ width: 40, height: 40, marginBottom: 50, borderRadius: 20 }}>
        <Image
          source={{ uri: props.img }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>
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
              alignSelf: "center",
              top: 15,
            }}
            source={require('../../assets/Icons/back.png')}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ height: 50, width: 50, left: 20, borderRadius: 5 }}
            // source={{uri: imageUri}}
            source={{ uri: postPic }}
            h
          />
          <View style={{ left: 35 }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: Color.darkOrange,
                fontSize: 15,
              }}>
              € {productPrice}
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
        messages={messages}
        alwaysShowSend={true}
        onSend={messages => onSend(messages)}
        showUserAvatar={true}
        scrollToBottom={true}
        placeholder='Send Message...'
        keyboardShouldPersistTaps={'never'}
        renderInputToolbar={props => CustomtInputToolbar(props)}
        renderAvatarOnTop={true}
        renderSend={renderSend}
        renderAvatar={null}
        user={{
          _id: senderId,
          name: 'akif',
        }}
        renderBubble={props => {
          const message_sender_id = props.currentMessage.user._id
          return (
            <Bubble
              {...props}
              position={message_sender_id === senderId ? 'right' : 'left'}
              textStyle={{
                right: {
                  color: Color.splashWhite,
                },
              }}
              wrapperStyle={{
                left: {
                  marginBottom: 25,
                  width: '70%',
                  backgroundColor: Color.splashWhite,
                  padding: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,

                  },
                },
                right: {
                  backgroundColor: Color.darkOrange,
                  marginBottom: 25,
                  width: '70%',
                  padding: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                },
              }}
            />
          );
        }}

      />
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
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
    paddingBottom: 4,
    marginHorizontal: 10,
    marginVertical: 7,
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
