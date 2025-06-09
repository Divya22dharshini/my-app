'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign Up - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form">
          <label>Name</label>
          <input type="text" required />

          <label>Email</label>
          <input type="email" required />

          <label>Password</label>
          <input type="password" required />

          <button type="submit">Sign Up</button>

          {/* Centered Back Button */}
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
