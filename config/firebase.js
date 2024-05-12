// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDKd-1yygv5XAJX_QmRTFv6ECPUEhyiupY",
    authDomain: "gurmerota-project.firebaseapp.com",
    projectId: "gurmerota-project",
    storageBucket: "gurmerota-project.appspot.com",
    messagingSenderId: "869743376418",
    appId: "1:869743376418:web:3f47daed2c9482ac96f27b",
    measurementId: "G-M68KH9KB4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);