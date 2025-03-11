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
import { useTheme } from '../../theme/ThemeContext';

type CustomTextInputProps = TextInputProps & {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  placeholder?: string;
  keyboardType?: string;
  isRTL?: boolean;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  placeholder,
  keyboardType,
  isRTL,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme ,  } = useTheme()
  console.log({isRTL})

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label Positioned Above Input */}
      <View style={[styles.labelContainer,{backgroundColor: theme?.colors.background,},isRTL ? styles.labelRTL : styles.labelLTR,]}>
        <Text style={[styles.label, isFocused && styles.focusedLabel,{color: theme?.colors?.text}]}>
          {label}
        </Text>
      </View>
      <TextInput
        style={[
          styles.input,
          {borderColor: isFocused?theme?.colors.primary:theme?.colors?.borderColor ,color: theme?.colors?.text, textAlign: isRTL ? 'right' : 'left', },
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
    zIndex: 1, // Ensures the label is above the input
     // Matches the background of the container
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
  labelLTR: {
    left: 10, 
  },
  labelRTL: {
    right: 10, 
  },
});

export default CustomTextInput;
