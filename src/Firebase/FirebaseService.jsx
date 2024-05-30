// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDy9ivFuxyuZHDnIDdRR5U_FXxGqoBvswE',
  authDomain: 'madfinal-9a9eb.firebaseapp.com',
  databaseURL: 'https://madfinal-9a9eb-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'madfinal-9a9eb',
  storageBucket: 'madfinal-9a9eb.appspot.com',
  messagingSenderId: '364748269609',
  appId: '1:364748269609:web:e215984faf84a5cafa9438'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
