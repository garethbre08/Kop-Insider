"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { getArticlesByCategory } from "@/lib/articles";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

const rumours = [
  {
    player: "Florian Wirtz",
    club: "Bayer Leverkusen",
    status: "Hot",
    source: "Sky Sports Germany",
    summary: "Liverpool leading the race ahead of Real Madrid with a £100m bid being prepared.",
  },
  {
    player: "Benjamin Šeško",
    club: "RB Leipzig",
    status: "Warm",
    source: "Fabrizio Romano",
    summary: "Slot personally scouted the striker twice in January. Decision expected in summer.",
  },
  {
    player: "Martin Zubimendi",
    club: "Real Sociedad",
    status: "Cold",
    source: "The Athletic",
    summary: "Interest remains but Zubimendi prefers to stay in Spain for another season.",
  },
];

const transferNews = [
  {
    id: 1,
    headline: "Liverpool Set to Break Transfer Record with Audacious Wirtz Bid",
    excerpt: "The Reds are prepared to shatter their all-time transfer record as Slot identifies the German as his number one target for the summer window.",
    meta: "Andy Anfield · 1 hour ago",
  },
  {
    id: 2,
    headline: "Slot Wants Two Signings — A Creator and a Centre-Back Covered",
    excerpt: "The Liverpool manager has given the board a clear brief heading into the summer: creativity in midfield and cover at the back.",
    meta: "Andy Anfield · 3 hours ago",
  },
  {
    id: 3,
    headline: "Núñez Future in Doubt as Serie A Giants Circle with Big Offer",
    excerpt: "Juventus are preparing a €70m offer for the Uruguayan striker, though Liverpool's preference remains to keep him at Anfield.",
    meta: "Andy Anfield · 6 hours ago",
  },
  {
    id: 4,
    headline: "Academy Star Signs New Long-Term Deal Amid Interest From City",
    excerpt: "Liverpool have moved quickly to tie down one of their brightest talents with a five-year contract, ending speculation over his future.",
    meta: "Andy Anfield · 9 hours ago",
  },
];

const trackerTransfers = [
  { player: "Florian Wirtz",       from: "Bayer Leverkusen", to: "Liverpool",    status: "Rumoured"  },
  { player: "Mamardashvili",        from: "Valencia",          to: "Liverpool",    status: "Confirmed" },
  { player: "Federico Chiesa",      from: "Juventus",          to: "Liverpool",    status: "Confirmed" },
  { player: "Martin Zubimendi",     from: "Real Sociedad",     to: "Liverpool",    status: "Rejected"  },
  { player: "Nat Phillips",         from: "Liverpool",         to: "Undisclosed",  status: "Confirmed" },
];

const fixtures = [
  { venue: "H", opponent: "Man City",  date: "Sat 1 Feb", time: "17:30" },
  { venue: "A", opponent: "PSG",       date: "Tue 4 Feb", time: "20:00" },
  { venue: "H", opponent: "Arsenal",   date: "Sun 9 Feb", time: "16:30" },
];

const statusStyles: Record<string, string> = {
  Confirmed: "bg-ki-teal text-ki-white",
  Rumoured:  "bg-ki-sand text-ki-teal",
  Rejected:  "bg-ki-charcoal text-ki-white",
};

const rumourStyles: Record<string, string> = {
  Hot:  "bg-ki-red text-ki-white",
  Warm: "bg-ki-sand text-ki-teal",
  Cold: "bg-ki-sand text-ki-charcoal",
};

function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Article image" className={`w-full bg-ki-sand flex items-center justify-center ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-ki-charcoal opacity-30" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 20.25h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12.75c0 .828.672 1.5 1.5 1.5z" />
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="h-10 w-10 rounded-full bg-ki-sand flex items-center justify-center shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ki-charcoal opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    </div>
  );
}

