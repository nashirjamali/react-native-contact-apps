import React from 'react';
import {StyleSheet, View, TextInput, TextInputProps} from 'react-native';

const Input = (props: TextInputProps) => {
  return (
    <View>
      <TextInput
        placeholderTextColor="#84919E"
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e4e4e7',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#18181b',
    borderWidth: 1,
    borderColor: '#a1a1aa',
  },
});
