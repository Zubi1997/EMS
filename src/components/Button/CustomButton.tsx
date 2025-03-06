import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  View,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

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
  const { theme } = useTheme();
  return (
    <>
      {loading ? (
       <View style={[styles.button, style, { backgroundColor: theme?.colors.primary }]}>
          <ActivityIndicator size="small" color={theme?.colors.lightPrimary} />
        </View>
      ) : disable ? (
        <View style={[styles.disableButton, style,{ backgroundColor: theme?.colors.placeholderText,}]}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </View>
      ) : (
        <TouchableOpacity style={[styles.button, style,{backgroundColor: theme?.colors.primary}]} onPress={onPress}>
         <Text style={[styles.buttonText, textStyle, { color: theme?.colors.buttonText }]}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disableButton: {
   
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
