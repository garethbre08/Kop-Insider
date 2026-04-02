"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Match Centre", href: "/match-centre" },
  { label: "Transfer Talk", href: "/transfer-talk" },
  { label: "Injuries", href: "/injuries" },
  { label: "Opinion", href: "/opinion" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = theme === "home";
  const navBg = isHome ? "bg-ki-red" : "bg-ki-teal";
  const accentText = isHome ? "text-ki-red" : "text-ki-teal";
  const mobileBg = isHome ? "bg-ki-red" : "bg-ki-teal";

  const Toggle = () => (
    <div className="flex items-center rounded-full border border-ki-white/40 overflow-hidden">
      {(["home", "away"] as const).map((option) => (
        <button
          key={option}
          onClick={() => setTheme(option)}
          className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors duration-300 min-h-[44px] sm:min-h-0 sm:py-1 ${
            theme === option
              ? `bg-ki-white ${accentText}`
              : "bg-transparent text-ki-white"
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );

  const SubscribeButton = () => (
    <button className={`bg-ki-white ${accentText} rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 min-h-[44px] sm:min-h-0 sm:py-1`}>
      Subscribe
    </button>
  );

  return (
    <nav className={`${navBg} w-full transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-ki-white font-bold text-xl tracking-tight">
              Kop Insider
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-ki-white text-sm font-medium transition-opacity pb-1 ${
                    isActive
                      ? "border-b-2 border-ki-white"
                      : "hover:opacity-80 border-b-2 border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle + subscribe always visible, scale on mobile */}
            <Toggle />
            <SubscribeButton />

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden text-ki-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className={`md:hidden ${mobileBg} border-t border-ki-white/20 w-full animate-slide-down`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-lg font-medium py-3 px-6 border-b border-ki-white/10 transition-opacity min-h-[44px] ${
                  isActive ? "text-ki-white font-bold" : "text-ki-white hover:opacity-80"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
