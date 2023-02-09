import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color} from '../../constants/colors';
import TextField from '../../components/TextField';
import Buttons from '../../components/Buttons';
// import CheckBox from 'react-native-check-box';
import {Checkbox} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Back from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {Base_Url} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ICons
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignUp = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [firstname, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conPassword, setConPassword] = React.useState('');
  const [Cities, setCities] = React.useState('Cities');
  const [country, setCountry] = React.useState('Country');

  const [countryModal, setCountryModal] = React.useState(false);

  const [citeiesList, setCititesList] = useState([]);
  const [filterCitiesList, setFilterCiteisList] = useState();

  // const [userDetail, setUseDetails] = React.useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmed_password: '',
  // });

  const focused = useIsFocused();
  useEffect(() => {
    getCityName();
  }, [focused == true]);

  const handleSearchCites = searctTxt => {
    const filterData = citeiesList.filter(val => val == searctTxt);
    setFilterCiteisList(filterData);
    if (searctTxt == '') {
      setFilterCiteisList(citeiesList);
    }
  };

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

  const signInUser = () => {
    console.log('STATE====>', firstname, lastName, email, conPassword);
    fetch(`${Base_Url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${firstname}" "${lastName}`,
        email: email,
        password: password,
        confirmed_password: conPassword,
        city: Cities,
      }),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        console.log(respo?.status, '=====>');
        if (respo?.message == 'Registered successfully') {
          alert(respo?.message);
          const uid = respo?.data?.id;
          AsyncStorage.setItem('uid', JSON.stringify(uid));

          console.log('RESPONSE======>', respo);
          navigation.navigate('BottomNavigation');
          // navigation.navigate('Login');
        } else {
          alert(respo?.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getCityName = country => {
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
          console.log('CITIES NAME=====>', json.data);
        } else {
          alert(json.error);
        }
      })
      .catch(error => {
        // setLoading(false);
        console.log('response error ===>', error);
      });
  };
  const {t} = useTranslation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back name="left" size={20} color="black" />
      </TouchableOpacity>
      <View style={{marginTop: '15%'}}>
        <Text style={{fontWeight: 'bold', color: Color.black, fontSize: 28}}>
          {t('common:Signup')}
        </Text>
        <Text style={{color: 'black'}}>{t('common:letsgetstarted')}</Text>
      </View>
      <View style={styles.txtInputs}>
        <TextField
          setTxt={txt => setFirstName(txt)}
          placeHolder={t('common:firstname')}
        />
        <TextField
          setTxt={txt => setLastName(txt)}
          placeHolder={t('common:lastname')}
        />
        <TextField
          setTxt={txt => setEmail(txt)}
          placeHolder={t('common:email')}
        />
        <TextField
          setTxt={txt => setCountry(txt)}
          placeHolder={t('common:country')}
        />
        <TextField
          setTxt={txt => setPassword(txt)}
          placeHolder={t('common:password')}
        />
        <View
          style={[
            styles.dropDownContainer,
            {
              borderBottomLeftRadius: countryModal ? 0 : 20,
              borderBottomRightRadius: countryModal ? 0 : 20,
              // borderRadius: 20,
              borderBottomWidth: countryModal ? 1 : 1,
            },
          ]}>
          <TextInput
            // setTxt={txt => setCountry(txt)}

            placeholderTextColor={Color.darkGray}
            placeholder={Cities}
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
            <>
              <TextInput
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
                scrollEnabled={true}
                nestedScrollEnabled={true}
                style={styles.txtContainer1}
                data={filterCitiesList}
                renderItem={item => {
                  return (
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 1,
                        borderColor: Color.gray,
                        paddingVertical: 10,
                        marginBottom: 22,
                      }}
                      onPress={() => {
                        setCountryModal(false), setCities(item.item);
                      }}>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>
                        {item.item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          </>
        ) : null}
        <TextField
          setTxt={txt => setConPassword(txt)}
          placeHolder={t('common:conformpassword')}
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
      <View>
        <Buttons onpress={() => signInUser()} name={t('common:Signup')} />
      </View>
      <View style={styles.bottomTxt}>
        <Text style={{color: 'black'}}>
          {t('common:Alreadyhaveandaccount')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginTxt}>{t('common:Login')} </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    padding: 20,
  },
  txtInputs: {
    marginTop: 20,
  },
  checkBox: {
    flexDirection: 'row',
    marginTop: 20,

    // marginHorizontal: 10,
  },
  bottomTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
    top: 20,
  },
  loginTxt: {
    fontWeight: 'bold',
    fontSize: 15,
    left: 10,
    color: Color.darkOrange,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // padding: 5,

    borderWidth: 1,
    marginVertical: 10,

    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,

    borderColor: 'gray',
    top: 5,
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
