import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';

type ToastType = 'success' | 'error';

interface CustomToastProps {
  type: ToastType;
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const CustomToast: React.FC<CustomToastProps> = ({
  type,
  message,
  visible,
  onClose,
  duration = 2000,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after the specified duration
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, duration, fadeAnim, onClose]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, {opacity: fadeAnim}, styles[type]]}>
      <Text style={styles.toastMessage}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  success: {
    backgroundColor: colors.primary,
  },
  error: {
    backgroundColor: '#F44336',
  },
  toastMessage: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    // marginLeft: 10,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CustomToast;
