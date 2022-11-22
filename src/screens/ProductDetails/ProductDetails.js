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

const ProductDetails = ({navigation}) => {
  const [addFav, setAddFav] = React.useState(false);
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
              name={addFav ? 'heart' : 'hearto'}
              style={{right: 20}}
              size={20}
              color="white"
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
        horizontal
        style={{backgroundColor: 'green'}}>
        <Image
          resizeMode="contain"
          source={require('../../assets/SamplePictures/2.png')}
        />
        <Image source={require('../../assets/SamplePictures/2.png')} />
        <Image source={require('../../assets/SamplePictures/2.png')} />
      </ScrollView>
      {/* //PRofile VIew */}
      <View
        style={{
          backgroundColor: Color.splashWhite,
          flex: 1,
          // marginVertical: 20,
          marginHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileDetails')}
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
        </TouchableOpacity>

        <View
          style={{
            // margin: 10,
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
          <Text>
            dlsdkfdskjfskdhksdhkjdshfksdhfkjdshfkjdsk {'\n'}
            dlsdkfdskjfskdhksdhkjdshfksdhfkjdshfkjdsk {'\n'}
            dlsdkfdskjfskdhksdhkjdshfksdhfkjdshfkjdsk {'\n'}
            dlsdkfdskjfskdhksdhkjdshfksdhfkjdshfkjdsk {'\n'}
            dlsdkfdskjfskdhksdhkjdshfksdhfkjdshfkjdsk {'\n'}
            dlsdkfdskjfskdhksdh
          </Text>
        </View>
        <View style={{flexDirection: 'column-reverse', marginBottom: 40}}>
          <Buttons name="Buy Now" />
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
});
