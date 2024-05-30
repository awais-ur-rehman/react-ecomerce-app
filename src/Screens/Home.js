// Home.js
import React, {useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Main from '../bottom/main';
import WishList from '../bottom/wishlist';
import Cart from '../bottom/cart';
import Order from '../bottom/order';
import Profile from '../bottom/profile';
import {setNav, setCartCount} from '../redux/actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

const Home = () => {
  const selectedNav = useSelector(state => state.nav.selectedNav);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const route = useRoute();
  const {email: userEmail} = route.params; // Correctly extract email from route params
  const totalCartQuantity = cart.totalCount;

  const getCartCount = useCallback(async () => {
    if (!userEmail) return;

    const cartKey = `cart_${userEmail}`;
    const cartItems = await AsyncStorage.getItem(cartKey);
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
    const totalCount = parsedCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }, [dispatch, userEmail]);

  useEffect(() => {
    getCartCount();
  }, [selectedNav, cart.items, getCartCount]);

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        {selectedNav === 0 ? (
          <Main email={userEmail} />
        ) : selectedNav === 1 ? (
          <WishList email={userEmail} />
        ) : selectedNav === 2 ? (
          <Cart email={userEmail} />
        ) : selectedNav === 3 ? (
          <Order email={userEmail} />
        ) : (
          <Profile email={userEmail} />
        )}
      </KeyboardAvoidingView>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => dispatch(setNav(0))}>
          <Image
            style={{
              width: 28,
              height: 28,
              tintColor: selectedNav === 0 ? '#000' : '#8e8e8e',
            }}
            source={require('../assets/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => dispatch(setNav(1))}>
          <Image
            style={{
              width: 28,
              height: 28,
              tintColor: selectedNav === 1 ? '#000' : '#8e8e8e',
            }}
            source={require('../assets/wishlist.png')}
          />
        </TouchableOpacity>
        <View style={styles.centerNav}>
          <TouchableOpacity
            style={styles.centerNavItem}
            onPress={() => dispatch(setNav(2))}>
            <Image
              style={{
                width: 28,
                height: 28,
                tintColor: selectedNav === 2 ? '#fff' : '#8e8e8e',
              }}
              source={require('../assets/shopping-bag.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => dispatch(setNav(3))}>
          <Image
            style={{
              width: 28,
              height: 28,
              tintColor: selectedNav === 3 ? '#000' : '#8e8e8e',
            }}
            source={require('../assets/clipboard.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => dispatch(setNav(4))}>
          <Image
            style={{
              width: 28,
              height: 28,
              tintColor: selectedNav === 4 ? '#000' : '#8e8e8e',
            }}
            source={require('../assets/user.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 70, // Add a margin to leave space for the navigation bar
  },
  nav: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  navItem: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerNav: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerNavItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  banner: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
