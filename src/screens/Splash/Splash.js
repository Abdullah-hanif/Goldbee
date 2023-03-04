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
import Toast from '../../components/Toast';

const Splash = ({ navigation }) => {

  const checkSession = async () => {

    let isLaunched = await AsyncStorage.getItem("isLaunched")
    if (isLaunched != 'true') {
      try {
        await AsyncStorage.setItem("isLaunched", 'true')
      }
      catch (error) {
        console.log("spalsh error", error);
      }
    }
    const check = await AsyncStorage.getItem('status');
    console.log('status', check, isLaunched);
    if (isLaunched === 'true' && check === "loggedIn") {
      navigation.replace('BottomNavigation')
    }
    else if(check === "loggedIn"){
      navigation.replace('BottomNavigation')
    }
    else if (check != "loggedIn" && isLaunched === 'true') {
      navigation.replace('Login')
    }
    else if (check != "loggedIn" && isLaunched != 'true') {
      navigation.replace('Walkthrough')
    }
    else {
      navigation.replace('Login')
      Toast("Session expired login again")
    }
  };
  setTimeout(() => {
    checkSession();
  }, 3000);
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
