import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CommonButton = ({onPress, title, bgColor, textColor}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: bgColor}]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 50,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommonButton;
