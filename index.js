// This is an express server that proxies requests to the OpenAI API
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

if (!CORS_ORIGIN) {
  throw new Error('CORS_ORIGIN environment variable is not set');
}

app.use(cors({
  origin: [CORS_ORIGIN], // specify allowed origins
}));
app.use(express.json());

app.post('/v1/chat/completions', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      return res.status(response.status).send(errorDetails);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error proxying request to OpenAI API:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});

// To run this server, use the command
// OPENAI_API_KEY=your_api_key_here node index.js
