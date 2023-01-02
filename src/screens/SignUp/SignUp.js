import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import TextField from '../../components/TextField';
import Buttons from '../../components/Buttons';
// import CheckBox from 'react-native-check-box';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Back from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {Base_Url} from '../../api/Api';

const SignUp = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [firstname, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conPassword, setConPassword] = React.useState('');

  // const [userDetail, setUseDetails] = React.useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmed_password: '',
  // });

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
      }),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        console.log(respo?.status, '=====>');
        if (respo?.message == 'Registered successfully') {
          alert(respo?.message);
          // navigation.navigate('BottomNavigation');
          navigation.navigate('Login');
        } else {
          alert(respo?.message);
        }
      })
      .catch(error => {
        console.error(error);
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
          setTxt={txt => setEmail(txt)}
          placeHolder={t('common:country')}
        />
        <TextField
          setTxt={txt => setPassword(txt)}
          placeHolder={t('common:password')}
        />
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
});
