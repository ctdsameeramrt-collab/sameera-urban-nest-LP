/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlotSizeInfo {
  size: string; // e.g. "600 Sq.Ft"
  dimensions?: string; // e.g. "20 x 30"
  startingPrice: string; // e.g. "₹8.4 Lakhs"
  estimatedEMI?: string; // e.g. "₹6,500/month"
  suitability: string[]; // e.g. ["Investment", "Compact Home"]
  status: "Available" | "Filling Fast" | "Sold Out";
}

export interface AmenityInfo {
  id: string;
  name: string;
  category: "Safety" | "Infrastructure" | "Leisure" | "Eco";
  description: string;
  iconName: string;
}

export interface LocationAdvantageInfo {
  landmark: string;
  distance: string;
  duration: string;
  category: "Schools" | "Colleges" | "Healthcare" | "Employment" | "Connectivity" | "Shopping";
}

export interface LeadSubmission {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  preferredPlotSize: string;
  budget: string;
  preferredVisitDate: string;
  message?: string;
  submittedAt: string;
  source: string; // "Hero Form" | "Floating Widget" | "Gallery Card" | "AI Chatbot"
  status: "New" | "Contacted" | "Visit Scheduled" | "Booked" | "Not Interested";
  ownerNotes?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
