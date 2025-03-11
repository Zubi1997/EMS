// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import colors from '../../utils/colors';
// type HeaderProps = {
//   title?: string;
//   isDrawer?: boolean;
//   onDrawerToggle?: () => void;
// };

// const Header: React.FC<HeaderProps> = ({
//   title,
//   isDrawer = true,
//   onDrawerToggle,
// }) => {
//   const navigation = useNavigation();

//   const handleBackPress = () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <TouchableOpacity
//         onPress={isDrawer ? onDrawerToggle : handleBackPress}
//         style={styles.iconButton}>
//         <Icon
//           name={isDrawer ? 'menu' : 'arrow-back'}
//           size={24}
//           color={colors.black}
//         />
//       </TouchableOpacity>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     // paddingHorizontal: 5,
//     // paddingVertical: Platform.OS === 'ios' ? 20 : 10,
//     backgroundColor: colors.white,
//     height: Platform.OS === 'ios' ? 90 : 50,
//   },
//   iconButton: {
//     padding: 5,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.black,
//     flex: 1,
//     textAlign: 'center',
//   },
// });

// export default Header;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import CustomButton from '../Button/CustomButton';
import fontSize from '../../utils/fonts';
import CustomText from '../Text/TextComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



type HeaderProps = {
  title?: string;
  isDrawer?: boolean;
  onDrawerToggle?: () => void;
  style?: ViewStyle; // To add custom styles if required
  dark?: boolean; // for dark mode
  right?: string; // for right side button
  onPressRight?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  isDrawer = false,
  onDrawerToggle,
  style,
  dark = false,
  right = '',
  onPressRight,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.headerContainer, {...style}]}>
      <TouchableOpacity
        onPress={isDrawer ? onDrawerToggle : handleBackPress}
        style={styles.iconButton}>
        <Icon
          name={isDrawer ? 'menu' : 'arrow-back'}
          size={24}
          color={dark ? colors.white : colors.black}
        />
      </TouchableOpacity>
      <Text style={[styles.title, {color: dark ? colors.white : colors.black}]}>
        {title}
      </Text>
      {right == 'createSale' ? (
        <CustomButton
          title="Create Sale"
          onPress={onPressRight}
          style={{
            height: 35,

            padding: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            paddingHorizontal: 20,
          }}
          textStyle={{fontSize: 14}}
        />
      ) : right == 'editSale' ? (
        <CustomButton
          title="Edit Sale"
          onPress={onPressRight}
          style={{
            height: 35,

            padding: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            paddingHorizontal: 20,
          }}
          textStyle={{fontSize: 14}}
        />
      )
      : right == 'logout' ? (
       <TouchableOpacity
       onPress={onPressRight}
       style={{flexDirection:'row'}}>
         <CustomText
              text="Logout "
              // text={formatDate(item?.created_at)}
              style={styles.logout}
            />
 <MaterialIcons
          name={ 'logout'}
          size={24}
          color={dark ? colors.white : colors.black}
        />

       </TouchableOpacity>
      )
      : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    height: Platform.OS === 'ios' ? 50 : 50,
    paddingLeft: 5,
    paddingRight: 10,
    // paddingTop: Platform.OS === 'ios' ? 40 : 0,

    //for elevation
    // borderBottomWidth: 1, // Bottom border
    // borderBottomColor: '#E0E0E0', // Light gray color for the bottom border
    // // Shadow for iOS
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // // Shadow for Android
    // elevation: 3,
  },
  iconButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
    marginLeft: 20,
    // textAlign: 'center',
  },
  logout: {
    fontSize: fontSize.xsmall,
    color: colors.black,
    // marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default Header;
