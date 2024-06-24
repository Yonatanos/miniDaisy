import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { ThemedText } from '@/components/molecules/ThemedText';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
}

export const Button = ({ text, onPress, style = {}, isLoading, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, style]}
      {...props}
    >
      {isLoading ? <ActivityIndicator /> : <ThemedText style={styles.text}>{text}</ThemedText>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});
