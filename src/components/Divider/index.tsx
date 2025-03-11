import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import colors from '../../utils/colors';

type DividerProps = {
  color?: string;
  style?: ViewStyle | ImageStyle;
};

const Divider: React.FC<DividerProps> = ({color = colors.border, style}) => {
  return (
    <View
      style={[styles.container, {...style}, {backgroundColor: color}]}></View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
  },
});

export default Divider;
