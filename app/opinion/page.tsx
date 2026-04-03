"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { getOpinionArticles } from "@/lib/articles";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

const filters = ["All", "Match Reaction", "Transfers", "Player Form", "Tactics", "Club News"];

const featuredOpinion = {
  headline: "Slot has got this wrong and nobody wants to say it. I will.",
  excerpt:
    "Everyone is too busy celebrating the points tally to notice the cracks forming in behind. The system that looked unbreakable in October is starting to show its seams, and the manager needs to hear it.",
  date: "2 hours ago",
};

const opinionCards = [
  {
    id: 1,
    tag: "MATCH REACTION",
    headline: "That Was Not a Performance. That Was a Warning Sign Dressed Up as Three Points.",
    excerpt: "We won. The scoreline flatters us. If you watched that and felt comfortable, you weren't watching the same game I was.",
    date: "4 hours ago",
  },
  {
    id: 2,
    tag: "TRANSFERS",
    headline: "Liverpool Are About to Make the Same Transfer Mistake They Always Make",
    excerpt: "The target is exciting. The fee is manageable. The timing is completely wrong, and nobody at Anfield wants to admit it.",
    date: "Yesterday",
  },
  {
    id: 3,
    tag: "PLAYER FORM",
    headline: "Salah Is Running Out of Time to Sign — And He Knows It",
    excerpt: "The body language tells a story. The performances tell a different one. The contract situation ties them both together in a way that should worry every Red.",
    date: "2 days ago",
  },
  {
    id: 4,
    tag: "TACTICS",
    headline: "Why the High Line Will Cost Liverpool a Trophy Before the Season Is Out",
    excerpt: "Every manager who has tried it eventually blinks. Slot hasn't. And while it has been spectacular, there is one fixture on the horizon that could expose everything.",
    date: "3 days ago",
  },
];

const mostRead = [
  { title: "Slot has got this wrong and nobody wants to say it.",          date: "2 hours ago"  },
  { title: "Salah Is Running Out of Time to Sign — And He Knows It",      date: "2 days ago"   },
  { title: "That Was Not a Performance. That Was a Warning Sign.",         date: "4 hours ago"  },
  { title: "Liverpool Are About to Make the Same Transfer Mistake Again",  date: "Yesterday"    },
  { title: "Why the High Line Will Cost Liverpool a Trophy",               date: "3 days ago"   },
];

const fixtures = [
  { venue: "H", opponent: "Man City",  date: "Sat 1 Feb",  time: "17:30" },
  { venue: "A", opponent: "PSG",       date: "Tue 4 Feb",  time: "20:00" },
  { venue: "H", opponent: "Arsenal",   date: "Sun 9 Feb",  time: "16:30" },
];

const leagueTable = [
  { pos: 1, club: "Liverpool",   p: 24, gd: "+38", pts: 58, isLiverpool: true  },
  { pos: 2, club: "Arsenal",     p: 24, gd: "+22", pts: 51, isLiverpool: false },
  { pos: 3, club: "Man City",    p: 24, gd: "+19", pts: 48, isLiverpool: false },
  { pos: 4, club: "Chelsea",     p: 24, gd: "+11", pts: 44, isLiverpool: false },
  { pos: 5, club: "Aston Villa", p: 24, gd: "+8",  pts: 40, isLiverpool: false },
  { pos: 6, club: "Tottenham",   p: 24, gd: "+6",  pts: 38, isLiverpool: false },
  { pos: 7, club: "Newcastle",   p: 24, gd: "+5",  pts: 36, isLiverpool: false },
  { pos: 8, club: "Man United",  p: 24, gd: "-2",  pts: 31, isLiverpool: false },
];

function Avatar({ size = "sm" }: { size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "h-20 w-20" : "h-10 w-10";
  const icon = size === "lg" ? "h-9 w-9" : "h-5 w-5";
  return (
    <div className={`${dim} rounded-full bg-ki-sand flex items-center justify-center shrink-0`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`${icon} text-ki-charcoal opacity-40`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    </div>
  );
}

function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Article image" className={`w-full bg-ki-sand flex items-center justify-center ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ki-charcoal opacity-30" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 20.25h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12.75c0 .828.672 1.5 1.5 1.5z" />
      </svg>
    </div>
  );
}

