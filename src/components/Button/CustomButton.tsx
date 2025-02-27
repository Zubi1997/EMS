import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  View,
  ActivityIndicator,
} from 'react-native';
import colors from '../../utils/colors';

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
  textStyle?: object;
  loading?: boolean;
  disable?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading,
  disable = false,
}) => {
  return (
    <>
      {loading ? (
        <View style={[styles.button, style]}>
          <ActivityIndicator size="small" color={colors.white} />
        </View>
      ) : disable ? (
        <View style={[styles.disableButton, style]}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </View>
      ) : (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disableButton: {
    backgroundColor: colors.placeholder,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
