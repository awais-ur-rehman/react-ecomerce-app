import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {onValue, ref} from 'firebase/database';
import {db} from '../Firebase/FirebaseService';

const Orders = ({email}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const ordersRef = ref(db, 'orders');
      onValue(
        ordersRef,
        snapshot => {
          const data = snapshot.val();

          if (data) {
            const userOrders = Object.values(data).filter(
              order => order.email === email,
            );
            setOrders(userOrders);
          } else {
            console.log('No data found for orders.');
          }
          setLoading(false);
        },
        {
          onlyOnce: true,
        },
      );
    } else {
      setLoading(false);
    }
  }, [email]);

  const renderOrder = ({item, index}) => (
    <View style={styles.orderTile}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderNumber}>Order {index + 1}</Text>
        <Text style={styles.orderDate}>Date: {item.date}</Text>
        <View style={styles.orderDivider}></View>
      </View>
      <View style={styles.orderDetail}>
        <View style={styles.orderTags}>
          <Text style={styles.orderText}>Items:</Text>
          <Text style={styles.orderText}>Total Price:</Text>
        </View>
        <View style={styles.orderTagsDetails}>
          <Text style={styles.orderText}>{item.totalItems}</Text>
          <Text style={styles.orderText}>{item.totalPrice}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.appName}>Orders</Text>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOrder}
          style={{marginTop: 3}}
        />
      ) : (
        <Text style={styles.errorText}>No orders found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
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
  orderTile: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  orderInfo: {
    width: '100%',
    paddingHorizontal: 20,
  },
  orderNumber: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 20,
    color: '#808080',
    fontWeight: 'bold',
  },
  orderDivider: {
    width: '90%',
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2089dc',
  },
  orderDetail: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTags: {
    width: '50%',
  },
  orderTagsDetails: {
    width: '50%',
  },
  orderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  loadingText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
  errorText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Orders;
