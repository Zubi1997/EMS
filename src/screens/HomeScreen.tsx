import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Header from '../components/Header/Header';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  ApiResponse,
  DrawerParamList,
  RootStackParamList,
} from '../constants/types';
import CustomText from '../components/Text/TextComponent';
import Locale from '../constants/Locale';
import colors from '../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import fontSize from '../utils/fonts';
import * as Progress from 'react-native-progress';
import {screenSizes} from '../utils/normalize';
import Foundation from 'react-native-vector-icons/Foundation'; // Import the icon set you're using
// link to configure icons properly these are not set yet
// https://www.npmjs.com/package/react-native-vector-icons#macos-setup
import CustomButton from '../components/Button/CustomButton';
import Geolocation from 'react-native-geolocation-service';
import {API} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {useToast} from '../components/CustomToast/ToastContext';
import axios from 'axios';
import {Map_key} from '../constants/constants';

type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'HomeScreen'
>;

type card = {
  title: string;
  value: string;
};
const HomeScreen = () => {
  const [value, setValue] = useState(0);
  const [checkin, setCheckin] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {showToast} = useToast();
  const [stats, setStats] = useState(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    const constructor = async () => {
      getStats();
      const jsonValue = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(jsonValue);
      setCheckin(userData?.isCheckIn);
    };

    constructor();
  }, []);

  const Card = ({title, value}: card) => {
    return (
      <View style={styles.card}>
        <CustomText text={title} style={styles.headingCard} />
        <CustomText text={value} style={styles.valueCard} />
      </View>
    );
  };

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location for check-in functionality.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const requestIOSPermission = async () => {
    try {
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (status === RESULTS.GRANTED) {
        return true;
      } else if (status === RESULTS.DENIED) {
        const newStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return newStatus === RESULTS.GRANTED;
      } else if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Please enable location permissions in the app settings.',
        );
        return false;
      }
      return false;
    } catch (error) {
      console.error('Permission request error', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      // Request location permissions based on the platform
      let hasPermission = false;

      if (Platform.OS === 'android') {
        hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (!hasPermission) {
          hasPermission = await requestAndroidPermission();
        }
      } else if (Platform.OS === 'ios') {
        // For iOS, permissions are requested automatically when accessing location
        // hasPermission = true; // Assuming permissions in Info.plist are properly set
        hasPermission = await requestIOSPermission();
      }

      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required for check-in.',
        );
        return null;
      }

      // Fetch the current location
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            let formattedAddress = '';
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Map_key}`,
            );
            if (response.data.results.length > 0) {
              formattedAddress = response?.data?.results[0]?.formatted_address;
              // setAddress(formattedAddress);
            } else {
              Alert.alert('Error', 'No address found for this location.');
            }
            console.log({formattedAddress});

            resolve({latitude, longitude, formattedAddress});
          },
          error => {
            console.error('Location Error', error);
            reject(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    } catch (error) {
      console.error('Permission or Location Fetching Error', error);
      throw error;
    }
  };

  const checkinApi = async (check_in: boolean) => {
    const jsonValue = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(jsonValue);

    try {
      setLoading(true);
      const location = await getCurrentLocation();
      console.log({location});

      const body = {
        // lat: location?.latitude?.toString(),
        // lng: location?.longitude?.toString(),
        address: location?.formattedAddress,
      };
      console.log({check_in});
      console.log({body});

      let res: any;
      if (check_in) {
        console.log('checkout');
        res = await API.checkoutAttendence(body);
      } else {
        console.log('checkin');
        res = await API.checkinAttendence(body);
      }
      let response = res?.data;
      showToast(response?.message, 'success');
      console.log('login api response////', res?.data);
      setLoading(false);
      if (response?.message) {
        console.log('checkinstate setting////', !checkin);

        setCheckin(!checkin);
        updateCheckInStatus(!check_in);
      } else {
        console.log({response});
      }
    } catch (err) {
      console.log({err: err?.message});
      showToast(err?.message, 'error');
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  const updateCheckInStatus = async (check_in: boolean) => {
    try {
      // Step 1: Retrieve the user data from AsyncStorage
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue !== null) {
        const userData = JSON.parse(jsonValue);
        console.log({userDatammmm: userData});

        // Step 2: Update the isCheckIn value
        userData.isCheckIn = check_in;
        // Step 3: Save the updated user data back to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data updated successfully:', userData);
      } else {
        console.log('No user data found in local storage.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const getStats = async () => {
    try {
      setLoading(true);

      let res = await API.get_BA_Stats();
      let response = res?.data;
      console.log('getting stats////', response);
      setLoading(false);
      if (response?.status) {
        showToast(response?.message, 'success', 3000);
        setStats(response?.data);
        let percentage =
          response?.data?.monthSale / response?.data?.monthTarget;
        console.log({percentage});

        console.log(
          typeof response?.data?.monthSale,
          typeof response?.data?.monthTarget,
        );
        if (response?.data?.monthTarget > 0) {
          setValue(percentage);
        }
        console.log('stats get////', response?.data);
      } else {
        console.log({response});
      }
    } catch (err) {
      showToast(err?.message, 'error');

      console.log({err: err?.message});
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        onDrawerToggle={() => navigation.toggleDrawer()}
        title={Locale.home}
        isDrawer={true}
        // style={{backgroundColor: '#018749'}}
        // dark={true}
      />
      <View style={styles.container}>
        <View style={styles.attendence}>
          <CustomText text={Locale.markAttendence} style={styles.valueCard} />
          <View style={styles.warning}>
            <Foundation
              name={'alert'} // Icon for checked and unchecked state
              size={20}
              color={colors.error} // Adjust color if needed
            />
            <CustomText text={Locale.warningTxt} style={styles.warningtxt} />
          </View>
          {console.log({checkinnnnnn: checkin})}
          <CustomButton
            title={checkin ? Locale.checkout : Locale.checkin}
            onPress={() => checkinApi(checkin)}
            style={{
              marginTop: 30,
              backgroundColor: checkin ? colors.error : colors.primary,
            }}
            loading={loading}
          />
        </View>

        <View style={styles.card}>
          <CustomText text={Locale.thisMonth} style={styles.headingCard} />
          <CustomText
            text={`RS ${stats?.monthSale}`}
            style={styles.valueCard}
          />
          <View style={styles.targetView}>
            <CustomText text={Locale.salesTarget} style={styles.greyTxt12} />
            {/* <View> */}
            <View style={styles.pricecard}>
              <CustomText text={stats?.monthTarget} style={styles.whiteTxt12} />
            </View>
          </View>
          <View style={styles.progressBar}>
            <Progress.Bar
              progress={value}
              width={screenSizes.width / 1.5}
              height={7}
              style={{height: 7}}
              color={colors.primary}
            />
            <CustomText
              style={[styles.greyTxt12, styles.marginleft]}
              text={`${Math.floor(value * 100)}%`}
            />
          </View>
          {/* </View> */}
        </View>
        <Card title={Locale.AllSales} value={stats?.totalSales} />
        <Card title={Locale.unitsSale} value={stats?.totalUnits} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headingCard: {
    fontSize: fontSize.xsmall,
    color: colors.text,
    fontWeight: '500',
  },
  valueCard: {
    fontSize: fontSize.small,
    color: colors.text,
    fontWeight: 'bold',
    marginTop: 3,
  },
  greyTxt12: {
    fontSize: fontSize.xxsmall,
    color: colors.textGrey,
    marginTop: 3,
  },
  whiteTxt12: {
    fontSize: fontSize.xxsmall,
    color: colors.white,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  targetView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  pricecard: {
    backgroundColor: colors.primary,
    borderRadius: 3,
    // padding: 3,
    // height: 20,
    padding: 3,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  marginleft: {
    marginLeft: 10,
    marginTop: 0,
  },
  attendence: {
    backgroundColor: colors.lightPrimary,
    borderRadius: 10,
    padding: 20,
  },
  warning: {
    marginTop: 10,
    flexDirection: 'row',
  },
  warningtxt: {
    fontSize: fontSize.xxsmall,
    color: colors.textGrey,
    marginLeft: 10,
    flex: 1,
  },
});

export default HomeScreen;

// import React from 'react';
// import {View, StyleSheet, StatusBar} from 'react-native';
// import Header from '../components/Header/Header';
// import {useNavigation} from '@react-navigation/native';
// import {DrawerNavigationProp} from '@react-navigation/drawer';
// import {DrawerParamList} from '../constants/types';
// import CustomText from '../components/Text/TextComponent';
// import Locale from '../constants/Locale';
// import colors from '../utils/colors';
// import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

// type HomeScreenNavigationProp = DrawerNavigationProp<
//   DrawerParamList,
//   'HomeScreen'
// >;

// const HomeScreen = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>();
//   const insets = useSafeAreaInsets(); // Get safe area insets dynamically

//   return (
//     <>
//       {/* Set StatusBar color to red for the top */}
//       {/* <StatusBar backgroundColor="red" barStyle="light-content" /> */}
//       {insets.top > 0 && (
//         <View style={[styles.bottomNavBar, {height: insets.top}]} />
//       )}
//       <SafeAreaView style={styles.safeArea}>
//         {/* Top SafeArea (Red) */}
//         {/* <View style={[styles.topSafeArea, {height: -insets.top}]} /> */}

//         {/* Main Content */}
//         <View style={styles.darkHead}>
//           <Header
//             onDrawerToggle={() => navigation.toggleDrawer()}
//             title={Locale.home}
//             isDrawer={true}
//             style={{backgroundColor: '#018749'}}
//             dark={true}
//           />
//           <CustomText text="Mark Your Attendence" />
//         </View>
//         <View style={styles.container}>
//           <View>
//             <View>
//               <CustomText text={'Suleman'} style={styles.text} />
//               <View>
//                 <CustomText text={'ASM'} />
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Bottom SafeArea (Green) */}
//         <View style={[styles.bottomSafeArea, {height: insets.bottom}]} />
//       </SafeAreaView>

//       {/* For Android, setting bottom navigation color explicitly */}
//       {insets.bottom > 0 && (
//         <View style={[styles.bottomNavBar, {height: insets.bottom}]} />
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   topSafeArea: {
//     backgroundColor: 'red',
//   },
//   bottomSafeArea: {
//     backgroundColor: 'green',
//   },
//   bottomNavBar: {
//     backgroundColor: 'green', // Status bar color for the bottom navigation area on Android
//   },
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//     paddingHorizontal: 10,
//   },
//   text: {
//     fontSize: 24,
//   },
//   darkHead: {
//     backgroundColor: '#018749',
//   },
// });

// export default HomeScreen;
