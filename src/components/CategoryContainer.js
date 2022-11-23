import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../constants/colors';

const CategoryContainer = ({name, Icon}) => {
  const [color, setColor] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setColor(!color)}
      style={{
        width: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.container,
          {backgroundColor: !color ? 'white' : Color.darkOrange},
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
