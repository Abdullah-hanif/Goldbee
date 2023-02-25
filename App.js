import { StyleSheet, NativeModules } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import { useTranslation } from 'react-i18next';

// import './src/constants/DCSLocalize';
import './src/constants/DCSLocalize';

const App = () => {


  const locale = NativeModules.I18nManager.localeIdentifier;
  console.log('==>LOCAL BEFORE===>', locale);
  const localLang = locale.split('_');
  const { t, i18n } = useTranslation();

  // const localLang = ['es', 'es'];
  // es mean spanish
  console.log('====>DEVICE LANG', localLang[0]);

  const setLanguge = code => {
    return i18n.changeLanguage(code);
  };

  React.useEffect(() => {
    setLanguge(localLang[0]);
    setTimeout(() => {
      setLanguge(localLang[0]);
    }, 2000);
  }, []);
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  style1: {
    fontFamily: 'Roboto-Italic',
    fontSize: 30,
  },
});
