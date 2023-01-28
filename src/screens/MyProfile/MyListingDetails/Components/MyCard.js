import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Color} from '../../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Base_Url} from '../../../../api/Api';
const MyCard = ({
  name,
  price,
  id,
  bgImage,
  onPress,
  isFav,
  deleteIcon,
  productDetails,
  getFUN,
}) => {
  const AddFav = async () => {
    const userId = await AsyncStorage.getItem('uid');
    // console.log('USER ID ====>', userId);
    await fetch(`${Base_Url}/follow-listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: userId, listing_id: id}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        // console.log('RESPONSE HOME', respo?.data);

        if (respo?.message == 'Followed successfully') {
          alert('Followed Sucessfully');
          // getFUN();
        } else {
          console.log(respo?.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        nav.navigate('MyListingDetails', {productDetails: productDetails})
      }
      style={styles.container}>
      <Image
        // resizeMode="contain"
        style={{
          height: 120,
          width: '100%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={bgImage}
      />
      <View style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // margin: 10,
          }}>
          <Text style={{color: 'gray'}}>{price}</Text>
          {!deleteIcon ? (
            <TouchableOpacity
              onPress={() => {
                AddFav(), getFUN();
              }}>
              <AntDesign
                name={isFav == 'no' ? 'hearto' : 'heart'}
                size={20}
                color={Color.darkOrange}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress}>
              {/* <AntDesign name="delete" size={20} color={Color.black} /> */}
              <Image
                style={{height: 20, width: 20}}
                source={require('../../../../assets/Icons/Group5268.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{marginBottom: 10, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyCard;

const styles = StyleSheet.create({
  container: {
    // height: 290,
    // width: 150,

    margin: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '47%',
    borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
});
