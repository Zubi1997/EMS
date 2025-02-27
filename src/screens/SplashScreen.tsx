import {Image, Linking, Platform, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen';
import images from '../assets/mageAssets';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreenComponent = ({navigation}) => {
  const [killStateActive, setKillStateActive] = useState('');
  const [notification, setNotification] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getIntialRoute = async () => {
      // let data = await AsyncStorage.getItem('user');
      // let userData = await JSON.parse(data);
      console.log('splash runing');

      setTimeout(async() => {
        // if (userData) {
        // SplashScreen.hide();
        // navigation.navigate('Login'); 
        const data = await AsyncStorage.getItem('token');
        const authToken = JSON.parse(data);
        if(authToken){
          navigation.reset({
            index: 0,
            routes: [{name: 'Drawer', params: {}}],
          });
        }
        else{

        navigation.reset({
          index: 0,
          routes: [{name: 'Login', params: {}}],
        });
      }

        // }
      }, 1000);
    };
    getIntialRoute();
  }, [navigation]);
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      {/* <Image resizeMode="contain" source={images.logo} style={styles.image} /> */}
    </SafeAreaView>
  );
};

export default SplashScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 160,
    width: 160,
  },
});
