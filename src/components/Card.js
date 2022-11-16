import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Card = ({name, price, bgImage}) => {
  return (
    <View style={styles.container}>
      <Image
        // resizeMode="contain"
        style={{
          height: 120,
          width: 150,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={bgImage}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <Text>{price}</Text>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={require('../assets/Icons/Group13735.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={{padding: 10, fontWeight: 'bold', color: 'black'}}>
        {name}
      </Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    // height: 290,
    // width: 150,
    margin: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '47%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
