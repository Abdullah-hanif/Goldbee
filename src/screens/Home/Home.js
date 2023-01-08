import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {Color} from '../../constants/colors';
import SearchBar from '../../components/SearchBar';
import CategoryContainer from '../../components/CategoryContainer';
import Card from '../../components/Card';
import {useTranslation} from 'react-i18next';
import {Base_Url} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({naviagtion}) => {
  const [data, setData] = React.useState();
  const getAllListing = async () => {
    const userId = await AsyncStorage.getItem('uid');
    // console.log('USER ID ====>', userId);
    await fetch(`${Base_Url}/get-listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: userId}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        // console.log('RESPONSE HOME', respo?.data);
        setData(respo?.data[0]?.listings);
        if (respo?.message == 'Logged In successfully') {
          console.log(respo?.status, '=====>');
        } else {
          console.log(respo?.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const focused = useIsFocused();
  React.useEffect(() => {
    getAllListing();
  }, [focused == true]);

  const {t} = useTranslation();
  const [selected, setSelected] = React.useState(t('common:all'));
  const handleSelected = value => {
    setSelected(value);
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <SearchBar />
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: '100%'}}>
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name={t('common:all')}
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13721.png')}
              />
            }
          />
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name={t('common:rings')}
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13722.png')}
              />
            }
          />
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name={t('common:necklaces')}
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13723.png')}
              />
            }
          />
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name={t('common:earrings')}
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13724.png')}
              />
            }
          />
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name={t('common:bracelat')}
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13725.png')}
              />
            }
          />
        </ScrollView>
      </View>

      <FlatList
        key={Math.random() * 100000}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        style={{margin: 20}}
        data={data}
        numColumns={2}
        renderItem={item => {
          return (
            <>
              <Card
                name={item?.item?.title}
                price={`$ ${item?.item?.price}`}
                bgImage={{
                  uri: `${
                    item?.item?.images
                      ? item?.item?.images
                      : item?.item?.images == null
                      ? [1]
                      : item?.item?.images
                  }`,
                }}
                isFav={item?.item?.isFollowed}
                productDetails={item?.item}
              />
              {/* {/* </View> */}
            </>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.splashWhite,
    // padding: 20,
  },
});
