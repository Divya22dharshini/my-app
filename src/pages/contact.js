'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function Contact() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false); // state for thank you message

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true); // show thank you message
  };

  return (
    <>
      <Head>
        <title>Contact - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <Navbar />

      <div className="contact-page">
        <div className="contact-grid">
          {/* Left Image */}
          <div className="contact-image">
            <img src="/images/CONTACT2.png" alt="Contact Visual" />
          </div>

          {/* Right Side - Form & Info */}
          <div className="contact-form-container">
            <h1>Contact Us</h1>

            <form className="contact-form">
  <input type="text" placeholder="Full Name" required />
  <input type="email" placeholder="E-mail" required />
  <textarea placeholder="Message" rows="4" required></textarea>
  <button type="submit">Contact Us</button>
</form>

{/* Static Thank You Message */}
<p className="thank-you-message">Thank you for reaching out!</p>

<button onClick={() => router.push('/')} className="back-button">← Back</button>

          </div>
        </div>
      </div>
    </>
  );
}
