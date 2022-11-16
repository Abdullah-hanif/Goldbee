import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const CategoryContainer = ({name, Icon}) => {
  const [color, setColor] = React.useState('white');
  return (
    <TouchableOpacity
      onPress={() => setColor(Color.darkOrange)}
      style={{width: 60, margin: 10}}>
      <View style={[styles.container, {backgroundColor: color}]}>{Icon}</View>
      <View style={{width: 100}}>
        <Text style={{textAlign: 'center', bottom: 5, right: 20}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 30,
  },
});
