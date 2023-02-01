import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import Back from 'react-native-vector-icons/AntDesign';
import Dots from 'react-native-vector-icons/Entypo';
import Buttons from '../../components/Buttons';

// @translator
import {useTranslation} from 'react-i18next';

const images = [
  require('../../assets/SamplePictures/2.png'),
  require('../../assets/SamplePictures/2.png'),
  require('../../assets/SamplePictures/2.png'),
];

const ProductDetails = ({navigation, route}) => {
  const {t} = useTranslation();
  const {productDetails} = route.params;

  console.log('Product DETAILS====>', productDetails?.images);

  const sellerDetail = productDetails['seller-details'];
  // console.log('MY PRODUCT DETAILS=====>', sellerDetail);
  const [addFav, setAddFav] = React.useState(false);
  const [imgActive, setimgActive] = React.useState(0);
  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Topbar ICONS */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          // marginTop: 120,
          padding: 20,
          // backgroundColor: 'blue',
          zIndex: 1,
          width: '100%',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back name="left" size={20} color="white" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => setAddFav(!addFav)}>
            <Back
              name={productDetails?.isFollowed == 'yes' ? 'heart' : 'hearto'}
              style={{right: 20}}
              size={20}
              color={
                productDetails?.isFollowed == 'yes' ? Color.yellow : 'white'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Dots name="dots-three-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/*END Topbar ICONS */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        onScroll={({nativeEvent}) => onchange(nativeEvent)}
        horizontal
        pagingEnabled
        style={{
          backgroundColor: 'green',
          height: Dimensions.get('screen').height / 2.3,
        }}>
        {productDetails?.images?.map((e, index) => (
          <Image
            // resizeMode="contain"
            key={index}
            style={{height: '100%', width: Dimensions.get('screen').width}}
            source={{uri: e}}
          />
        ))}
      </ScrollView>

      <View
        style={{
          bottom: 0,

          flexDirection: 'row',
          alignSelf: 'center',
          // backgroundColor: 'black',
        }}>
        {productDetails?.images?.map((e, index) => (
          <Text
            key={Math.random() * 1000}
            style={imgActive == index ? styles.dotActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
      {/* //PRofile VIew */}
      <View
        style={{
          backgroundColor: Color.splashWhite,

          padding: 20,
          flex: 1,
          // marginVertical: 20,
          // marginHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileDetails')}
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <Image
            style={{height: 50, width: 50}}
            source={{uri:sellerDetail?.profile_picture}}
          />
          <View style={{left: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
              {sellerDetail?.name}
            </Text>
            <Text
              style={{
                color: Color.darkOrange,
              }}>
              {productDetails?.location}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            // margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 19,
                color: 'black',
                marginTop: 10,
              }}>
              {/* {t('common:beadednecklaces')} */}
              {productDetails?.title}
            </Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
              $ {productDetails?.price}
            </Text>
          </View>
          <Image
            style={{height: 70, width: 70, bottom: 20}}
            source={require('../../assets/Icons/Group13720.png')}
          />
        </View>
        {/* Description Details */}
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              textAlign: 'left',
              flexWrap: 'wrap',
            }}>
            {/* {t('common:productdetails')} */}
            {productDetails?.description}
          </Text>
        </View>
        <View style={{flexDirection: 'column-reverse', marginTop: '20%'}}>
          <Buttons name={t('common:buynow')} />
        </View>
      </View>

      {/* //END PROFILE VIEW */}
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
  },
  dotActive: {
    margin: 3,
    fontWeight: 'bold',
    fontSize: 20,
    color: Color.darkOrange,
  },
  dot: {
    margin: 3,
    color: Color.gray,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
