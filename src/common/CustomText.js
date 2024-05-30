import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  icon,
  type,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        value={value}
        keyboardType={keyboardType ? keyboardType : 'default'}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={type === 'password'}
        placeholderTextColor="#8e8e8e"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 50,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#000', // Ensure text color is black
  },
});

export default CustomTextInput;
