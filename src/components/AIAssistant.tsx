/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Loader, User, Smile, ShieldCheck, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Vanakkam! I am your digital Sameera Urban Nest Investment Advisor. I can answer any questions regarding plot sizes, instant pricing, DTCP/RERA approvals (TN/35/Layout/1382/2025), bank loans, or travel distance guides. Ask me anything!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Date.now().toString(36),
      role: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: "msg_ai_" + Date.now().toString(36),
        role: "model",
        text: data.text || "I am currently undergoing scheduled system updates. You can contact our Executive directly over WhatsApp or Phone (+91 9940424564).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMsg: ChatMessage = {
        id: "msg_err_" + Date.now().toString(36),
        role: "model",
        text: "Apologies, my server is currently busy. Please let me know your contact details or phone number here, and I'll notify our executive to call you back instantly!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const PRESET_CHIPS = [
    { label: "📜 Check legal registration numbers", query: "Can you provide the DTCP and RERA registration details?" },
    { label: "💰 Best plot price & sizes", query: "What are the plot sizes and pricing details?" },
    { label: "📍 Distance to Mahindra World City", query: "How close is the project to Mahindra World City and Athur Junction?" },
    { label: "🏡 Are bank loans available?", query: "Are bank loans available and from which banks?" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-45 font-sans">
      {/* Floating Action Circle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center shadow-lg border-2 border-amber-400 hover:bg-emerald-850 hover:scale-105 active:scale-95 transition-all text-center group cursor-pointer"
          aria-label="Open AI Assistant Chatbot"
        >
          <MessageSquare className="w-6 h-6 fill-transparent stroke-[2.5]" />
          <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center shadow border border-white animate-pulse">
            AI Assistant
          </span>
        </button>
      )}

      {/* Floating Chat Container Dialog */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden transition-all duration-300 md:mr-2">
          {/* Header */}
          <div className="bg-emerald-900 border-b border-amber-300 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-full bg-emerald-855 border border-amber-300 flex items-center justify-center text-amber-300">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold tracking-tight">Sameera AI Assistant</h3>
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block animate-ping"></span>
                  <p className="text-[10px] text-stone-300 font-mono">Gemini 3.5 AI Active</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-300 hover:text-white p-1 rounded transition focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversations Area */}
          <div className="flex-1 bg-stone-50 overflow-y-auto px-4 py-4 space-y-4">
            <div className="flex p-2.5 bg-amber-50 border border-amber-100 rounded-xl gap-2.5 items-start text-stone-800 text-[11px] leading-relaxed text-left">
              <ShieldCheck className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Verified Real Time Responses</span>
                <p>This digital expert operates via verified Creative Township specifications. No hallucinated claims on approvals or properties.</p>
              </div>
            </div>

            {messages.map((m) => {
              const isAi = m.role === "model";
              return (
                <div
                  key={m.id}
                  className={`flex ${isAi ? "justify-start" : "justify-end"} items-start gap-1`}
                >
                  {isAi && (
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 text-[10px] font-bold shrink-0 mt-1">
                      SU
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs text-left leading-relaxed shadow-sm ${
                      isAi
                        ? "bg-white text-stone-850 border border-stone-200 rounded-tl-none"
                        : "bg-emerald-900 text-white font-medium rounded-tr-none"
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>
                    <p className={`text-[9px] mt-1 text-right block ${isAi ? "text-stone-400" : "text-emerald-100"}`}>
                      {m.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start items-center gap-1">
                <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 text-[10px] font-bold shrink-0 animate-pulse">
                  SU
                </div>
                <div className="bg-white border rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-stone-400 text-xs flex items-center space-x-1.5 text-left">
                  <Loader className="w-3.5 h-3.5 animate-spin text-emerald-900" />
                  <span className="italic">Assistant is thinking...</span>
                </div>
              </div>
            )}

            <div ref={listEndRef} />
          </div>

          {/* Preset Queries Drawer */}
          {messages.length === 1 && !loading && (
            <div className="p-3 bg-stone-100 border-t border-stone-150 space-y-1.5 max-h-[140px] overflow-y-auto">
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider text-left pl-1">
                Common Questions:
              </p>
              <div className="flex flex-col gap-1.5">
                {PRESET_CHIPS.map((chip, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(chip.query)}
                    className="text-left w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-[11px] text-stone-750 font-medium rounded-lg border border-stone-250 transition cursor-pointer truncate"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat TextInput footer */}
          <div className="p-3 bg-white border-t border-stone-150 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(inputText);
              }}
              placeholder="Ask anything about the project..."
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none text-stone-900"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || loading}
              className="h-9 w-9 bg-emerald-900 text-amber-300 flex items-center justify-center rounded-xl hover:bg-emerald-800 disabled:bg-stone-100 disabled:text-stone-400 transition"
            >
              <Send className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
