import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const PasswordInput = ({value, onChangeText, placeholder}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/padlock.png')} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TouchableOpacity
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Image
          source={
            isPasswordVisible
              ? require('../assets/show-password.png') // replace with your eye icon
              : require('../assets/eye.png') // replace with your eye-off icon
          }
          style={styles.icon}
        />
      </TouchableOpacity>
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
    color: '#000',
  },
});

export default PasswordInput;
