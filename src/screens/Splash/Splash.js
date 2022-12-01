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

const Splash = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate('Walkthrough');
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
