import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../constants/colors';
import InboxMessages from '../../components/InboxMessages';
import {InboxPeople} from '../../constants/dummyData';
import {SellingChat} from '../../constants/dummyData';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';
import {getInbox} from '../../api/InboxApi';
import {Base_Url} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Inbox = () => {
  const {t} = useTranslation();
  const [role, setRole] = useState('buying');
  const [buyerChat, setBuyerChat] = useState([]);
  const [sellerChat, setSellerChat] = useState([]);

  const getInbox = async () => {
    const userId = await AsyncStorage.getItem('uid');
    await fetch(`${Base_Url}/get-inbox`, {
      method: 'POST',
      body: JSON.stringify({user_id: userId}),
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        role == 'buying'
          ? setBuyerChat(respo?.buying)
          : setSellerChat(respo?.selling);
        console.log(respo?.buying, 'UPDATE PROFILE=====>');
      })
      .catch(error => {
        console.error(error);
      });
  };
  const focused = useIsFocused();
  useEffect(() => {
    getInbox();
  }, [focused == true]);

  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>{role}</Text>
      <View style={styles.screenContainer}>
        <SwitchButton
          changeRole={txt => {
            setRole(txt);
            getInbox();
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* //Main View */}
          {role == 'buying'
            ? buyerChat.map((data, indx) => {
                return (
                  <InboxMessages
                    key={Math.random() * 1000}
                    name={data?.seller?.name}
                    listingId={data?.listing_id}
                    withId={data?.with_id}
                    productName={data.listing?.category}
                    imageUri={data?.seller?.profile_picture}
                    time={data?.time_ago}
                    message={data?.last_message}
                    price={data.listing?.price}
                    isRead={data?.read}
                  />
                );
              })
            : sellerChat.map((data, indx) => {
                return (
                  <InboxMessages
                    key={data.id}
                    name={data?.seller?.name}
                    listingId={data?.listing_id}
                    withId={data?.with_id}
                    productName={data.listing?.category}
                    imageUri={data?.seller?.profile_picture}
                    time={data?.time_ago}
                    message={data?.last_message}
                    price={data.price}
                    isRead={data?.read}
                  />
                );
              })}
        </ScrollView>
      </View>
    </View>
  );
};

const SwitchButton = ({changeRole}) => {
  const {t} = useTranslation();

  const [clicked, setClicked] = React.useState(true);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 30,
          margin: 35,
        }}>
        <TouchableOpacity
          onPress={() => {
            setClicked(true), changeRole('buying');
          }}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: clicked ? Color.darkOrange : Color.splashWhite,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
            },
          ]}>
          <Text
            style={{textAlign: 'center', color: clicked ? 'white' : 'black'}}>
            {t('common:buying')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setClicked(false), changeRole('selling');
          }}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: clicked ? Color.splashWhite : Color.darkOrange,
              borderBottomRightRadius: 30,
              borderTopRightRadius: 30,
            },
          ]}>
          <Text
            style={{textAlign: 'center', color: clicked ? 'black' : 'white'}}>
            {t('common:selling')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export {SwitchButton};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    padding: 10,
  },

  buttonStyle: {
    padding: 20,

    borderWidth: 1,
    borderColor: 'lightgray',

    width: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
