'use client'; // only needed if using App Router
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <div className="signup-container">
        <h1>Login</h1>
        <form className="signup-form">
          <label>Email</label>
          <input type="email" required />

          <label>Password</label>
          <input type="password" required />

          <button type="submit">Login</button>

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
