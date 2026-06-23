/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { Shield, RefreshCw, Phone, Download, Search, CheckCircle, Clock, Calendar, Bookmark, Eye, EyeOff, Save, Trash, Smile } from "lucide-react";
import { LeadSubmission } from "../types";

interface AdminCRMProps {
  onClose: () => void;
  adminPin: string;
  setAdminPin: (pin: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

export default function AdminCRM({ onClose, adminPin, setAdminPin, isLoggedIn, setIsLoggedIn }: AdminCRMProps) {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [editingStatus, setEditingStatus] = useState<LeadSubmission["status"]>("New");
  const [updating, setUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch leads of the server-side JSON database
  const fetchLeads = async (pinValue: string) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(`/api/leads?password=${pinValue}`);
      const data = await response.json();
      if (response.ok) {
        setLeads(data);
        setIsLoggedIn(true);
      } else {
        setErrorMessage(data.error || "Failed to authenticate dashboard.");
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Fetch leads error:", err);
      setErrorMessage("Could not connect to database server. Please verify connections.");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && adminPin === "SAMEERA2026") {
      fetchLeads(adminPin);
    }
  }, [isLoggedIn]);

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (adminPin === "SAMEERA2026") {
      fetchLeads(adminPin);
    } else {
      setErrorMessage("Invalid access code. Please check with CTD Management.");
    }
  };

