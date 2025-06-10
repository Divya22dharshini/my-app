'use client';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import SignlyStart from '@/components/SignlyStart';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Signly - Home</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <Navbar />
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <SignlyStart />
        </div>
  
      </div>
    </>
  );
}
