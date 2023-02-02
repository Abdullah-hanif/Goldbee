import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../constants/colors';
import TextField from '../../components/TextField';
import Buttons from '../../components/Buttons';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Back from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @API_Call
import {Base_Url, loginUser} from '../../api/Api';

// @LANGUGE IMPORTS
import {useTranslation} from 'react-i18next';

const Login = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = React.useState('test@gmail.com');
  const [password, setPassword] = React.useState('123456');
  const {t} = useTranslation();

  const loginUser = async () => {
    console.log('USERNAME===>', email);
    console.log('PASSWORD===>', password);

    fetch(`${Base_Url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        console.log(respo?.status, '=====>');
        if (respo?.message == 'Logged In successfully') {
          alert(respo?.data?.id);
          const uid = respo?.data?.id;
          console.log('logggg', typeof uid);
          AsyncStorage.setItem('uid', JSON.stringify(uid));

          navigation.navigate('BottomNavigation');
        } else {
          alert(respo?.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back name="left" size={20} color="black" />
      </TouchableOpacity>
      <View style={{marginTop: '15%'}}>
        <Text style={{fontWeight: 'bold', color: Color.black, fontSize: 28}}>
          {t('common:Login')}
        </Text>
        <Text style={{color: Color.darkGray, fontSize: 15}}>
          {t('common:Goldybeeseller')}
        </Text>
        <View style={{marginTop: 20}}>
          <TextField
            val={email}
            setTxt={txt => setEmail(txt)}
            placeHolder={t('common:email')}
          />
          <TextField
            val={password}
            setTxt={txt => setPassword(txt)}
            placeHolder={t('common:password')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <Text>checkBox</Text> */}
            <Checkbox
              color={checked ? Color.darkOrange : 'black'}
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{marginTop: 8, color: 'black'}}>
              {t('common:rememberme')}
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: Color.darkOrange,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {t('common:forgotpassword')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: '50%',
          }}>
          <Buttons onpress={loginUser} name={t('common:Login')} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Text style={{color: 'black'}}>
              {t('common:donthaveanaccount')}{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{color: Color.darkOrange, fontWeight: 'bold'}}>
                {t('common:Signup')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    padding: 20,
  },
});
