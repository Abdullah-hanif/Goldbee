import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import Card from '../../components/Card';

const Favorites = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 25, color: 'black'}}>
        Favorites
      </Text>
      <Text style={{fontSize: 15, color: 'black'}}>Your saved wishlist</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 30}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Card
              name="Pearl Ring"
              price="$ 545.00"
              bgImage={require('../../assets/SamplePictures/1.png')}
            />
            <Card
              name="Beaded Necklace"
              price=" $ 175.00"
              bgImage={require('../../assets/SamplePictures/2.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Card
              name="Wedding Ring"
              price="$ 360.00"
              bgImage={require('../../assets/SamplePictures/3.png')}
            />
            <Card
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
    padding: 20,
  },
});