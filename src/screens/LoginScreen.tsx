import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomTextInput from '../components/TextInput/TextInputCustom';
import colors from '../utils/colors';
import Header from '../components/Header/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';
import CustomCheckbox from '../components/Checkbox/CustomCheckbox';
import ImageComponent from '../components/Image/CustomImage';
import images from '../assets/mageAssets';
import CustomText from '../components/Text/TextComponent';
import Locale from '../constants/Locale';
import CustomButton from '../components/Button/CustomButton';
import {ApiResponse, User} from '../constants/types';
import {API} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordTextInputCustom from '../components/TextInput/PasswordTextInputCustom';

type Props = NativeStackScreenProps<any, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserDetail = async (userid: string) => {
    try {
      const res = await API.getUserDetail(userid);
      let response = res?.data;
      console.log({userdetailsssss: response});
      if (response?.status) {
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response?.data?.user),
        );
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Drawer'}],
        });
        // navigation.navigate('Drawer');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error loading sales:', error);
    } finally {
      // setLoading(false);
    }
  };
  const loginApi = async () => {
    try {
      if (!email) {
        Alert.alert('Email is required');
        return;
      } else if (!password) {
        Alert.alert('Password is required');
        return;
      }

      setLoading(true);
      let body = {
        phone: email,
        password: password,
      };
        navigation.navigate('Drawer');

      return
      const response = await API.login(body);
      console.log('login api response////', response?.data);
      if (response?.data?.status) {
        setData(response?.data?.data?.user); // Set the API response data

        await AsyncStorage.setItem(
          'token',
          JSON.stringify(response?.data?.data?.token),
        );
        getUserDetail(response?.data?.data?.user?.id);
        // navigation.navigate('Drawer');
      }
    } catch (err) {
      setLoading(false);
      console.log({err});
      setError(err as string);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* <Header title="Home" /> */}
          <ImageComponent height={200} width={200} source={images.EMSlogo} />
          <View style={styles.form}>
            <CustomTextInput
              label={Locale.Email}
              value={email}
              onChangeText={setEmail}
              keyboardType={'email-address'}
              placeholder={Locale.Enter_email}
            />
            <PasswordTextInputCustom
              label={Locale.Password}
              value={password}
              onChangeText={setPassword}
              keyboardType={'default'}
              placeholder={Locale.EnterPassword}
            />
            <View style={styles.remeberMeStyle}>
              <TouchableOpacity onPress={()=>console.log("login button press")}>
            <CustomText text={Locale.Dont_have_account} style={styles.donthaveaccountTextStyle} />
              </TouchableOpacity>
              <CustomCheckbox label={Locale.Remember_me} />
              
            </View>

            <CustomButton
              title={Locale.Login}
              onPress={() => loginApi()}
              style={{marginTop: 30}}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center', // Ensures content is centered and scrollable when keyboard opens
  },
  welcomeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  donthaveaccountTextStyle: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 5,
  },
  form: {
    marginTop: 20,
  },
  remeberMeStyle: {flexDirection: 'row', gap: 4, alignItems: 'center',justifyContent:"space-between"},
});

export default LoginScreen;
