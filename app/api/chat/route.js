// app/api/chat/route.js

import axios from 'axios';
import { NextResponse } from 'next/server';

const url = 'https://api.cohere.ai/generate';

export async function POST(request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { question, consent } = await request.json();
    const apiKey = process.env.cohere_api_key;

    const response = await axios.post(
      url,
      {
        prompt: question,
        max_tokens: 300,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const responseData = response.data.text || 'No response received';

    return NextResponse.json({ response: responseData });
  } catch (error) {
    return NextResponse.json({ error: error.response?.data || 'An error occurred' }, { status: error.response?.status || 500 });
  }
}
