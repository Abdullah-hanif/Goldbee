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

// const customtInputToolbar = props => {
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
//         renderInputToolbar={props => customtInputToolbar(props)}
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
  const [messages, setMessages] = useState([]);
  const {imageUri, name, price, productName, listingId, withId} = route.params;
  const [senderId, setSenderID] = useState(0);

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        placeholderTextColor="#000000"
        containerStyle={styles.inputToolBar}
      />
    );
  };

  const getAllMessges = async () => {
    console.log('MY MESSAGES=====>', messages);
    const userId = await AsyncStorage.getItem('uid');
    setSenderID(userId);
    await fetch(`${Base_Url}/get-chat-history`, {
      method: 'POST',
      body: JSON.stringify({user_id: userId, listing_id: '20', with_id: 2}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setMessages(
          data?.data?.map((data, index) => {
            return {
              _id: data?.id,
              text: data?.text,
              createdAt: new Date(),
              user: {
                _id: Math.random() * 1000,
                name: data?.text,
                avatar: 'https://placeimg.com/140/140/any',
              },
            };
          }),
        );
        // console.log(data?.data, 'thired PROFILE=====>');
      })
      .catch(error => {
        console.error(error);
      });
  };

  // getAllMessges();

  useEffect(() => {
    // setMessages([
    //   {
    //     _id: Math.random() * 1000,
    //     text: 'hello',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
    getAllMessges();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const {_id, createdAt, text, user} = messages[0];
    console.log('My messages===>', text);

    sendMessage(text);
  }, []);

  const sendMessage = async text => {
    const userId = await AsyncStorage.getItem('uid');

    await fetch(`${Base_Url}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: userId,
        listing_id: listingId,
        text: text,
      }),
    })
      .then(response => response.json())

      .then(data => {
        alert(data?.message, 'MESSAGES RESPONSE=====>');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const CustomAvatar = ({currentMessage}) => {
    return (
      <View style={{width: 40, height: 40, marginBottom: 50, borderRadius: 20}}>
        <Image
          source={{uri: 'https://placeimg.com/140/140/any'}}
          style={{width: 40, height: 40, borderRadius: 20}}
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
        messages={messages}
        alwaysShowSend={true}
        onSend={messages => onSend(messages)}
        renderInputToolbar={props => customtInputToolbar(props)}
        renderAvatar={() => <CustomAvatar />}
        user={{
          _id: senderId,
          name: 'akif',

          avatar: 'https://placeimg.com/140/140/any',
        }}
        // renderSend={props => {
        //   console.log(props, '===>SND PROPS');
        //   return (
        //     <TouchableOpacity
        //       onPress={() => {
        //         let message = {
        //           _id: Math.round(Math.random() * 1000000),
        //           text: 'hello',
        //           createdAt: new Date(),
        //           user: {
        //             _id: 1,
        //             name: 'User',
        //             avatar: 'https://picsum.photos/200',
        //           },
        //         };
        //         onSend([message]);
        //       }}
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

                  bottom: 35,
                  width: '70%',
                  padding: 10,

                  // borderRadius: 20,

                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },

                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                },
                right: {
                  backgroundColor: 'orange',
                  // bottom: '100%',
                  // marginBottom: 10,
                  bottom: 35,

                  width: '70%',
                  padding: 10,
                  // borderRadius: 30,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },

                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                },
              }}
            />
          );
        }}
        renderActions={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                let message = {
                  _id: Math.round(Math.random() * 1000000),
                  text: textInputValue,
                  createdAt: new Date(),
                  user: {
                    _id: 1,
                    name: 'User',
                    avatar: 'https://picsum.photos/200',
                  },
                };
                onSend([message]);
              }}
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
      />
    </>
  );
};

export default ChatScreen;

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
