"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from '../styles/quiz.module.css';
import Navbar from "@/components/Navbar";
import { markTaskComplete } from '../utils/taskcompletionUtils';




const wordBank = [
  // 3-letter words
  { word: 'cat', hint: 'A small pet that says meow' },
  { word: 'dog', hint: 'A loyal pet that barks' },
  { word: 'sun', hint: 'Shines in the sky during daytime' },
  { word: 'hat', hint: 'Worn on your head' },
  { word: 'cup', hint: 'Used for drinking' },
  { word: 'egg', hint: 'Laid by a hen' },
  { word: 'pen', hint: 'Used for writing' },
  { word: 'bat', hint: 'Used in cricket or a flying mammal' },
  { word: 'car', hint: 'Four-wheeled vehicle' },
  { word: 'box', hint: 'Used to store things' },

  // 4-letter words
  { word: 'frog', hint: 'Green animal that hops' },
  { word: 'book', hint: 'You read this' },
  { word: 'milk', hint: 'White drink from a cow' },
  { word: 'fish', hint: 'Lives in water and swims' },
  { word: 'lamp', hint: 'Used to give light' },
  { word: 'door', hint: 'You open and close it to enter' },
  { word: 'cake', hint: 'Sweet treat for birthdays' },
  { word: 'ship', hint: 'Big boat on water' },
  { word: 'leaf', hint: 'Part of a plant or tree' },
  { word: 'duck', hint: 'Bird that swims and quacks' },

  // 5-letter words
  { word: 'apple', hint: 'Red or green fruit' },
  { word: 'chair', hint: 'You sit on it' },
  { word: 'table', hint: 'Used to keep things on' },
  { word: 'brush', hint: 'Used for painting or hair' },
  { word: 'clock', hint: 'Shows the time' },
  { word: 'zebra', hint: 'Striped animal' },
  { word: 'grape', hint: 'Small round fruit, purple or green' },
  { word: 'plant', hint: 'Grows in soil' },
  { word: 'piano', hint: 'A musical instrument' },
  { word: 'tiger', hint: 'Big wild cat with stripes' },

  // 6-letter words
  { word: 'banana', hint: 'Long yellow fruit' },
  { word: 'rabbit', hint: 'Hops and has long ears' },
  { word: 'castle', hint: 'Home of kings and queens' },
  { word: 'guitar', hint: 'String instrument' },
  { word: 'bottle', hint: 'Used to hold liquids' },
  { word: 'orange', hint: 'Fruit and a color' },
  { word: 'window', hint: 'Lets air and light in' },
  { word: 'rocket', hint: 'Goes to space' },
  { word: 'button', hint: 'Used to fasten clothes' },
  { word: 'monkey', hint: 'Animal that climbs trees' },

  // 7-letter words
  { word: 'teacher', hint: 'Helps you learn' },
  { word: 'balloon', hint: 'Filled with air, used at parties' },
  { word: 'blanket', hint: 'Keeps you warm at night' },
  { word: 'picture', hint: 'A photo or drawing' },
  { word: 'sandals', hint: 'Open shoes for summer' },
  { word: 'airport', hint: 'Where planes land and take off' },
  { word: 'spooned', hint: 'A past tense of using a utensil' },
  { word: 'present', hint: 'Given on birthdays' },
  { word: 'station', hint: 'Where trains stop' },
  { word: 'teacher', hint: 'Teaches in a school' }
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function SignQuiz() {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const totalQuestions = 10;

  const generateQuestion = () => {
    const { word, hint } = shuffleArray(wordBank)[0];
    const letters = word.split("");
    const shuffled = shuffleArray(letters);
    const images = shuffled.map((ch) => ch.toLowerCase() + ".png");

    setQuestion({ word, hint, images });
    setUserAnswer("");
    setFeedback("");
    setTimeLeft(20);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (!question || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, question]);

  const handleSubmit = (timeout = false) => {
  if (!question) return;

  const correct = userAnswer.trim().toLowerCase() === question.word.toLowerCase();
  if (correct && !timeout) {
    setScore((prev) => prev + 1);
    setFeedback("✅ Correct!");
  } else if (timeout) {
    setFeedback(`⏰ Time's up! Correct: ${question.word}`);
  } else {
    setFeedback(`❌ Wrong! Correct: ${question.word}`);
  }

  setTimeout(() => {
    const nextCount = questionCount + 1;

    if (nextCount < totalQuestions) {
      setQuestionCount(nextCount);
      generateQuestion();
    } else {
      markTaskComplete('Sign Quiz'); // ✅ <-- placed here
      setFeedback(`🎉 Quiz Finished! Score: ${correct && !timeout ? score + 1 : score}/${totalQuestions}`);
      setQuestion(null);
    }
  }, 2000);
};


  return (
    <>
      <Head>
        <title>Sign Word Quiz</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <Navbar/>
      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem", background: "#fff0f5", borderRadius: "16px" }}>
        <h2 style={{ textAlign: "center", color: "#b30059" }}>🔤 Sign Spell Scramble</h2>
        <p style={{ textAlign: "center" }}>Rearrange the sign letters to guess the word</p>

        {question ? (
          <>
            <h4>Question {questionCount + 1} / {totalQuestions}</h4>
            <p><strong>Hint:</strong> {question.hint}</p>
            <p style={{ color: "#ff4d4d" }}>⏱ Time left: {timeLeft}s</p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {question.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`/images/dictionary/${img}`}
                  alt={img}
                  style={{ width: "70px", height: "70px" }}
                />
              ))}
            </div>

            <input
              type="text"
              placeholder="Your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{ marginTop: "1rem", padding: "0.5rem", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <button
              onClick={() => handleSubmit()}
              style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#b30059", color: "white", border: "none", borderRadius: "8px" }}
            >
              Submit
            </button>
            {feedback && <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{feedback}</p>}
          </>
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>{feedback || "Loading..."}</p>
        )}
      </div>
    </>
  );
  
}
