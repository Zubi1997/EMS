import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon set you're using
import colors from '../../utils/colors';
import { useTheme } from '../../theme/ThemeContext';

type CheckboxProps = {
  label: string;
  isRTL: boolean;
};

const CustomCheckbox: React.FC<CheckboxProps> = ({label,isRTL}) => {
  const [isChecked, setIsChecked] = useState(false);
  const {theme } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.checkboxContainer,{flexDirection: isRTL?'row-reverse':'row',}]}
      onPress={() => setIsChecked(!isChecked)}>
      <View
        style={[
          styles.checkbox,
          {borderColor: isChecked ? theme?.colors.primary : '#000'}, // Change border color based on state
        ]}>
        <Icon
          name={isChecked ? 'check-box' : 'check-box-outline-blank'} // Icon for checked and unchecked state
          size={20}
          color={isChecked ? theme?.colors.primary : theme?.colors.borderColor} 
        // Adjust color if needed
        />
      </View>
      <Text style={[styles.label,{  color: theme?.colors.primary,}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    gap: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
  
    fontSize: 14,
  },
});

export default CustomCheckbox;
