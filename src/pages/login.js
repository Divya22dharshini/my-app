'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import Navbar from '@/components/sign-nav';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
      setError('');
    } catch (err) {
      setError('Failed to send password reset email');
      console.error(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <Navbar/>
      <div className="signup-container">
        <h1>Login</h1>
        <form className="signup-form" onSubmit={handleLogin}>
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

          <button type="submit">Login</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}

          <div className="center-link-group">
            <center>
            <a href="#" className="link-text" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
            </center>
            <br />
            <center>
            <a href="/signup" className="link-text">
              Don't have an account? Sign Up
            </a>
            </center>
          </div>

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
