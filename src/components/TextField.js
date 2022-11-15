import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const TextField = ({placeHolder}) => {
  return (
    <TextInput
      placeholderTextColor={'gray'}
      style={styles.container}
      placeholder={placeHolder}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'gray',
    height: 45,
    marginTop: 10,
    padding: 10,
  },
});
