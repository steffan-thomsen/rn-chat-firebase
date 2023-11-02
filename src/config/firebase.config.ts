// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyApH1cDjfa3vPoFvmxuSRJjAEbwjn1ZLHM',
  authDomain: 'rn-chat-firebase-3ad58.firebaseapp.com',
  projectId: 'rn-chat-firebase-3ad58',
  storageBucket: 'rn-chat-firebase-3ad58.appspot.com',
  messagingSenderId: '796074681554',
  appId: '1:796074681554:web:89d0f9c91198d59556b90b',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(firebaseApp);
export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
