import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import TextField from '../../components/TextField';
import Buttons from '../../components/Buttons';
// import CheckBox from 'react-native-check-box';
import {Checkbox} from 'react-native-paper';

const SignUp = () => {
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
          <Text style={{color: 'black', right: 10}}>I agree to Goldbee</Text>

          <Text
            style={{
              textDecorationLine: 'underline',

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
        <Text style={styles.loginTxt}>LOGIN </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    margin: 10,
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
  },
  loginTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Color.darkOrange,
  },
});
