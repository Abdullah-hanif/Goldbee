import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Color} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
const Card = ({name, price, bgImage, onpress, isFav, deleteIcon}) => {
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
          {!deleteIcon ? (
            <TouchableOpacity onPress={() => setAddFav(!addFav)}>
              <AntDesign
                name={!addFav ? 'hearto' : 'heart'}
                size={20}
                color={Color.darkOrange}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => alert('DELETE')}>
              {/* <AntDesign name="delete" size={20} color={Color.black} /> */}
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/Icons/Group5268.png')}
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
