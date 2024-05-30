import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomTextInput from '../common/CustomText';
import CommonButton from '../common/CommonButton';
import PasswordInput from '../common/PasswordInput';
import {useNavigation} from '@react-navigation/native';
import {
  setEmail,
  setPassword,
  setBadEmail,
  setBadPassword,
} from '../redux/actions/Actions';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {email, password, badEmail, badPassword} = useSelector(
    state => state.auth,
  );

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._%+-]{6,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = password => {
    return password.length > 0;
  };

  const handleLogin = () => {
    const trimmedEmail = email.trim();

    dispatch(setBadEmail(!validateEmail(trimmedEmail)));
    dispatch(setBadPassword(!validatePassword(password)));

    if (validateEmail(trimmedEmail) && validatePassword(password)) {
      auth()
        .signInWithEmailAndPassword(trimmedEmail, password)
        .then(async () => {
          dispatch(setEmail(''));
          dispatch(setPassword(''));
          await AsyncStorage.setItem('userEmail', trimmedEmail);
          navigation.navigate('Home', {email: trimmedEmail});
        })
        .catch(error => {
          Alert.alert('Invalid Credentials');
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={require('../assets/google.png')} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <CustomTextInput
          placeholder="Enter your email"
          icon={require('../assets/email.png')}
          value={email}
          onChangeText={text => dispatch(setEmail(text))}
        />
        {badEmail && (
          <Text style={styles.errorText}>Please enter a valid email.</Text>
        )}
        <PasswordInput
          placeholder="Enter your Password"
          value={password}
          onChangeText={text => dispatch(setPassword(text))}
        />
        {badPassword && (
          <Text style={styles.errorText}>Please Enter Password</Text>
        )}
        <CommonButton
          title="Login"
          bgColor="#000"
          textColor="#fff"
          onPress={handleLogin}
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(setEmail(''));
            dispatch(setPassword(''));
            navigation.navigate('Signup');
          }}>
          <Text style={styles.signupText}>Create New Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 100,
  },
  title: {
    marginTop: 50,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  errorText: {
    marginTop: 10,
    marginLeft: 30,
    color: 'red',
  },
  signupText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#000',
  },
});

export default Login;
