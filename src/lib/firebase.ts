// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "studio-7106087596-31272",
  appId: "1:481717540030:web:75d9e225ba58b04bfa3aef",
  storageBucket: "studio-7106087596-31272.firebasestorage.app",
  apiKey: "AIzaSyA58HyH9t03mDAlBUazs6VBCcnwCInvAOU",
  authDomain: "studio-7106087596-31272.firebaseapp.com",
  messagingSenderId: "481717540030",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Initialize Analytics and export it
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, db, analytics };
