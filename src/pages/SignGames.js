'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { markTaskComplete } from '../utils/taskCompletionUtils';

const imageList = [
  'a.png', 'b.png', 'c.png', 'd.png', 'e.png', 'f.png', 'g.png', 'h.png', 'i.png', 'j.png',
  'k.png', 'l.png', 'm.png', 'n.png', 'o.png', 'p.png', 'q.png', 'r.png', 's.png', 't.png',
  'u.png', 'v.png', 'w.png', 'x.png', 'y.png', 'z.png'
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function SignGames() {
  // Bingo State
  const [bingoLabel, setBingoLabel] = useState('');
  const [bingoOptions, setBingoOptions] = useState([]);
  const [bingoScore, setBingoScore] = useState(0);

  // Memory Match State
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [memoryScore, setMemoryScore] = useState(0);

  // Bingo Setup
  const generateBingo = () => {
    const correct = imageList[Math.floor(Math.random() * imageList.length)];
    const wrong = shuffleArray(imageList.filter(img => img !== correct)).slice(0, 3);
    const options = shuffleArray([correct, ...wrong]);
    setBingoLabel(correct.split('.')[0].toUpperCase());
    setBingoOptions(options);
  };

  const handleBingoSelect = (choice) => {
    const correct = imageList.find(img => img.split('.')[0].toUpperCase() === bingoLabel);
    if (choice === correct) {
      setBingoScore(prev => prev + 1);
      generateBingo();
    } else {
      alert('❌ Try again!');
    }
  };

  // Memory Setup
  const generateMemory = () => {
    const selected = shuffleArray(imageList).slice(0, 6);
    const pairs = shuffleArray([...selected, ...selected]);
    setCards(pairs);
    setFlipped([]);
    setMatched([]);
  };

  const handleCardFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setMemoryScore(score => score + 1);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  useEffect(() => {
    generateBingo();
    generateMemory();
  }, []);

  useEffect(() => {
  if (bingoScore >= 5 && memoryScore >= 5) {
    markTaskComplete('Sign Games');
  }
}, [bingoScore, memoryScore]);


  return (
    <>
      <Head><title>Sign Games</title>
      <link rel="stylesheet" href="/style.css" />
      </Head>
      <Navbar/>
      <div style={{
        padding: '2rem',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f8bbd0',
        minHeight: '100vh',
        color: '#333'
      }}>
        {/* 🎯 Sign Bingo */}
        <section style={{
          maxWidth: '700px',
          margin: '0 auto 4rem',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          padding: '2rem'
        }}>
          <h1 style={{ textAlign: 'center', color: '#b30059' }}>🎯 Sign Bingo</h1>
          <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            Match the sign for: <span style={{ fontWeight: 'bold', color: '#99004d' }}>{bingoLabel}</span>
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
            margin: '1.5rem 0'
          }}>
            {bingoOptions.map((img, index) => (
              <div key={index}
                onClick={() => handleBingoSelect(img)}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '10px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
              >
                <img src={`/images/dictionary/${img}`} alt={img} style={{ width: '100%', height: '100px', objectFit: 'contain' }} />
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>Score: {bingoScore}</p>
          <button onClick={() => {
            setBingoScore(0);
            generateBingo();
          }} style={{
            display: 'block',
            margin: '0 auto',
            padding: '0.6rem 1.2rem',
            backgroundColor: '#b30059',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8a0044'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b30059'}
          >
            🔄 Reset Bingo
          </button>
        </section>

        {/* 🧠 Memory Match */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          padding: '2rem'
        }}>
          <h1 style={{ textAlign: 'center', color: '#b30059' }}>🧠 Memory Match</h1>
          <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            Match the pairs of sign language cards to improve your memory.
          </p>
          <h3 style={{ textAlign: 'center', color: '#5c005c', marginBottom: '1rem' }}>Score: {memoryScore}</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '1rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            {cards.map((img, idx) => {
              const isVisible = flipped.includes(idx) || matched.includes(idx);
              return (
                <div key={idx}
                  onClick={() => handleCardFlip(idx)}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#fff',
                    border: isVisible ? '3px solid #b30059' : '2px solid #999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.4s',
                    transform: isVisible ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  {isVisible ? (
                    <img src={`/images/dictionary/${img}`} alt="sign"
                      style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '2rem', color: '#ccc' }}>?</span>
                  )}
                </div>
              );
            })}
          </div>

          <button onClick={() => {
            setMemoryScore(0);
            generateMemory();
          }} style={{
            marginTop: '1.5rem',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#b30059',
            color: '#fff',
            cursor: 'pointer',
            display: 'block',
  margin: '1.5rem auto 0'
          }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8a0044'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b30059'}
          >
            🔄 Restart Memory
          </button>
        </section>
      </div>
    </>
  );
}
