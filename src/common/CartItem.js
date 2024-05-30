import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const CartItem = ({
  item,
  onRemoveItem,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContent}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.row}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => onDecreaseQuantity(item)}>
              <Image
                source={
                  item.quantity === 1
                    ? require('../assets/circle.png')
                    : require('../assets/minus.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => onIncreaseQuantity(item)}>
              <Image
                source={require('../assets/add.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>Rs.{item.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    elevation: 5,
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  itemContent: {
    width: '100%',
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  itemName: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default CartItem;
