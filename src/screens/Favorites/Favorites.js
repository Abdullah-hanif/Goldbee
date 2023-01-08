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
      body: JSON.stringify({user_id: userId}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        console.log('RESPONSE HOME', respo?.data);
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

      {/* <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 30}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Card
              isFav={true}
              name={t('common:pearlring')}
              price="$ 545.00"
              bgImage={require('../../assets/SamplePictures/1.png')}
            />
            <Card
              isFav={true}
              name={t('common:beadednecklaces')}
              price=" $ 175.00"
              bgImage={require('../../assets/SamplePictures/2.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Card
              isFav={true}
              name={t('common:weddingring')}
              price="$ 360.00"
              bgImage={require('../../assets/SamplePictures/3.png')}
            />
            <Card
              isFav={true}
              name={t('common:earringbracelet')}
              price="$ 437.00"
              bgImage={require('../../assets/SamplePictures/4.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Card
              isFav={true}
              name="Wedding Ring"
              price="$ 360.00"
              bgImage={require('../../assets/SamplePictures/3.png')}
            />
            <Card
              isFav={true}
              name="Earring Bracelet"
              price="$ 437.00"
              bgImage={require('../../assets/SamplePictures/4.png')}
            />
          </View>
        </View>
      </ScrollView> */}

      <FlatList
        key={Math.random() * 100000}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={data}
        numColumns={2}
        renderItem={item => {
          return (
            <>
              <Card
                name={item?.item?.title}
                price={`$ ${item?.item?.price}`}
                bgImage={{uri:`${item?.item?.images ? item?.item?.images : item?.item?.images == null ? [1] : item?.item?.images}`}}
                isFav={item?.item?.isFollowed}
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
