import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {SwitchButton} from '../Inbox/Inbox';
import {Color} from '../../constants/colors';
import Buttons from '../../components/Buttons';

const MyProfile = ({navigation}) => {
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
            <SwitchButton />
          </View>
          {/* //ProfileScren */}

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
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
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
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
              About
            </Text>
            <Text style={{color: 'black', flexWrap: 'wrap', top: 10}}>
              Frank Doew is an Emmy award winning desing, foun and CEO
              Blind,Inc., where he over sees the create and strategic director
              of the company. He received his BFA from Art Center\College of
              Design and Graphic
            </Text>
          </View>
          {/* End About section */}

          {/* Seller Information Section  */}
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
              Seller Information
            </Text>
            <View style={{marginVertical: 20}}>
              <InforamtionConainer />
              <InforamtionConainer />
              <InforamtionConainer />
            </View>
          </View>
          {/*END Seller Information Section  */}

          {/* Button */}
          <View style={{marginBottom: 20}}>
            <Buttons name="Edit Profile" />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const InforamtionConainer = () => {
  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderColor: Color.gray,
          padding: 10,
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <Text style={{textAlignVertical: 'center'}}>Phone</Text>
        <View style={{left: 10}}>
          <Text style={styles.txtStyle}>Phone number</Text>
          <Text style={styles.txtStyle}>+1 773 567 8790</Text>
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
});