export default function Opinion() {
  const { theme } = useTheme();
  const isHome = theme === "home";
  const pageBg       = isHome ? "bg-ki-gold"    : "bg-ki-cream";
  const accentText   = isHome ? "text-ki-red"   : "text-ki-teal";
  const accentBorder = isHome ? "border-ki-red" : "border-ki-teal";
  const accentBg     = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const buttonBg     = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const tableAccent  = isHome ? "text-ki-red"   : "text-ki-teal";

  const [activeFilter, setActiveFilter] = useState("All");
  const [opinionArticles, setOpinionArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    getOpinionArticles(5)
      .then(setOpinionArticles)
      .catch(console.error)
      .finally(() => setLoadingArticles(false));
  }, []);

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Andy Anfield hero header */}
            <div className={`bg-ki-white rounded-xl border-l-4 ${accentBorder} p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5`}>
              <Avatar size="lg" />
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <span className={`text-xs font-bold tracking-widest ${accentText}`}>KOP INSIDER OPINION</span>
                <h1 className="text-ki-black font-bold text-3xl leading-tight">Andy Anfield</h1>
                <p className="text-ki-charcoal opacity-50 text-sm">Kop Insider Reporter</p>
                <p className="text-ki-charcoal text-sm leading-relaxed mt-1">
                  The truth about Liverpool, told by someone who actually cares. Passionate. Informed. Brutal when it matters.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <a href="#" className={`flex items-center gap-1.5 text-xs font-semibold ${accentText} hover:opacity-70 transition-opacity`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @AndyAnfield
                  </a>
                </div>
              </div>
            </div>

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

            {/* Featured Opinion */}
            <article className="bg-ki-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 animate-fade-in-up">
              <PlaceholderImage className="h-64 sm:h-80" />
              <div className="p-6 flex flex-col gap-3">
                <span className={`text-xs font-bold tracking-widest ${accentText}`}>FEATURED OPINION</span>
                <h2
                  className="text-ki-black font-bold text-2xl leading-snug"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {featuredOpinion.headline}
                </h2>
                <p className="text-ki-charcoal text-sm opacity-70 leading-relaxed">
                  {featuredOpinion.excerpt}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-ki-sand">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" />
                    <div>
                      <p className="text-ki-black font-semibold text-sm">Andy Anfield</p>
                      <p className="text-ki-charcoal text-xs opacity-50">{featuredOpinion.date}</p>
                    </div>
                  </div>
                  <button className={`${buttonBg} text-ki-white rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity shrink-0`}>
                    Read Full Article
                  </button>
                </div>
              </div>
            </article>

            {/* Opinion grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loadingArticles
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-ki-white rounded-xl overflow-hidden flex flex-col animate-pulse">
                      <div className="h-40 bg-ki-sand" />
                      <div className="p-4 flex flex-col gap-3">
                        <div className="h-4 w-24 bg-ki-sand rounded" />
                        <div className="h-5 bg-ki-sand rounded" />
                        <div className="h-4 bg-ki-sand rounded w-3/4" />
                        <div className="h-3 w-20 bg-ki-sand rounded mt-2" />
                      </div>
                    </div>
                  ))
                : opinionArticles.length > 0
                ? opinionArticles.map((article, i) => (
                    <article
                      key={article.id}
                      className="bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <PlaceholderImage className="h-40" />
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <span className={`inline-block bg-ki-sand text-xs font-semibold rounded px-2 py-1 self-start uppercase ${accentText}`}>
                          {formatCategory(article.category)}
                        </span>
                        <h3
                          className="text-ki-black font-bold text-sm leading-snug"
                          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                          {article.title}
                        </h3>
                        <p className="text-ki-charcoal text-sm opacity-70 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center gap-2 mt-auto pt-2">
                          <Avatar size="sm" />
                          <div>
                            <p className="text-ki-black text-xs font-semibold">Andy Anfield</p>
                            <p className="text-ki-charcoal text-xs opacity-50">{timeAgo(article.created_at)}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                : opinionCards.map((card, i) => (
                    <article
                      key={card.id}
                      className="bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <PlaceholderImage className="h-40" />
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <span className={`inline-block bg-ki-sand text-xs font-semibold rounded px-2 py-1 self-start ${accentText}`}>
                          {card.tag}
                        </span>
                        <h3
                          className="text-ki-black font-bold text-sm leading-snug"
                          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                          {card.headline}
                        </h3>
                        <p className="text-ki-charcoal text-sm opacity-70 line-clamp-2">{card.excerpt}</p>
                        <div className="flex items-center gap-2 mt-auto pt-2">
                          <Avatar size="sm" />
                          <div>
                            <p className="text-ki-black text-xs font-semibold">Andy Anfield</p>
                            <p className="text-ki-charcoal text-xs opacity-50">{card.date}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
              }
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-2">
              <button className={`border ${accentBorder} ${accentText} rounded-full px-8 py-3 text-sm font-semibold transition-colors min-h-[44px]`}>
                Load More
              </button>
            </div>

          </div>

          {/* Sidebar — 1 col */}
          <aside className="flex flex-col gap-6">

            {/* Most Read */}
            <div className="bg-ki-white rounded-xl p-4">
              <h3 className="text-ki-black font-bold text-base mb-4">Most Read Opinions</h3>
              <div className="flex flex-col gap-4">
                {mostRead.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`text-2xl font-bold ${accentText} opacity-30 leading-none shrink-0 w-5 text-right`}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-ki-black font-semibold text-sm leading-snug">{item.title}</p>
                      <p className="text-ki-charcoal text-xs opacity-50 mt-0.5">{item.date}</p>
                    </div>
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

            {/* League Table condensed */}
            <div className="bg-ki-white rounded-xl p-4">
              <h3 className="text-ki-black font-bold text-base mb-3">Premier League</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-ki-charcoal opacity-50 text-xs border-b border-ki-sand">
                    <th className="text-left font-medium pb-2 w-6">#</th>
                    <th className="text-left font-medium pb-2">Club</th>
                    <th className="text-center font-medium pb-2 w-6">P</th>
                    <th className="text-center font-medium pb-2 w-8">GD</th>
                    <th className="text-center font-medium pb-2 w-8">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {leagueTable.map((row) => (
                    <tr key={row.pos} className={row.isLiverpool ? "bg-ki-sand" : ""}>
                      <td className={`py-1 pl-1 text-xs ${row.isLiverpool ? `${tableAccent} font-bold` : "text-ki-charcoal opacity-50"}`}>
                        {row.pos}
                      </td>
                      <td className={`py-1 text-xs font-medium ${row.isLiverpool ? `${tableAccent} font-bold` : "text-ki-black"}`}>
                        {row.club}
                      </td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>
                        {row.p}
                      </td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>
                        {row.gd}
                      </td>
                      <td className={`py-1 pr-1 text-center text-xs font-bold ${row.isLiverpool ? tableAccent : "text-ki-black"}`}>
                        {row.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
