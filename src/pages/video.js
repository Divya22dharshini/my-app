'use client';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/video.module.css';
import Navbar from '@/components/Navbar';
import { markTaskComplete } from '../utils/taskCompletionUtils';

export default function VideoPage() {
  const [completed, setCompleted] = useState(false);

  const videos = [
    {
      id: 'v1desDduz5M',
      title: 'Sign Language A-Z Tutorial',
      description: 'Learn how to sign the letters A to Z in American Sign Language (ASL). Perfect for beginners.'
    },
    {
      id: '0FcwzMq4iWg',
      title: 'Numbers in Sign Language',
      description: 'A simple guide to signing numbers 1 to 20 using ASL. Includes hand shape and motion tips.'
    },
    {
      id: '4Ll3OtqAzyw',
      title: 'Daily Signs Practice',
      description: 'Practice common daily sign language phrases used in conversations such as “hello”, “thank you”, and more.'
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextVideo = () => {
    if (current === videos.length - 1 && !completed) {
      markTaskComplete('Video Learning');
      setCompleted(true);
    }

    setCurrent((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <>
      <Head>
        <title>Sign Language Video</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Sign Language Demonstration</h1>

        <div className={styles.carousel}>
          <iframe
            className={styles.youtubeEmbed}
            src={`https://www.youtube.com/embed/${videos[current].id}`}
            title={videos[current].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <h3 className={styles.caption}>{videos[current].title}</h3>
          <p className={styles.description}>{videos[current].description}</p>

          <div className={styles.controls}>
            <button onClick={prevVideo} className={styles.navButton}>&lt;</button>
            <button onClick={nextVideo} className={styles.navButton}>&gt;</button>
          </div>

          {completed && (
            <p style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>
              🎉 You’ve completed all the videos!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
