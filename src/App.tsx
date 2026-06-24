/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MessageSquare,
  Shield,
  Activity,
  Check,
  MapPin,
  Trees,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Coins,
  Award,
  Download,
  Compass,
  ChevronDown,
  Calendar,
  DollarSign,
  Maximize,
  X,
  ExternalLink,
  FileText,
  User,
  Heart,
  HelpCircle,
  Clock,
  ArrowRight,
  Sun // <-- Add this back if you are using it!
} from "lucide-react";

import Header from "./components/Header";
import LeadForm from "./components/LeadForm";
import AdminCRM from "./components/AdminCRM";
import AIAssistant from "./components/AIAssistant";
import { PlotSizeInfo, AmenityInfo, LocationAdvantageInfo } from "./types";

// Images generated previously:
const HERO_BANNER_IMG = "/src/assets/images/hero_banner_gated_1782134793578.jpg";
const COMMUNITY_ROADS_IMG = "/src/assets/images/community_roads_1782134812528.jpg";

// Plot sizes list with metrics
const PLOT_SIZES: PlotSizeInfo[] = [
  {
    size: "600 Sq.Ft",
    dimensions: "20 x 30 Ft",
    startingPrice: "₹8.4 Lakhs",
    estimatedEMI: "₹6,500/month",
    suitability: ["Investor Entry", "Studio Micro-House"],
    status: "Filling Fast"
  },
  {
    size: "800 Sq.Ft",
    dimensions: "20 x 40 Ft",
    startingPrice: "₹11.2 Lakhs",
    estimatedEMI: "₹8,700/month",
    suitability: ["Compact 2 BHK Family Home", "High Liquidity Investment"],
    status: "Available"
  },
  {
    size: "900 Sq.Ft",
    dimensions: "25 x 36 Ft",
    startingPrice: "₹12.6 Lakhs",
    estimatedEMI: "₹9,800/month",
    suitability: ["Standard Family Duplex", "Retirement Cottage"],
    status: "Available"
  },
  {
    size: "1200 Sq.Ft",
    dimensions: "30 x 40 Ft",
    startingPrice: "₹16.8 Lakhs",
    estimatedEMI: "₹13,100/month",
    suitability: ["Comfortable 3 BHK Villa", "Self-Designed House", "Best Seller Choice"],
    status: "Filling Fast"
  },
  {
    size: "1500 Sq.Ft",
    dimensions: "30 h 50 Ft",
    startingPrice: "₹21.0 Lakhs",
    estimatedEMI: "₹16,300/month",
    suitability: ["Premium Large Villa", "Multi-Generation Home"],
    status: "Available"
  },
  {
    size: "1800 Sq.Ft",
    dimensions: "36 x 50 Ft",
    startingPrice: "₹25.2 Lakhs",
    estimatedEMI: "₹19,600/month",
    suitability: ["Luxury Residential Block", "Spacious Garden Duplex"],
    status: "Available"
  },
  {
    size: "2400 Sq.Ft",
    dimensions: "40 x 60 Ft",
    startingPrice: "₹33.6 Lakhs",
    estimatedEMI: "₹26,100/month",
    suitability: ["Grand Multi-Family Block", "Elite Plot Estate"],
    status: "Sold Out"
  }
];

// Rich custom amenities with category separation
const AMENITIES_LIST: AmenityInfo[] = [
  {
    id: "security",
    name: "24x7 Smart Security",
    category: "Safety",
    description: "Highly secure gated community boundaries with premium entry archway checkpoint and guard logs.",
    iconName: "Shield"
  },
  {
    id: "roads",
    name: "Wide Blacktop Roads",
    category: "Infrastructure",
    description: "Heavy-load structural engineering blacktop internal roads with tidy painted side gutters.",
    iconName: "Activity"
  },
  {
    id: "lights",
    name: "Pathway Street Lights",
    category: "Infrastructure",
    description: "Equidistant smart street lights placed across all plot sectors and main pathways.",
    iconName: "Sun"
  },
  {
    id: "cctv",
    name: "CCTV Surveillance",
    category: "Safety",
    description: "Round the clock automated digital security recording covering junctions and community entries.",
    iconName: "Eye"
  },
  {
    id: "play",
    name: "Children's Playground",
    category: "Leisure",
    description: "Safe dedicated kid-friendly landscape sandbox area with durable play slides and activity swings.",
    iconName: "Smile"
  },
  {
    id: "gardens",
    name: "Lush Botanic Gardens",
    category: "Eco",
    description: "Lush green oxygenated community lawns with ambient walking pathways and relaxation seating.",
    iconName: "Trees"
  },
  {
    id: "avenue",
    name: "Shedding Avenue Trees",
    category: "Eco",
    description: "Neatly planted lines of shading and flowering trees framing layout roads.",
    iconName: "Trees"
  },
  {
    id: "water",
    name: "Community RO Water",
    category: "Infrastructure",
    description: "Access to onsite RO water purifying systems ensuring clean, filtered drinking water.",
    iconName: "Droplet"
  },
  {
    id: "drainage",
    name: "Water Disposal System",
    category: "Infrastructure",
    description: "Heavy rainfall-proof channels to discharge layout sewage cleanly and avoid water logs.",
    iconName: "Activity"
  },
  {
    id: "vastu",
    name: "100% Vastu Compliant Layout",
    category: "Eco",
    description: "Every plot boundary is aligned precisely with traditional Vastu parameters for positive cosmic energy.",
    iconName: "Compass"
  }
];

// Complete Location Travel times and landmarks
const CONNECTIVITY_LANDMARKS: LocationAdvantageInfo[] = [
  { landmark: "Athur Junction", distance: "1.8 km", duration: "4 mins", category: "Connectivity" },
  { landmark: "GST Road (NH45)", distance: "3.5 km", duration: "7 mins", category: "Connectivity" },
  { landmark: "Chengalpattu Railway Station", distance: "4.8 km", duration: "9 mins", category: "Connectivity" },
  { landmark: "Brindhavanam School", distance: "0.2 km", duration: "2 mins walk", category: "Schools" },
  { landmark: "Maharishi Vidya Mandir School", distance: "2.0 km", duration: "5 mins", category: "Schools" },
  { landmark: "Pattammal Alagesan College", distance: "1.6 km", duration: "4 mins", category: "Colleges" },
  { landmark: "Chennai Amirtha College", distance: "3.2 km", duration: "6 mins", category: "Colleges" },
  { landmark: "SRM University Campus", distance: "23.0 km", duration: "25 mins", category: "Colleges" },
  { landmark: "SRM General Hospital", distance: "23.0 km", duration: "25 mins", category: "Healthcare" },
  { landmark: "Chengalpattu Municipal Hospital", distance: "5.2 km", duration: "10 mins", category: "Healthcare" },
  { landmark: "Mahindra World City (IT Hub)", distance: "9.5 km", duration: "14 mins", category: "Employment" },
  { landmark: "Renault Nissan Automotive Hub", distance: "12.0 km", duration: "18 mins", category: "Employment" },
  { landmark: "Rahamath Shopping Mall", distance: "4.5 km", duration: "8 mins", category: "Shopping" }
];

