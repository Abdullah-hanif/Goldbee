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
    text: 'Create listing for free. Sell you jewelery and \n earn money. Keep it all for yourself',
    image: ImageSource.slider1,
  },
  {
    key: 2,
    title: 'Sell your Jewelery',
    text: 'Find what your are looking. There are lots of\n jewelery you will see',
    image: ImageSource.slider2,
  },
  {
    key: 3,
    title: 'Use Goldybee your way',
    text: 'There are two ways to sell and buy,in person\n or through shippinng.',
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
          <Image style={{width: '100%', height: 300}} source={item.image} />

          <ScrollView>
            <View style={{marginTop: 25, margin: 5, backgroundColor: 'white'}}>
              <View>
                <Text
                  style={{
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 19,
                  }}>
                  {item.title}
                </Text>
              </View>
              <Text style={{color: 'black', fontSize: 14, margin: 5}}>
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
        <View style={[styles.buttonCircle]}>
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
      <AppIntroSlider
        style={{backgroundColor: 'white'}}
        data={slides}
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        dotStyle={{backgroundColor: Color.darkOrange, marginBottom: 150}}
        activeDotStyle={{marginBottom: 150, backgroundColor: Color.darkGray}}
        contentContainerStyle={{marginBottom: 60}}

        // ya dots ko chupa dyta ha
        // renderPagination={() => null}
      />

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'white',
          // marginBottom: 20,
          padding: 10,
        }}>
        <Text style={{color: 'black'}}>Already have an account? </Text>
        <Text style={{color: Color.darkOrange, fontWeight: 'bold'}}>LOGIN</Text>
      </View>
      {/* </ScrollView> */}
    </>
  );
};
const styles = StyleSheet.create({
  buttonCircle: {
    width: 300,
    // height: 40,
    marginRight: 30,

    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Color.yellow,
    borderRadius: 20,
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
