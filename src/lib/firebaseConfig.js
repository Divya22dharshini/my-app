// src/lib/firebaseConfig.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Replace with your actual config from Firebase Console
// src/lib/firebaseConfig.js


// ✅ Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC3JNr5nF_cPs7Q2VSRMQb18Uio36OqXY0",
  authDomain: "signlyy.firebaseapp.com",
  projectId: "signlyy",
  storageBucket: "signlyy.firebasestorage.app",
  messagingSenderId: "57507664901",
  appId: "1:57507664901:web:d29c9e8f8d95e5184a786c",
  measurementId: "G-D3J8EC5DSL"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
