


// // src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWPPT6eIYtnXoTBUlo3CMLl4M2TQJeFoM",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "ecommerce-34f94",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

