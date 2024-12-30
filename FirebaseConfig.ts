import auth from '@react-native-firebase/auth';
import { initializeApp } from '@react-native-firebase/app'; // Tylko jeśli potrzebujesz innych funkcji Firebase

const firebaseConfig = {
    apiKey: "AIzaSyCK7BYDX2f-k_ljZn5_T_Z0ctP4VcS8WUI",
    authDomain: "travel-app-6f520.firebaseapp.com",
    projectId: "travel-app-6f520",
    storageBucket: "travel-app-6f520.firebasestorage.app",
    messagingSenderId: "965577119919",
    appId: "1:965577119919:web:c0a2f1bfba5c65d66c9c5a",
    measurementId: "G-T4RB7HTQ47",
};

// Nie musisz ręcznie wywoływać `initializeApp`, ponieważ `@react-native-firebase` automatycznie inicjalizuje Firebase.
// Funkcja auth() jest dostępna bezpośrednio z modułu @react-native-firebase/auth.

export { auth };
