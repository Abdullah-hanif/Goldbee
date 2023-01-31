import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';

import {Color} from '../../constants/colors';
import Buttons from '../../components/Buttons';
import Card from '../../components/Card';
import MyCard from './MyListingDetails/Components/MyCard';

import {useTranslation} from 'react-i18next';
import {Base_Url} from '../../api/Api';
import {useIsFocused} from '@react-navigation/native';

// @ICONS
import Feather from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';

const MyProfile = ({navigation}) => {
  const {t} = useTranslation();
  const [switchName, setSwitch] = React.useState('MyProfile');
  const [allListing, setAllListing] = React.useState();
  const [editable, setEditable] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [whatsappNumber, setWhatsappNumber] = React.useState('');
  const [location, setLocation] = React.useState('');

  const focused = useIsFocused();
  React.useEffect(() => {
    getMylisting();
  }, [focused == true]);

  const getMylisting = async () => {
    const userId = await AsyncStorage.getItem('uid');
    console.log('USER ID ====>', userId);
    // alert(userId);
    fetch(`${Base_Url}/get-my-listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: userId}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        setAllListing(respo?.data);

        // console.log(respo?.data, '=====>MY LISTING');
      })
      .catch(error => {
        console.error(error);
      });
  };
  const deleteListing = async listing_id => {
    fetch(`${Base_Url}/listings-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({listing_id: listing_id}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;

        console.log(respo, 'DLETE RESPONSE');
        alert(respo?.message);
        getMylisting();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const hadleSwitc = data => {
    setSwitch(data);
    // alert(switchName, '===>');
  };

  const SaveData = () => {
    console.log(phoneNumber, whatsappNumber, location, '=====>DATA LIST');
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* <Text>MyProfile</Text> */}
        <View style={styles.secoundContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                height: 30,
                width: 30,
                right: 5,
                justifyContent: 'center',
              }}
              source={require('../../assets/Icons/back.png')}
            />
          </TouchableOpacity>
          <View>
            <SwitchButton func={data => hadleSwitc(data)} />
          </View>
          {/* //ProfileScren */}
          {switchName == 'MyProfile' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 65, width: 65}}
                  source={require('../../assets/Icons/Ellipse28.png')}
                />
                <View style={{left: 10}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
                    John Micheal
                  </Text>
                  <Text
                    style={{
                      color: Color.darkOrange,
                    }}>
                    Chicago - USA
                  </Text>
                </View>
              </View>
              {/* END PROFILE HEADER */}

              {/* @About Section */}
              <View style={{marginVertical: 20}}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                  {t('common:about')}
                </Text>
                <Text style={{color: 'black', flexWrap: 'wrap', top: 10}}>
                  {t('common:myprofiledetail')}
                </Text>
              </View>
              {/* End About section */}

              {/* Seller Information Section  */}
              <View>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                  {t('common:sellerinformation')}
                </Text>
                <View style={{marginVertical: 20}}>
                  <InforamtionConainer
                    getInputTxt={txt => setPhoneNumber(txt)}
                    editable={editable}
                    text1={t('common:phonnumber')}
                    text2="+1 773 567 8790"
                    icon={
                      <Image
                        style={{height: 30, width: 30}}
                        source={require('../../assets/Icons/Group4060.png')}
                      />
                    }
                  />
                  <InforamtionConainer
                    getInputTxt={txt => setWhatsappNumber(txt)}
                    editable={editable}
                    text1="WhatsApp"
                    text2="+773 567 8790"
                    icon={
                      <Image
                        style={{height: 30, width: 30}}
                        source={require('../../assets/Icons/Group4067.png')}
                      />
                    }
                  />
                  <InforamtionConainer
                    getInputTxt={txt => setLocation(txt)}
                    editable={editable}
                    text1={t('common:location')}
                    text2="Chicago-USA"
                    icon={
                      <Image
                        style={{height: 30, width: 30}}
                        source={require('../../assets/Icons/Group4039.png')}
                      />
                    }
                  />
                </View>
              </View>
              {/*END Seller Information Section  */}
              {/* Button */}
              <View style={{marginBottom: 20}}>
                <Buttons
                  onpress={() => setEditable(true)}
                  name={t('common:editprofile')}
                />
                <Buttons
                  onpress={() => {
                    setEditable(false), SaveData();
                  }}
                  name="Save"
                />
              </View>
            </>
          ) : (
            <>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    key={Math.random() * 1000}
                    data={allListing}
                    numColumns={2}
                    renderItem={data => {
                      //  console.log('INSIDE FLATLIST==>', data?.item?.images);
                      return (
                        console.log('======>FLATLIST ===>', data),
                        (
                          <>
                            <MyCard
                              // name={t('common:pearlring')}
                              name={data?.item?.title}
                              price={`$ ${data?.item?.price}`}
                              bgImage={data?.item?.images}
                              // bgImage={{
                              //   uri: `${
                              //     data?.item?.images
                              //       ? data?.item?.images
                              //       : data?.item?.images == null
                              //       ? [1]
                              //       : data?.item?.images
                              //   }`,
                              // }}
                              deleteIcon={true}
                              onPress={() => deleteListing(data?.item?.id)}
                              productDetails={data?.item}
                            />
                          </>
                        )
                      );
                    }}
                  />
                </View>
              </View>
              {/* Button */}
              <View style={{marginTop: 30}}>
                <Buttons
                  name={t('common:uploadnew')}
                  onpress={() => navigation.navigate('Sell')}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const SwitchButton = ({func}) => {
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
            setClicked(true), func('MyProfile');
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
            {t('common:myprofile')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setClicked(false), func('MyListings');
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
            {t('common:mylistings')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const InforamtionConainer = ({text1, text2, icon, editable, getInputTxt}) => {
  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderColor: Color.gray,
          padding: 10,
          flexDirection: 'row',
          marginVertical: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* <Text style={{textAlignVertical: 'center'}}>Phone</Text>
        {} */}
        <View style={{flexDirection: 'row'}}>
          {icon}
          <View style={{left: 10}}>
            <Text style={styles.txtStyle}>{text1}</Text>
            {editable ? (
              <TextInput
                onChangeText={txt => getInputTxt(txt)}
                activeOutlineColor="black"
                activeUnderlineColor="#F6A507"
                style={{backgroundColor: 'white'}}
                placeholder={text2}
                placeholderTextColor="black"
              />
            ) : (
              <Text style={styles.txtStyle}>{text2}</Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
  },
  secoundContainer: {
    backgroundColor: Color.splashWhite,
    marginTop: 20,
    margin: 15,
  },
  txtStyle: {
    color: 'black',
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
