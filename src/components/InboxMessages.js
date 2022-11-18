import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Check from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const InboxMessages = ({name, productName, message, time, imageUri, price}) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => nav.navigate('ChatScreen', {imageUri, name, price})}
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
            <Check name="check" size={10} style={{top: 5, right: 5}} />
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
