import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // ── 1. API KEY CHECK ──────────────────────────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[chat] GEMINI_API_KEY is not set');
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // ── 2. BODY PARSING ───────────────────────────────────────────────────────
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Bad request', details: 'Body must be JSON' });
    }

    const { message } = req.body as { message?: string };
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Bad request', details: '"message" is required' });
    }

    // ── 3. CALL GEMINI REST API ───────────────────────────────────────────────
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: 'You are Sameera Assistant, a helpful real estate assistant for Sameera Urban Nest.' }],
        },
        contents: [{ role: 'user', parts: [{ text: message.trim() }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    });

    // ── 4. PARSE RESPONSE ─────────────────────────────────────────────────────
    const rawText = await geminiRes.text();
    let data: any;

    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('[chat] Non-JSON response from Gemini');
      return res.status(500).json({ error: 'Chatbot API error', details: 'Gemini returned invalid JSON' });
    }

    if (!geminiRes.ok) {
      return res.status(geminiRes.status).json({ 
        error: 'Gemini API error', 
        details: data?.error?.message ?? 'Unknown error' 
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "I couldn't generate a response.";
    return res.status(200).json({ text });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[chat] Unhandled error:', message);
    return res.status(500).json({ error: 'Chatbot API error', details: message });
  }
}
