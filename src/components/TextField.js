import {StyleSheet, Text, View, TextInput,Image} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const TextField = ({placeHolder, setTxt, val, keyBoarType,secureTextEntry,Icon=false}) => {
  return (

    <View  style={styles.container}>
     { Icon &&
      <View style={{paddingLeft:20}}><Image source={require('../assets/Icons/Group4085.png')} style={{height:20,width:20}}/></View>
   }
    <View style={{paddingLeft:10}}>
    <TextInput
      keyboardType={keyBoarType}
      value={val}
      placeholderTextColor={'black'}
      placeholder={placeHolder}
      onChangeText={txt => setTxt(txt)}
      secureTextEntry={secureTextEntry}
    />
    </View>
    </View>
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
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
});
