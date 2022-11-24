import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Heart from 'react-native-vector-icons/AntDesign';
import {Color} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
const Card = ({name, price, bgImage, onpress, isFav}) => {
  const [addFav, setAddFav] = React.useState(isFav);
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => nav.navigate('ProductDetails')}
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
          <TouchableOpacity onPress={() => setAddFav(!addFav)}>
            <Heart
              name={!addFav ? 'hearto' : 'heart'}
              size={20}
              color={Color.darkOrange}
            />
          </TouchableOpacity>
        </View>
        <Text style={{marginBottom: 10, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
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
    borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
});
