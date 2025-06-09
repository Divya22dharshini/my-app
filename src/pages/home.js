'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Signly - Home</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="container">
        <h1 style={{ textAlign: 'center', color: '#d63384' }}>
          Welcome to Signly Home
        </h1>




        <div className="home-btn-group">
          <a href="/dictionary" className="btn btn-primary">
            Sign Language Dictionary
          </a>
          <a href="/videos" className="btn btn-secondary">
            Video Tutorials
          </a>
          <a href="/practice" className="btn btn-primary">
            Practice Exercises
          </a>
          <a href="/quiz" className="btn btn-secondary">
            Quiz / Assessment
          </a>
        </div>
      </div>
    </>
  );
}
