import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const ProfileItemComp = ({name, Icon}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'lightgray',

        paddingVertical: 22,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 20, width: 20, tintColor: Color.darkGray}}
          source={Icon}
        />
        <Text style={{left: 10, color: 'black', fontSize: 16}}>{name}</Text>
      </View>
      <Image
        style={{height: 20, width: 20, tintColor: 'gray'}}
        source={require('../assets/Icons/forward.png')}
      />
    </TouchableOpacity>
  );
};

export default ProfileItemComp;

const styles = StyleSheet.create({});
