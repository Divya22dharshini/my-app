// src/lib/firebaseConfig.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Replace with your actual config from Firebase Console
// src/lib/firebaseConfig.js


// ✅ Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA7QFjAbmfWsTEprgUXlY6ROGg7X2EVLBI",
  authDomain: "signly-83bdd.firebaseapp.com",
  projectId: "signly-83bdd",
  storageBucket: "signly-83bdd.firebasestorage.app",
  messagingSenderId: "214387650228",
  appId: "1:214387650228:web:4934c07fe4811b6488f1e1",
  measurementId: "G-ZXJ2HEKL9S"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
