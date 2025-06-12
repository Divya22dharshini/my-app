// pages/api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Missing message in request body' });
  }

  if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ message: 'Server configuration error: API key missing.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); 

    const prompt = `Given the English text "${message}", please provide two distinct pieces of information:

    1.  **ASL Sign Description (English):** A detailed textual description of how to perform the sign for this word or phrase in American Sign Language (ASL). Focus on: Handshape, Location, Movement, and any Non-Manual Markers (NMMs). If a direct sign is not common or it's a complex concept, explain the best way to convey it in ASL (e.g., fingerspelling, a combination of signs, or rephrasing).

    2.  **Tamil Translation:** The direct and accurate translation of the English input text into Tamil.

    Please format your response clearly, separating the two parts with specific headings for easy parsing. Like this:

    **ASL Sign Description:**
    [Detailed ASL description here]

    **Tamil Translation (தமிழ் மொழிபெயர்ப்பு):**
    [Tamil translation here]

    For example, if the input is "Hello", your response should be structured like:
    **ASL Sign Description:**
    Handshape: 'B' handshape (flat hand).
    Location: Start near the side of the head (ear or temple).
    Movement: Move the hand straight forward and slightly out, as if saluting or waving hello.
    Non-Manual Markers: A friendly facial expression.

    **Tamil Translation (தமிழ் மொழிபெயர்ப்பு):**
    வணக்கம்
    `;

    const result = await model.generateContent(prompt); 
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Raw Response:", text); // <--- ADD THIS LINE FOR DEBUGGING

    res.status(200).json({ reply: text });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Error communicating with AI service: ${error.message}`
      : 'Error communicating with AI service. Please try again later.';
    res.status(500).json({ message: errorMessage });
  }
}