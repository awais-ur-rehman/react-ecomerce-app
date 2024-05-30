import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setTimeoutFinished} from '../redux/actions/Actions';

const Splash = ({onTimeoutFinished}) => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeoutFinished();
      navigation.navigate('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation, onTimeoutFinished]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../assets/google.png')}
        style={{
          width: 200,
          height: 200,
          borderRadius: 50,
          resizeMode: 'center',
        }}
      />
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  onTimeoutFinished: () => dispatch(setTimeoutFinished()),
});

export default connect(null, mapDispatchToProps)(Splash);
