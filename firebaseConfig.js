// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
export default firebaseConfig;