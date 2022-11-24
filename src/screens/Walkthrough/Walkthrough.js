import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
  PixelRatio,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import AppIntroSlider from 'react-native-app-intro-slider';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageSource} from '../../constants/ImageSource';
import {Color} from '../../constants/colors';

const slides = [
  {
    key: 1,
    title: 'Sell your Jewelery',
    text: 'Create listing for free. Sell you jewelery and \nearn money. Keep it all for yourself',
    image: ImageSource.slider1,
  },
  {
    key: 2,
    title: 'Sell your Jewelery',
    text: 'Find what your are looking. There are lots of\njewelery you will see',
    image: ImageSource.slider2,
  },
  {
    key: 3,
    title: 'Use Goldybee your way',
    text: 'There are two ways to sell and buy,in person\nor through shippinng.',
    image: ImageSource.slider3,
  },
];
const Walkthrough = ({navigation}) => {
  // const { width, height } = Dimensions.get("window")
  const renderItem = ({item}) => {
    return (
      <>
        <StatusBar hidden />
        <View style={{flex: 1, backgroundColor: 'white', marginBottom: 20}}>
          <Image
            style={{width: '100%', height: Dimensions.get('screen').width}}
            source={item.image}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 25, margin: 20, backgroundColor: 'white'}}>
              <View>
                <Text
                  style={{
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 24,
                    marginTop: 20,
                  }}>
                  {item.title}
                </Text>
              </View>
              <Text style={{color: 'black', fontSize: 14, marginTop: 10}}>
                {item.text}
              </Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{color: Color.darkOrange, fontWeight: 'bold'}}>Next</Text>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <View style={styles.buttonCircle}>
          <Text style={{color: Color.darkOrange, fontWeight: 'bold'}}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {/* <ScrollView style={{flex: 1, backgroundColor: 'blue'}}> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: Color.splashWhite}}>
        <AppIntroSlider
          style={{backgroundColor: 'white'}}
          data={slides}
          renderItem={renderItem}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          dotStyle={{
            backgroundColor: Color.darkOrange,
            marginBottom: Dimensions.get('screen').height / 4,
          }}
          activeDotStyle={{
            marginBottom: Dimensions.get('screen').height / 4,
            backgroundColor: Color.darkGray,
          }}
          contentContainerStyle={{marginBottom: 160}}

          // ya dots ko chupa dyta ha
          // renderPagination={() => null}
        />

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',

            padding: 10,
            marginBottom: 30,
          }}>
          <Text style={{color: 'black'}}>Already have an account? </Text>
          <Text style={{color: Color.darkOrange, fontWeight: 'bold'}}>
            LOGIN
          </Text>
        </View>
        {/* </ScrollView> */}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  buttonCircle: {
    width: Dimensions.get('screen').width - 35,

    padding: 15,
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: Color.yellow,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  title: {},
  text: {},

  //[...]
});

export default Walkthrough;
