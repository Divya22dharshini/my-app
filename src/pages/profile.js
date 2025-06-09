'use client';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Profile - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="signup-container">
        <h1>Your Profile</h1>
        <div style={{ textAlign: 'center' }}>
          <Image
            src="/images/profile.png" // Make sure this image is placed in public/images/
            alt="Profile Picture"
            width={120}
            height={120}
            style={{ borderRadius: '50%', marginBottom: '1rem' }}
          />
          <p><strong>Name:</strong> Divya D</p>
          <p><strong>Email:</strong> divya@example.com</p>

          <button
            onClick={() => router.push('/')}
            className="back-button"
            style={{ marginTop: '1.5rem' }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
}