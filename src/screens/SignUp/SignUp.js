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

const SignUp = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
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
        <TextField placeHolder={t('common:firstname')} />
        <TextField placeHolder={t('common:lastname')} />
        <TextField placeHolder={t('common:email')} />
        <TextField placeHolder={t('common:country')} />
        <TextField placeHolder={t('common:password')} />
        <TextField placeHolder={t('common:conformpassword')} />
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
            justifyContent: 'center',
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
        <Buttons name={t('common:Signup')} />
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
