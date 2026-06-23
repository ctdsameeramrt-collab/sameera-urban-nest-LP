/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Phone, MessageSquare, Shield, Menu, X, Landmark, Award } from "lucide-react";

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenBooking: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Header({ onOpenAdmin, onOpenBooking, isAdminLoggedIn, onLogoutAdmin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100 py-3"
          : "bg-white/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand Block */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="h-11 w-11 rounded-full bg-emerald-900 flex items-center justify-center text-amber-400 font-bold border-2 border-amber-300 shadow-md">
              <span className="font-serif tracking-tighter text-lg">SU</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg md:text-xl font-bold text-stone-900 font-sans tracking-tight">
                  SAMEERA
                </span>
                <span className="text-lg md:text-xl font-extralight text-emerald-800 font-sans">
                  Urban Nest
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider font-mono text-emerald-700 font-semibold -mt-1">
                Creative Township Developers
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button
              onClick={() => scrollToSection("home")}
              className="text-stone-700 hover:text-emerald-900 text-sm font-medium transition cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("why-us")}
              className="text-stone-700 hover:text-emerald-900 text-sm font-medium transition cursor-pointer"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("plots")}
              className="text-stone-700 hover:text-emerald-900 text-sm font-medium transition cursor-pointer"
            >
              Plot Sizes & Price
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="text-stone-700 hover:text-emerald-900 text-sm font-medium transition cursor-pointer"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("connectivity")}
              className="text-stone-700 hover:text-emerald-900 text-sm font-medium transition cursor-pointer"
            >
              Connectivity
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-stone-700 hover:text-emerald-900 text-sm font-medium transition cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdminLoggedIn ? (
              <button
                onClick={onLogoutAdmin}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 transition border border-amber-200"
              >
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                <span>Exit CRM</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center space-x-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-semibold text-stone-500 hover:text-emerald-900 hover:bg-emerald-50 transition"
                title="CTD Developer Lead Panel"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>CRM Log</span>
              </button>
            )}

            <a
              href="https://wa.me/919940424564?text=Hi,%20I'm%20interested%20in%20Sameera%20Urban%20Nest%20plots%20at%20Athur.%20Please%20share%20the%20price%20list."
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-750 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide shadow-sm hover:shadow transition"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="bg-emerald-900 hover:bg-emerald-800 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wide border-2 border-amber-400 font-heading shrink-0 shadow-sm transition hover:scale-[1.01]"
            >
              Book Site Visit
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex lg:hidden items-center space-x-3">
            {isAdminLoggedIn && (
              <button
                onClick={onLogoutAdmin}
                className="p-1.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono"
              >
                Exit CRM
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-850 hover:text-emerald-900 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-100 shadow-lg px-4 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-stone-100">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left py-2 px-3 hover:bg-emerald-50 rounded text-stone-750 font-medium text-sm transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("why-us")}
              className="text-left py-2 px-3 hover:bg-emerald-50 rounded text-stone-750 font-medium text-sm transition"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("plots")}
              className="text-left py-2 px-3 hover:bg-emerald-50 rounded text-stone-750 font-medium text-sm transition"
            >
              Plot Pricing
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="text-left py-2 px-3 hover:bg-emerald-50 rounded text-stone-750 font-medium text-sm transition"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("connectivity")}
              className="text-left py-2 px-3 hover:bg-emerald-50 rounded text-stone-750 font-medium text-sm transition"
            >
              Location
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left py-2 px-3 hover:bg-emerald-50 rounded text-stone-750 font-medium text-sm transition"
            >
              FAQ
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onOpenBooking}
              className="w-full text-center bg-emerald-900 hover:bg-emerald-800 text-white py-3 rounded-xl text-sm font-semibold border border-amber-400 shadow transition"
            >
              Book Free Site Visit
            </button>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+919940424564"
                className="flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-900 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition"
              >
                <Phone className="w-4 h-4 text-emerald-900" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/919940424564?text=Hi,%20I'm%20interested%20in%20Sameera%20Urban%20Nest%20plots."
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-650 text-white py-2.5 rounded-xl text-xs font-semibold tracking-wide transition"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
            {!isAdminLoggedIn && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center text-xs font-mono text-stone-400 py-2 hover:text-stone-600 transition"
              >
                Developer CRM Access
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
