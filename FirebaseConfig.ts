// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCK7BYDX2f-k_ljZn5_T_Z0ctP4VcS8WUI",
    authDomain: "travel-app-6f520.firebaseapp.com",
    projectId: "travel-app-6f520",
    storageBucket: "travel-app-6f520.firebasestorage.app",
    messagingSenderId: "965577119919",
    appId: "1:965577119919:web:c0a2f1bfba5c65d66c9c5a",
    measurementId: "G-T4RB7HTQ47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});