import {
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

const SignUp = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={{fontWeight: 'bold', color: Color.black, fontSize: 28}}>
        Sign Up
      </Text>
      <Text>Let's get started</Text>
      <View style={styles.txtInputs}>
        <TextField placeHolder="First Name" />
        <TextField placeHolder="Last Name" />
        <TextField placeHolder="Email" />
        <TextField placeHolder="Country" />
        <TextField placeHolder="Password" />
        <TextField placeHolder="Conform Password" />
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
          }}>
          <Text style={{color: 'black'}}>I agree to Goldbee</Text>

          <Text
            style={{
              textDecorationLine: 'underline',
              left: 10,
              fontWeight: 'bold',
              color: 'black',
            }}>
            terms and condition
          </Text>
        </View>
      </View>
      <View>
        <Buttons name="Sign Up" />
      </View>
      <View style={styles.bottomTxt}>
        <Text>Already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginTxt}>LOGIN </Text>
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
    padding: 10,
  },
  txtInputs: {
    marginTop: 20,
  },
  checkBox: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
  },
  bottomTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Color.darkOrange,
  },
});