  const handleUpdateLead = async (leadId: string) => {
    setUpdating(true);
    try {
      const response = await fetch("/api/leads/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: adminPin,
          id: leadId,
          status: editingStatus,
          ownerNotes: editingNotes
        })
      });

      if (response.ok) {
        // Refresh local items list
        const updated = leads.map(l => {
          if (l.id === leadId) {
            return { ...l, status: editingStatus, ownerNotes: editingNotes };
          }
          return l;
        });
        setLeads(updated);
        // Find again
        const fresh = updated.find(l => l.id === leadId);
        if (fresh) setSelectedLead(fresh);

        alert("Lead status and client notes updated successfully.");
      } else {
        alert("Failed to save changes. Try checking credentials.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating lead details.");
    } finally {
      setUpdating(false);
    }
  };

  // Export Leads to CSV file format
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = ["ID", "Name", "Phone", "Email", "Plot Size", "Budget", "Site Visit Date", "Message", "Source", "Status", "Submission Time", "Owner Notes"];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phoneNumber}"`,
      `"${l.email}"`,
      `"${l.preferredPlotSize}"`,
      `"${l.budget}"`,
      `"${l.preferredVisitDate || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.source}"`,
      l.status,
      l.submittedAt,
      `"${(l.ownerNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Sameera_Urban_Nest_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simple statistics
  const totalLeadsCount = leads.length;
  const newCount = leads.filter(l => l.status === "New").length;
  const visitScheduledCount = leads.filter(l => l.status === "Visit Scheduled").length;
  const bookedCount = leads.filter(l => l.status === "Booked").length;
  const contactedCount = leads.filter(l => l.status === "Contacted").length;

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phoneNumber.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.preferredPlotSize.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 font-sans pb-16">
      {/* Top Banner Navigation */}
      <div className="bg-emerald-900 text-white py-4 px-4 sm:px-6 shadow-md border-b border-amber-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-800 rounded-lg text-amber-300 border border-emerald-700">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Sameera Urban Nest</h1>
              <p className="text-xs text-stone-300 uppercase tracking-wider font-semibold font-mono">
                Creative Township Developers Lead Management System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-750 text-stone-200 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition border border-emerald-750"
          >
            Back to Website
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {!isLoggedIn ? (
          /* Secure Admin PIN Login Form */
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-stone-200 mt-16">
            <div className="text-center mb-6">
              <div className="mx-auto h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-3 border border-amber-200">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900">Developer CRM Login</h2>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Sameera Urban Nest client registration base. Access is restricted to authorized marketing officials only.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Access Pin / Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter SAMEERA2026 to unlock"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-emerald-800 font-medium mt-1">
                  💡 Hint: Standard developer development code is <strong>SAMEERA2026</strong>. Use it to check database mockups in the system.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 text-xs rounded-xl">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-950 text-white rounded-xl text-sm font-semibold tracking-wide hover:bg-emerald-900 shadow transition flex items-center justify-center space-x-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Open Leads Dashboard</span>}
              </button>
            </form>
          </div>
        ) : (
          /* Locked Admin Active Dashboard */
          <div className="space-y-6">
            {/* KPI Cards Board */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 padding p-4 flex flex-col justify-between">
                <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  Total Leads
                </p>
                <h3 className="text-3xl font-bold font-sans text-stone-900 mt-1">{totalLeadsCount}</h3>
                <span className="text-[10px] text-emerald-800 font-medium mt-1">From all live widgets</span>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-stone-200 padding p-4 flex flex-col justify-between">
                <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  New Submissions
                </p>
                <h3 className="text-3xl font-bold font-sans text-amber-600 mt-1">{newCount}</h3>
                <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full w-max text-center mt-1 font-semibold">
                  Needs Contact
                </span>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-stone-200 padding p-4 flex flex-col justify-between">
                <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  Contacted Leads
                </p>
                <h3 className="text-3xl font-bold font-sans text-sky-800 mt-1">{contactedCount}</h3>
                <span className="text-[10px] text-stone-500 mt-1">First-call discussions</span>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-stone-200 padding p-4 flex flex-col justify-between">
                <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  Site Visits Booked
                </p>
                <h3 className="text-3xl font-bold font-sans text-purple-800 mt-1">{visitScheduledCount}</h3>
                <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-full w-max mt-1 font-semibold">
                  Scheduled Visits
                </span>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-stone-200 padding p-4 flex flex-col justify-between col-span-2 md:col-span-1">
                <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  Gated Site Bookings
                </p>
                <h3 className="text-3xl font-bold font-sans text-emerald-800 mt-1">{bookedCount}</h3>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full w-max mt-1 font-semibold flex items-center space-x-1">
                  <Smile className="w-3 h-3 fill-emerald-100" />
                  <span>Success Rate</span>
                </span>
              </div>
            </div>

            {/* Filter and Utility Bar */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {/* Search Text Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, email..."
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 text-xs text-stone-850"
                  />
                </div>

                {/* Filter Selector */}
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <span className="text-xs text-stone-500 whitespace-nowrap">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto text-xs py-2 px-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 text-stone-850 font-medium"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New (Pending)</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visit Scheduled">Visit Scheduled</option>
                    <option value="Booked">Booked Plots</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>
                </div>
              </div>

              {/* CSV Download & Sync */}
              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => fetchLeads(adminPin)}
                  className="p-2.5 text-stone-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition border border-stone-200 hover:border-emerald-200 tooltip"
                  title="Reload dynamic lists data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center space-x-2 bg-emerald-900 text-white rounded-xl px-4 py-2 hover:bg-emerald-800 text-xs font-semibold tracking-wide shadow transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Leads CSV</span>
                </button>
              </div>
            </div>

            {/* Split Lead List Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Side: Submissions List */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                  <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wider font-mono">
                    Captured Records ({filteredLeads.length})
                  </h4>
                  <p className="text-xs text-stone-500">Sorted by newest incoming submissions</p>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 text-stone-400">
                    <p className="text-sm">No lead submissions found matching your search.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("All");
                      }}
                      className="mt-3 text-xs text-emerald-800 underline uppercase tracking-wider font-bold"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 max-h-[550px] overflow-y-auto">
                    {filteredLeads.map((lead) => {
                      const submissionDate = new Date(lead.submittedAt);
                      const displayTime = submissionDate.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      });

                      // Status CSS Pill
                      let statusBadge = "bg-amber-100 text-amber-900";
                      if (lead.status === "Booked") statusBadge = "bg-green-100 text-green-900";
                      if (lead.status === "Visit Scheduled") statusBadge = "bg-purple-100 text-purple-900 font-semibold";
                      if (lead.status === "Contacted") statusBadge = "bg-sky-100 text-sky-900";
                      if (lead.status === "Not Interested") statusBadge = "bg-stone-100 text-stone-500";

                      const isActive = selectedLead?.id === lead.id;

                      return (
                        <div
                          key={lead.id}
                          onClick={() => {
                            setSelectedLead(lead);
                            setEditingNotes(lead.ownerNotes || "");
                            setEditingStatus(lead.status);
                          }}
                          className={`p-4 sm:p-5 transition cursor-pointer text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 ${
                            isActive
                              ? "bg-emerald-50 border-l-emerald-800"
                              : "hover:bg-stone-50 border-l-transparent"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm text-stone-900">{lead.name}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono text-center shrink-0 uppercase tracking-wider font-bold ${statusBadge}`}>
                                {lead.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                              <span>📞 +91 {lead.phoneNumber}</span>
                              {lead.email && <span className="hidden sm:inline">✉️ {lead.email}</span>}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                                Plot: {lead.preferredPlotSize}
                              </span>
                              <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                                Budget: {lead.budget}
                              </span>
                              <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-100 px-2 py-0.5 rounded font-mono font-bold">
                                Source: {lead.source}
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex flex-col items-start sm:items-end font-mono">
                            <span className="text-[10px] text-stone-400">{displayTime}</span>
                            {lead.preferredVisitDate && (
                              <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100 mt-1">
                                Visit: {lead.preferredVisitDate}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Side: Specific Lead Operations Inspector */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 space-y-4 text-left">
                <div className="border-b border-stone-100 pb-3">
                  <h4 className="text-xs font-bold text-stone-450 uppercase tracking-widest font-mono">
                    Owner CRM Inspector
                  </h4>
                  <p className="text-lg font-bold text-emerald-900 font-serif">
                    Client Details
                  </p>
                </div>

                {selectedLead ? (
                  <div className="space-y-4">
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-2">
                      <p className="text-xs text-stone-500">Full Name</p>
                      <h3 className="text-base font-bold text-stone-900">{selectedLead.name}</h3>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500">Phone</p>
                          <a
                            href={`tel:+91${selectedLead.phoneNumber}`}
                            className="text-xs font-bold font-sans text-emerald-800 hover:underline block"
                          >
                            +91 {selectedLead.phoneNumber}
                          </a>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-mono tracking-wider text-stone-500">Email</p>
                          <p className="text-xs text-stone-800 truncate" title={selectedLead.email}>
                            {selectedLead.email || "No Email Given"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-stone-500">Incoming Message: </span>
                        <p className="italic text-stone-750 bg-stone-50 p-3 rounded-lg border leading-relaxed mt-1">
                          {selectedLead.message || "No custom message or inquiry provided."}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div>
                          <span className="text-stone-500 font-mono text-[10px]">VISIT DATE</span>
                          <p className="font-semibold">{selectedLead.preferredVisitDate || "Not booked yet"}</p>
                        </div>
                        <div>
                          <span className="text-stone-500 font-mono text-[10px]">TIME RECEIVED</span>
                          <p className="text-[10px] text-stone-600 truncate">
                            {new Date(selectedLead.submittedAt).toLocaleTimeString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Operational controls */}
                    <div className="border-t border-stone-100 pt-4 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-650 uppercase tracking-wider mb-1">
                          Update Deal Status
                        </label>
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value as LeadSubmission["status"])}
                          className="w-full text-xs py-2.5 px-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 font-medium"
                        >
                          <option value="New">New Lead Prospect</option>
                          <option value="Contacted">Contacted via Executive</option>
                          <option value="Visit Scheduled">Visit Scheduled / Pick-up Ready</option>
                          <option value="Booked">Plot Reserved / Booked!</option>
                          <option value="Not Interested">Not Interested/Low Budget</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-650 uppercase tracking-wider mb-1">
                          Client Interaction Notes (Private log)
                        </label>
                        <textarea
                          rows={3}
                          value={editingNotes}
                          onChange={(e) => setEditingNotes(e.target.value)}
                          placeholder="Log call discussion, loan eligibility, corner preferences, plot choices, or token amount details..."
                          className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 leading-relaxed text-stone-850"
                        />
                      </div>

                      <button
                        onClick={() => handleUpdateLead(selectedLead.id)}
                        disabled={updating}
                        className="w-full bg-emerald-900 border border-emerald-950 hover:bg-emerald-800 text-white rounded-xl py-2.5 text-xs font-bold tracking-wide transition flex items-center justify-center space-x-1.5 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Update Client Profile</span>
                      </button>

                      <div className="flex gap-2 pt-1 font-sans justify-between text-xs">
                        <a
                          href={`tel:+91${selectedLead.phoneNumber}`}
                          className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg transition border text-center"
                        >
                          ☎️ Callback Now
                        </a>
                        <a
                          href={`https://wa.me/91${selectedLead.phoneNumber}?text=Hi%2520${selectedLead.name},%2520this%2520is%2520Creative%2520Township%2520Developers.%2520You%2520inquired%2520about%2520Sameera%2520Urban%2520Nest%2520plots.`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition text-center"
                        >
                          💬 Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-stone-400">
                    <p className="text-xs">Click on any customer query from the left list to inspect detailed parameters, contact links, update deal status, and logging internal follow-ups.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
