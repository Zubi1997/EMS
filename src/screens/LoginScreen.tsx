import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Alert} from 'react-native';
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

type Props = NativeStackScreenProps<any, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState<string>('3294417346');
  const [password, setPassword] = useState<string>('aaaaaaaa');
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserDetail = async (userid: string) => {
    try {
      const res = await API.getUserDetail(userid);
      let response = res?.data;
      console.log({userdetailsssss: response});
      if (response?.status) {
        await AsyncStorage.setItem('userData', JSON.stringify(response?.data?.user));
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
      if (!username) {
        Alert.alert('Phone number is required');
        return;
      } else if (!password) {
        Alert.alert('Password is required');
        return;
      }

      setLoading(true);
      let body = {
        phone: username,
        password: password,
      };
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
          <ImageComponent height={200} width={200} source={images.logo} />
          <CustomText
            style={styles.welcomeText}
            text={Locale.WelcomeToRevival}
          />
          <CustomText style={styles.signinDesc} text={Locale.Please_sign_in} />
          <View style={styles.form}>
            <CustomTextInput
              label="Phone"
              value={username}
              onChangeText={setUsername}
              placeholder={Locale.EnterPhone}
            />
            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder={Locale.EnterPassword}
            />
            <CustomCheckbox label={Locale.RememberMe} />
            <CustomButton
              title="Login"
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
  signinDesc: {
    color: colors.darkGray,
    fontSize: 14,
    marginTop: 5,
  },
  form: {
    marginTop: 20,
  },
});

export default LoginScreen;
