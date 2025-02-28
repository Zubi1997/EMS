import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon set you're using
import colors from '../../utils/colors';

type CheckboxProps = {
  label: string;
};

const CustomCheckbox: React.FC<CheckboxProps> = ({label}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setIsChecked(!isChecked)}>
      <View
        style={[
          styles.checkbox,
          {borderColor: isChecked ? colors.primary : '#000'}, // Change border color based on state
        ]}>
        <Icon
          name={isChecked ? 'check-box' : 'check-box-outline-blank'} // Icon for checked and unchecked state
          size={20}
          color={isChecked ? colors.primary : colors.lightPrimary} // Adjust color if needed
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
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
    color: colors.primary,
    fontSize: 14,
  },
});

export default CustomCheckbox;
