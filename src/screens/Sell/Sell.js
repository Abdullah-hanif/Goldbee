import {
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../constants/colors';
import SellCategoryContainer from '../../components/SellCategoryContainer';

const Sell = () => {
  const [modal, setModal] = useState(true);
  const nav = useNavigation();

  return (
    <>
      <StatusBar hidden />

      <View
        style={{
          flex: 1,
          backgroundColor: Color.splashWhite,
        }}>
        {/* TOP BANNER STARTED */}
        <View
          style={{
            backgroundColor: '#F3F3F3',
            padding: 20,
            marginTop: 10,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => nav.navigate('Home')}>
            <Image
              style={{height: 25, width: 25, right: 10}}
              source={require('../../assets/Icons/Group13726.png')}
            />
          </TouchableOpacity>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 19}}>
            What you are selling?
          </Text>
        </View>
        {/* TOP BANNER END */}
        <ScrollView
          style={{margin: 10, marginTop: 30}}
          showsVerticalScrollIndicator={false}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: 'black'}}>
            Categories
          </Text>
          <View style={{marginTop: 20}}>
            <SellCategoryContainer
              Icon={
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/Icons/Group13722.png')}
                />
              }
              name="Rings"
            />
            <SellCategoryContainer
              Icon={
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/Icons/Group13723.png')}
                />
              }
              nexScreen={() => nav.navigate('PostingListing')}
              name="Necklaces"
            />
            <SellCategoryContainer
              Icon={
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/Icons/Group13724.png')}
                />
              }
              name="Earings"
            />
            <SellCategoryContainer
              Icon={
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/Icons/Group13725.png')}
                />
              }
              name="Bracelets"
            />
            <SellCategoryContainer
              Icon={
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/Icons/Group13731.png')}
                />
              }
              name="Bangles"
            />
            <SellCategoryContainer
              Icon={
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/Icons/Group13730.png')}
                />
              }
              name="Diamonds"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Sell;

const styles = StyleSheet.create({});
