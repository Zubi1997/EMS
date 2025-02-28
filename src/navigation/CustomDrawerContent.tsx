import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import ImageComponent from '../components/Image/CustomImage';
import images from '../assets/mageAssets';
import {screenSizes} from '../utils/normalize';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/Entypo'; // Import icon
import Locale from '../constants/Locale';


const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <>
      {/* Set StatusBar color to red for the top */}
      {/* <StatusBar backgroundColor="red" barStyle="light-content" /> */}

      <View style={styles.drawerContainer}>
        <ImageComponent
          height={screenSizes.width / 3}
          width={screenSizes.width / 3}
          source={images.EMSlogo}
        />
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text style={styles.buttonText}>Home</Text>
            <Icon
          name={'chevron-right'} // Icon for checked and unchecked state
          size={20}
          color={colors.white} // Adjust color if needed
        />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('AllSales')}>
            <Text style={styles.buttonText}>All Sales</Text>
            <Icon
          name={'chevron-right'} // Icon for checked and unchecked state
          size={20}
          color={colors.white} // Adjust color if needed
        />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // props.navigation.closeDrawer();
              props.navigation.navigate('Profile');
            }}>
            <Text style={styles.buttonText}>Profile</Text>
            <Icon
          name={'chevron-right'} // Icon for checked and unchecked state
          size={20}
          color={colors.white} // Adjust color if needed
        />
          </TouchableOpacity>
        </View>
        <View style={{flex:1,justifyContent:'flex-end'}}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // props.navigation.closeDrawer();
              props.navigation.navigate('Profile');
            }}>
            <Text style={styles.buttonText}>{Locale.Change_Theme}</Text>
            <Icon
          name={'chevron-right'} // Icon for checked and unchecked state
          size={20}
          color={colors.white} // Adjust color if needed
        />
          </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // props.navigation.closeDrawer();
              props.navigation.navigate('Profile');
            }}>
            <Text style={styles.buttonText}>{Locale.Sign_out}</Text>
            <Icon
          name={'chevron-right'} // Icon for checked and unchecked state
          size={20}
          color={colors.white} // Adjust color if needed
        />
          </TouchableOpacity>
   
        </View>
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    // paddingTop: 50,
    backgroundColor:'#ffff',
  },
  button: {
    padding: 8,
    margin: 5,
    backgroundColor: colors.primary,
    borderRadius: 5,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-between'
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  body: {
    padding: 5,
  },
});

export default CustomDrawerContent;
