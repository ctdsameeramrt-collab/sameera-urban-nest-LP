/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to persist leads on the server volume
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure the leads files exists with a valid array
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

// Direct project specifications for Gemini bot training
const PROJECT_KNOWLEDGE = `
Project Name: Sameera Urban Nest
Developer: Creative Township Developers
Project Type: Premium Gated Community Residential Plots
Location: Athur, Near Chengalpattu, Tamil Nadu (Near GST Road NH45, Near Chengalpattu-Kanchipuram State Highway)
Project Area: 11.77 Acres total
Phase Details:
- Phase 1: 9.61 Acres, featuring 222 Residential Plots
- Phase 2: 2.16 Acres, featuring 48 Residential Plots
Total Plots: 270 plots

Plot Sizes Available:
- 600 Sq.Ft (Suitable for small/compact homes or pure investment, starting at ₹8.4 Lakhs onwards)
- 800 Sq.Ft
- 900 Sq.Ft
- 1200 Sq.Ft (Standard plot size, most popular)
- 1500 Sq.Ft
- 1800 Sq.Ft
- 2400 Sq.Ft (Premium luxury plots)

Pricing:
- Base Price: ₹1,400 to ₹1,500 per Sq.Ft. (Depending on layout, phase, and corner premium)
- Starting Price: ₹8.4 Lakhs onwards (for a 600 Sq.Ft plot)

Legal Status & Approvals:
- DTCP Approved (Directorate of Town and Country Planning)
- RERA Approved (Tamil Nadu Real Estate Regulatory Authority)
- RERA Registration Number: TN/35/Layout/1382/2025
- Clear Title status
- Ready to build immediately
- Ready for registration immediately
- Bank loans: Highly available from all leading public & private banks (such as SBI, HDFC, ICICI, LIC, etc. up to 70% to 80% of plot cost depending on eligibility)

Connectivity & Location Advantages:
- Closely situated near Athur Junction (only 1.8 km distance)
- Excellent access to GST Road (NH45) and Chengalpattu-Kanchipuram State Highway
- Convenient proximity to Chengalpattu Railway Station and public transit links

Nearby Educational Institutions:
- Brindhavanam School (Close proximity)
- RLT School
- St. Paul School
- Maharishi Vidya Mandir (Just 2 km away)
- Pattammal Alagesan Arts & Science College (Walking distance of 1.6 km)
- Chennai Amirtha Hotel Management College (Very close)
- SRM University (Located approx 23 km away, easily accessible via GST Road)

Healthcare Facilites:
- SRM General Hospital
- Advanced hospital facilities inside Chengalpattu Municipal Limits

Nearby Employment Hubs:
- Mahindra World City (MWC) is a massive IT & Industrial corridor nearby.
- Renault Nissan manufacturing hub.
- Major growing manufacturing hub and industrial corridor. Perfect for professionals wanting an easy commute.

Amenities Provided:
- 24x7 Security & CCTV Surveillance Cameras
- Fully Gated Community with Archway Entrance
- High-grade wide Blacktop internal roads
- Street lighting in all pathways
- Children's Play Area
- Well-landscaped green gardens & open park spaces
- Elegant Avenue trees planted across the layout
- Reserved parking allocation and planning
- Engineered water disposal & drainage system
- Community RO Water purification facility
- Onsite Maintenance staff
- 100% Vastu Compliant Layout layouts

Investment Advantages:
- Extremely affordable premium plots starting at just ₹8.4 Lakhs
- Ready for immediate construction and instant registration
- Premium DTCP & RERA approvals ensure zero legal problems
- Outstanding connectivity to Chengalpattu, Chennai, GST Road, and major manufacturing sectors
- Located in Athur—one of Chengalpattu's fastest growing residential and industrial real estate spots.
- Exceptional high long-term land appreciation potential.
`;

// GET leads for the secure Admin CRM
app.get("/api/leads", (req: Request, res: Response) => {
  try {
    const password = req.query.password as string;
    // Basic verification PIN/Password
    if (password !== "SAMEERA2026") {
      res.status(401).json({ error: "Unauthorized access: Invalid admin PIN" });
      return;
    }

    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Failed to read leads data" });
  }
});

