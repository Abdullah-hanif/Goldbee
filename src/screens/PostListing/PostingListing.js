import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextField from '../../components/TextField';
import Buttons from '../../components/Buttons';
import {Color} from '../../constants/colors';
import {Checkbox} from 'react-native-paper';

import {useTranslation} from 'react-i18next';
import {Base_Url} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const PostingListing = ({navigation}) => {
  const {t} = useTranslation();
  const [checked, setChecked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  //data of Fields
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [selectArea, setSelectArea] = React.useState('');
  const [description, setDescription] = React.useState('');

  console.log('title===>', title, price, country, selectArea, description);

  const [images, setImages] = React.useState([]);
  console.log('Imags Arry===>', images);
  //posing Listing
  const postListing = async () => {
    const userId = await AsyncStorage.getItem('uid');

    const data = new FormData();
    data.append('user_id', userId);
    data.append('title', title);
    data.append('price', price);

    data.append('category', country);
    data.append('description', description);
    data.append('location', selectArea);

    await fetch(`${Base_Url}/listings-store`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: data,
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        console.log(respo?.status, '=====>');
        if (respo?.message == 'Something missing. All fields are required') {
          alert(respo?.message);
        } else {
          // alert(respo?.message);
          setModalVisible(!modalVisible),
            setTimeout(() => {
              setModalVisible(false);
              navigation.navigate('MyProfile');
            }, 3000);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const selectedImg = [
    {id: 1, imgUri: require('../../assets/SamplePictures/1.png')},
    {id: 2, imgUri: require('../../assets/SamplePictures/2.png')},
  ];

  const LaunchImageLibrary = () => {
    const options = {
      selectionLimit: 10,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      // console.log('Image LibraResponse = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;
        setImages([...images, source.assets[0].uri]);
      }
    });
  };

  const RemoveImage = val => {
    // console.log(val, '========>REMOVE ITEM');
    const imags = images.filter(image => image !== val);
    // console.log('=====>FILTER FUNCTION KEY====>', imags);
    setImages(imags);
    console.log(images, '====>UPDATED ARRY');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.secoundContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        {/* First Container Started */}

        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginTop: 35,
            borderStyle: 'dashed',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={LaunchImageLibrary}>
              <Text style={{color: '#000000'}}>
                {t('common:uploadupto10pictures')}
              </Text>
            </TouchableOpacity>
            <AntDesign name="right" size={15} color="black" />
          </View>
          <ScrollView horizontal>
            {images.map((val, index) => {
              // console.log(val);
              return (
                <>
                  <View>
                    <TouchableOpacity
                      // key={Math.random() * 1000}
                      onPress={() => RemoveImage(val)}
                      style={{
                        flexDirection: 'row-reverse',
                        // position: 'absolute',
                        elevation: 10,
                        zIndex: 1,
                      }}>
                      <AntDesign
                        name="closecircle"
                        style={{top: 10}}
                        size={20}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Image
                      style={{
                        height: 60,
                        width: 90,
                        borderRadius: 10,
                        marginHorizontal: 5,
                      }}
                      source={{uri: val == undefined ? null : val}}
                      // source={{uri: val}}
                    />
                  </View>
                </>
              );
            })}
          </ScrollView>
        </View>
        {/* First Container END */}
        <TextField
          setTxt={txt => setTitle(txt)}
          placeHolder={t('common:listingtitle')}
        />
        <TextField
          setTxt={txt => setPrice(txt)}
          placeHolder={t('common:price')}
        />
        <TextField
          setTxt={txt => setCountry(txt)}
          placeHolder={t('common:country')}
        />
        <TextField
          setTxt={txt => setSelectArea(txt)}
          placeHolder={t('common:selectarealocation')}
        />
        <View>
          <TextInput
            onChangeText={txt => setDescription(txt)}
            placeholderTextColor={'gray'}
            style={styles.txtContainer}
            placeholder={t('common:Describeaboutyoulisting')}
          />
        </View>

        <View style={styles.checkBox}>
          <Checkbox
            color={checked ? Color.darkOrange : 'black'}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              top: 8,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Text style={{color: 'black'}}>{t('common:iagreetoGoldbee')}</Text>

            <Text
              style={{
                textDecorationLine: 'underline',
                left: 10,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {t('common:termsandCondition')}
            </Text>
          </View>
        </View>
        {/* @Button */}
        <Buttons
          onpress={() => {
            postListing();
          }}
          name={t('common:postlisting')}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <StatusBar hidden />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              flex: 1,
              height: Dimensions.get('screen').height,
              backgroundColor: 'rgba(0,0,0,0.61)',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: Color.splashWhite,
                width: Dimensions.get('screen').width - 30,
                paddingVertical: '25%',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 90, width: 90}}
                source={require('../../assets/Icons/Group13719.png')}
              />
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontWeight: 'bold', color: 'black', fontSize: 17}}>
                  {t('common:postedscucessfully')}
                </Text>
                <Text style={{color: 'black'}}>
                  {t('common:yourlistingpostedsuccessfully')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default PostingListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    padding: 20,
  },
  secoundContainer: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    marginTop: 20,
    marginBottom: 60,
  },
  checkBox: {
    flexDirection: 'row',
    marginTop: 20,
    // marginHorizontal: 10,
  },
  txtContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'gray',
    height: 120,
    marginTop: 10,
    padding: 15,
    textAlignVertical: 'top',
  },
});
