import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/Navbar'; // ✅ Import Navbar component

export default function Features() {
  return (
    <>
      <Head>
        <title>Features - Signly</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <Navbar /> {/* ✅ Replaced hardcoded navbar */}

      <div className="container">
        <div className="left-side">
          <div className="hero">
            <h1>Our Features</h1>
            <p>
              Explore the powerful tools and resources Signly offers to help you master sign language.
            </p>
            <div className="cta-buttons">
              <a href="/signup" className="btn btn-primary">
                Start Communicating
              </a>
              <a href="/login" className="btn btn-secondary">
                Login
              </a>
            </div>
          </div>
          <Image
            src="/images/front2.png"
            alt="Features Hero"
            width={500}
            height={400}
          />
        </div>

        <div className="right-side">
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hands"></i>
              </div>
              <h3>Interactive Lessons</h3>
              <p>
                Learn sign language with engaging visual modules designed for all levels.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-universal-access"></i>
              </div>
              <h3>Accessible Interface</h3>
              <p>
                Clean and inclusive design for easy navigation and use.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Community Support</h3>
              <p>
                Connect with peers, educators, and language experts globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-tiktok"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </>
  );
}
