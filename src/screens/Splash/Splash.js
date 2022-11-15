import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import {ImageSource} from '../../constants/ImageSource';
import {Color} from '../../constants/colors';

const Splash = () => {
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
