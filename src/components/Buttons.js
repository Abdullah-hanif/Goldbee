import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const Buttons = ({name}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.SignUp}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    margin: 20,
    borderWidth: 1,
    borderColor: Color.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 30,
  },
  SignUp: {
    color: Color.darkOrange,
    fontWeight: 'bold',
  },
});
