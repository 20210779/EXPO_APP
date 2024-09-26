import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const TextInputB = ({ value, onChangeText, placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#000"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: windowWidth * 0.75,
    height: 40,
    backgroundColor: '#1BC8FF',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default TextInputB;
