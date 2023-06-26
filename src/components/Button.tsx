import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export default function Button(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.normal,
        props.disabled ? styles.disabled : {},
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  normal: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#3b82f6',
  },
  disabled: {
    backgroundColor: '#3f3f46',
  },
});
