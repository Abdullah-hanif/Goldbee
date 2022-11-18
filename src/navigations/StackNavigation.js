import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// @Screens
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
import Walkthrough from '../screens/Walkthrough/Walkthrough';
import SignUp from '../screens/SignUp/SignUp';
import BottomNavigation from './BottomNavigation';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

const Stack = createStackNavigator();
const StackNavigation = () => {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Walkthrough" component={Walkthrough} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 800,
                delay: 1,
              },
            },
            close: config,
          },
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
