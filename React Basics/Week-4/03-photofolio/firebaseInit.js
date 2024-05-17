// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYFvUCM8Fyjb1Ol3OzxKIwliL6R2ctErA',
  authDomain: 'expense-tracker-89a4c.firebaseapp.com',
  projectId: 'expense-tracker-89a4c',
  storageBucket: 'expense-tracker-89a4c.appspot.com',
  messagingSenderId: '1013302350173',
  appId: '1:1013302350173:web:74f1586b937624d75b18b4',
  measurementId: 'G-Q43N0FCP8K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
