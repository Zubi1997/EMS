import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Button, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Import Screens
import HomeScreen from '../screens/HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <ScreenWrapper>
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        // options={({navigation}) => ({
        //   headerLeft: () => (
        //     <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        //       <Icon
        //         name="menu"
        //         size={30}
        //         color="#000"
        //         style={{marginLeft: 10}}
        //       />
        //     </TouchableOpacity>
        //   ),
        // })}
      />
      {/* <Drawer.Screen name="AllSales" component={AllSalesScreen} /> */}
      {/* <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="SaleDetail" component={SaleDetail} />
      <Drawer.Screen name="AddSale" component={AddSale} />
      <Drawer.Screen name="EditSale" component={EditSale} /> */}
    </Drawer.Navigator>
    </ScreenWrapper>
  );
};

export default DrawerNavigator;
