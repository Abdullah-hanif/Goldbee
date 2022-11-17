import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const InboxMessages = ({name, productName, message, time, imageUri}) => {
  return (
    <TouchableOpacity
      style={{
        //   backgroundColor: 'yellow',
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
      }}>
      {/* Images and details */}
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 70, width: 70, borderRadius: 5}}
          source={imageUri}
        />
        <View style={{left: 20}}>
          <Text style={{color: 'black'}}>{name}</Text>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {productName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text>tick</Text>
            <Text>{message}</Text>
          </View>
        </View>
      </View>
      <Text>{time}</Text>
    </TouchableOpacity>
  );
};

export default InboxMessages;

const styles = StyleSheet.create({});
