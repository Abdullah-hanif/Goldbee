import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import ProfileItemComp from '../../components/ProfileItemComp';
const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Profile Header Started */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
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
        {/* Profile Header END */}
        <View style={{marginTop: 30}}>
          <ProfileItemComp
            name="Profile"
            Icon={require('../../assets/Icons/Group4076.png')}
          />
          <ProfileItemComp
            name="Change Password"
            Icon={require('../../assets/Icons/Group4085.png')}
          />
          <ProfileItemComp
            name="Contact Us"
            Icon={require('../../assets/Icons/Group13736.png')}
          />
          <ProfileItemComp
            name="Logout"
            Icon={require('../../assets/Icons/Group40901.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
  },
  innerContainer: {
    backgroundColor: Color.splashWhite,
    padding: 20,
    flex: 1,
  },
});
