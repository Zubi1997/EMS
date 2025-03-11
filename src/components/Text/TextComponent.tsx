import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface CustomTextProps {
  text: string;
  style?: object;
}

const CustomText: React.FC<CustomTextProps> = ({text, style}) => {
  const {theme} = useTheme()
  return <Text style={[styles.text, style,{color: theme?.colors?.text}]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,

  },
});

export default CustomText;
