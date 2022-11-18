import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import Back from 'react-native-vector-icons/AntDesign';
import Buttons from '../../components/Buttons';

const ProductDetails = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{backgroundColor: 'green', flex: 1}}>
        <Image
          // style={{height: 300, width: '100%'}}
          source={require('../../assets/SamplePictures/2.png')}
        />
        <Image source={require('../../assets/SamplePictures/2.png')} />
        <Image source={require('../../assets/SamplePictures/2.png')} />
      </ScrollView>
      {/* //PRofile VIew */}
      <View style={{backgroundColor: Color.splashWhite, flex: 1}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../assets/Icons/Ellipse28.png')}
          />
          <View style={{left: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
              John Micheal
            </Text>
            <Text
              style={{
                color: Color.darkOrange,
              }}>
              Chicago - USA
            </Text>
          </View>
        </View>

        <View
          style={{
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 19, color: 'black'}}>
              Beaded Necklaces
            </Text>
            <Text style={{fontSize: 16}}>$ 175:00</Text>
          </View>
          <Image
            style={{height: 70, width: 70, bottom: 20}}
            source={require('../../assets/Icons/Group13720.png')}
          />
        </View>
        {/* Description Details */}
        <View>
          <Text>dlsdkfdskjfskdhksdhkjdshfksdhfkjdshfkjdsk</Text>
        </View>
        <View style={{flexDirection: 'column-reverse'}}>
          <Buttons name="Buy Now" />
        </View>
      </View>

      {/* //END PROFILE VIEW */}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
  },
});
