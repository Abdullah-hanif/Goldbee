import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Splash from './src/screens/Splash/Splash';
import SignUp from './src/screens/SignUp/SignUp';
import Login from './src/screens/Login/Login';
import Walkthrough from './src/screens/Walkthrough/Walkthrough';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    // <Splash />
    // <Walkthrough />
    // <Login />
    // <SignUp />
    // <View>
    //   <Text style={{fontFamily: 'Roboto-Italic', fontSize: 30}}>App</Text>
    //   <Text style={{fontFamily: 'Roboto-Bold', fontSize: 30}}>App</Text>
    //   <Text style={styles.style1}>altaf</Text>
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({
  style1: {
    fontFamily: 'Roboto-Italic',
    fontSize: 30,
  },
});
