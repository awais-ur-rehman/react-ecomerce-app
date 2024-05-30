import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../common/CartItem';
import {removeFromCart, updateCartQuantity} from '../redux/actions/Actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ref, set, push} from 'firebase/database';
import {db} from '../Firebase/FirebaseService';

const Cart = ({email}) => {
  const [cartList, setCartList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      if (!email) {
        return;
      }

      const cartKey = `cart_${email}`;
      const cart = await AsyncStorage.getItem(cartKey);
      if (cart) {
        setCartList(JSON.parse(cart));
      }
    };
    loadCart();
  }, [email]);

  useEffect(() => {
    const saveCart = async () => {
      if (!email) return;

      const cartKey = `cart_${email}`;
      await AsyncStorage.setItem(cartKey, JSON.stringify(cartList));
    };
    saveCart();
  }, [cartList, email]);

  const handleRemoveItem = async item => {
    if (!email) return;

    dispatch(removeFromCart(item.id));
    const updatedCartList = cartList.filter(
      cartItem => cartItem.id !== item.id,
    );
    setCartList(updatedCartList);

    const cartKey = `cart_${email}`;
    await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCartList));
  };

  const handleDecreaseQuantity = async item => {
    if (item.quantity === 1) {
      handleRemoveItem(item);
    } else {
      dispatch(updateCartQuantity(item.id, item.quantity - 1));
      const updatedCartList = cartList.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, quantity: cartItem.quantity - 1}
          : cartItem,
      );
      setCartList(updatedCartList);

      if (!email) return;

      const cartKey = `cart_${email}`;
      await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCartList));
    }
  };

  const handleIncreaseQuantity = async item => {
    dispatch(updateCartQuantity(item.id, item.quantity + 1));
    const updatedCartList = cartList.map(cartItem =>
      cartItem.id === item.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem,
    );
    setCartList(updatedCartList);
    if (!email) return;

    const cartKey = `cart_${email}`;
    await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCartList));
  };

  const handleOrderNow = async () => {
    if (!email || cartList.length === 0) {
      Alert.alert(
        'No items in cart',
        'Please add items to your cart before placing an order.',
      );
      return;
    }

    const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartList.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const date = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    });

    const orderRef = ref(db, 'orders');
    const newOrderRef = push(orderRef);

    await set(newOrderRef, {
      email: email,
      items: cartList,
      totalItems: totalItems,
      totalPrice: totalPrice,
      date: date,
    });

    Alert.alert('Order placed', 'Your order has been placed successfully.');

    // Clear the cart after placing the order
    setCartList([]);
    const cartKey = `cart_${email}`;
    await AsyncStorage.removeItem(cartKey);
  };

  const renderItem = ({item}) => (
    <CartItem
      item={item}
      onRemoveItem={handleRemoveItem}
      onDecreaseQuantity={handleDecreaseQuantity}
      onIncreaseQuantity={handleIncreaseQuantity}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Cart</Text>
        <Image
          style={styles.headerIcon}
          source={require('../assets/shopping-bag.png')}
        />
      </View>
      <FlatList
        data={cartList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{marginTop: 3}}
      />
      <View style={styles.footerSpace}></View>
      <View style={styles.orderView}>
        <TouchableOpacity onPress={handleOrderNow} style={styles.orderBtn}>
          <Text style={styles.orderText}>Order Now</Text>
        </TouchableOpacity>
      </View>
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
  orderView: {
    width: '30%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  orderBtn: {
    height: 70,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'black',
  },
  orderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
