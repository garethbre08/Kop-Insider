"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const filters = ["All", "Match Reaction", "Transfers", "Player Form", "Tactics"];

const articles = [
  { id: 1, tag: "MATCH REACTION", headline: "Dominant Display Sends Liverpool Seven Points Clear at the Top", date: "2 hours ago" },
  { id: 2, tag: "TRANSFERS",      headline: "Slot Drops Hint Over January Signing as Midfield Cover Sought", date: "4 hours ago" },
  { id: 3, tag: "TACTICS",        headline: "Why Liverpool's High Line Is the Bravest Tactical Bet in the League", date: "6 hours ago" },
  { id: 4, tag: "PLAYER FORM",    headline: "Salah Is Running Out of Time to Sign — And He Knows It", date: "Yesterday" },
  { id: 5, tag: "TRANSFERS",      headline: "Liverpool Set to Break Transfer Record with Audacious Wirtz Bid", date: "2 days ago" },
  { id: 6, tag: "MATCH REACTION", headline: "That Was Not a Performance. That Was a Warning Sign Dressed Up as Three Points.", date: "3 days ago" },
];

const stats = [
  { value: "248", label: "Articles" },
  { value: "Since 2024", label: "Active" },
  { value: "4.8 ★", label: "Reader Rating" },
];

const valueProps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Always On",
    body: "Never misses a story, never sleeps, never has an off day.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "No Agenda",
    body: "No press box politics. No club PR. Just the truth.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Fan First",
    body: "Built by a Red. Written for Reds. Always.",
  },
];

function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Article image" className={`w-full bg-ki-sand flex items-center justify-center ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-ki-charcoal opacity-30" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 20.25h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12.75c0 .828.672 1.5 1.5 1.5z" />
      </svg>
    </div>
  );
}

export default function AndyAnfieldPage() {
  const { theme } = useTheme();
  const isHome = theme === "home";
  const heroBg     = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const accentText = isHome ? "text-ki-red"   : "text-ki-teal";
  const accentBg   = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const quoteBg    = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const pageBg     = isHome ? "bg-ki-gold"    : "bg-ki-cream";

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? articles
    : articles.filter((a) => a.tag === activeFilter.toUpperCase() || a.tag.includes(activeFilter.toUpperCase()));

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>

      {/* Hero */}
      <div className={`${heroBg} transition-colors duration-300`}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-5 text-center">
          {/* Avatar */}
          <div className="h-28 w-28 rounded-full bg-ki-white/20 border-4 border-ki-white/30 flex items-center justify-center shrink-0">
            <span className="text-ki-white font-bold text-4xl">AA</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-ki-white font-bold text-4xl">Andy Anfield</h1>
            <p className="text-ki-white opacity-70 text-lg">Kop Insider Reporter</p>
          </div>
          {/* Stat badges */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {stats.map((s) => (
              <span key={s.label} className="bg-ki-white/10 text-ki-white rounded-full px-3 py-1 text-sm">
                <span className="font-semibold">{s.value}</span>
                {s.value !== s.label && <span className="opacity-70"> {s.label}</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Easter egg reveal */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-ki-white border border-ki-sand rounded-xl p-8 flex flex-col items-center text-center gap-4 animate-reveal-card">

          {/* Robot icon */}
          <div className={`h-14 w-14 rounded-full ${accentBg} flex items-center justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-ki-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>

          <h2 className="text-ki-black font-bold text-3xl">You found it.</h2>
          <p className="text-ki-charcoal opacity-70 text-lg font-medium">Andy Anfield is not your typical journalist.</p>

          <p className="text-ki-charcoal text-sm leading-relaxed max-w-lg">
            Andy Anfield is Kop Insider's AI reporter — built to deliver the truth about Liverpool FC without fear or favour. Powered by cutting edge AI, trained on decades of Liverpool football, and programmed with one golden rule: brutal when necessary, never brutal for clicks.
          </p>

          <div className="w-full border-t border-ki-sand my-2" />

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {valueProps.map((v, i) => (
              <div key={v.title} className="bg-ki-cream rounded-xl p-4 flex flex-col items-center gap-2 text-center animate-fade-in-up" style={{ animationDelay: `${300 + i * 120}ms` }}>
                <div className={accentText}>{v.icon}</div>
                <p className="text-ki-black font-bold text-sm">{v.title}</p>
                <p className="text-ki-charcoal text-xs opacity-70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className={`${quoteBg} rounded-xl p-6 w-full transition-colors duration-300 animate-slide-up`} style={{ animationDelay: "660ms" }}>
            <p className="text-ki-white font-bold text-xl italic text-center leading-snug">
              "The truth about Liverpool, told by someone who actually cares."
            </p>
          </div>
        </div>
      </div>

      {/* Article archive */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col gap-6">

          <h2 className="text-ki-black font-bold text-2xl">Andy's Latest</h2>

          {/* Filter bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            <span className="text-ki-charcoal opacity-50 text-sm shrink-0 mr-1">Filter by</span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors shrink-0 min-h-[44px] ${
                  activeFilter === f
                    ? `${accentBg} text-ki-white`
                    : `bg-ki-white text-ki-charcoal border border-ki-sand hover:border-ki-charcoal`
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((article) => (
              <article key={article.id} className="bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
                <PlaceholderImage className="h-36" />
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className={`inline-block bg-ki-sand text-xs font-semibold rounded px-2 py-1 self-start ${accentText}`}>
                    {article.tag}
                  </span>
                  <h3 className="text-ki-black font-bold text-sm leading-snug flex-1">{article.headline}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-ki-sand mt-auto">
                    <span className="text-ki-charcoal text-xs opacity-50">{article.date}</span>
                    <Link
                      href="/author/andy-anfield"
                      className={`text-xs font-semibold ${accentText} hover:opacity-70 transition-opacity`}
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
