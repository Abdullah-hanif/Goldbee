import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const CategoryContainer = ({name, Icon, onPress, value}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      style={{
        width: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              name == 'All' && !name == 'All'
                ? Color.darkOrange
                : value === name
                ? Color.darkOrange
                : 'white',
          },
        ]}>
        {Icon}
      </View>
      <View style={{width: 100}}>
        <Text style={{textAlign: 'center', color: 'black'}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 30,
  },
});
