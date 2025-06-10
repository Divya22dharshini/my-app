'use client';
import { useState, useEffect } from 'react';

export default function SignlyStart() {
  const [showOptions, setShowOptions] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    switch (hoveredBtn) {
      case 'dictionary':
        setImageSrc('/images/dictionary.gif');
        break;
      case 'videos':
        setImageSrc('/images/videos.gif');
        break;
      case 'exercises':
        setImageSrc('/images/exercises (2).gif');
        break;
      case 'quiz':
        setImageSrc('/images/quiz.gif');
        break;
      default:
        setImageSrc('');
    }
  }, [hoveredBtn]);

  return (
    <div
      className="cta-section"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '40px',
      }}
    >
      {/* Left Section: Heading and Buttons */}
      <div
        style={{
          border: '2px solid #ccc',
          borderRadius: '12px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          marginTop: '-50px'
        }}
      >
        <h1 className="heading" style={{ marginBottom: '20px' }}>
          Welcome to Signly Home
        </h1>

        {!showOptions ? (
          <button className="btn btn-primary" onClick={() => setShowOptions(true)}>
            Let’s Learn Signly
          </button>
        ) : (
          <div
            className="cta-buttons"
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <a
              href="/dictionary"
              className="btn btn-primary"
              onMouseEnter={() => setHoveredBtn('dictionary')}
              onMouseLeave={() => setHoveredBtn('')}
            >
              Sign Language Dictionary
            </a>
            <a
              href="/videos"
              className="btn btn-primary"
              onMouseEnter={() => setHoveredBtn('videos')}
              onMouseLeave={() => setHoveredBtn('')}
            >
              Video Tutorials
            </a>
            <a
              href="/exercises"
              className="btn btn-primary"
              onMouseEnter={() => setHoveredBtn('exercises')}
              onMouseLeave={() => setHoveredBtn('')}
            >
              Practice Exercises
            </a>
            <a
              href="/quiz"
              className="btn btn-primary"
              onMouseEnter={() => setHoveredBtn('quiz')}
              onMouseLeave={() => setHoveredBtn('')}
            >
              Quiz / Assessment
            </a>
          </div>
        )}
      </div>

      {/* Right Side: Thinking Cloud Appears Only on Hover */}
      {imageSrc && (
        <div style={{ position: 'relative', marginLeft: '40px' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: '#f0f8ff',
              border: '2px solid #cceeff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 6px 12px rgba(212, 15, 107, 0.79)',
              marginBottom:'-100px'
            }}
          >
            <img
              src={imageSrc}
              alt="Preview"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