export default function TransferTalk() {
  const [transferArticles, setTransferArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    getArticlesByCategory("transfers", 4)
      .then(setTransferArticles)
      .catch(console.error)
      .finally(() => setLoadingArticles(false));
  }, []);

  const { theme } = useTheme();
  const isHome = theme === "home";
  const pageBg       = isHome ? "bg-ki-gold"    : "bg-ki-cream";
  const accentText   = isHome ? "text-ki-red"   : "text-ki-teal";
  const accentBorder = isHome ? "border-ki-red" : "border-ki-teal";
  const accentBg     = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const buttonBg     = isHome ? "bg-ki-red"     : "bg-ki-teal";

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Page header */}
            <div className="flex flex-col gap-1 pb-4 border-b border-ki-sand">
              <h1 className="text-ki-black font-bold text-3xl">Transfer Talk</h1>
              <p className="text-ki-charcoal opacity-50 text-sm">
                The latest Liverpool FC transfer news, rumours and analysis
              </p>
            </div>

            {/* Rumour Mill strip */}
            <section className="flex flex-col gap-3">
              <span className={`text-xs font-bold tracking-widest ${accentText}`}>RUMOUR MILL</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {rumours.map((rumour, i) => (
                  <div
                    key={i}
                    className={`bg-ki-white rounded-xl p-4 flex flex-col gap-2 animate-slide-in-left ${rumour.status === "Hot" ? "hot-glow" : ""}`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-ki-black font-bold text-sm leading-snug">{rumour.player}</p>
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 ${rumourStyles[rumour.status]}`}>
                        {rumour.status}
                      </span>
                    </div>
                    <p className="text-ki-charcoal text-sm opacity-80 leading-snug">{rumour.summary}</p>
                    <p className="text-ki-charcoal text-xs opacity-50 mt-auto">via {rumour.source}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Transfer News Grid */}
            <section className="flex flex-col gap-3">
              <h2 className="text-ki-black font-bold text-xl">Transfer News</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loadingArticles
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-ki-white rounded-xl overflow-hidden flex flex-col animate-pulse">
                        <div className="h-40 bg-ki-sand" />
                        <div className="p-4 flex flex-col gap-3">
                          <div className="h-4 w-20 bg-ki-sand rounded" />
                          <div className="h-5 bg-ki-sand rounded" />
                          <div className="h-4 bg-ki-sand rounded w-3/4" />
                        </div>
                      </div>
                    ))
                  : transferArticles.length > 0
                  ? transferArticles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                      >
                        <PlaceholderImage className="h-40" />
                        <div className="flex flex-col gap-2 p-4 flex-1">
                          <span className={`inline-block bg-ki-sand text-xs font-semibold rounded px-2 py-1 self-start uppercase ${accentText}`}>
                            {formatCategory(article.category)}
                          </span>
                          <h3 className="text-ki-black font-bold text-sm leading-snug">{article.title}</h3>
                          <p className="text-ki-charcoal text-sm opacity-70 line-clamp-2">{article.excerpt}</p>
                          <p className="text-ki-charcoal text-xs opacity-50 mt-auto pt-1">
                            Andy Anfield · {timeAgo(article.created_at)}
                          </p>
                        </div>
                      </article>
                    ))
                  : transferNews.map((article) => (
                      <article
                        key={article.id}
                        className="bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200"
                      >
                        <PlaceholderImage className="h-40" />
                        <div className="flex flex-col gap-2 p-4 flex-1">
                          <span className={`inline-block bg-ki-sand text-xs font-semibold rounded px-2 py-1 self-start uppercase ${accentText}`}>
                            Transfer
                          </span>
                          <h3 className="text-ki-black font-bold text-sm leading-snug">{article.headline}</h3>
                          <p className="text-ki-charcoal text-sm opacity-70 line-clamp-2">{article.excerpt}</p>
                          <p className="text-ki-charcoal text-xs opacity-50 mt-auto pt-1">{article.meta}</p>
                        </div>
                      </article>
                    ))
                }
              </div>
            </section>

            {/* Opinion strip */}
            <div className={`bg-ki-white rounded-xl border-l-4 ${accentBorder} p-6 flex flex-col gap-4`}>
              <span className={`text-xs font-bold tracking-widest ${accentText}`}>OPINION</span>
              <h2
                className="text-ki-black font-bold text-2xl leading-snug"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                The transfer window is open. Here is what Liverpool must do.
              </h2>
              <p className="text-ki-charcoal text-sm leading-relaxed opacity-80">
                Slot has earned the right to reshape this squad in his image. The foundations are there — but two or three surgical additions in the right areas could turn a title-winning side into a dynasty. Here is exactly where the money should go.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <Avatar />
                  <div>
                    <p className="text-ki-black font-semibold text-sm">Andy Anfield</p>
                    <p className="text-ki-charcoal text-sm opacity-50">Kop Insider Reporter</p>
                  </div>
                </div>
                <button className={`${buttonBg} text-ki-white rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity shrink-0`}>
                  Read Full Article
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar — 1 col */}
          <aside className="flex flex-col gap-6">

            {/* Transfer Tracker */}
            <div className="bg-ki-white rounded-xl p-4">
              <h3 className="text-ki-black font-bold text-base mb-4">Transfer Tracker</h3>
              <div className="flex flex-col gap-3">
                {trackerTransfers.map((t, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-ki-black font-semibold text-sm">{t.player}</p>
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 ${statusStyles[t.status]}`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-ki-charcoal text-xs opacity-50">
                      {t.from} → {t.to}
                    </p>
                    {i < trackerTransfers.length - 1 && (
                      <div className="border-b border-ki-sand mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Fixtures */}
            <div className="bg-ki-white rounded-xl p-4">
              <h3 className="text-ki-black font-bold text-base mb-3">Next Fixtures</h3>
              <div className="flex flex-col gap-3">
                {fixtures.map((fixture, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-xs font-bold rounded px-2 py-0.5 shrink-0 ${
                      fixture.venue === "H" ? `${accentBg} text-ki-white` : "bg-ki-sand text-ki-charcoal"
                    }`}>
                      {fixture.venue}
                    </span>
                    <span className="text-ki-black text-sm font-medium flex-1">{fixture.opponent}</span>
                    <div className="text-right shrink-0">
                      <p className="text-ki-charcoal text-xs opacity-60">{fixture.date}</p>
                      <p className="text-ki-charcoal text-xs font-semibold">{fixture.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
