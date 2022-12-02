import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import Back from 'react-native-vector-icons/AntDesign';
import Card from '../../components/Card';
import {useTranslation} from 'react-i18next';

const ProfileDetails = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.goBack()}>
        <Back name="left" size={20} color="black" />
      </TouchableOpacity>
      {/* //Profile Section  */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../assets/Icons/Ellipse28.png')}
          />
          <View style={{left: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
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
        <Image
          style={{height: 70, width: 70, alignSelf: 'center', top: 22}}
          source={require('../../assets/Icons/Group13720.png')}
        />
      </View>
      {/* END PROFILE SECTION */}

      {/* ABOUT SECTION */}
      <View
        style={{
          marginTop: 10,
          paddingVertical: 30,

          borderBottomWidth: 0.3,
          borderColor: 'lightgray',
        }}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
          {t('common:about')}
        </Text>
        <Text style={{color: 'black', marginTop: 10, flexWrap: 'wrap'}}>
          {t('common:myprofiledetail')}
        </Text>
      </View>
      {/* END ABOUT SECTION */}

      {/* Listing View */}
      <View style={{marginTop: 20}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
          {t('common:listings')}
        </Text>

        <View style={{marginBottom: 30, marginTop: 10, right: 3}}>
          <View style={{flexDirection: 'row'}}>
            <Card
              name={t('common:pearlring')}
              price="$ 545.00"
              bgImage={require('../../assets/SamplePictures/1.png')}
            />
            <Card
              name={t('common:beadednecklaces')}
              price=" $ 175.00"
              bgImage={require('../../assets/SamplePictures/2.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Card
              name={t('common:weddingring')}
              price="$ 360.00"
              bgImage={require('../../assets/SamplePictures/3.png')}
            />
            <Card
              name={t('common:earringbracelet')}
              price="$ 437.00"
              bgImage={require('../../assets/SamplePictures/4.png')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    padding: 20,
  },
});
