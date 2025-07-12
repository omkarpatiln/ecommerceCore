import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB3DJCFi2Q3WgkGM1usZtrFKkbkWZpcETw',
  authDomain: 'react-native-d74ed.firebaseapp.com',
  projectId: 'react-native-d74ed',
  storageBucket: 'react-native-d74ed.appspot.com',
  messagingSenderId: '966506946722',
  appId: '1:966506946722:web:3eb16a0bfcaf788cd4f7fb',
  measurementId: 'G-5ZJGGQSEJ0',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
