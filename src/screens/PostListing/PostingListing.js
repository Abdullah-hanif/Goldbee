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
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextField from '../../components/TextField';
import Buttons from '../../components/Buttons';
import { Color } from '../../constants/colors';
import { Checkbox } from 'react-native-paper';

// @Vector Icon
import Ico from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/Feather';
import Gender from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTranslation } from 'react-i18next';
import { Base_Url } from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

const PostingListing = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [countryModal, setCountryModal] = React.useState(false);

  const [color, setColor] = React.useState('red');

  // @Modal Cities
  const [modalVisible1, setModalVisible1] = useState(false);

  //data of Fields
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [selectArea, setSelectArea] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [openModal1, setopenModal1] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [img, setImg] = React.useState([]);

  const [country, setCountry] = React.useState('Cities');
  const [citeiesList, setCititesList] = useState([]);
  const [filterCitiesList, setFilterCiteisList] = useState();

  const [Loading, setLoading] = useState(false);

  const { Categories } = route?.params;

  console.log('CATEGORUESSSS===>', img);
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

  // console.log('Imags Arry===>', images);
  //posing Listing

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
        setImg([...img, source]);
        // setImg(source);
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
  const LaunchCamera = async () => {
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
        const options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, response => {
          console.log('Response = ', response);

          // Permissions for launchng camera

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
            source?.errorCode
              ? console.log('error code')
              : setImages([...images, source?.assets[0]?.uri]);
            setImg([...img, source]);

            // imgUri(source.assets[0].uri);

            // setBackLicence(source.assets[0].uri);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const postListing = async () => {
    const userId = await AsyncStorage.getItem('uid');
    console.log('=====>DHJDKD', img);

    if (
      img !== null &&
      img !== [] &&
      img.length != 0 &&
      title !== undefined &&
      price !== undefined &&
      Categories !== undefined &&
      country !== undefined &&
      description !== undefined
    ) {
      const data = new FormData();
      data.append('user_id', userId);
      data.append('title', title);
      data.append('price', price);
      data.append('category', Categories);
      img.forEach((item, i) => {
        // console.log('FOR EARCH=====>', item.fileName.slice(-8, -1) + 'g');
        console.log('===>FOR EARCH===>', item?.assets[0].fileName);
        data.append('images[]', {
          uri: item?.assets[0].uri,
          type: item?.assets[0].type,
          name: item?.assets[0].fileName.slice(-8, -1) + 'g',
        });
      });
      data.append('location', country);
      data.append('description', description);
      // data.append('location', selectArea);
      setLoading(true);
      await fetch(`http://95.179.209.186/api/listings-store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then(response => response.json())
        .then(data => {
          //   const res = data.json();
          const respo = data;
          console.log(respo?.status, '=====>');
          if (respo?.message == 'Something missing. All fields are required') {
            alert(respo?.message);
            setLoading(false);
          } else {
            // alert(respo?.message);
            setModalVisible(!modalVisible),
              setTimeout(() => {
                setModalVisible(false);
                setLoading(false);
                navigation.navigate('BottomNavigation', { screen: 'Home' });
              }, 2000);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert('fileds are required');
      setLoading(false);
    }
  };

  const focused = useIsFocused();

  useEffect(() => {
    getCityName();
  }, [focused == true]);

  const handleSearchCites = searctTxt => {
    const filterData = citeiesList?.filter(val =>
      val?.toLowerCase().startsWith(searctTxt.toLowerCase()),
    );
    // const filterData = citeiesList.filter(val => val == searctTxt);
    setFilterCiteisList(filterData);
    if (searctTxt == '') {
      setFilterCiteisList(citeiesList);
    }
  };

  const getCityName = () => {
    // setLoading(true);
    fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        country: 'Spain',
      }),
    })
      .then(res => res.json())
      .then(json => {
        // setLoading(false)
        //console.log(json)
        if (json.error == false) {
          setCititesList(json.data);
          setFilterCiteisList(json.data);
        } else {
          alert(json.error);
        }
      })
      .catch(error => {
        // setLoading(false);
        console.log('response error ===>', error);
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
            // padding: 10,
            marginTop: 35,
            borderStyle: 'dashed',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              padding: 10,
            }}>
          {images.length ===  0 ?   <Text style={{ color: '#000000' }}>
                {t('common:uploadupto10pictures')}
              </Text> :  <TouchableOpacity
              // onPress={LaunchImageLibrary}
              onPress={() => setopenModal1(true)} style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{ color: '#000000' }}>
                {t('common:uploadupto10pictures')}
              </Text>
              <AntDesign name="right" size={15} color="black" style={{left:10}} />
            </TouchableOpacity>}
           
          </View>
          {images.length == 0 ? (
            <>
              <View
                style={{
                  height: 70,
                  width: 80,
                  borderRadius: 20,
                  backgroundColor: 'lightgray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <TouchableOpacity onPress={() => setopenModal1(true)}>
                  <AntDesign color="gray" size={20} name="pluscircle" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <ScrollView horizontal>
              {images.map((val, index) => {
                // console.log(val);
                return (
                  <>
                    <View style={{ marginVertical: 10, bottom: 10 }}>
                      <TouchableOpacity
                        // key={Math.random() * 1000}
                        onPress={() => RemoveImage(val) }
                        style={{
                          flexDirection: 'row-reverse',
                          // position: 'absolute',
                          elevation: 10,
                          zIndex: 1,
                        }}>
                        <AntDesign
                          name="closecircle"
                          style={{ top: 10 }}
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
                        source={{ uri: val == undefined ? null : val }}
                      // source={{uri: val}}
                      />
                    </View>
                  </>
                );
              })}
            </ScrollView>
          )}
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
        <TouchableOpacity
          onPress={() => {
            setModalVisible1(true), setCountryModal(!countryModal);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // padding: 5,

            borderWidth: 1,
            marginVertical: 10,

            // borderTopEndRadius: 20,
            // borderTopLeftRadius: 20,
            // borderBottomLeftRadius: countryModal ? 0 : 20,
            // borderBottomRightRadius: countryModal ? 0 : 20,
            borderRadius: 20,
            // borderBottomWidth: countryModal ? 1 : 1,
            borderColor: 'gray',
            top: 5,
          }}>
          {/* <TextInput
            setTxt={txt => setCountry(txt)}
            placeholderTextColor={Color.darkGray}
            placeholder={country}
          /> */}
          <Text style={{ padding: 20 }}>{country}</Text>
          {/* <TextField
      
            setTxt={txt => setCountry(txt)}
            placeHolder={t('common:country')}
          /> */}
          <TouchableOpacity
            style={{ right: 10 }}
          // onPress={() => setCountryModal(!countryModal)}
          >
            <AntDesign name={'down'} size={20} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
        {countryModal ? (
          <>
            <Modal
              statusBarTranslucent={true}
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible1(!modalVisible);
              }}>
              <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    paddingVertical: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                // onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: 'black', fontSize: 20 }}>
                    Select Location
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible1(false)}>
                    <AntDesign color="black" name="close" size={30} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  placeholder="search citeis ...."
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 20,
                    marginHorizontal: 10,
                    color: 'black',
                    // backgroundColor: 'blue',
                    padding: 10,
                  }}
                  onChangeText={txt => handleSearchCites(txt)}
                />
                <FlatList
                  style={styles.txtContainer1}
                  data={filterCitiesList}
                  renderItem={item => {
                    return (
                      <TouchableOpacity
                        style={{
                          borderBottomWidth: 1,
                          borderColor: 'black',
                          paddingVertical: 10,
                          marginBottom: 22,
                        }}
                        onPress={() => {
                          setCountryModal(false), setCountry(item.item);
                        }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>
                          {item.item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </Modal>

            {/* <TextInput
                placeholder="search citeis"
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  // backgroundColor: 'blue',
                  padding: 10,
                }}
                onChangeText={txt => handleSearchCites(txt)}
              />
              <FlatList
                style={styles.txtContainer1}
                data={filterCitiesList}
                renderItem={item => {
                  return (
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 1,
                        borderColor: 'black',
                        paddingVertical: 10,
                        marginBottom: 22,
                      }}
                      onPress={() => {
                        setCountryModal(false), setCountry(item.item);
                      }}>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>
                        {item.item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              /> */}

            {/* <ScrollView nestedScrollEnabled={true} style={styles.txtContainer1}>
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
                        setCountryModal(false), setCountry(data);
                      }}>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>
                        {data}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </ScrollView> */}
            {/* </ScrollView> */}
          </>
        ) : null}

        {/* <TextField
          setTxt={txt => setSelectArea(txt)}
          placeHolder={t('common:selectarealocation')}
        /> */}
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
            <Text style={{ color: 'black' }}>{t('common:iagreetoGoldbee')}</Text>

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
        {Loading ? (
          <>
            <TouchableOpacity disabled style={styles.containe11}>
              <ActivityIndicator size={20} color={Color.yellow} />
            </TouchableOpacity>
          </>
        ) : (
          <Buttons
            onpress={() => {
              postListing();
            }}
            name={t('common:postlisting')}
          />
        )}
        <Modal
          statusBarTranslucent
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
                style={{ height: 90, width: 90 }}
                source={require('../../assets/Icons/Group13719.png')}
              />
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ fontWeight: 'bold', color: 'black', fontSize: 17 }}>
                  {t('common:postedscucessfully')}
                </Text>
                <Text style={{ color: 'black' }}>
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
        visible={openModal1}>
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
                setopenModal1(false), LaunchCamera();
              }}
              style={{ flexDirection: 'row' }}>
              <Ico name="camerao" size={30} color="black" />
              <Text style={{ fontSize: 15, color: 'black', top: 5, left: 10 }}>
                {t('common:takeaphoto')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={LaunchImageLibrary}
              onPress={() => {
                LaunchImageLibrary(), setopenModal1(false);
              }}
              style={{ flexDirection: 'row' }}>
              <Gender name="view-dashboard-outline" size={30} color="black" />
              <Text style={{ fontSize: 15, color: 'black', top: 5, left: 10 }}>
                {t('common:chosefromGallery')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Modal
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={countryModal}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setCountryModal(!countryModal);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.61)',
            flexDirection: 'column-reverse',
          }}>
          <ScrollView
            style={{
              backgroundColor: 'white',
              padding: 20,
              margin: 30,
              marginVertical: 230,

              borderRadius: 20,
              // justifyContent: 'flex-end',
            }}>
            {cities.map((data, index) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setCountryModal(false), setCountry(data), alert(data);
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: 'black',
                      padding: 10,
                      marginBottom: 30,
                    }}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      {data}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            })}
          </ScrollView>
        </View>
      </Modal> */}
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

  containe11: {
    marginTop: 30,
    // margin: 20,
    borderWidth: 1,
    borderColor: Color.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
  },
  SignUp11: {
    color: Color.darkOrange,
    fontWeight: 'bold',
  },
});
