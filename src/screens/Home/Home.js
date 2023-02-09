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
import React, {useState} from 'react';
import {Color} from '../../constants/colors';
import SearchBar from '../../components/SearchBar';
import CategoryContainer from '../../components/CategoryContainer';
import Card from '../../components/Card';
import {useTranslation} from 'react-i18next';
import {Base_Url} from '../../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

// @ICons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Home = ({naviagtion}) => {
  const {t} = useTranslation();

  const [data, setData] = React.useState();
  const [filterData, setFilterData] = React.useState();
  const [selected, setSelected] = React.useState(t('common:all'));
  const [countryModal, setCountryModal] = React.useState(false);
  const [Cities, setCities] = React.useState('Cities');
  const [searchItem, setSearchItem] = React.useState('');

  //Citeis
  const [citeiesList, setCititesList] = useState([]);
  const [filterCitiesList, setFilterCiteisList] = useState();

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
      body: JSON.stringify({user_id: userId}),
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
    const filterData = data?.filter(val =>
      val?.title.toLowerCase().startsWith(searctTxt.toLowerCase()),
    );
    setFilterData(filterData);
    if (searctTxt == '') {
      setFilterData(data);
    }
  };

  const handleSearchCites = searctTxt => {
    const filterData = citeiesList.filter(val => val == searctTxt);
    setFilterCiteisList(filterData);
    if (searctTxt == '') {
      setFilterCiteisList(citeiesList);
    }
  };

  const focused = useIsFocused();
  React.useEffect(() => {
    getAllListing();
    getCityName();
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

  const getCityName = country => {
    // setLoading(true);
    fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        country: 'Spain',
      }),
    })
      .then(res => res.json())
      .then(json => {
        // setLoading(false)
        //console.log(json)
        if (json.error == false) {
          setCititesList(json.data);
          setFilterCiteisList(json.data);
          console.log('CITIES NAME=====>', json.data);
        } else {
          alert(json.error);
        }
      })
      .catch(error => {
        // setLoading(false);
        console.log('response error ===>', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Entypo
              name={'location'}
              size={20}
              color="black"
              style={{left: '10%'}}
            /> */}
            <Image
              style={{height: 20, width: 20}}
              source={require('../../assets/Icons/Group4039.png')}
            />
            <Text style={{left: '100%'}}>{Cities}</Text>
          </View>
          {/* <TextField
      
            setTxt={txt => setCountry(txt)}
            placeHolder={t('common:country')}
          /> */}
          <TouchableOpacity
            style={{right: 10}}
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
            <TextInput
              placeholder="search citeis"
              style={{
                borderWidth: 1,
                borderColor: 'black',
                // backgroundColor: 'blue',
                padding: 10,
              }}
              onChangeText={txt => handleSearchCites(txt)}
            />
            <FlatList
              style={styles.txtContainer1}
              data={filterCitiesList}
              renderItem={item => {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      borderColor: 'black',
                      paddingVertical: 10,
                      marginBottom: 22,
                    }}
                    onPress={() => {
                      setCountryModal(false), setCities(item.item);
                    }}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        ) : null}
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
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name="Bangles"
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13731.png')}
              />
            }
          />
          <CategoryContainer
            onPress={handleSelected}
            value={selected}
            name="Diamonds"
            Icon={
              <Image
                style={{height: 20, width: 20}}
                source={require('../../assets/Icons/Group13730.png')}
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
