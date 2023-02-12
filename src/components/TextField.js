import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const TextField = ({placeHolder, setTxt, val}) => {
  return (
    <TextInput
      value={val}
      placeholderTextColor={'black'}
      style={styles.container}
      placeholder={placeHolder}
      onChangeText={txt => setTxt(txt)}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'gray',
    height: 50,
    marginTop: 10,
    color: 'black',
    // padding: 15,
    paddingLeft: 25,
  },
});
