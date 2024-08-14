// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBWPPT6eIYtnXoTBUlo3CMLl4M2TQJeFoM",
  authDomain: "ecommerce-34f94.firebaseapp.com",
  projectId: "ecommerce-34f94",
  storageBucket: "ecommerce-34f94.appspot.com",
  messagingSenderId: "281987588521",
  appId: "1:281987588521:web:YOUR_SPECIFIC_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
