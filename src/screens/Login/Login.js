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

const Login = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back name="left" size={20} color="black" />
      </TouchableOpacity>
      <View style={{marginTop: '15%'}}>
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
            <Text style={{marginTop: 8, color: 'black'}}>Remember me ?</Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: Color.darkOrange,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: '50%',
          }}>
          <Buttons name="Login" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Text style={{color: 'black'}}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('BottomNavigation')}>
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
    padding: 20,
  },
});
