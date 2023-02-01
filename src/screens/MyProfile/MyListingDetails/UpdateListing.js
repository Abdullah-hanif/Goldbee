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
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextField from '../../../components/TextField';

// import TextField from '../../components/TextField';
import Buttons from '../../../components/Buttons';
import {Color} from '../../../constants/colors';
import {Checkbox} from 'react-native-paper';

// @Vector Icon
import Ico from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/Feather';
import Gender from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTranslation} from 'react-i18next';
// import {Base_Url} from '../../api/Api';
import {Base_Url} from '../../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const UpdateListing = ({navigation, route}) => {
  const {t} = useTranslation();
  const [checked, setChecked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [countryModal, setCountryModal] = React.useState(false);

  const [color, setColor] = React.useState('red');

  //data of Fields
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [country, setCountry] = React.useState('Cities');
  const [selectArea, setSelectArea] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [openModal1, setopenModal1] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [img, setImg] = React.useState([]);
  const [id, setId] = React.useState();

  const {allDetails} = route?.params;
  console.log('CATEGORUESSSS===>', allDetails);
  React.useEffect(() => {
    setTitle(allDetails?.title);
    setPrice(allDetails?.price);
    setCountry(allDetails?.cites);
    setDescription(allDetails?.description);
    setCategory(allDetails?.category);
    setId(allDetails?.id);
  }, []);

  // const [city, setCity] = React.useState(null);
  // // console.log('title===>', title, price, country, selectArea, description);
  // const spainCities = [
  //   {label: 'Madrid', value: 'madrid'},
  //   {label: 'Barcelona', value: 'barcelona'},
  //   {label: 'Valencia', value: 'valencia'},
  //   {label: 'Seville', value: 'seville'},
  //   {label: 'Bilbao', value: 'bilbao'},
  //   {label: 'Zaragoza', value: 'zaragoza'},
  //   {label: 'Málaga', value: 'malaga'},
  // ];

  const cities = [
    'Madrid',
    'Barcelona',
    'Valencia',
    'Sevilla',
    'Málaga',
    'Murcia',
    'Bilbao',
    'Zaragoza',
    'Palma de Mallorca',
    'Las Palmas de Gran Canaria',
  ];
  // console.log('Imags Arry===>', images);
  //posing Listing

  const postListing = async () => {
    const userId = await AsyncStorage.getItem('uid');
    // console.log('=====>', img);

    const data = new FormData();
    data.append('listing_id', id);
    data.append('title', title);
    data.append('price', price);
    data.append('location', country);
    data.append('description', description);

    data.append('category', category);

    // data.append('location', selectArea);

    await fetch(`${Base_Url}/listings-update`, {
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
    {id: 1, imgUri: require('../../../assets/SamplePictures/1.png')},
    {id: 2, imgUri: require('../../../assets/SamplePictures/2.png')},
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
        setImg(source);
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

  //CAMERA LAUNCH
  const LaunchCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      // Permissions for launchng camera
      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };

      requestCameraPermission();

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = response;
        console.log('===>URL============>', source);
        setImages([...images, source.assets[0].uri]);

        // imgUri(source.assets[0].uri);

        // setBackLicence(source.assets[0].uri);
      }
    });
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
            <TouchableOpacity
              // onPress={LaunchImageLibrary}
              onPress={() => setopenModal1(true)}>
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
          val={title}
          setTxt={txt => setTitle(txt)}
          placeHolder={t('common:listingtitle')}
        />
        <TextField
          val={price}
          setTxt={txt => setPrice(txt)}
          placeHolder={t('common:price')}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // padding: 5,

            borderWidth: 1,
            marginVertical: 10,

            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: countryModal ? 0 : 20,
            borderBottomRightRadius: countryModal ? 0 : 20,
            // borderRadius: 20,
            borderBottomWidth: countryModal ? 1 : 1,
            borderColor: 'gray',
            top: 5,
          }}>
          <TextInput
            value={country}
            setTxt={txt => setCountry(txt)}
            placeholderTextColor={Color.darkGray}
            placeholder={country}
          />
          {/* <TextField
        
              setTxt={txt => setCountry(txt)}
              placeHolder={t('common:country')}
            /> */}
          <TouchableOpacity
            style={{right: 10}}
            onPress={() => setCountryModal(!countryModal)}>
            <AntDesign
              name={countryModal ? 'up' : 'down'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {countryModal ? (
          <>
            <ScrollView nestedScrollEnabled={true} style={styles.txtContainer1}>
              {cities.map((data, index) => {
                return (
                  <>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 1,
                        borderColor: 'black',
                        paddingVertical: 10,
                        marginBottom: 22,
                      }}
                      onPress={() => {
                        setCountryModal(false), setCountry(data), alert(data);
                      }}>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>
                        {data}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </ScrollView>
            {/* </ScrollView> */}
          </>
        ) : null}

        {/* <TextField
            setTxt={txt => setSelectArea(txt)}
            placeHolder={t('common:selectarealocation')}
          /> */}
        <View>
          <TextInput
            value={description}
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
          name="Update Listings"
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
                source={require('../../../assets/Icons/Group13719.png')}
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

      <Modal
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={openModal1}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setopenModal1(!openModal1);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.61)',
            flexDirection: 'column-reverse',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              margin: 30,
              borderRadius: 20,
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                LaunchCamera(), setopenModal1(false);
              }}
              style={{flexDirection: 'row'}}>
              <Ico name="camerao" size={30} color="black" />
              <Text style={{fontSize: 15, color: 'black', top: 5, left: 10}}>
                {t('common:takeaphoto')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={LaunchImageLibrary}
              onPress={() => {
                LaunchImageLibrary(), setopenModal1(false);
              }}
              style={{flexDirection: 'row'}}>
              <Gender name="view-dashboard-outline" size={30} color="black" />
              <Text style={{fontSize: 15, color: 'black', top: 5, left: 10}}>
                {t('common:chosefromGallery')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default UpdateListing;

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
  txtContainer1: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'gray',
    height: 120,

    paddingTop: 30,
    borderTopWidth: 0,
    bottom: 10,

    padding: 10,
    textAlignVertical: 'top',
  },
});