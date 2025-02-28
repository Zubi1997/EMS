// import React from 'react';
// import {TextInput, StyleSheet} from 'react-native';
// import colors from '../../utils/colors';

// interface CustomTextInputProps {
//   value: string;
//   onChangeText: (text: string) => void;
//   placeholder?: string;
//   style?: object;
// }

// const CustomTextInput: React.FC<CustomTextInputProps> = ({
//   value,
//   onChangeText,
//   placeholder,
//   style,
// }) => {
//   return (
//     <TextInput
//       style={[styles.input, style]}
//       value={value}
//       onChangeText={onChangeText}
//       placeholder={placeholder}
//       placeholderTextColor={colors.background}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//     fontSize: 16,
//     width: '100%',
//   },
// });

// export default CustomTextInput;

import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import colors from '../../utils/colors';

type CustomTextInputProps = TextInputProps & {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  placeholder?: string;
  keyboardType?: string;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  placeholder,
  keyboardType,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label Positioned Above Input */}
      <View style={styles.labelContainer}>
        <Text style={[styles.label, isFocused && styles.focusedLabel]}>
          {label}
        </Text>
      </View>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.inputFocused : styles.inputUnfocused,
          {...inputStyle},
        ]}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: 'relative',
    width: '100%',
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 1, // Ensures the label is above the input
    backgroundColor: colors.white, // Matches the background of the container
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: colors.darkGray,
  },
  focusedLabel: {
    color: colors.primary,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputUnfocused: {
    borderColor: colors.lightGray,
  },
});

export default CustomTextInput;
