import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  NativeModule,
  NativeModules,
} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import ProfileItemComp from '../../components/ProfileItemComp';

// @Languge import
import {useTranslation} from 'react-i18next';

const Profile = ({navigation}) => {
  const {t} = useTranslation();
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
            onClick={() => navigation.navigate('MyProfile')}
            name={t('common:profile')}
            Icon={require('../../assets/Icons/Group4076.png')}
          />
          <ProfileItemComp
            name={t('common:changepassword')}
            Icon={require('../../assets/Icons/Group4085.png')}
          />
          <ProfileItemComp
            name={t('common:contactus')}
            Icon={require('../../assets/Icons/Group13736.png')}
          />
          <ProfileItemComp
            name={t('common:logout')}
            Icon={require('../../assets/Icons/Group40901.png')}
          />
        </View>
      </View>
      {/* //CHANGE LANGUGE */}
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        {LANGUGE.map(languge => {
          const selectLanguge = languge.code == selectLangugeCode;
          return (
            <Pressable
              disabled={selectLanguge}
              onPress={() => setLanguge(localLang[0])}>
              <Text style={[selectLanguge ? styles.selectedTxt : styles.txt]}>
                {languge.lable}
              </Text>
            </Pressable>
          );
        })}
      </View> */}
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
  selectedTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
