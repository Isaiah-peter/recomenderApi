// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/recommend', async (req, res) => {
  const userInput = req.body.message;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a movie recommendation assistant. Reply with a JSON object: {"genres": [...], "movies": [...]}.' },
        { role: 'user', content: userInput }
      ]
    })
  });

  const data = await openaiRes.json();
  res.json(data);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
