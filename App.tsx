import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, StatusBar} from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/store';
import {ToastProvider} from './src/components/CustomToast/ToastContext';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    // setTimeout(() => {
    //   SplashScreen.hide(); // Hide splash screen after some delay
    // }, 1000);
  }, []);
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'#FFFFFF'}
      />
      <ToastProvider>
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      </ToastProvider>
    </SafeAreaProvider>
  );
};
export default gestureHandlerRootHOC(App);
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






