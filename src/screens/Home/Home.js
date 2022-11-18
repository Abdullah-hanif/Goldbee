import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import SearchBar from '../../components/SearchBar';
import CategoryContainer from '../../components/CategoryContainer';
import Card from '../../components/Card';

const Home = ({naviagtion}) => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CategoryContainer
            name="All"
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13721.png')}
              />
            }
          />
          <CategoryContainer
            name="Rings"
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13722.png')}
              />
            }
          />
          <CategoryContainer
            name="Necklaces"
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13723.png')}
              />
            }
          />
          <CategoryContainer
            name="Earnings"
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13724.png')}
              />
            }
          />
          <CategoryContainer
            name="Bracelat"
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13725.png')}
              />
            }
          />
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    padding: 20,
  },
});
