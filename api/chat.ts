import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

const PROJECT_KNOWLEDGE = `
Project Name: Sameera Urban Nest
Developer: Creative Township Developers
Project Type: Premium Gated Community Residential Plots
Location: Athur, Near Chengalpattu, Tamil Nadu (Near GST Road NH45, Near Chengalpattu-Kanchipuram State Highway)
Project Area: 11.77 Acres total
Phase Details:
- Phase 1: 9.61 Acres, featuring 222 Residential Plots
- Phase 2: 2.16 Acres, featuring 48 Residential Plots
Total Plots: 270
Approval Status: DTCP Approved & RERA Approved
`;

const systemInstruction = `You are Sameera Assistant, a helpful real estate assistant for the "Sameera Urban Nest" housing development project by Creative Township Developers. Your goal is to answer buyers questions based ONLY on the provided project knowledge. Be polite and concise.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Support simple CORS requests if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;
    const prompt = message || "";

    let formattedContext = PROJECT_KNOWLEDGE + "\n\nConversation History:\n";
    history.forEach((msg: any) => {
      const speaker = msg.role === "user" ? "Buyer" : "Agent";
      formattedContext += `${speaker}: ${msg.text}\n`;
    });
    formattedContext += `Current prompt from Buyer: ${prompt}\n\nPlease reply as Sameera Assistant.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContext,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    return res.status(500).json({ error: "Chatbot API error", details: error.message });
  }
}
