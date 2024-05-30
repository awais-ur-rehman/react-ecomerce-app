import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomTextInput from '../common/CustomText';
import CommonButton from '../common/CommonButton';
import SignupInput from '../common/PasswordInputSignup';
import {useNavigation} from '@react-navigation/native';
import {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setMobile,
  setBadName,
  setBadEmail,
  setBadPassword,
  setBadConfirmPassword,
  setBadMobile,
} from '../redux/actions/Actions';
import auth from '@react-native-firebase/auth';
import {ref, set} from 'firebase/database';
import {db} from '../Firebase/FirebaseService';

const Signup = () => {
  const navigation = useNavigation();
  const {
    name,
    email,
    password,
    confirmPassword,
    mobile,
    badName,
    badEmail,
    badPassword,
    badConfirmPassword,
    badMobile,
  } = useSelector(state => state.signup);
  const dispatch = useDispatch();

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._%+-]{6,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const validateName = name => {
    return name.trim().length > 0;
  };

  const validateMobile = mobile => {
    const mobileRegex = /^\d{11}$/;
    return mobileRegex.test(mobile);
  };

  const validate = () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedMobile = mobile.trim();

    dispatch(setBadEmail(!validateEmail(trimmedEmail)));
    dispatch(setBadName(!validateName(trimmedName)));
    dispatch(setBadMobile(!validateMobile(trimmedMobile)));
    dispatch(setBadPassword(!validatePassword(password)));
    dispatch(
      setBadConfirmPassword(
        confirmPassword === '' || password !== confirmPassword,
      ),
    );

    if (
      validateEmail(trimmedEmail) &&
      validateName(trimmedName) &&
      validateMobile(trimmedMobile) &&
      validatePassword(password) &&
      password === confirmPassword
    ) {
      auth()
        .createUserWithEmailAndPassword(trimmedEmail, password)
        .then(userCredential => {
          console.log('User Auth Successful');
          const userId = userCredential.user.uid;
          set(ref(db, 'users/' + userId), {
            name: trimmedName,
            email: trimmedEmail,
            password: password,
            mobile: trimmedMobile,
          })
            .then(() => {
              console.log('User data saved to database');
              Alert.alert(
                'Account Created',
                'Your account has been created successfully',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      dispatch(setName(''));
                      dispatch(setEmail(''));
                      dispatch(setPassword(''));
                      dispatch(setConfirmPassword(''));
                      dispatch(setMobile(''));
                      navigation.navigate('Login');
                    },
                  },
                ],
                {cancelable: false},
              );
            })
            .catch(error => {
              console.log('Error saving user data to database', error);
              Alert.alert('Server Error');
            });
        })
        .catch(error => {
          console.log('Error creating user', error);
          Alert.alert('Error', error.message, [{text: 'OK'}]);
        });
    }
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image source={require('../assets/google.png')} style={styles.logo} />
        <Text style={styles.title}>Signup</Text>
        <CustomTextInput
          placeholder="Enter your name"
          icon={require('../assets/user.png')}
          value={name}
          onChangeText={text => dispatch(setName(text))}
        />
        {badName && <Text style={styles.errorText}>Please Enter Name</Text>}
        <CustomTextInput
          placeholder="Enter your email"
          icon={require('../assets/email.png')}
          value={email}
          onChangeText={text => dispatch(setEmail(text))}
        />
        {badEmail && <Text style={styles.errorText}>Please Enter Email</Text>}
        <SignupInput
          placeholder="Enter your Password"
          value={password}
          onChangeText={text => dispatch(setPassword(text))}
        />
        {badPassword && (
          <Text style={styles.errorText}>Please Enter Password</Text>
        )}
        <SignupInput
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChangeText={text => dispatch(setConfirmPassword(text))}
        />
        {badConfirmPassword && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}
        <CustomTextInput
          placeholder="Enter your mobile number"
          icon={require('../assets/telephone.png')}
          value={mobile}
          keyboardType="numeric"
          onChangeText={text => dispatch(setMobile(text))}
        />
        {badMobile && (
          <Text style={styles.errorText}>
            Please Enter a valid Mobile Number
          </Text>
        )}
        <CommonButton
          title="Signup"
          bgColor="#000"
          textColor="#fff"
          onPress={validate}
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(setEmail(''));
            dispatch(setPassword(''));
            navigation.navigate('Login');
          }}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  loginText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#000',
  },
});

export default Signup;
