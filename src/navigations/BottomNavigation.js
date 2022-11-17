import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabIcon} from '../constants/ImageSource';
import {Color} from '../constants/colors';

//Screens
import Home from '../screens/Home/Home';
import Favorites from '../screens/Favorites/Favorites';
import Inbox from '../screens/Inbox/Inbox';
import Profile from '../screens/Profile/Profile';

// Icons
const Homess = require('../assets/Icons/Good.png');

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.darkOrange,
        tabBarStyle: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 60,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={BottomTabIcon.Home}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? Color.darkOrange : 'black',
              }}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={BottomTabIcon.Favorite}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? Color.darkOrange : null,
              }}
            />
          ),
        }}
        name="Favorites"
        component={Favorites}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={BottomTabIcon.Sell}
              style={{
                height: 70,
                width: 70,
                bottom: 30,
                tintColor: focused ? Color.darkOrange : null,
              }}
            />
          ),
        }}
        name="Sell"
        component={Sell}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={BottomTabIcon.Inbox}
              style={{
                height: 25,
                width: 25,
              }}
            />
          ),
        }}
        name="Inbox"
        component={Inbox}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={BottomTabIcon.Profile}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? Color.darkOrange : null,
              }}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

// const Home = () => {
//   return (
//     <>
//       <View>
//         <Text>Home</Text>
//       </View>
//     </>
//   );
// };
// const Favorite = () => {
//   return (
//     <>
//       <View>
//         <Text>Favorite</Text>
//       </View>
//     </>
//   );
// };
const Sell = () => {
  return (
    <>
      <View>
        <Text>Favorite</Text>
      </View>
    </>
  );
};
// const Inbox = () => {
//   return (
//     <>
//       <View>
//         <Text>Inbox</Text>
//       </View>
//     </>
//   );
// };
// const Profile = () => {
//   return (
//     <>
//       <View>
//         <Text>Profile</Text>
//       </View>
//     </>
//   );
// };

export default BottomNavigation;

const styles = StyleSheet.create({});
