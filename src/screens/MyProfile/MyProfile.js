import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import {Color} from '../../constants/colors';
import Buttons from '../../components/Buttons';
import Card from '../../components/Card';

const MyProfile = ({navigation}) => {
  const [switchName, setSwitch] = React.useState('MyProfile');
  const hadleSwitc = data => {
    setSwitch(data);
    // alert(switchName, '===>');
  };
  return (
    <>
      <ScrollView style={styles.container}>
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
                  About
                </Text>
                <Text style={{color: 'black', flexWrap: 'wrap', top: 10}}>
                  Frank Doew is an Emmy award winning desing, foun and CEO
                  Blind,Inc., where he over sees the create and strategic
                  director of the company. He received his BFA from Art
                  Center\College of Design and Graphic
                </Text>
              </View>
              {/* End About section */}

              {/* Seller Information Section  */}
              <View>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                  Seller Information
                </Text>
                <View style={{marginVertical: 20}}>
                  <InforamtionConainer
                    text1="Phone number"
                    text2="+1 773 567 8790"
                    icon={
                      <Image
                        style={{height: 30, width: 30}}
                        source={require('../../assets/Icons/Group4060.png')}
                      />
                    }
                  />
                  <InforamtionConainer
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
                    text1="Location"
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
                <Buttons name="Edit Profile" />
              </View>
            </>
          ) : (
            <>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Card
                    name="Pearl Ring"
                    price="$ 545.00"
                    bgImage={require('../../assets/SamplePictures/1.png')}
                    deleteIcon={true}
                  />
                  <Card
                    name="Beaded Necklace"
                    price=" $ 175.00"
                    bgImage={require('../../assets/SamplePictures/2.png')}
                    deleteIcon={true}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Card
                    name="Wedding Ring"
                    price="$ 360.00"
                    bgImage={require('../../assets/SamplePictures/3.png')}
                    deleteIcon={true}
                  />
                  <Card
                    name="Earring Bracelet"
                    price="$ 437.00"
                    bgImage={require('../../assets/SamplePictures/4.png')}
                    deleteIcon={true}
                  />
                </View>
              </View>
              {/* Button */}
              <View style={{marginTop: 30}}>
                <Buttons name="Upload New" />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const SwitchButton = ({func}) => {
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
            My Profile
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
            My Listings
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const InforamtionConainer = ({text1, text2, icon}) => {
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
        }}>
        {/* <Text style={{textAlignVertical: 'center'}}>Phone</Text>
        {} */}
        {icon}
        <View style={{left: 10}}>
          <Text style={styles.txtStyle}>{text1}</Text>
          <Text style={styles.txtStyle}>{text2}</Text>
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
