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

type ScreenWrapperProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  style?: ViewStyle;
  loading?: boolean;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor = colors.white, // Default background color
  barStyle = 'default', // Default status bar style
  style,
  loading,
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}, style]}>
      {loading ? (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>{children}</>
      )}

      {/* <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust if needed
      >
        {loading ? (
          <View style={styles.wrapper}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>{children}</>
        )}
      </KeyboardAvoidingView> */}
    </SafeAreaView>
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

export default ScreenWrapper;

// import React, {ReactNode} from 'react';
// import {
//   StyleSheet,
//   StatusBar,
//   ViewStyle,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   View,
//   ScrollView,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import colors from '../../utils/colors';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// type ScreenWrapperProps = {
//   children: React.ReactNode;
//   backgroundColor?: string;
//   barStyle?: 'default' | 'light-content' | 'dark-content';
//   style?: ViewStyle;
//   loading?: boolean;
//   stickyFooter?: ReactNode;
// };

// const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
//   children,
//   backgroundColor = colors.white, // Default background color
//   barStyle = 'default', // Default status bar style
//   style,
//   loading,
//   stickyFooter, // For a sticky button or footer
// }) => {
//   return (
//     <SafeAreaView style={[styles.safeArea, {backgroundColor}, style]}>
//       {loading ? (
//         <View style={styles.wrapper}>
//           <ActivityIndicator size="large" color={colors.primary} />
//         </View>
//       ) : (
//         <KeyboardAvoidingView
//           style={styles.container}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} // Adjust this based on your header height
//         >
//           <KeyboardAwareScrollView
//             contentContainerStyle={styles.scrollContent}
//             enableOnAndroid
//             extraScrollHeight={10}
//             keyboardShouldPersistTaps="handled">
//             {children}
//           </KeyboardAwareScrollView>
//           {stickyFooter && (
//             <View style={styles.stickyFooter}>{stickyFooter}</View>
//           )}
//         </KeyboardAvoidingView>
//         // <>{children}</>
//       )}

//       {/* <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust if needed
//       >
//         {loading ? (
//           <View style={styles.wrapper}>
//             <ActivityIndicator size="large" color={colors.primary} />
//           </View>
//         ) : (
//           <>{children}</>
//         )}
//       </KeyboardAvoidingView> */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     // paddingHorizontal: 5,
//   },
//   wrapper: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   stickyFooter: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//   },
// });

// export default ScreenWrapper;
