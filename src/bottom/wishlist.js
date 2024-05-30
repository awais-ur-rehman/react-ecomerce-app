import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WishListItem from '../common/WishlistItems';
import {removeFromWishlist, addItemToCart} from '../redux/actions/Actions';

const WishList = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email);
      loadWishlist(email);
    };
    getUserEmail();
  }, []);

  const loadWishlist = async email => {
    const wishlistKey = `wishlist_${email}`;
    const wishlistData = await AsyncStorage.getItem(wishlistKey);
    const parsedWishlistItems = wishlistData ? JSON.parse(wishlistData) : [];
    setWishlist(parsedWishlistItems);
  };

  const handleRemoveItem = async item => {
    const updatedWishlist = wishlist.filter(
      wishlistItem => wishlistItem.id !== item.id,
    );
    setWishlist(updatedWishlist);
    dispatch(removeFromWishlist(item.id));
    const wishlistKey = `wishlist_${userEmail}`;
    await AsyncStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
  };

  const handleMoveToCart = async item => {
    dispatch(addItemToCart(item));
    handleRemoveItem(item);
    const cartKey = `cart_${userEmail}`;
    const cartItems = await AsyncStorage.getItem(cartKey);
    let parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

    const existingItem = parsedCartItems.find(
      cartItem => cartItem.id === item.id,
    );

    if (existingItem) {
      parsedCartItems = parsedCartItems.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem,
      );
    } else {
      parsedCartItems.push({...item, quantity: 1});
    }

    await AsyncStorage.setItem(cartKey, JSON.stringify(parsedCartItems));
  };

  const renderItem = ({item}) => (
    <WishListItem
      item={item}
      onRemoveItem={handleRemoveItem}
      onMoveToCart={handleMoveToCart}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Wishlist</Text>
        <Image
          style={styles.headerIcon}
          source={require('../assets/wishlist.png')}
        />
      </View>
      <FlatList
        data={wishlist}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{marginTop: 3}}
      />
      <View style={styles.footerSpace}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    borderBottomColor: '#8e8e8e',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  appName: {
    fontWeight: '600',
    fontSize: 24,
    paddingTop: 10,
    marginLeft: 20,
    color: '#000',
  },
  footerSpace: {
    marginBottom: 3,
  },
});

export default WishList;
