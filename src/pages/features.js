'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Features() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Features - Signly</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="signup-container">
        <h1>Explore Signly Features</h1>
        <div className="features">
          <div className="feature-card">
            <h3>📘 Sign Language Dictionary</h3>
            <p>Browse and search for signs and their meanings in a visual dictionary.</p>
          </div>

          <div className="feature-card">
            <h3>🎥 Video Tutorials</h3>
            <p>Learn from structured video lessons on basic to advanced signs.</p>
          </div>

          <div className="feature-card">
            <h3>✍️ Practice Exercises</h3>
            <p>Test your skills with gesture matching and fill-in-the-sign activities.</p>
          </div>

          <div className="feature-card">
            <h3>📝 Quiz / Assessment</h3>
            <p>Take quizzes and track your learning progress with instant feedback.</p>
          </div>

          <button
            onClick={() => router.push('/')}
            className="back-button"
            style={{ marginTop: '2rem' }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
