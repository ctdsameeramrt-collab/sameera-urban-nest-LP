/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Check, Loader, Phone, MessageSquare, Download, Calendar } from "lucide-react";

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  sourceType?: string; // e.g. "Hero Banner", "Inquire Banner", "Footer", etc.
  onSuccessSubmit?: () => void;
  variant?: "standard" | "compact" | "dark";
}

export default function LeadForm({
  title = "Register Your Immediate Interest",
  subtitle = "Our dedicated Senior Executive will contact you in 15 minutes with dynamic pricing lists, clear title checks, and plot layout options.",
  buttonLabel = "Request Call Back & PDF Brochure",
  sourceType = "Inline Lead Form",
  onSuccessSubmit,
  variant = "standard"
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plotSize, setPlotSize] = useState("1200 Sq.Ft");
  const [budget, setBudget] = useState("₹15 Lakhs to ₹20 Lakhs");
  const [visitDate, setVisitDate] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage("Please enter both your Name and active Phone Number.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          phoneNumber: phone.trim(),
          email: email.trim(),
          preferredPlotSize: plotSize,
          budget: budget,
          preferredVisitDate: visitDate,
          message: message.trim(),
          source: sourceType
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsDone(true);
        setName("");
        setPhone("");
        setEmail("");
        setVisitDate("");
        setMessage("");

        if (onSuccessSubmit) {
          onSuccessSubmit();
        }
      } else {
        setErrorMessage(data.error || "Failed to submit lead. Please try again.");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      setErrorMessage("Network connection timed out. Please try again or click WhatsApp to chat direct.");
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-2xl transition shadow-xl p-6 md:p-8 border ${
        isDark
          ? "bg-stone-900 border-stone-800 text-white"
          : "bg-white border-stone-100 text-stone-900"
      }`}
    >
      {isDone ? (
        <div className="text-center py-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-200">
            <Check className="h-7 w-7 stroke-[3]" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-emerald-800 font-sans">
            Enquiry Registered Successfully!
          </h3>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed max-w-sm mx-auto">
            Thank you for choosing <strong>Sameera Urban Nest</strong>. A senior investment advisor from Creative Township Developers has been assigned to you.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col md:flex-row items-center justify-between text-left gap-4 max-w-md mx-auto">
            <div>
              <p className="text-[10px] text-emerald-800 font-mono font-bold uppercase tracking-wider">
                Instant Action
              </p>
              <h4 className="text-xs font-semibold text-emerald-900">
                Want immediate responses over WhatsApp?
              </h4>
            </div>
            <a
              href="https://wa.me/919940424564?text=Hi,%20I'm%2520the%2520lead%2520you%2520received.%2520Please%2520send%2520me%2520Sameera%2520Urban%2520Nest%2520price%252520list."
              target="_blank"
              referrerPolicy="no-referrer"
              className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center space-x-1.5 hover:bg-emerald-750 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
              <span>Connect Executive</span>
            </a>
          </div>

          <button
            onClick={() => setIsDone(false)}
            className="mt-6 text-xs text-stone-400 hover:text-stone-600 underline cursor-pointer"
          >
            Submit another query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <h3 className={`text-lg md:text-xl font-bold tracking-tight ${isDark ? "text-amber-400 font-serif" : "text-emerald-900 font-serif"}`}>
              {title}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? "text-stone-300" : "text-stone-500"}`}>
              {subtitle}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          <div className="space-y-3.5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-stone-300" : "text-stone-600"}`}>
                Your Name <span className="text-amber-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Ramesh Kumar"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-stone-800 border-stone-700 text-white focus:ring-amber-500"
                    : "bg-stone-50 border-stone-250 text-stone-900 focus:ring-emerald-800"
                } border`}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-stone-300" : "text-stone-600"}`}>
                Mobile Number <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-sm text-stone-400 font-medium">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className={`w-full pl-12 pr-4 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
                    isDark
                      ? "bg-stone-800 border-stone-700 text-white focus:ring-amber-500"
                      : "bg-stone-50 border-stone-250 text-stone-900 focus:ring-emerald-800"
                  } border`}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-stone-300" : "text-stone-600"}`}>
                Email Address (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: ramesh@mail.com"
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-stone-800 border-stone-700 text-white focus:ring-amber-500"
                    : "bg-stone-50 border-stone-250 text-stone-900 focus:ring-emerald-800"
                } border`}
              />
            </div>

            {variant !== "compact" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Preferred Plot Size */}
                <div>
                  <label htmlFor="plot-size" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-stone-300" : "text-stone-600"}`}>
                    Preferred Size
                  </label>
                  <select
                    id="plot-size"
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
                      isDark
                        ? "bg-stone-800 border-stone-700 text-white focus:ring-amber-500"
                        : "bg-stone-50 border-stone-250 text-stone-900 focus:ring-emerald-800"
                    } border`}
                  >
                    <option value="600 Sq.Ft">600 Sq.Ft (Starts ₹8.4L)</option>
                    <option value="800 Sq.Ft">800 Sq.Ft</option>
                    <option value="900 Sq.Ft">900 Sq.Ft</option>
                    <option value="1200 Sq.Ft">1200 Sq.Ft (Standard)</option>
                    <option value="1500 Sq.Ft">1500 Sq.Ft</option>
                    <option value="1800 Sq.Ft">1800 Sq.Ft</option>
                    <option value="2400 Sq.Ft">2400 Sq.Ft (Premium)</option>
                    <option value="All Sizes">All Sizes / Multiple Plots</option>
                  </select>
                </div>

                {/* Budget Selection */}
                <div>
                  <label htmlFor="budget" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-stone-300" : "text-stone-600"}`}>
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
                      isDark
                        ? "bg-stone-800 border-stone-700 text-white focus:ring-amber-500"
                        : "bg-stone-50 border-stone-250 text-stone-900 focus:ring-emerald-800"
                    } border`}
                  >
                    <option value="₹8.4 Lakhs to ₹15 Lakhs">₹8.4 Lakhs – ₹15 Lakhs</option>
                    <option value="₹15 Lakhs to ₹20 Lakhs">₹15 Lakhs – ₹20 Lakhs</option>
                    <option value="₹20 Lakhs to ₹30 Lakhs">₹20 Lakhs – ₹30 Lakhs</option>
                    <option value="₹30 Lakhs to ₹40 Lakhs">₹30 Lakhs – ₹40 Lakhs</option>
                    <option value="₹40 Lakhs+">₹40 Lakhs+ / Mega Gated Block</option>
                  </select>
                </div>
              </div>
            )}

            {variant !== "compact" && (
              <div>
                <label htmlFor="visit-date" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-stone-300" : "text-stone-600"} flex items-center space-x-1`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Preferred Site Visit Date (Optional)</span>
                </label>
                <input
                  id="visit-date"
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
                    isDark
                      ? "bg-stone-800 border-stone-700 text-white focus:ring-amber-500"
                      : "bg-stone-50 border-stone-250 text-stone-900 focus:ring-emerald-800"
                  } border`}
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  💡 We arrange free physical site pick-up and drop for families nearby Chengalpattu limits.
                </p>
              </div>
            )}

            {/* Optional Short message */}
            {variant === "standard" && (
              <div>
                <label htmlFor="notes" className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-stone-300" : "text-stone-600"}`}>
                  Short Message or Queries
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about corner premium, bank approvals, legal check or documentation..."
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 ${
                    isDark
                      ? "bg-stone-800 border-stone-700 text-white focus:ring-amber-500"
                      : "bg-stone-50 border-stone-250 text-stone-900 focus:ring-emerald-800"
                  } border`}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-xl text-sm font-bold tracking-wide shadow-md transition-all flex items-center justify-center space-x-2 border cursor-pointer hover:scale-[1.01] ${
              isLoading
                ? "bg-stone-200 text-stone-400 cursor-not-allowed border-stone-300"
                : isDark
                ? "bg-amber-400 text-stone-900 hover:bg-amber-500 border-amber-300 font-sans"
                : "bg-emerald-900 text-white hover:bg-emerald-800 border-emerald-950 font-sans"
            }`}
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-300 fill-transparent stroke-white" />
                <span>{buttonLabel}</span>
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-stone-400">
            🔒 Safe with us. No external spam calling. Registered under DTCP / RERA TN/35/Layout/1382/2025.
          </p>
        </form>
      )}
    </div>
  );
}
