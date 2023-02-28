import {
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import { ImageSource } from '../../constants/ImageSource';
import { Color } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

  const checkSession = async () => {

    let isLaunched = await AsyncStorage.getItem("isLaunched")
    if (!isLaunched) {
      try {
        await AsyncStorage.setItem("isLaunched", 'true')
      }
      catch (error) {
        console.log("spalsh error", error);
      }
    }
    const check = await AsyncStorage.getItem('status');
    console.log('status', check);
    check != 'loggedIn'
      ? navigation.replace('BottomNavigation')
      : isLaunched === 'true'? navigation.replace('Login')
      :navigation.replace('Walkthrough')
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
          style={{ height: 250, width: 250 }}
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
