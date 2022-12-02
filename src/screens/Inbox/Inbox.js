import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import InboxMessages from '../../components/InboxMessages';
import {InboxPeople} from '../../constants/dummyData';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';

const Inbox = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        <SwitchButton />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* //Main View */}
          {InboxPeople.map((data, indx) => {
            return (
              <InboxMessages
                key={data.id}
                name={data.name}
                productName={data.productName}
                imageUri={data.imageUri}
                time={data.time}
                message={data.message}
                price={data.price}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const SwitchButton = () => {
  const {t} = useTranslation();

  const [clicked, setClicked] = React.useState(true);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 30,
          margin: 35,
        }}>
        <TouchableOpacity
          onPress={() => setClicked(true)}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: clicked ? Color.darkOrange : Color.splashWhite,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
            },
          ]}>
          <Text
            style={{textAlign: 'center', color: clicked ? 'white' : 'black'}}>
            {t('common:buying')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setClicked(false)}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: clicked ? Color.splashWhite : Color.darkOrange,
              borderBottomRightRadius: 30,
              borderTopRightRadius: 30,
            },
          ]}>
          <Text
            style={{textAlign: 'center', color: clicked ? 'black' : 'white'}}>
            {t('common:selling')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export {SwitchButton};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    padding: 10,
  },

  buttonStyle: {
    padding: 20,

    borderWidth: 1,
    borderColor: 'lightgray',

    width: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
