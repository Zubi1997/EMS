import React from 'react';
import {
  StyleSheet,
  StatusBar,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../utils/colors';

type KeyboardWrapperProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  style?: ViewStyle;
  loading?: boolean;
};

const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
  children,
  backgroundColor = colors.white, // Default background color
  barStyle = 'default', // Default status bar style
  style,
  loading,
}) => {
  return (
    <>
      {Platform.OS == 'android' ? (
        <ScrollView
          contentContainerStyle={[
            {flexGrow: 1, backgroundColor: colors.white},
            style,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS == 'ios' ? 45 : 10}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback accessible={false}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              {children}
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // paddingHorizontal: 5,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KeyboardWrapper;
