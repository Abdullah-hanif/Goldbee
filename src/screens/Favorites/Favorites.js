import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import Card from '../../components/Card';

import {useTranslation} from 'react-i18next';

const Favorites = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 25, color: 'black'}}>
        {t('common:favorites')}
      </Text>
      <Text style={{fontSize: 15, color: 'black'}}>
        {t('common:yousavewishlist')}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 30}}>
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
      </ScrollView>
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
