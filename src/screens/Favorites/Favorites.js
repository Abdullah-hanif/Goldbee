import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import Card from '../../components/Card';

import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Base_Url} from '../../api/Api';

const Favorites = () => {
  const {t} = useTranslation();
  const [data, setData] = React.useState();

  const getAllFav = async () => {
    const userId = await AsyncStorage.getItem('uid');
    console.log('USER ID ====>', userId);
    await fetch(`${Base_Url}/get-followed-listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: 1}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        console.log('RESPONSE HOME FAV ICONS====>', respo?.data);
        setData(respo?.data);
        if (respo?.status == 200) {
          console.log(respo?.status, '=====>');
        } else {
          console.log(respo?.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const focused = useIsFocused();

  React.useEffect(() => {
    getAllFav();
  }, [focused == true]);

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 25, color: 'black'}}>
        {t('common:favorites')}
      </Text>
      <Text style={{fontSize: 15, color: 'black'}}>
        {t('common:yousavewishlist')}
      </Text>

      <FlatList
        key={Math.random() * 100000}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={data}
        numColumns={2}
        renderItem={item => {
          console.log('ITEM NAME', item?.item?.listing?.title);
          return (
            <>
              <Card
                name={item?.item?.listing?.title}
                price={`$ ${item?.item?.listing?.price}`}
                bgImage={item?.item?.listing?.images}
                isFav={item?.item?.listing?.isFollowed}
                productDetails={item?.item?.listing}
              />

              {/* {/* </View> */}
            </>
          );
        }}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Color.splashWhite,
    // backgroundColor: 'blue',
    padding: 20,

    // marginVertical: 30,
  },
});
