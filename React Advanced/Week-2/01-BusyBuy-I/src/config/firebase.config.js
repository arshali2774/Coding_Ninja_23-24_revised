// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJNtt6Mo-z72NW9UpH5GNZr-S13ruosOA',
  authDomain: 'busy-buy-54bd8.firebaseapp.com',
  projectId: 'busy-buy-54bd8',
  storageBucket: 'busy-buy-54bd8.appspot.com',
  messagingSenderId: '733366980436',
  appId: '1:733366980436:web:f4ee7fe04d124fbaf0c2c1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
