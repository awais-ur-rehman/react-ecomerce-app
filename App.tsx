import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './src/AppNavigator';
import store from './src/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