// Selected 16 FAQs for deep SEO and CRO authority
const FAQ_DATA = [
  {
    question: "Where is Sameera Urban Nest located exactly?",
    answer: "Sameera Urban Nest is located at Athur, near the Chengalpattu-Kanchipuram State Highway, less than 1.8 km from Athur Junction and approximately 4.8 km from Chengalpattu Railway Station. It is very close to GST Road (NH45), providing fast, direct highway transport to Chennai and manufacturing hubs."
  },
  {
    question: "Is Sameera Urban Nest DTCP and RERA approved?",
    answer: "Yes, 100%. The project has received premium approvals from DTCP (Directorate of Town and Country Planning) and Tamil Nadu RERA. The RERA Registration Number is TN/35/Layout/1382/2025. This guarantees clear legal framework, clean titles, and fully documented layout engineering."
  },
  {
    question: "What are the plot sizes available in the layout?",
    answer: "We offer diverse plot sizes to fit all budgets: 600 Sq.Ft, 800 Sq.Ft, 900 Sq.Ft, 1200 Sq.Ft (the most popular standard size), 1500 Sq.Ft, 1800 Sq.Ft, and 2400 Sq.Ft."
  },
  {
    question: "What is the per Sq.Ft price and starting price for a plot?",
    answer: "Our plotting price is highly competitive, ranging from ₹1,400 to ₹1,500 per Sq.Ft depending on corner orientation and premium location. The starting price for a compact 600 Sq.Ft plot begins at just ₹8.4 Lakhs onwards."
  },
  {
    question: "Are bank loans available for Sameera Urban Nest?",
    answer: "Yes, since the project is DTCP and RERA approved with multiple cleared titles, major nationalized and private banks (including SBI, HDFC, LIC, ICICI, etc.) offer streamlined plot loans up to 70% to 80% of the property value, subject to standard customer eligibility checks."
  },
  {
    question: "Can I start construction on my plot immediately?",
    answer: "Absolutely! The project layout is completely ready to build. We have wide operational blacktop roads, street lighting, community RO water links, and fully secure boundaries already established at the site, so you can register your plot and start building your villa immediately."
  },
  {
    question: "Who is the developer of this community?",
    answer: "The project is developed by Creative Township Developers, a highly reputed developer brand in Tamil Nadu known for creating well-planned community plotting, transparent legal documentation, and on-time infrastructure hand-overs."
  },
  {
    question: "Is there proper 100% Vastu compliance?",
    answer: "Yes, the complete master layout and block separation of Sameera Urban Nest are engineered 100% in compliance with Vastu guidelines to promote happiness, success, and positive cosmic energy for families building homes."
  },
  {
    question: "How close is the community to schools and colleges?",
    answer: "Brindhavanam School is located at walking distance (0.2 km), RLT and St. Paul schools are very close, and Maharishi Vidya Mandir is just 2 km away. Pattammal Alagesan College is just 1.6 km, Chennai Amirtha is 3.2 km, and SRM University is located 23 km via GST Road."
  },
  {
    question: "Are there good employment corridors nearby?",
    answer: "Sameera Urban Nest is situated in an expanding manufacturing and industrial corridor. The massive Mahindra World City (MWC) IT & industrial hub is only 9.5 km away, Renault Nissan plant is 12 km, and multiple premium engineering and logistics corridors are within 15 minutes commute."
  },
  {
    question: "How are the internal roads built?",
    answer: "All internal roads are wide, durable blacktop structures engineered with proper underbase compaction, curbs, and dedicated storm water drain lines to withstand rainfall and provide premium driving comfort."
  },
  {
    question: "What is the source of water inside the layout?",
    answer: "The groundwater in the Athur-Chengalpattu region is sweet and highly abundant. In addition to high levels of direct water access on each plot, a dedicated community RO Water Purifier station is provided within the community."
  },
  {
    question: "What physical security systems are available?",
    answer: "The gated community operates with 24x7 security guards stationed at the grand entrance archway, visitor log books, fully walled community parameters, and high-resolution CCTV camera surveillance at important locations."
  },
  {
    question: "Is there any registration and paperwork assistance provided?",
    answer: "Yes, Creative Township Developers has a dedicated legal and customer desk. We will arrange and manage all documentation, title checking, bank loan approvals, and stamp paper processing, making registration at the Chengalpattu Registrar Office completely frictionless for you."
  },
  {
    question: "Are families already living nearby or is it an isolated forest?",
    answer: "Athur is a booming residential and academic hub in Chengalpattu with schools, local markets, shops, and hundreds of families residing adjacent to the property. It is safe, active, and enjoys direct local bus/tempo links to Chengalpattu town."
  },
  {
    question: "How do I book a site visit? Is it free?",
    answer: "Yes, absolutely! We configure free physical site visits for interested buyers. We can arrange a comfortable pickup and drop service from nearby railway hubs or Chengalpattu locations for you and your family. Simply submit your contact details on our website form, call us at +91 9940424564, or tap the WhatsApp button to secure your convenient slot today!"
  }
];

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefSize, setBookingPrefSize] = useState("1200 Sq.Ft");
  const [activeFAQTab, setActiveFAQTab] = useState<number | null>(null);

  // Gallery view and lightboxes
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Interactive Plot Selector variables
  const [selectedSimPlot, setSelectedSimPlot] = useState<{
    id: number;
    size: string;
    facing: "North" | "East" | "South" | "West";
    status: "Available" | "Reserved";
    premium: boolean;
  } | null>({
    id: 114,
    size: "1200 Sq.Ft",
    facing: "East",
    status: "Available",
    premium: true
  });

  const SIMULATED_PLOTS = [
    { id: 18, size: "600 Sq.Ft", facing: "East", status: "Available", premium: false },
    { id: 45, size: "800 Sq.Ft", facing: "North", status: "Available", premium: false },
    { id: 74, size: "900 Sq.Ft", facing: "West", status: "Available", premium: false },
    { id: 108, size: "1200 Sq.Ft", facing: "North", status: "Available", premium: true },
    { id: 114, size: "1200 Sq.Ft", facing: "East", status: "Available", premium: true },
    { id: 135, size: "1500 Sq.Ft", facing: "South", status: "Available", premium: false },
    { id: 182, size: "1800 Sq.Ft", facing: "East", status: "Available", premium: true },
    { id: 211, size: "2400 Sq.Ft", facing: "West", status: "Reserved", premium: true },
    { id: 240, size: "1200 Sq.Ft", facing: "North", status: "Available", premium: false },
    { id: 265, size: "600 Sq.Ft", facing: "South", status: "Available", premium: false }
  ];

  const handleOpenBookingModal = (prefSize = "1200 Sq.Ft") => {
    setBookingPrefSize(prefSize);
    setIsBookingOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminPin("");
    setIsAdminOpen(false);
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans selection:bg-emerald-900 selection:text-white">
      {/* Dynamic Header Navbar */}
      <Header
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBooking={() => handleOpenBookingModal()}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
      />

      <AnimatePresence mode="wait">
        {isAdminOpen ? (
          /* Secure CRM dashboard (shown full screen when toggled) */
          <motion.div
            key="crm-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="pt-16"
          >
            <AdminCRM
              onClose={() => setIsAdminOpen(false)}
              adminPin={adminPin}
              setAdminPin={setAdminPin}
              isLoggedIn={isAdminLoggedIn}
              setIsLoggedIn={setIsAdminLoggedIn}
            />
          </motion.div>
        ) : (
          /* Primary Promotional Webpage */
          <motion.div
            key="property-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 md:pt-24"
          >
            {/* HER0 / INTRO AREA */}
            <section id="home" className="relative bg-stone-100 py-12 md:py-20 overflow-hidden border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column Text & Badges */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center space-x-2 bg-emerald-150 text-emerald-905 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-emerald-200 shadow-sm animate-pulse">
                      <Sparkles className="w-4 h-4 text-emerald-800" />
                      <span>Premium Residential Community</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-serif font-black tracking-tight text-emerald-950 leading-[1.1]">
                      Secure Gated Community Plots at Athur <br />
                      <span className="text-amber-550 font-sans font-medium italic text-2xl sm:text-3xl md:text-4.5xl block mt-1.5 font-serif">
                        Near Chengalpattu GST Highway
                      </span>
                    </h1>

                    <p className="text-sm md:text-base text-stone-650 max-w-xl leading-relaxed">
                      Invest in premium Gated Community Residential Plots starting from only <strong>₹8.4 Lakhs onwards</strong>. Designed with high-grade wide blacktop roads, smart streetlights, botanic parks, sweet potable water, and 24x7 security protection inside Sameera Urban Nest.
                    </p>

                    {/* Trust badges grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-stone-200 shadow-sm">
                        <Award className="w-5 h-5 text-amber-500 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-stone-900 leading-none">RERA Approved</p>
                          <span className="text-[9px] text-stone-400 font-mono tracking-tighter">TN/35/Layout/1382/2025</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-stone-200 shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-stone-900 leading-none">DTCP Approved</p>
                          <span className="text-[9px] text-stone-500 font-medium">100% Legal Stamp</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-stone-200 shadow-sm">
                        <Activity className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-stone-900 leading-none">Ready To Build</p>
                          <span className="text-[9px] text-stone-400">Instant Construction</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-stone-200 shadow-sm">
                        <Coins className="w-5 h-5 text-emerald-800 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-stone-900 leading-none">Bank Loans</p>
                          <span className="text-[9px] text-emerald-550">SBI, HDFC up to 80%</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Hero Actions button */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => handleOpenBookingModal()}
                        className="bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm px-7 py-3 rounded-xl border-b-4 border-emerald-990 shadow-lg hover:shadow-xl transition flex items-center space-x-2 uppercase tracking-wide cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>Book Site Visit & Cab</span>
                      </button>

                      <a
                        href="tel:+919940424564"
                        className="bg-white hover:bg-stone-100 text-stone-850 font-bold text-sm px-6 py-3 rounded-xl border border-stone-300 shadow-sm transition flex items-center space-x-2"
                      >
                        <Phone className="w-4 h-4 text-emerald-900" />
                        <span>+91 99404 24564</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column Lead Form */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute inset-0 bg-emerald-900/10 blur-2xl rounded-full translate-x-12 translate-y-12"></div>
                    <div className="relative">
                      <LeadForm
                        title="Inquire Current Plots & Offers"
                        subtitle="Fill your details below to instantly download the complete Master layout layout PDF and pricing chart."
                        buttonLabel="Inquire Plot pricing & PDF list"
                        sourceType="Hero Capture Widget"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Angle cutting edge */}
              <div className="absolute bottom-0 right-0 left-0 h-4 bg-stone-50 border-t border-stone-200"></div>
            </section>

            {/* SECTION 2: WHY CHOOSE SAMEERA URBAN NEST */}
            <section id="why-us" className="py-16 md:py-24 bg-white border-b border-stone-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                  <span className="text-amber-500 uppercase font-mono text-xs font-bold tracking-widest pl-1 block">
                    Secured Investment & Future Living
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                    Why Sameera Urban Nest is Plotted Perfection
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Unlike standard sub-divided farmland, Sameera Urban Nest in Athur is designed under premium gated development layouts with DTCP & RERA legal guarantees on clear ownership, making it extremely suitable for families wanting local construction and investors demanding rapid value growth.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  {/* Family benefit block */}
                  <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8 space-y-4 hover:shadow-md transition text-left">
                    <div className="h-12 w-12 rounded-xl bg-emerald-900 flex items-center justify-center text-amber-300 shadow-sm">
                      <Heart className="w-6 h-6 fill-amber-300 text-emerald-900" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 font-serif">
                      Ideal for Cozy Families
                    </h3>
                    <p className="text-xs text-stone-605 leading-relaxed">
                      Surrounded by leading academic schools like Maharishi Vidya Mandir (2km) and colleges, with high sweet water reserves, a children's soft play park, and secure walled parameter protection giving total peace of mind for your kids.
                    </p>
                    <ul className="text-xs text-stone-700 space-y-1.5 font-medium pt-2">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>0.2 km from Brindhavanam School</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>Abundant sweet groundwater</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>24/7 Gate Guard Protection</span>
                      </li>
                    </ul>
                  </div>

                  {/* Investor benefits block */}
                  <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8 space-y-4 hover:shadow-md transition text-left">
                    <div className="h-12 w-12 rounded-xl bg-emerald-900 flex items-center justify-center text-amber-300 shadow-sm">
                      <TrendingUp className="w-6 h-6 text-amber-300" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 font-serif">
                      Built for Serious Plotted Value
                    </h3>
                    <p className="text-xs text-stone-605 leading-relaxed">
                      Located in Chengalpattu's premier industrial and logistics corridor. With land prices growing steadily and Mahindra World City (MWC) nearby hosting hundreds of auto and IT multinationals (Nissan, Renault), high rental and reselling demands are guaranteed.
                    </p>
                    <ul className="text-xs text-stone-700 space-y-1.5 font-medium pt-2">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>Under-value plotting starting ₹8.4L</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>High value land appreciation indices</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>Frictionless resale and liquid asset status</span>
                      </li>
                    </ul>
                  </div>

                  {/* Legal Protection block */}
                  <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8 space-y-4 hover:shadow-md transition text-left">
                    <div className="h-12 w-12 rounded-xl bg-emerald-900 flex items-center justify-center text-amber-300 shadow-sm">
                      <Shield className="w-6 h-6 text-amber-300" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 font-serif">
                      100% Legal Clear-Title Guarantee
                    </h3>
                    <p className="text-xs text-stone-605 leading-relaxed">
                      Never take risks on unapproved agricultural subdivisions. Sameera Urban Nest is fully legal, backed by approved DTCP structural layout parameters, and RERA registration (TN/35/Layout/1382/2025). Instant registrations and leading bank loans are certified.
                    </p>
                    <ul className="text-xs text-stone-700 space-y-1.5 font-medium pt-2">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>RERA Ref: TN/35/Layout/1382/2025</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>Ready pre-approved bank loans desk</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                        <span>Guaranteed 100% clear registration path</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: PROJECT HIGHLIGHTS */}
            <section className="py-16 bg-emerald-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${COMMUNITY_ROADS_IMG})` }}></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="max-w-xl mx-auto mb-12">
                  <p className="text-amber-400 font-mono text-[11px] font-bold uppercase tracking-widest">
                    Quick Key Highlights
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif font-black mt-2">
                    Sameera Urban Nest Space Overview
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
                    <p className="text-amber-400 font-mono text-xs font-bold">11.77 ACRES</p>
                    <h4 className="text-sm font-semibold text-stone-200 mt-2">Master Layout Layout</h4>
                    <span className="text-[10px] text-stone-400 block mt-1">Both premium phases</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
                    <p className="text-amber-400 font-mono text-xs font-bold">270 PLOTS</p>
                    <h4 className="text-sm font-semibold text-stone-200 mt-2">In total</h4>
                    <span className="text-[10px] text-stone-400 block mt-1">Excellent size variety</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
                    <p className="text-amber-400 font-mono text-xs font-bold">600 - 2400</p>
                    <h4 className="text-sm font-semibold text-stone-200 mt-2">Sq.Ft sizing limits</h4>
                    <span className="text-[10px] text-stone-400 block mt-1">Fits all budgets</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
                    <p className="text-amber-400 font-mono text-xs font-bold">₹8.4 LAKHS</p>
                    <h4 className="text-sm font-semibold text-stone-200 mt-2">Starting Price</h4>
                    <span className="text-[10px] text-stone-400 block mt-1">Highly affordable plots</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
                    <p className="text-amber-400 font-mono text-xs font-bold">READY TO BUILD</p>
                    <h4 className="text-sm font-semibold text-stone-200 mt-2">Immediate status</h4>
                    <span className="text-[10px] text-stone-400 block mt-1">Paved blacktop roads ready</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
                    <p className="text-amber-400 font-mono text-xs font-bold">IMMEDIATE</p>
                    <h4 className="text-sm font-semibold text-stone-200 mt-2">Registration</h4>
                    <span className="text-[10px] text-stone-400 block mt-1">Clean title paperwork</span>
                  </div>
                </div>
              </div>
            </section>

            {/* INTERACTIVE PLOT SELECTOR EXPERIENCE */}
            <section className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                  <span className="text-emerald-800 uppercase font-mono text-xs font-bold tracking-widest block pl-1">
                    Live Layout Schematic
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                    Digital Community Plot Selector
                  </h2>
                  <p className="text-stone-500 text-sm">
                    Interactive Preview: Select any of our popular demonstration plotting blocks on the blueprint to review its dimensions, road alignment facing, and estimated pricing before requesting a real block assignment!
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column Plot Grid Schematic Map */}
                  <div className="lg:col-span-7 bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden border border-emerald-950">
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-amber-400"></div>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-bold block mb-4">
                        Athur Site Schematic [Blueprint Plan View]
                      </span>
                      <div className="grid grid-cols-5 gap-3.5 sm:gap-4 pb-6">
                        {SIMULATED_PLOTS.map((plot) => {
                          const isSelected = selectedSimPlot?.id === plot.id;
                          const isReserved = plot.status === "Reserved";

                          return (
                            <button
                              key={plot.id}
                              onClick={() => setSelectedSimPlot(plot as any)}
                              className={`aspect-square p-2 rounded-xl text-xs flex flex-col items-center justify-center font-mono font-bold border transition-all cursor-pointer hover:scale-[1.03] ${
                                isReserved
                                  ? "bg-stone-800 border-stone-800 text-stone-400 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-amber-400 border-amber-300 text-stone-900 shadow-md ring-2 ring-white"
                                  : "bg-emerald-950 hover:bg-emerald-850 border-emerald-800 text-amber-300"
                              }`}
                              style={{ borderStyle: "solid" }}
                            >
                              <span className="text-[9px] text-stone-400 leading-none">PLOT</span>
                              <span className="text-sm font-sans mt-0.5">{plot.id}</span>
                              <span className="text-[8px] opacity-75 font-serif mt-0.5">{plot.size.split(" ")[0]}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between text-xs border-t border-white/10 pt-4 font-mono mt-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <span className="h-3 w-3 bg-emerald-950 border border-emerald-800 rounded"></span>
                          <span className="text-stone-300 text-[10px]">Available</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="h-3 w-3 bg-amber-400 rounded"></span>
                          <span className="text-stone-300 text-[10px]">Selected</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="h-3 w-3 bg-stone-800 rounded"></span>
                          <span className="text-stone-300 text-[10px]">Reserved</span>
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-100">
                        Total plotting space layout: 270 plots
                      </p>
                    </div>
                  </div>

                  {/* Right Column Selected Plot parameters & CTA Form */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 md:p-8 flex flex-col justify-between text-left shadow-md">
                    {selectedSimPlot ? (
                      <div className="space-y-6 flex flex-col h-full justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-100 rounded-full font-mono font-bold text-xs">
                              PLOT #{selectedSimPlot.id} - Premium Profile
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-900">
                              {selectedSimPlot.facing} Facing
                            </span>
                          </div>

                          <h3 className="text-2xl font-serif font-black text-stone-900">
                            Plot Sizing: {selectedSimPlot.size}
                          </h3>

                          <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-150">
                            <div>
                              <span className="text-[10px] font-mono tracking-wider text-stone-400 block uppercase">
                                Dimensions
                              </span>
                              <p className="text-sm font-bold text-stone-800">
                                {PLOT_SIZES.find(p => p.size === selectedSimPlot.size)?.dimensions || "Standard"}
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono tracking-wider text-stone-400 block uppercase">
                                Plot Price (Estimate)
                              </span>
                              <p className="text-sm font-bold text-emerald-900">
                                {PLOT_SIZES.find(p => p.size === selectedSimPlot.size)?.startingPrice || "Ask Info"}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-stone-500 leading-relaxed">
                            This plot enjoys direct access to our newly built wide blacktop path, smart street lights, and is positioned near our community landscaping margins. 100% compliant with Vastu guidelines.
                          </p>

                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-stone-500 tracking-wider">SUITABILITY:</p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {(PLOT_SIZES.find(p => p.size === selectedSimPlot.size)?.suitability || []).map((suit, s) => (
                                <span key={s} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 text-[10px] rounded font-medium">
                                  ✓ {suit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-stone-150">
                          <button
                            onClick={() => handleOpenBookingModal(selectedSimPlot.size)}
                            className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition border border-emerald-950 flex items-center justify-center space-x-2"
                          >
                            <span>Lock This Assignment Profile</span>
                            <ArrowRight className="w-4 h-4 text-emerald-100" />
                          </button>
                          <p className="text-[10px] text-center text-stone-400 mt-2">
                            *This digital block selector is a simulated view. Contact team for physical mapping check.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-24 text-stone-400">
                        <HelpCircle className="w-10 h-10 mx-auto text-stone-300" />
                        <p className="text-sm mt-3">Click on any plot block from the left layout mapping sector to inspect its exact pricing and dimensions parameters.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 4: PRICE SECTION */}
            <section id="plots" className="py-16 md:py-24 bg-white border-b border-stone-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                  <span className="text-amber-500 uppercase font-mono text-xs font-bold tracking-widest pl-1 block">
                    Affordable Pricing Charts
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                    Sameera Urban Nest Plot Pricing
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Check available plot bounds and starting pricing packages below. We maintain absolute pricing transparency under the DTCP and RERA guidelines. Bank loans up to 80% can be computed on standard parameters.
                  </p>
                </div>

                {/* Plot pricing cards layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {PLOT_SIZES.slice(0, 4).map((plot, i) => (
                    <div
                      key={i}
                      className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition shadow-sm hover:shadow-md text-left"
                    >
                      {/* Card Header styling */}
                      <div className="p-5 border-b border-stone-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase font-mono tracking-widest text-emerald-800 font-bold">
                            Residential Plot
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            plot.status === "Sold Out" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"
                          }`}>
                            {plot.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mt-2">{plot.size}</h3>
                        <p className="text-stone-500 text-xs mt-0.5">Dims: {plot.dimensions}</p>
                      </div>

                      {/* Card Core information */}
                      <div className="p-5 space-y-4 flex-1">
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-2xl font-black text-emerald-900">{plot.startingPrice}</span>
                          <span className="text-stone-400 text-xs">Onwards</span>
                        </div>

                        <div className="space-y-1 text-xs text-stone-600 font-medium">
                          {plot.suitability.map((suit, sIdx) => (
                            <p key={sIdx} className="flex items-center space-x-1.5">
                              <span className="h-1.5 w-1.5 bg-emerald-800 rounded-full"></span>
                              <span>{suit}</span>
                            </p>
                          ))}
                        </div>

                        {plot.estimatedEMI && (
                          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-100 text-[10px] text-emerald-900 font-medium flex items-center space-x-1.5">
                            <Coins className="w-3.5 h-3.5" />
                            <span>Estimated EMI: <strong>{plot.estimatedEMI}</strong></span>
                          </div>
                        )}
                      </div>

                      {/* Card bottom buttons */}
                      <div className="p-5 border-t border-stone-200">
                        <button
                          onClick={() => handleOpenBookingModal(plot.size)}
                          className="w-full py-2.5 text-center bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold tracking-wide border border-emerald-950 transition cursor-pointer"
                        >
                          Get Spot Pricing & PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional larger premium cards sector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {PLOT_SIZES.slice(4).map((plot, i) => (
                    <div
                      key={i}
                      className="bg-emerald-950 text-white rounded-2xl border border-emerald-900 overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition shadow-sm text-left"
                    >
                      <div className="p-5 border-b border-emerald-900">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                            Megablock Premium
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            plot.status === "Sold Out" ? "bg-white/10 text-stone-300" : "bg-amber-400 text-stone-900"
                          }`}>
                            {plot.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-stone-100 mt-2">{plot.size}</h3>
                        <p className="text-xs mt-0.5 opacity-75">Dims: {plot.dimensions}</p>
                      </div>

                      <div className="p-5 space-y-4 flex-1">
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-2xl font-black text-amber-400">{plot.startingPrice}</span>
                          <span className="text-xs opacity-75">Onwards</span>
                        </div>

                        <div className="space-y-1 text-xs text-stone-300 font-medium">
                          {plot.suitability.map((suit, sIdx) => (
                            <p key={sIdx} className="flex items-center space-x-1.5">
                              <span className="h-1.5 w-1.5 bg-amber-400 rounded-full"></span>
                              <span>{suit}</span>
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 border-t border-emerald-900">
                        <button
                          onClick={() => handleOpenBookingModal(plot.size)}
                          className="w-full py-2.5 text-center bg-amber-400 hover:bg-amber-500 text-stone-900 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer"
                        >
                          Request Megablock details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Disclaimer text */}
                <p className="text-[11px] text-stone-400 mt-6 leading-relaxed">
                  *Disclaimer: Document registration charges, stamp duties, legal mutation charges, corner premium weights, and structural security upkeep fees are evaluated distinct from base sq.ft price listings. Inquire legal desk for detailed quotation schedules.
                </p>
              </div>
            </section>

            {/* SECTION 5: AMENITIES */}
            <section id="amenities" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                  <span className="text-emerald-800 uppercase font-mono text-xs font-bold tracking-widest pl-1 block">
                    Gated Infrastructure
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                    On-Site Completed Layout Amenities
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Sameera Urban Nest hosts structural amenities integrated cleanly into the community boundaries. Our systems are completed with zero mock delays, giving absolute security for immediate construction cycles.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {AMENITIES_LIST.map((amenity, i) => (
                    <div
                      key={amenity.id}
                      className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 hover:shadow-md transition text-left flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-emerald-900">
                          {i === 0 && <Shield className="w-5 h-5 text-emerald-800" />}
                          {i === 1 && <Activity className="w-5 h-5 text-emerald-850" />}
                          {i === 2 && <Sun className="w-5 h-5 text-amber-500" />}
                          {i === 3 && <Eye className="w-5 h-5 text-blue-600" />}
                          {i === 4 && <Smile className="w-5 h-5 text-emerald-700" />}
                          {i === 5 && <Trees className="w-5 h-5 text-emerald-800" />}
                          {i === 6 && <Trees className="w-5 h-5 text-emerald-700" />}
                          {i === 7 && <Droplet className="w-5 h-5 text-sky-500" />}
                          {i === 8 && <Activity className="w-5 h-5 text-emerald-900" />}
                          {i === 9 && <Compass className="w-5 h-5 text-amber-600" />}
                        </div>
                        <h3 className="text-sm font-bold text-stone-900 leading-tight">
                          {amenity.name}
                        </h3>
                        <p className="text-[11px] text-stone-500 leading-relaxed">
                          {amenity.description}
                        </p>
                      </div>

                      <span className="text-[9px] uppercase tracking-wider block font-mono font-semibold text-stone-400 pt-2 border-t border-stone-100">
                        Category: {amenity.category}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* SECTION 6: LOCATION ADVANTAGES & GOOGLE MAPS BLOCK */}
            <section id="connectivity" className="py-16 md:py-24 bg-white border-b border-stone-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column landmark lists */}
                  <div className="lg:col-span-6 space-y-6 text-left">
                    <span className="text-amber-550 uppercase font-mono text-xs font-bold tracking-widest pl-1 block">
                      Rapid Commute Connectivity
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                      Athur - Chengalpattu Location Advantages
                    </h2>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Proximity is structural profit. Sameera Urban Nest is positioned close to the Chengalpattu state transit highway, giving swift, immediate commute connections inside Chengalpattu municipal bounds, schools, SRM healthcare, and Chennai industrial parks.
                    </p>

                    {/* Category tabs filters */}
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                      <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-900 mb-3">
                        Distance Summary Chart:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                        {CONNECTIVITY_LANDMARKS.slice(0, 8).map((l, lIdx) => (
                          <div key={lIdx} className="bg-white p-2.5 rounded-xl border border-stone-150 flex items-center justify-between text-xs hover:border-emerald-700 transition">
                            <div className="flex items-center space-x-2 truncate">
                              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span className="font-semibold text-stone-800 truncate" title={l.landmark}>{l.landmark}</span>
                            </div>
                            <span className="font-mono text-[10px] text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded font-bold whitespace-nowrap">
                              {l.distance} ({l.duration})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4 items-center">
                      <button
                        onClick={() => handleOpenBookingModal()}
                        className="bg-emerald-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg border border-emerald-990 tracking-wide hover:bg-emerald-800 transition"
                      >
                        Request Complete Driving Route
                      </button>
                    </div>
                  </div>

                  {/* Right Column Interactive Dynamic Maps Placeholder */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="bg-stone-100 rounded-2xl border border-stone-300 shadow overflow-hidden aspect-video relative flex flex-col justify-between p-4">
                      {/* Map backdrop simulation */}
                      <div className="absolute inset-0 bg-cover bg-center rounded-2xl mix-blend-multiply opacity-25" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/80.00,12.68,12,0/800x450?access_token=mock')" }}></div>
                      
                      {/* Visual clean Map replacement */}
                      <div className="absolute inset-0 z-0 bg-emerald-950/5 flex flex-col items-center justify-center p-6 text-center">
                        <MapPin className="w-12 h-12 text-emerald-800 animate-bounce mb-2" />
                        <h4 className="text-sm font-bold text-emerald-950 font-serif">Sameera Urban Nest Gated community Site</h4>
                        <p className="text-xs text-stone-500 max-w-sm mt-1 leading-relaxed">
                          Athur, Near Chengalpattu Kanchipuram State Highway, Tamil Nadu. Coordinates: 12.6853° N, 79.9572° E
                        </p>
                        <div className="mt-4 flex gap-2">
                          <a
                            href="https://maps.google.com/?q=Athur+Chengalpattu+Tamil+Nadu"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-md transition flex items-center space-x-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Open on Google Maps</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-left">
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                        <span className="block text-[9px] uppercase tracking-wider font-mono font-bold text-stone-400">
                          Transit HUB
                        </span>
                        <p className="font-bold text-stone-900 mt-1">Athur Junction</p>
                        <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">1.8 km (4 mins drive)</span>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                        <span className="block text-[9px] uppercase tracking-wider font-mono font-bold text-stone-400">
                          Railway Hub
                        </span>
                        <p className="font-bold text-stone-900 mt-1">Chengalpattu Station</p>
                        <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">4.8 km (9 mins drive)</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 7: WHY INVEST IN ATHUR */}
            <section className="py-16 md:py-24 bg-stone-100 border-b border-stone-200 text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column visual roads */}
                  <div className="lg:col-span-5 relative">
                    <div className="rounded-2xl overflow-hidden border-2 border-white shadow-xl relative aspect-[4/3] group cursor-pointer" onClick={() => setActivePhoto(COMMUNITY_ROADS_IMG)}>
                      <img
                        src={COMMUNITY_ROADS_IMG}
                        alt="Wide structural blacktop internal roads inside Sameera Urban Nest community Athur"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition duration-300"></div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] text-stone-800 font-mono tracking-tight font-semibold border shadow">
                        🔍 Click to view real-size on-site road photo
                      </div>
                    </div>
                  </div>

                  {/* Right Column industrial pitch */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-emerald-800 uppercase font-mono text-xs font-bold tracking-widest pl-1 block">
                      Macro Infrastructure Growth
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                      Why Invest in Athur & Chengalpattu?
                    </h2>
                    <p className="text-stone-605 text-sm leading-relaxed">
                      Athur stands at the epicenter of Tamil Nadu's expanding industrial corridor. As the core Chennai boundaries enlarge, industrial zones near GST Road (NH45) are experiencing rapid residential conversion, demanding organized residential plotting communities.
                    </p>

                    <div className="space-y-4 text-xs">
                      <div className="flex gap-3 text-left">
                        <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold font-sans shrink-0 border mt-0.5">
                          1
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 font-serif">Proximity to Mahindra World City</h4>
                          <p className="text-stone-500 mt-1">
                            A mere 14 minutes commute opens up to Mahindra World City (MWC) which is home to thousands of global employees working inside IT parks and automotive conglomerates like Renault Nissan, guaranteeing continuous tenant demands.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 text-left">
                        <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold font-sans shrink-0 border mt-0.5">
                          2
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 font-serif">Chengalpattu Industrial corridor and State Highway</h4>
                          <p className="text-stone-500 mt-1">
                            The growing State Highway and state connectivity infrastructure networks ensure that properties situated in Athur Junction enjoy high land capitalization weight and long-term valuation growth indices.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 text-left">
                        <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold font-sans shrink-0 border mt-0.5">
                          3
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 font-serif">Vast Academic Infrastructure</h4>
                          <p className="text-stone-500 mt-1">
                            Surrounded by Pattammal Arts & Science College, CBSE Schools, and the world-class SRM University, Athur is rapidly converting into a high-tier residential colony suitable for retirement homes and villa properties.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 8: MASTER LAYOUT PLAT DETAIL */}
            <section className="py-16 md:py-24 bg-white border-b border-stone-100 text-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                  <span className="text-amber-500 uppercase font-mono text-xs font-bold tracking-widest block">
                    Developer Approved Blueprint
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                    Sameera Urban Nest Master Layout Plan
                  </h2>
                  <p className="text-stone-500 text-sm">
                    Review our structural layout plan engineered cleanly by Creative Township Developer planners. High quality wide blacktop internal roads, parks, streetlights, and vastu alignments are mapped cleanly.
                  </p>
                </div>

                {/* Simulated Master layout image container */}
                <div className="max-w-4xl mx-auto bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-250 shadow-md relative group cursor-pointer" onClick={() => setActivePhoto(HERO_BANNER_IMG)}>
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow">
                    <img
                      src={HERO_BANNER_IMG}
                      alt="Sameera Urban Nest community Grand Entry archway and layout blueprint"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-101"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-emerald-950/15 flex items-center justify-center">
                      <div className="bg-emerald-900/90 backdrop-blur text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest border border-amber-300 flex items-center space-x-2 shadow-lg">
                        <Maximize className="w-4 h-4 text-amber-300" />
                        <span>VIEW FULL RESOLUTION LAYOUT DETAILS</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-3 font-mono">
                    Approved by DTCP & Tamil Nadu RERA (TN/35/Layout/1382/2025). Instant registrations pre-approved.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: REAL GALLERY COMPONENT */}
            <section className="py-16 bg-stone-50 border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                  <span className="text-emerald-800 uppercase font-mono text-xs font-bold tracking-widest pl-1 block">
                    Onsite Photographic Evidence
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                    Authentic Site Photographs
                  </h2>
                  <p className="text-stone-500 text-sm">
                    No misleading cartoon animations or unrealistic houses. We prioritize transparency. Check out real photos of our completed entrance, roadways, and landscaping margins.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {/* Photo card 1 */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm group cursor-pointer" onClick={() => setActivePhoto(HERO_BANNER_IMG)}>
                    <div className="aspect-[16/9] overflow-hidden rounded-xl bg-stone-100">
                      <img
                        src={HERO_BANNER_IMG}
                        alt="Grand architectural Entry Archway Sameera Urban Nest"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-left mt-3 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-stone-900 font-serif">Community Main Gate Archway</h4>
                        <p className="text-[11px] text-stone-500">Completed structural entry gate checkpoint</p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded font-bold">
                        On-Site Photo
                      </span>
                    </div>
                  </div>

                  {/* Photo card 2 */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm group cursor-pointer" onClick={() => setActivePhoto(COMMUNITY_ROADS_IMG)}>
                    <div className="aspect-[16/9] overflow-hidden rounded-xl bg-stone-100">
                      <img
                        src={COMMUNITY_ROADS_IMG}
                        alt="Wide paved blacktop roads inside Sameera plotting community Athur"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-left mt-3 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-stone-900 font-serif">Premium Wide Blacktop Roads</h4>
                        <p className="text-[11px] text-stone-500">Fully developed internal roads with drainage margins</p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded font-bold">
                        Drone View
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: BUYING PROCESS TIMESCALE */}
            <section className="py-16 bg-white border-b border-stone-100 text-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
                  <span className="text-amber-500 uppercase font-mono text-xs font-bold tracking-widest block">
                    Streamlined Property Purchase
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 leading-tight">
                    Frictionless 5-Step Buying Process
                  </h2>
                  <p className="text-stone-500 text-sm">
                    We have cut out third-party brokers and painful litigation. Our legal desk manages all aspects of ownership transfers cleanly and transparently.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto text-left">
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
                    <span className="absolute -top-3.5 left-4 h-7 w-7 rounded-full bg-emerald-900 text-amber-350 flex items-center justify-center font-bold text-xs ring-4 ring-white">
                      1
                    </span>
                    <h3 className="text-sm font-bold font-serif text-stone-900 mt-2">Choose Plot Sizing</h3>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                      Select your preferred plot size (600, 1200 or 2400 Sq.Ft) on our layout blueprint.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
                    <span className="absolute -top-3.5 left-4 h-7 w-7 rounded-full bg-emerald-900 text-amber-350 flex items-center justify-center font-bold text-xs ring-4 ring-white">
                      2
                    </span>
                    <h3 className="text-sm font-bold font-serif text-stone-900 mt-2">Book Free Site Visit</h3>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                      We arrange free site pick-up and inspection for you and your family to examine plotting first-hand.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
                    <span className="absolute -top-3.5 left-4 h-7 w-7 rounded-full bg-emerald-900 text-amber-350 flex items-center justify-center font-bold text-xs ring-4 ring-white">
                      3
                    </span>
                    <h3 className="text-sm font-bold font-serif text-stone-900 mt-2">Legal/Loan Check</h3>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                      Review complete clean title documents on DTCP RERA registry and secure bank loan sanctions.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
                    <span className="absolute -top-3.5 left-4 h-7 w-7 rounded-full bg-emerald-900 text-amber-350 flex items-center justify-center font-bold text-xs ring-4 ring-white">
                      4
                    </span>
                    <h3 className="text-sm font-bold font-serif text-stone-900 mt-2">Plot Registration</h3>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                      Complete registration processing at the local Sub-Registrar Office with complete legal executive logs.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
                    <span className="absolute -top-3.5 left-4 h-7 w-7 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-xs ring-4 ring-white">
                      5
                    </span>
                    <h3 className="text-sm font-bold font-serif text-emerald-950">Immediate Build!</h3>
                    <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                      Plots are registered with sweet water and wide pathways, ready to build instantly!
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 11: SEO FAQS ACCORDION */}
            <section id="faq" className="py-16 md:py-24 bg-stone-55 border-b border-stone-150 text-left">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
                  <span className="text-emerald-800 uppercase font-mono text-xs font-bold tracking-widest pl-1 block">
                    SEO Knowledge Center
                  </span>
                  <h2 className="text-3xl font-serif font-black text-emerald-950 leading-tight">
                    Frequently Asked Questions (FAQ)
                  </h2>
                  <p className="text-stone-500 text-xs">
                    Clear, transparent legal answers to all high-intent questions regarding Sameera Urban Nest plotting, registration parameters, approvals, and loan sanctions.
                  </p>
                </div>

                {/* FAQ list */}
                <div className="space-y-3 font-sans">
                  {FAQ_DATA.map((faq, index) => {
                    const isOpen = activeFAQTab === index;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => setActiveFAQTab(isOpen ? null : index)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left font-medium text-stone-900 hover:text-emerald-900 focus:outline-none transition-all cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm font-bold font-serif">{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-stone-400 font-bold transition transform shrink-0 ml-4 ${isOpen ? "rotate-180 text-emerald-900" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* SECTION 12: BOTTOM LEAD GENERATION SECTION */}
            <section className="py-16 md:py-24 bg-emerald-950 text-white relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${HERO_BANNER_IMG})` }}></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left block information */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-amber-400 uppercase font-mono text-xs font-bold tracking-widest block">
                      Immediate Booking Options
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
                      Schedule Your Free Site Visit Today
                    </h2>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      We offer free private cab pick-up & drop coordinates for you and your family from Chengalpattu Station, GST Highway points, or nearby limits. Schedule your site visit today or request our executive to send you the cleared titles sheet directly.
                    </p>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-amber-300">
                        Inquiries Hotlines
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono">
                        <div>
                          <p className="text-stone-400 font-bold">PHYSICAL SITE OFFICE</p>
                          <span className="text-stone-200">Athur, Near Athur Junction, Chengalpattu, Tamil Nadu</span>
                        </div>
                        <div>
                          <p className="text-stone-400 font-bold">CALL REGISTER DESK</p>
                          <a href="tel:+919940424564" className="text-amber-400 hover:underline font-bold text-sm">
                            +91 99404 24564
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right block Contact Form */}
                  <div className="lg:col-span-6">
                    <LeadForm
                      title="Request Call Back"
                      subtitle="Submit your contact credentials to verify plot availability, loan sanction requirements and download RERA layout maps instantly."
                      buttonLabel="Check Availability & Call Back"
                      sourceType="Footer Conversion Module"
                      variant="dark"
                    />
                  </div>

                </div>
              </div>
            </section>

            {/* BRANDING FOOTER */}
            <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850 text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* Footer split grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Branding Column */}
                  <div className="space-y-4 col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-9 w-9 rounded-full bg-emerald-900 border border-amber-300 flex items-center justify-center text-amber-400 font-bold">
                        <span className="font-serif">SU</span>
                      </div>
                      <span className="text-lg font-bold text-stone-100">
                        Sameera <span className="font-light text-emerald-500">Urban Nest</span>
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
                      Premium plotting development in Athur, Chengalpattu layout. Approved legally by DTCP & Tamil Nadu RERA (TN/35/Layout/1382/2025). Crafted with engineering precision by Creative Township Developers.
                    </p>
                    <p className="text-[10px] text-stone-600 font-mono">
                      © 2026 Sameera Urban Nest. All Rights Reserved. ctdsameeramrt@gmail.com
                    </p>
                  </div>

                  {/* Quick sitemaps */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono">
                      Plot Dimensions
                    </h4>
                    <ul className="text-xs space-y-1.5 font-medium">
                      <li><span className="hover:text-emerald-500 transition">600 Sq.Ft Plots</span></li>
                      <li><span className="hover:text-emerald-500 transition">1200 Sq.Ft Standard Plots</span></li>
                      <li><span className="hover:text-emerald-500 transition">1800 Sq.Ft Estate Plots</span></li>
                      <li><span className="hover:text-emerald-500 transition">2400 Sq.Ft Premium Blocks</span></li>
                    </ul>
                  </div>

                  {/* contact details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-mono">
                      Office Address
                    </h4>
                    <p className="text-xs leading-relaxed text-stone-500">
                      Creative Township Developers Site Desk,<br />
                      Athur Near GST Road, Chengalpattu,<br />
                      Tamil Nadu – 603101.<br />
                      📞 Support: +91 9940424564
                    </p>
                  </div>
                </div>

                {/* Sub-Disclaimer and legal regulatory texts */}
                <div className="border-t border-stone-800 pt-6 space-y-4 text-[10px] text-stone-600 leading-relaxed">
                  <p>
                    Legal Disclaimer: Sameera Urban Nest is registered with the Tamil Nadu Real Estate Regulatory Authority under registration number: RERA TN/35/Layout/1382/2025. All layout dimensions, roads parameters, and botanical amenities represented on this website are conceptual and indicative of layout drawings. The builder reserves appropriate rights to manage, modify and implement changes according to regulatory demands. This website functions exclusively as a high-intent marketing and lead generation landing page. Standard RERA definitions apply.
                  </p>
                  <div className="flex flex-wrap gap-4 text-stone-500">
                    <span className="hover:underline transition cursor-pointer">Privacy Policy</span>
                    <span>•</span>
                    <span className="hover:underline transition cursor-pointer">Terms & Conditions Subscription</span>
                    <span>•</span>
                    <span className="hover:underline transition cursor-pointer" onClick={() => setIsAdminOpen(true)}>Admin CRM Log</span>
                  </div>
                </div>

              </div>
            </footer>

            {/* STICKY BOTTOM ACTION CONTAINER BAR (FOR MOBILE MOBILITY) */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-stone-250 py-3 px-4 z-40 md:hidden grid grid-cols-2 gap-3 shadow-2xl">
              <a
                href="tel:+919940424564"
                className="flex items-center justify-center space-x-2 bg-stone-900 text-white rounded-xl py-3 text-xs font-bold tracking-wide shadow"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Register Desk</span>
              </a>

              <a
                href="https://wa.me/919940424564?text=Hi,%20I'm%20interested%20in%20Sameera%20Urban%20Nest%20plots."
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center space-x-2 bg-emerald-600 text-white rounded-xl py-3 text-xs font-bold tracking-wide shadow"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Floating Gemini Agent assistant Widget */}
            <AIAssistant />

            {/* Lightbox zoomed single Photo Viewer Modal Dialog */}
            {activePhoto && (
              <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={activePhoto}
                  alt="Zoomed Site Photograph"
                  className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl border-2 border-stone-850"
                  referrerPolicy="no-referrer"
                />
                <p className="text-stone-400 text-xs mt-4 font-mono">
                  Verified Physical Property Photograph - Sameera Urban Nest Community
                </p>
              </div>
            )}

            {/* Site visit Popup Lead Form Modal Dialog */}
            {isBookingOpen && (
              <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden mt-10 mb-10">
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 text-stone-700 p-1.5 rounded-full z-10 transition transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <LeadForm
                    title="Schedule Secure Site Tour"
                    subtitle={`Reserve your free private cab. Plot preference is pre-configured to ${bookingPrefSize}.`}
                    buttonLabel="Confirm Travel Schedulers"
                    sourceType={`Site Tour Popup [${bookingPrefSize}]`}
                    onSuccessSubmit={() => {
                      setTimeout(() => setIsBookingOpen(false), 2000);
                    }}
                  />
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