// POST new lead submission
app.post("/api/leads", (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, email, preferredPlotSize, budget, preferredVisitDate, message, source } = req.body;

    if (!name || !phoneNumber) {
      res.status(400).json({ error: "Name and Phone Number are required fields" });
      return;
    }

    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);

    const newLead = {
      id: "lead_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name,
      phoneNumber,
      email: email || "",
      preferredPlotSize: preferredPlotSize || "Not Specified",
      budget: budget || "Not Specified",
      preferredVisitDate: preferredVisitDate || "",
      message: message || "",
      submittedAt: new Date().toISOString(),
      source: source || "Website Lead Form",
      status: "New",
      ownerNotes: ""
    };

    leads.push(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

    res.status(201).json({ success: true, lead: newLead });
  } catch (error) {
    res.status(500).json({ error: "Failed to save lead submission" });
  }
});

// POST update lead status or notes
app.post("/api/leads/update", (req: Request, res: Response) => {
  try {
    const { password, id, status, ownerNotes } = req.body;

    if (password !== "SAMEERA2026") {
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);

    const updatedLeads = leads.map((lead: any) => {
      if (lead.id === id) {
        return {
          ...lead,
          status: status || lead.status,
          ownerNotes: ownerNotes !== undefined ? ownerNotes : lead.ownerNotes
        };
      }
      return lead;
    });

    fs.writeFileSync(LEADS_FILE, JSON.stringify(updatedLeads, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead" });
  }
});

// POST chatbot query via Gemini
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Graceful handling when Gemini API key is missing
      res.json({
        text: "Thank you for asking! I am the Sameera Urban Nest Assistant. It looks like my Google Gemini token is being configured, but I can tell you that Sameera Urban Nest is a premium gated community plot project in Athur, Chengalpattu with plots starting from ₹8.4 Lakhs onwards! All lots are DTCP and RERA approved. How can I help you book a site visit today?"
      });
      return;
    }

    // Lazy load or use GoogleGenAI
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `
You are the professional, friendly, and extremely helpful Sameera Urban Nest assistant on the landing page of the real estate project "Sameera Urban Nest in Athur, near Chengalpattu".
Your goal is to build direct trust with prospective buyers, provide complete accurate information, and gently encourage them to book a site visit or submit their contact details so our executive can call back.

Here is the exact verified factual knowledge about Sameera Urban Nest:
${PROJECT_KNOWLEDGE}

Rules to live by:
1. Always be professional, humble, objective and helpful. Keep responses relatively brief (2-4 sentences max per reply, or a clean bullet list).
2. NEVER lie or make up rumors about the project. Do not make claims that are not in the specifications.
3. Keep the tonality trustworthy, clean, and focus on DTCP and RERA approvals (TN/35/Layout/1382/2025) which proves 100% legal clearance.
4. When talking about prices, mention that plots start from just ₹8.4 Lakhs onwards and bank loans are easily available up to 70-80% from leading banks. Ready for booking and registration right now.
5. If the visitor expresses direct interest, politely prompt them to submit their name and phone number on our online form, or tell them they can plug their numbers in the sidebar or direct WhatsApp link to secure an appointment.
6. Absolutely do NOT use any generic corporate jargon or exaggerated hype (like "best investment in India", "guaranteed million dollar ROI", etc.). Focus purely on realistic appreciation and family comfort.
`;

    // Map conversation array to the system's simple prompt or chats API
    // Since we are using standard generateContent for statelessness or we can use chat api:
    // Let's formatting input messages nicely for the conversation.
    const lastUserMessage = messages[messages.length - 1];
    const prompt = lastUserMessage.text;

    // To preserve previous chat context within standard generateContent content, we can build a simple prompt:
    let formattedContext = "History of conversation:\n";
    messages.slice(0, -1).forEach((msg: any) => {
      const speaker = msg.role === "user" ? "Buyer" : "Agent";
      formattedContext += `${speaker}: ${msg.text}\n`;
    });
    formattedContext += `Current prompt from Buyer: ${prompt}\n\nPlease reply as Sameera Assistant. Do not break character. Do not use markdown headers like h1, h2, but use bullet lists if helpful.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContext,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chatbot API error:", error);
    res.status(500).json({ error: "Something went wrong during processing", details: error.message });
  }
});

// Configure Vite and static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sameera Urban Nest Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
