// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add additional imports for other Firebase products you want to use
// Example:
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtyN85WTU7QBFaQrJpZODgy63HlAcjPTo",
  authDomain: "web-wct-89257.firebaseapp.com",
  projectId: "web-wct-89257",
  storageBucket: "web-wct-89257.appspot.com",
  messagingSenderId: "204785187942",
  appId: "1:204785187942:web:8bbf9f1f3fefd00af381a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optionally initialize other Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export the initialized services to use them in other parts of your app
export { app, auth, googleProvider, signInWithPopup };
