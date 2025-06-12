// pages/features.js
'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/features.module.css'; 

export default function Features() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // REMOVED: imageMap and getImageForWord are no longer needed
  /*
  const imageMap = {
    hello: '/images/hello.gif',
    hi: '/images/hello.gif',
    sorry: '/images/sorry.gif',
    'thank you': '/images/thankyou.gif',
    thanks: '/images/thankyou.gif',
    dictionary: '/images/dictionary.gif',
    videos: '/images/videos.gif',
    exercises: '/images/exercises.gif',
    quiz: '/images/quiz.gif',
    test: '/images/quiz.gif',
    practice: '/images/exercises.gif',
  };

  const getImageForWord = (word) => {
    const key = Object.keys(imageMap).find(
      k => word.trim().toLowerCase().includes(k)
    );
    return key ? imageMap[key] : null;
  };
  */

  // Helper function to parse the AI response
  const parseAiResponse = (fullResponse) => {
    // Making regex more flexible for bolding (**) and whitespace (\\s*)
    const aslMatch = fullResponse.match(/ASL Sign Description(?:\*{1,2}|\s*):([\s\S]*?)(?=Tamil Translation)/i);
    const tamilMatch = fullResponse.match(/Tamil Translation \(தமிழ் மொழிபெயர்ப்பு\)(?:\*{1,2}|\s*):([\s\S]*)/i);
    
    const aslDescription = aslMatch ? aslMatch[1].trim() : 'ASL description not found.';
    const tamilTranslation = tamilMatch ? tamilMatch[1].trim() : 'Tamil translation not found.';

    return { asl: aslDescription, tamil: tamilTranslation };
  };

  // Handle AI request
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    setLoading(true);
    setResponse(''); 
    setHistory(prev => [...prev, { query: trimmedInput, rawResponse: '', parsedResponse: null }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = await res.json();
      const rawReply = data.reply || 'Sorry, no response received from the AI. The AI might be unavailable or busy.';
      
      setResponse(rawReply); 
      const parsedReply = parseAiResponse(rawReply);

      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].rawResponse = rawReply;
        newHistory[newHistory.length - 1].parsedResponse = parsedReply;
        return newHistory;
      });
      setInput(''); 
    } catch (err) {
      console.error("Failed to fetch from API:", err);
      const errorMessage = 'Error connecting to the AI service. Please try again.';
      setResponse(errorMessage); 
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].rawResponse = errorMessage;
        newHistory[newHistory.length - 1].parsedResponse = { asl: errorMessage, tamil: errorMessage }; 
        return newHistory;
      });
    } finally {
      setLoading(false);
    }
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    setResponse('');
  };

  // REMOVED: matchedImage is no longer needed
  // const matchedImage = getImageForWord(input);

  return (
    <>
      <Head>
        <title>Features - Signly</title>
        <meta name="description" content="Explore Signly's sign language learning features including AI translation, dictionary, and practice tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.featuresSection}>
        <h1 className={styles.title}>Explore Signly Features</h1>
        <p className={styles.introText}>
          Discover powerful tools to learn and practice sign language effectively
        </p>

        {/* Features Grid - Now with 4 separate, balanced cards */}
        <div className={styles.featuresGrid}>
          {/* Sign Dictionary Card */}
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📘</span>
            <h3>Sign Dictionary</h3>
            <p>Search signs and meanings in our visual dictionary</p>
          </div>

          {/* Video Tutorials Card */}
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎥</span>
            <h3>Video Tutorials</h3>
            <p>Learn with structured lessons from basic to advanced signs</p>
          </div>

          {/* Practice Exercises Card */}
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>✍️</span>
            <h3>Practice Exercises</h3>
            <p>Test skills with gesture matching and sign activities</p>
          </div>

          {/* Assessments Card */}
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📝</span>
            <h3>Assessments</h3>
            <p>Track progress with quizzes and get instant feedback</p>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className={styles.aiAssistant}>
          <h2>🧠 Text-to-Sign & Translation</h2>
          <p className={styles.aiIntroText}>
            Type a word or phrase, and our AI will provide a detailed textual description of the sign in American Sign Language (ASL) and its translation in Tamil.
            {/* Updated text, removed mention of visual sign appearing */}
          </p>
          
          <div className={styles.aiContainer}>
            <form onSubmit={handleSubmit} className={styles.aiForm}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., Hello, Thanks, Water, How are you?"
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    'Get Info' 
                  )}
                </button>
              </div>
            </form>

            {/* REMOVED: Conditional rendering for image or text disclaimer */}
            {/*
            {matchedImage && (
              <div className={styles.signPreview}>
                <h4>Visual Sign for "{input}"</h4>
                <img 
                  src={matchedImage} 
                  alt={`Sign language for ${input}`} 
                  onError={(e) => {
                    e.target.style.display = 'none'; 
                    console.error(`Failed to load image: ${matchedImage}`);
                  }}
                />
                <p className={styles.imageDisclaimer}>
                  Note: This is a pre-recorded visual sign from our dictionary. See below for AI-generated textual explanation and Tamil translation.
                </p>
              </div>
            )}
            */}

            {(response || history.length > 0) && (
              <div className={styles.aiResults}>
                <div className={styles.resultsHeader}>
                  <h3>Translation Results</h3>
                  {history.length > 0 && (
                    <button 
                      onClick={clearHistory}
                      className={styles.clearBtn}
                      disabled={loading}
                    >
                      Clear History
                    </button>
                  )}
                </div>

                {history.map((entry, idx) => (
                  <div key={idx} className={styles.historyEntry}>
                    <div className={styles.query}>
                      <strong>You:</strong> {entry.query}
                    </div>
                    <div className={styles.response}>
                      {entry.parsedResponse ? (
                        <>
                          <p><strong>ASL Sign Description:</strong></p>
                          <p>{entry.parsedResponse.asl}</p>
                          <p><strong>Tamil Translation (தமிழ் மொழிபெயர்ப்பு):</strong></p>
                          <p>{entry.parsedResponse.tamil}</p>
                        </>
                      ) : (
                        <p>{loading && idx === history.length -1 ? 'Waiting for AI response...' : 'No response yet or an error occurred.'}</p>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className={styles.loadingResponse}>
                    <span className={styles.spinner}></span>
                    Translating and analyzing sign language patterns...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation - "Start Learning Free" button removed */}
        <div className={styles.actionButtons}>
          <button 
            onClick={() => router.push('/')}
            className={styles.backButton}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
}