'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Contact - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="signup-container">
        <h1>Contact Us</h1>
        <form className="signup-form">
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />

          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" rows="4" placeholder="Your message..." required style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }
          } />

          <button type="submit">Send Message</button>
        </form>
        <button onClick={() => router.push('/')} className="back-button">← Back</button>
      </div>
    </>
  );
}
