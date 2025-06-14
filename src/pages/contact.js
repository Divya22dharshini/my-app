'use client';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';

export default function Contact() {
  const router = useRouter();
  const form = useRef();
  const [showMessage, setShowMessage] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm(
      'service_homy6cc',       
      'template_g3s6oqm',      
      form.current,
      'HN8-eWK0d6YAcBBKs'       
    ).then(
      () => {
        setShowMessage(true);
        setSending(false);
        form.current.reset();
      },
      (error) => {
        console.error('Failed to send email:', error);
        setSending(false);
      }
    );
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

            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <input type="text" name="from_name" placeholder="Full Name" required />
              <input type="email" name="from_email" placeholder="E-mail" required />
              <textarea name="message" placeholder="Message" rows="4" required></textarea>
              <button type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Contact Us'}
              </button>
            </form>

            {showMessage && (
              <p className="thank-you-message">✅ Thank you for reaching out!</p>
            )}

            <p style={{ marginTop: '1rem' }}>
              Or email us directly at{' '}
              <a href="mailto:signlivya@gmail.com">signly.helpdesk@gmail.com</a>
            </p>

            <button onClick={() => router.push('/')} className="back-button">
              ← Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
