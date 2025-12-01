'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebaseConfig'; // use correct relative path
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
      });

      // Wait for auth state to be available before redirecting to avoid race conditions
      await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          if (u) {
            unsubscribe();
            resolve(true);
          }
        });
        // safety timeout in case onAuthStateChanged doesn't fire quickly
        setTimeout(() => {
          try { unsubscribe(); } catch (e) {}
          resolve(false);
        }, 3000);
      });

      router.push('/home');
    } catch (err) {
  console.error("Full Firebase error:", err); // ← This is key
  console.log("Error code:", err.code);
  console.log("Error message:", err.message);

  if (err.code === 'auth/email-already-in-use') {
    setError('Email already in use. Try logging in.');
  } else if (err.code === 'auth/invalid-email') {
    setError('Invalid email address.');
  } else if (err.code === 'auth/weak-password') {
    setError('Password must be at least 6 characters.');
  } else {
    setError('Signup failed. Please try again.');
  }
}

  };

  return (
    <>
      <Head>
        <title>Sign Up - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={handleSignup}>
          <label>Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="center-back-button">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="back-button"
            >
              ← Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
