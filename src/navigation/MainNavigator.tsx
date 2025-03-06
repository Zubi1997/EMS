import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Linking, useColorScheme } from 'react-native';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';
import SplashScreenComponent from '../screens/SplashScreen';
import linking from '../utils/linking';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const scheme = useColorScheme();
  const { theme } = useTheme(); 

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        console.log('Deep link opened:', url);
      }
    };

    handleDeepLink();
  }, []);

  useLayoutEffect(() => {
    const constructor = async () => {};
    constructor();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <NavigationContainer linking={linking} theme={theme}>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
