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
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextField from '../../components/TextField';
import Buttons from '../../components/Buttons';
import {Color} from '../../constants/colors';
import {Checkbox} from 'react-native-paper';

const PostingListing = ({navigation}) => {
  const [checked, setChecked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const selectedImg = [
    {id: 1, imgUri: require('../../assets/SamplePictures/1.png')},
    {id: 2, imgUri: require('../../assets/SamplePictures/2.png')},
  ];

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
            <TouchableOpacity>
              <Text style={{color: '#000000'}}>Upload Upto 10 Pictures</Text>
            </TouchableOpacity>
            <AntDesign name="right" size={15} color="black" />
          </View>
          <View style={{flexDirection: 'row'}}>
            {selectedImg.map((val, index) => {
              return (
                <>
                  <View>
                    <TouchableOpacity
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
                      source={val.imgUri}
                    />
                  </View>
                </>
              );
            })}
          </View>
        </View>
        {/* First Container END */}
        <TextField placeHolder="Listing Title" />
        <TextField placeHolder="Price" />
        <TextField placeHolder="Country" />
        <TextField placeHolder="Select Area / Location" />
        <View>
          <TextInput
            placeholderTextColor={'gray'}
            style={styles.txtContainer}
            placeholder="Describ about your listing..."
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
        {/* @Button */}
        <Buttons
          onpress={() => {
            setModalVisible(!modalVisible),
              setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('MyProfile');
              }, 3000);
          }}
          name="Post Listing"
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
                source={require('../../assets/Icons/Group13719.png')}
              />
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontWeight: 'bold', color: 'black', fontSize: 17}}>
                  Posted Scucessfully
                </Text>
                <Text style={{color: 'black'}}>
                  Your listing posted successfully
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
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
});
