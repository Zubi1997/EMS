import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import ImageComponent from '../components/Image/CustomImage';
import images from '../assets/mageAssets';
import {screenSizes} from '../utils/normalize';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../utils/colors';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <ScreenWrapper>
      {/* Set StatusBar color to red for the top */}
      {/* <StatusBar backgroundColor="red" barStyle="light-content" /> */}

      <View style={styles.drawerContainer}>
        <ImageComponent
          height={screenSizes.width / 3}
          width={screenSizes.width / 3}
          source={images.logo}
        />
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('AllSales')}>
            <Text style={styles.buttonText}>All Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // props.navigation.closeDrawer();
              props.navigation.navigate('Profile');
            }}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    // paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 15,
    margin: 5,
    backgroundColor: colors.lightPrimary,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  body: {
    padding: 5,
  },
});

export default CustomDrawerContent;
