import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';
import Profile from '../screens/Profile';
import SaleDetail from '../screens/SaleDetail';
import AddSale from '../screens/AddSale';
import EditSale from '../screens/EditSale';
import SplashScreenComponent from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  // const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    const constructor = async () => {};

    constructor();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          //   options={{headerShown: false}}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SaleDetail" component={SaleDetail} />
        <Stack.Screen name="AddSale" component={AddSale} />
        <Stack.Screen name="EditSale" component={EditSale} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
// export default App;
