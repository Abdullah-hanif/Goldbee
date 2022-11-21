import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';
import Search from 'react-native-vector-icons/AntDesign';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={{height: 25, width: 25, left: 10}}
        source={require('../assets/Icons/Group13732.png')}
      />
      <TextInput
        style={{left: 10}}
        placeholder="Search"
        placeholderTextColor={'gray'}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: Color.gray,

    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
