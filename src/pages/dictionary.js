'use client';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { markTaskComplete } from '../utils/taskcompletionUtils';

export default function DictionaryPage() {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const imageList = [
    'a.png', 'b.png', 'c.png', 'd.png', 'e.png', 'f.png', 'g.png', 'h.png', 'i.png', 'j.png',
    'k.png', 'l.png', 'm.png', 'n.png', 'o.png', 'p.png', 'q.png', 'r.png', 's.png', 't.png',
    'u.png', 'v.png', 'w.png', 'x.png', 'y.png', 'z.png',
    '0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png'
  ];

  const descriptions = {
    a: "A closed fist, all finger folded against the palm, thumb is straight, alongside the index finger.",
    b: "All fingers are straight. Thumb is folded across palm.",
    c: "All fingers partially folded. Thumb is partially folded. Hand is turn slightly to the left so viewer can see backward 'C' shape formed by thumb and index finger.",
    d: "Middle, ring and little fingers are partially folded. Tip of thumb is touching tip of middle finger. Index finger is straight. Hand is turned slightly so viewer can see 'd' shape formed by thumb, middle and index fingers.",
    e: "Thumb is folded across in front of palm but not touching it. All fingers are partially folded with the tips of index, middle and ring fingers touching the thumb between the knuckle and the tip.",
    f: "Tip of index finger is touching tip of thumb. Middle, ring and little fingers are straight and slightly spread.",
    g: "Middle, ring and little fingers are folded down across palm. Thumb is straight but pulled in so that it is in front of the index finger. The index finger is straight and pointing forwards slightly so that it is parallel to the thumb, The thumb and index finger are not touching. The whole hand is turned towards the left and tilted slightly so the thumb and index finger are towards the viewer and pointing up at about 45 degrees.",
    h: "Ring and little finger are folded down. Thumb is folded over ring and little finger. Index finger and middle finger are straight and together. The hand is tilted over so that the fingers are horizontal and pointing to the left.",
    i: "Index, middle and ring fingers are folded down. Thumb is folded across index middle and ring fingers. Little finger is straight.",
    j: "Index, middle and ring fingers are folded down. Thumb is folded across index middle and ring fingers. Little finger is straight. The hand is moved so that little finger draws a 'J' shape. Motion is a curve moving forward and then right. The hand turns to the right.",
    k: "Ring and little fingers are folded down. Index and middle finger are straight and slightly spread. Thumb is straight and pointing up to the middle finger. (This is very similar to V the only difference is the position of the thumb.",
    l: "Middle, ring and little finger are folded down over palm. Index finger and thumb are straight. Thumb is sticking out sideways at 90 degrees to index finger to form 'L' shape.",
    m: "Little finger is folded. Thumb is folded across to touch little finger. Index, middle and ring fingers are folded down over thumb.",
    n: "Little and ring finger are folded. Thumb is folded across ring and little finger. Index finger and middle finger are folded down over thumb.",
    o: "All fingers are partially folded. Thumb is partially folded and tip of thumb is touching tip of index finger. Hand is turned slightly so viewer can see 'O' shape formed by thumb and index finger.",
    p: "Ring and little finger are folded down. Index finger is straight. Middle finger is straight but pointing forward so that is at 90 degrees to index finger. Tip of thumb is touching middle of middle finger. Hand is turned to the left and twisted over so that index finger is horizontal and middle finger is pointing down. Viewer can (sort of) see a 'P' shape formed by middle finger and thumb.",
    q: "Ring and little fingers are folded down across palm. Thumb is straight but pulled in so that it is in front of the index finger. The index finger is straight and pointing forwards slightly so that it is parallel to the thumb. The index finger and thumb are not touching. The Middle finger is bent down and across to the right of the thumb (this hurts !). The whole hand is turned towards the left and tilted so the thumb and index finger are towards the viewer and pointing almost straight down.",
    r: "Ring and little finger are folded against the palm, held down by thumb, index and middle finger are straight and crossed, index finger in front.",
    s: "Clenched fist. All fingers folded tightly into palm. Thumb is across index and middle fingers.",
    t: "Middle, ring and little fingers are fold down across palm. Thumb is folded across middle finger. Index finger is folded over thumb.",
    u: "Ring and little finger are folded against the palm, held down by thumb, index and middle finger are straight and together.",
    v: "Ring and little finger fold against the palm, held down by thumb, index and middle finger are straight and spread to form a 'V' shape.",
    w: "Tip of little finger is touching tip of thumb. Index, middle and ring fingers are straight and slightly spread.",
    x: "Middle, ring and little fingers are folded down. Index finger is bent at both joints. Thumb is pulled in and slightly bent at the joint. The hand is turned to the left so view can see thumb and index finger.",
    y: "Index, middle and ring ringers folded against palm. Little finger and thumb are straight and spread wide.",
    z: "Middle, ring and little fingers are folded. Thumb is folded across middle and ring fingers. Index finger is straight. The hand is moved so that the tip of index finger draws out a 'Z' shape. The motion is (1) from right to left. (2) from left to right and forward. (3) from right to left.",
    "0": "All fingertips touch the thumb tip, forming an 'O' shape with the hand. Palm faces forward.",
    "1": "Hand forms a fist with the index finger extended straight up. Palm faces forward.",
    "2": "Hand forms a fist with the index and middle fingers extended and held together, pointing up. Palm faces forward.",
    "3": "Hand forms a fist with the thumb, index, and middle fingers extended. The thumb touches the tip of the pinky and ring fingers are folded down. Palm faces forward.",
    "4": "All fingers except the thumb are extended and held together, pointing up. Thumb is folded across the palm. Palm faces forward.",
    "5": "All fingers are extended and spread apart, palm facing forward.",
    "6": "Tip of the thumb touches the tip of the pinky finger; other fingers are extended and spread apart. Palm faces forward.",
    "7": "Tip of the thumb touches the tip of the ring finger; other fingers are extended and spread apart. Palm faces forward.",
    "8": "Tip of the thumb touches the tip of the middle finger; other fingers are extended and spread apart. Palm faces forward.",
    "9": "Tip of the thumb touches the tip of the index finger, forming a circle. Other fingers are extended and spread apart. Palm faces forward.",
    "10": "Hand forms a fist with the thumb extended upward (like a 'thumbs up'). The hand is shaken side to side slightly."
  };

  const handleNext = () => {
    if (index < imageList.length - 1) {
      setIndex(index + 1);
    }
    if (index === imageList.length - 2 && !completed) {
      markTaskComplete('Sign Dictionary');
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const currentLabel = imageList[index].split('.')[0].toLowerCase();
  const description = descriptions[currentLabel] || "Description not available.";

  return (
    <>
      <Head>
        <title>Dictionary</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
     <Navbar />
      <div className="dictionary-container">
        <h2 className="dictionary-title">Sign Language Dictionary</h2>

        <div className="dictionary-horizontal">
          <img
            className="dictionary-sign-image"
            src={`/images/dictionary/${imageList[index]}`}
            alt={description}
          />

          <div className="dictionary-info">
            <p className="dictionary-label">
              {currentLabel === 'u' ? 'U (You!)' : currentLabel.toUpperCase()}
            </p>
            <p className="dictionary-description">
              {description}
            </p>
          </div>
        </div>

        <div className="dictionary-nav-buttons">
          <button
            className="dictionary-nav-btn"
            onClick={handlePrev}
            disabled={index === 0}
          >
            &lt;
          </button>
          <button
            className="dictionary-nav-btn"
            onClick={handleNext}
            disabled={index === imageList.length - 1}
          >
            &gt;
          </button>
        </div>

        {completed && (
          <p style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>
            🎉 You’ve completed viewing the dictionary!
          </p>
        )}

        <img src="/images/dictionary/hand_walk.gif" alt="Hand walking animation" style={{ height: '200px' }} />
      </div>
    </>
  );
}
