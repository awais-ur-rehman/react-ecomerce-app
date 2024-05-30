import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  addToWishlist,
  removeFromWishlist,
  updateCartQuantity,
} from '../redux/actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = [
  {
    id: '1',
    name: 'Shoes',
    products: [
      {
        id: '1.1',
        name: 'Shoe 1',
        price: 100,
        image: require('../assets/shoe1.png'),
        quantity: 1,
      },
      {
        id: '1.2',
        name: 'Shoe 2',
        price: 200,
        image: require('../assets/shoe2.png'),
        quantity: 1,
      },
      {
        id: '1.3',
        name: 'Shoe 3',
        price: 300,
        image: require('../assets/shoe1.png'),
        quantity: 1,
      },
    ],
  },
  {
    id: '2',
    name: 'Pants',
    products: [
      {
        id: '2.1',
        name: 'Pant 1',
        price: 150,
        image: require('../assets/pant1.png'),
        quantity: 1,
      },
      {
        id: '2.2',
        name: 'Pant 2',
        price: 250,
        image: require('../assets/pant2.png'),
        quantity: 1,
      },
      {
        id: '2.3',
        name: 'Pant 3',
        price: 350,
        image: require('../assets/pant2.png'),
        quantity: 1,
      },
    ],
  },
  {
    id: '3',
    name: 'Shirts',
    products: [
      {
        id: '3.1',
        name: 'Shirt 1',
        price: 120,
        image: require('../assets/shirt1.png'),
        quantity: 1,
      },
      {
        id: '3.2',
        name: 'Shirt 2',
        price: 220,
        image: require('../assets/shirt1.png'),
        quantity: 1,
      },
      {
        id: '3.3',
        name: 'Shirt 3',
        price: 320,
        image: require('../assets/shirt1.png'),
        quantity: 1,
      },
    ],
  },
];

const Main = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
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
    setWishlistItems(parsedWishlistItems);
  };

  const handleAddToCart = async item => {
    if (!userEmail) return;

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
      dispatch(updateCartQuantity(item.id, existingItem.quantity + 1));
    } else {
      parsedCartItems.push({...item, quantity: 1});
      dispatch(addItemToCart(item));
    }

    await AsyncStorage.setItem(cartKey, JSON.stringify(parsedCartItems));
  };

  const handleToggleWishlist = async item => {
    if (!userEmail) return;

    const wishlistKey = `wishlist_${userEmail}`;
    let parsedWishlistItems = [...wishlistItems];

    if (parsedWishlistItems.some(wishlistItem => wishlistItem.id === item.id)) {
      parsedWishlistItems = parsedWishlistItems.filter(
        wishlistItem => wishlistItem.id !== item.id,
      );
      dispatch(removeFromWishlist(item.id));
    } else {
      parsedWishlistItems.push(item);
      dispatch(addToWishlist(item));
    }

    setWishlistItems(parsedWishlistItems);
    await AsyncStorage.setItem(
      wishlistKey,
      JSON.stringify(parsedWishlistItems),
    );
  };

  const renderProductCard = ({item}) => (
    <View style={styles.productCard}>
      <Image style={styles.productImage} source={item.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.prodRow}>
        <Text style={styles.txt}>Rs.{item.price}</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => handleAddToCart(item)}>
          <Text style={styles.txt}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.wishBtn,
          {
            backgroundColor: wishlistItems.some(
              wishlistItem => wishlistItem.id === item.id,
            )
              ? 'red'
              : '#fff',
          },
        ]}
        onPress={() => handleToggleWishlist(item)}>
        <Image
          style={styles.wishIcon}
          source={require('../assets/wishlist.png')}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.appName}>Shopify Store</Text>
      </View>
      <Text style={styles.welcomeText}>Welcome,{'\n'}Back</Text>
      <Image
        style={styles.bannerImage}
        source={require('../assets/home_banner.jpg')}
      />
      {categories.map(category => (
        <View key={category.id}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
          <FlatList
            data={category.products}
            renderItem={renderProductCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
      <View style={{height: 100}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
  },
  appName: {
    fontWeight: '600',
    fontSize: 24,
    paddingTop: 10,
    marginLeft: 20,
    color: '#000',
  },
  welcomeText: {
    letterSpacing: 1,
    marginTop: 5,
    fontWeight: '600',
    fontSize: 22,
    marginLeft: 10,
    color: '#000',
  },
  bannerImage: {
    width: '90%',
    height: 170,
    margin: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  productCard: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginLeft: 20,
    marginRight: 5,
    width: 250,
    height: 350,
    borderRadius: 10,
    elevation: 8,
  },
  productImage: {
    height: '70%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemName: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 10,
    paddingLeft: 10,
    color: 'black',
  },
  wishBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishIcon: {
    width: 24,
    height: 24,
  },
  prodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  addBtn: {
    paddingLeft: 5,
    paddingBottom: 8,
    paddingRight: 5,
    paddingTop: 8,
    borderRadius: 10,
    borderWidth: 2,
  },
  txt: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
});

export default Main;
