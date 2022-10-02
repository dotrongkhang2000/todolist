// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'todolist-228cd.firebaseapp.com',
  projectId: 'todolist-228cd',
  storageBucket: 'todolist-228cd.appspot.com',
  messagingSenderId: '598008319236',
  appId: '1:598008319236:web:e99bbe2b63c5878bcc9451',
  measurementId: 'G-P3ZVTV3PT3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
