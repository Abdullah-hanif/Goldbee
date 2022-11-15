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

const Login = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{marginTop: 50}}>
        <Text style={{fontWeight: 'bold', color: Color.black, fontSize: 28}}>
          Login
        </Text>
        <Text style={{color: Color.darkGray, fontSize: 15}}>
          Goldybee Seller
        </Text>
        <View style={{marginTop: 20}}>
          <TextField placeHolder="Email" />
          <TextField placeHolder="Password" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <Text>checkBox</Text> */}
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>Remember me ?</Text>
          </View>
          <TouchableOpacity>
            <Text style={{color: Color.darkOrange, fontWeight: 'bold'}}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 80,
          }}>
          <Buttons name="Login" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={{color: Color.darkOrange, fontWeight: 'bold'}}>
                Sign Up
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
    margin: 10,
  },
});
