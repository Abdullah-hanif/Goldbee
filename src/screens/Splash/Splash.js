import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  NativeModules,
} from 'react-native';
import React from 'react';
import {ImageSource} from '../../constants/ImageSource';
import {Color} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  const checkSession = async () => {
    const check = await AsyncStorage.getItem('status');
    console.log('status', check);
    check == 'loggedIn'
      ? navigation.navigate('BottomNavigation')
      : navigation.navigate('Walkthrough');
  };
  setTimeout(() => {
    // navigation.navigate('Walkthrough');
    checkSession();
  }, 4000);
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{height: 250, width: 250}}
          source={ImageSource.splash}
        />
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.splashWhite,
  },
});
