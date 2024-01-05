// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mnc-shopping-cart.firebaseapp.com",
    projectId: "mnc-shopping-cart",
    storageBucket: "mnc-shopping-cart.appspot.com",
    messagingSenderId: "16117059969",
    appId: "1:16117059969:web:dc3b3f76d09914c7c29880",
    measurementId: "G-ZFE3F48VPY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);