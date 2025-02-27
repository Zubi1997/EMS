import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface CustomTextProps {
  text: string;
  style?: object;
}

const CustomText: React.FC<CustomTextProps> = ({text, style}) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomText;
