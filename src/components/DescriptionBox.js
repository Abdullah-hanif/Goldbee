import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const DescriptionBox = ({placeHolder, val, keyBoarType,secureTextEntry}) => {
  return (
    <TextInput
      keyboardType={keyBoarType}
      value={val}
      placeholderTextColor={'black'}
      style={styles.container}
      placeholder={placeHolder}
      multiline={true}
    //   onChangeText={txt => setTxt(txt)}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default DescriptionBox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'gray',
    height: 120,
    marginTop: 10,
    color: 'black',
    // padding: 15,
    paddingLeft: 25,
     paddingBottom:70
  },
});
