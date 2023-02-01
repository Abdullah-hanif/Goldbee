import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Color } from '../../constants/colors';
import SearchBar from '../../components/SearchBar';
import CategoryContainer from '../../components/CategoryContainer';
import Card from '../../components/Card';
import { useTranslation } from 'react-i18next';
import { Base_Url } from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

// @ICons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Home = ({ naviagtion }) => {
  const { t } = useTranslation();

  const [data, setData] = React.useState();
  const [filterData, setFilterData] = React.useState();
  const [selected, setSelected] = React.useState(t('common:all'));
  const [countryModal, setCountryModal] = React.useState(false);
  const [Cities, setCities] = React.useState('Cities');
  const [searchItem, setSearchItem] = React.useState('');

  const cities = [
    'Madrid',
    'Barcelona',
    'Valencia',
    'Sevilla',
    'Málaga',
    'Murcia',
    'Bilbao',
    'Zaragoza',
    'Palma de Mallorca',
    'Las Palmas de Gran Canaria',
  ];

  // console.log('=====>HOME DATA===>', data);
  const getAllListing = async () => {
    const userId = await AsyncStorage.getItem('uid');
    // console.log('USER ID ====>', userId);
    await fetch(`${Base_Url}/get-listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({location: 'test'}),
    })
      .then(response => response.json())
      .then(data => {
        //   const res = data.json();
        const respo = data;
        // console.log('RESPONSE HOME', respo?.data);

        let tempData = [];
        respo?.data?.map(item => {
          tempData = [...tempData, ...item.listings];
        });
        setData(tempData);
        setFilterData(tempData);
        // console.log('RESPONSE LENGTH====>', tempData.length);
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

  const hadlefilter = () => {
    const filterData = data?.filter(val => val?.category === selected);
    setFilterData(filterData);
    // console.log('CONDITOON DATA===>', filterData);
    selected == 'All' ? getAllListing() : null;
  };
  const hadleCiteiesFilter = () => {
    const filterData = data?.filter(val => val?.location === Cities);
    setFilterData(filterData);
    // console.log('CONDITOON DATA===>', filterData);
    // Cities == 'All' ? getAllListing() : null;
  };

  const handleSearchItem = searctTxt => {
    const filterData = data?.filter(val => val?.title === searctTxt);
    setFilterData(filterData);
  };

  const focused = useIsFocused();
  React.useEffect(() => {
    getAllListing();
  }, [focused == true]);

  React.useEffect(() => {
    hadlefilter();
  }, [selected]);

  React.useEffect(() => {
    hadleCiteiesFilter();
  }, [Cities]);

  const handleSelected = value => {
    setSelected(value);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <SearchBar getSearch={txt => handleSearchItem(txt)} />
        <View
          style={[
            styles.dropDownContainer,
            {
              borderBottomLeftRadius: countryModal ? 0 : 30,
              borderBottomRightRadius: countryModal ? 0 : 30,
              // borderRadius: 20,
              borderBottomWidth: countryModal ? 1 : 1,
            },
          ]}>
          {/* <TextInput
            // setTxt={txt => setCountry(txt)}

            placeholderTextColor={Color.darkGray}
            placeholder={Cities}
          /> */}
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Entypo
              name={'location'}
              size={20}
              color="black"
              style={{left:'10%'}}
            />
            <Text style={{left:'100%'}}>{Cities}</Text>
          </View>
          {/* <TextField
      
            setTxt={txt => setCountry(txt)}
            placeHolder={t('common:country')}
          /> */}
          <TouchableOpacity
            style={{ right: 10 }}
            onPress={() => setCountryModal(!countryModal)}>
            <AntDesign
              name={countryModal ? 'caretup' : 'caretdown'}
              size={18}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {countryModal ? (
          <>
            <ScrollView nestedScrollEnabled={true} style={styles.txtContainer1}>
              {cities.map((data, index) => {
                return (
                  <>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 1,
                        borderColor: 'black',
                        paddingVertical: 10,
                        marginBottom: 22,
                      }}
                      onPress={() => {
                        setCountryModal(false), setCities(data);
                      }}>
                      <Text style={{ color: 'black', fontWeight: 'bold' }}>
                        {data}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </ScrollView>
            {/* </ScrollView> */}
          </>
        ) : null}
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ width: '100%' }}>
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name={t('common:all')}
            Icon={
              <Image
                style={{ height: 20, width: 20 }}
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
                style={{ height: 20, width: 20 }}
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
                style={{ height: 20, width: 20 }}
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
                style={{ height: 20, width: 20 }}
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
                style={{ height: 20, width: 20 }}
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
        style={{ margin: 20 }}
        data={filterData}
        numColumns={2}
        renderItem={item => {
          return (
            <>
              <Card
                getFUN={() => getAllListing()}
                id={item?.item?.id}
                name={item?.item?.title}
                price={`$ ${item?.item?.price}`}
                bgImage={item?.item?.images}
                // bgImage={{
                //   uri: `${
                //     item?.item?.images
                //       ? item?.item?.images
                //       : item?.item?.images == null
                //       ? [1]
                //       : item?.item?.images
                //   }`,
                // }}
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
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    // padding: 5,

    borderWidth: 1,
    marginVertical: 10,

    // borderTopEndRadius: 20,
    // borderTopLeftRadius: 20,
    borderRadius: 30,

    borderColor: 'gray',
    top: 5,
  },
  txtContainer1: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'gray',
    height: 120,

    paddingTop: 30,
    borderTopWidth: 0,
    bottom: 10,

    padding: 10,
    textAlignVertical: 'top',
  },
});
