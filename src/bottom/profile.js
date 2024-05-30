import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {onValue, ref} from 'firebase/database';
import {db} from '../Firebase/FirebaseService';
import CommonButton from '../common/CommonButton';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params; // Get email from route params
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const userRef = ref(db, 'users');
      onValue(
        userRef,
        snapshot => {
          const data = snapshot.val();
          const userKey = Object.keys(data).find(
            key => data[key].email === email,
          );
          if (userKey) {
            setUserData(data[userKey]);
          } else {
            Alert.alert('Error', 'User not found');
          }
          setLoading(false); // Set loading to false once data is fetched
        },
        {
          onlyOnce: true, // Fetch data only once to avoid continuous re-rendering
        },
      );
    } else {
      setLoading(false); // Set loading to false if no email is found
    }
  }, [email]);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Error', error.message, [{text: 'OK'}]);
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.appName}>Profile</Text>
        <Image
          style={styles.headerIcon}
          source={require('../assets/user.png')}
        />
      </View>
      <Image
        style={styles.profileImage}
        source={require('../assets/user.png')}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : userData ? (
        <>
          <Text style={styles.profileName}>{userData.name}</Text>
          <View style={{height: 20}}></View>
          <Text style={styles.subTitle}>Your Account</Text>
          <View style={styles.divider}></View>
          <View style={styles.profileTile}>
            <Text style={styles.profiletxt}>{userData.email}</Text>
            <Image
              style={styles.profileIcon}
              source={require('../assets/email.png')}
            />
          </View>
          <View style={styles.divider}></View>
          <View style={styles.profileTile}>
            <Text style={styles.profiletxt}>{userData.mobile}</Text>
            <Image
              style={styles.profileIcon}
              source={require('../assets/telephone.png')}
            />
          </View>
          <View style={styles.divider}></View>
        </>
      ) : (
        <Text style={styles.errorText}>No user data found</Text>
      )}
      <TouchableOpacity style={styles.profileTile} onPress={handleLogout}>
        <Text style={styles.profiletxt2}>Log Out</Text>
        <Image
          style={styles.profileIcon}
          source={require('../assets/user-logout.png')}
        />
      </TouchableOpacity>
    </View>
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
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  divider: {
    height: 3,
    backgroundColor: '#d3d3d3',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  profileName: {
    fontWeight: '600',
    fontSize: 25,
    alignSelf: 'center',
    color: '#000',
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 22,
    marginLeft: 10,
    color: '#000',
  },
  profileTile: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profiletxt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  profiletxt2: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
  profileIcon: {
    width: 20,
    height: 20,
  },
  editProfileButton: {
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    alignSelf: 'center',
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
});

export default Profile;
