import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon

type PasswordTextInputCustomProps = TextInputProps & {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  placeholder?: string;
  keyboardType?: string;
};

const PasswordTextInputCustom: React.FC<PasswordTextInputCustomProps> = ({
  label,
  containerStyle,
  inputStyle,
  placeholder,
  keyboardType,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label Positioned Above Input */}
      <View style={styles.labelContainer}>
        <Text style={[styles.label, isFocused && styles.focusedLabel]}>
          {label}
        </Text>
      </View>

      {/* Input Field with Password Toggle */}
      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? colors.primary : colors.lightGray }, // Apply dynamic border color
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={!isPasswordVisible} // Hide password when needed
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Eye Icon for Password Visibility Toggle */}
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Icon
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: colors.darkGray,
  },
  focusedLabel: {
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
});

export default PasswordTextInputCustom;
