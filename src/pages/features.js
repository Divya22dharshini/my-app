'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Features() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Features - Signly</title>
      </Head>

      <div className="features-section">
        <h1>Explore Signly Features</h1>
        <p className="intro-text">
          Discover the powerful tools and resources that help you learn and practice sign language effectively.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3>📘 <span>Sign Language Dictionary</span></h3>
            <p>Browse and search for signs and their meanings in a visual dictionary.</p>
          </div>

          <div className="feature-card">
            <h3>🎥 <span>Video Tutorials</span></h3>
            <p>Learn from structured video lessons on basic to advanced signs.</p>
          </div>

          <div className="feature-card">
            <h3>✍️ <span>Practice Exercises</span></h3>
            <p>Test your skills with gesture matching and fill-in-the-sign activities.</p>
          </div>

          <div className="feature-card">
            <h3>📝 <span>Quiz / Assessment</span></h3>
            <p>Take quizzes and track your learning progress with instant feedback.</p>
          </div>
        </div>

        <button onClick={() => router.push('/')} className="back-button">
          ← Back to Home
        </button>

        <p className="footer-cta">
          Ready to start learning? <a href="/signup">Create an account now</a>.
        </p>

        <style jsx>{`
          body {
            margin: 0;
            font-family: sans-serif;
          }

          .features-section {
            background-color: #f8aecd;
            padding: 2rem 1rem 3rem;
            text-align: center;
            color: #b30059;
            min-height: 100vh;
          }

          h1 {
            font-size: 2.3rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          .intro-text {
            font-size: 1rem;
            color: #333;
            max-width: 600px;
            margin: 0 auto 2rem;
          }

          .features {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }

          .feature-card {
            background-color: white;
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            width: 90%;
            max-width: 700px;
            box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-6px);
          }

          .feature-card h3 {
            font-size: 1.1rem;
            color: #b30059;
            margin-bottom: 0.5rem;
          }

          .feature-card h3 span {
            font-weight: bold;
          }

          .feature-card p {
            font-size: 0.95rem;
            color: #444;
          }

          .back-button {
            margin-top: 1rem;
            background-color: white;
            color: #b30059;
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 999px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            transition: background-color 0.2s;
          }

          .back-button:hover {
            background-color: #ffd2e0;
          }

          .footer-cta {
            margin-top: 1rem;
            font-size: 0.95rem;
            color: #880040;
          }

          .footer-cta a {
            color: #b30059;
            font-weight: bold;
            text-decoration: none;
          }
        `}</style>
      </div>
    </>
  );
}
