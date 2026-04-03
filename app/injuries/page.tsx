"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { getArticlesByCategory } from "@/lib/articles";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

const injuries = [
  { player: "Diogo Jota",               position: "FWD", injury: "Knee ligament",  severity: "Serious",  return: "April 2025"   },
  { player: "Joel Matip",               position: "CB",  injury: "ACL",            severity: "Serious",  return: "Season over"  },
  { player: "Trent Alexander-Arnold",   position: "RB",  injury: "Hamstring",      severity: "Moderate", return: "1–2 weeks"    },
  { player: "Harvey Elliott",           position: "MID", injury: "Ankle sprain",   severity: "Minor",    return: "This week"    },
  { player: "Stefan Bajčetić",          position: "MID", injury: "Muscle strain",  severity: "Moderate", return: "3 weeks"      },
  { player: "Ibrahima Konaté",          position: "CB",  injury: "Thigh",          severity: "Minor",    return: "10 days"      },
];

const returningSoon = [
  { player: "Trent Alexander-Arnold", position: "RB",  date: "Sat 1 Feb",  progress: 80 },
  { player: "Harvey Elliott",         position: "MID", date: "Wed 29 Jan", progress: 90 },
  { player: "Ibrahima Konaté",        position: "CB",  date: "Sat 1 Feb",  progress: 75 },
];

const doubtful = [
  { player: "Luis Díaz",       reason: "Knock sustained in training Thursday" },
  { player: "Andy Robertson",  reason: "Carrying a shoulder complaint, monitored" },
  { player: "Alexis Mac Allister", reason: "Illness — missed Friday session"  },
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

const severityStyles: Record<string, string> = {
  Serious:  "bg-ki-charcoal text-ki-white",
  Moderate: "bg-ki-sand text-ki-teal",
  Minor:    "bg-ki-sand text-ki-charcoal",
};

const injured   = injuries.filter((i) => i.severity === "Serious" || i.severity === "Moderate").length;
const doubtfulCount = doubtful.length;
const available = 25 - injuries.length - doubtfulCount;

function Avatar() {
  return (
    <div className="h-10 w-10 rounded-full bg-ki-sand flex items-center justify-center shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ki-charcoal opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    </div>
  );
}

export default function Injuries() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 50); return () => clearTimeout(id); }, []);

  const [injuryArticles, setInjuryArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  useEffect(() => {
    getArticlesByCategory("injuries", 4)
      .then(setInjuryArticles)
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
  const progressFill = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const tableAccentText = isHome ? "text-ki-red" : "text-ki-teal";

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main — 70% */}
          <div className="w-full lg:w-[70%] flex flex-col gap-8">

            {/* Page header */}
            <div className="flex flex-col gap-1 pb-4 border-b border-ki-sand">
              <h1 className="text-ki-black font-bold text-3xl">Injury Updates</h1>
              <p className="text-ki-charcoal opacity-50 text-sm">
                The latest Liverpool FC injury and fitness news
              </p>
            </div>

            {/* Squad Status Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: injured,        label: "Currently Injured" },
                { value: doubtfulCount,  label: "Doubtful"          },
                { value: available,      label: "Available"         },
              ].map((stat, i) => (
                <div key={i} className="bg-ki-white border border-ki-sand rounded-xl p-4 flex flex-col items-center justify-center text-center gap-1">
                  <span className="text-ki-black font-bold text-4xl">{stat.value}</span>
                  <span className="text-ki-charcoal opacity-50 text-xs">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Current Injuries Table */}
            <section className="flex flex-col gap-3">
              <h2 className="text-ki-black font-bold text-xl">Current Injuries</h2>
              <div className="overflow-x-auto rounded-xl border border-ki-sand">
              <div className="min-w-[500px]">
                {/* Header */}
                <div className="grid grid-cols-[2fr_auto_2fr_auto_auto] gap-4 px-4 py-3 bg-ki-white border-b border-ki-sand text-ki-charcoal opacity-60 text-xs font-semibold uppercase tracking-wide">
                  <span>Player</span>
                  <span className="hidden sm:block">Pos</span>
                  <span>Injury</span>
                  <span className="hidden sm:block">Severity</span>
                  <span>Return</span>
                </div>
                {injuries.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[2fr_auto_2fr_auto_auto] gap-4 px-4 py-3 items-center ${
                      i % 2 === 0 ? "bg-ki-white" : "bg-ki-cream"
                    }`}
                  >
                    <span className="text-ki-black font-semibold text-sm">{row.player}</span>
                    <span className={`hidden sm:block text-xs font-bold rounded px-2 py-0.5 bg-ki-sand ${tableAccentText}`}>
                      {row.position}
                    </span>
                    <span className="text-ki-charcoal text-sm opacity-80">{row.injury}</span>
                    <span className={`hidden sm:inline-block text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 ${severityStyles[row.severity]}`}>
                      {row.severity}
                    </span>
                    <span className="text-ki-charcoal text-xs opacity-60 shrink-0">{row.return}</span>
                  </div>
                ))}
              </div>
              </div>
            </section>

            {/* Returning Soon */}
            <section className="flex flex-col gap-3">
              <h2 className="text-ki-black font-bold text-xl">Returning Soon</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {returningSoon.map((p, i) => (
                  <div key={i} className="bg-ki-white rounded-xl p-4 flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-ki-black font-bold text-sm leading-snug">{p.player}</p>
                      <span className={`text-xs font-semibold rounded px-2 py-0.5 bg-ki-sand shrink-0 ${tableAccentText}`}>
                        {p.position}
                      </span>
                    </div>
                    <p className="text-ki-charcoal text-xs opacity-50">Expected: {p.date}</p>
                    {/* Progress bar — animates from 0 to final value on mount */}
                    <div>
                      <div className="w-full bg-ki-sand rounded-full h-2">
                        <div
                          className={`${progressFill} h-2 rounded-full transition-all duration-700`}
                          style={{ width: mounted ? `${p.progress}%` : "0%" }}
                        />
                      </div>
                      <p className="text-ki-charcoal text-xs opacity-40 mt-1">{p.progress}% recovered</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Injury News */}
            <section className="flex flex-col gap-3">
              <h2 className="text-ki-black font-bold text-xl">Injury News</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loadingArticles
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-ki-white rounded-xl overflow-hidden flex flex-col animate-pulse">
                        <div className="h-36 bg-ki-sand" />
                        <div className="p-4 flex flex-col gap-3">
                          <div className="h-4 w-20 bg-ki-sand rounded" />
                          <div className="h-5 bg-ki-sand rounded" />
                        </div>
                      </div>
                    ))
                  : injuryArticles.length > 0
                  ? injuryArticles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-in-up"
                      >
                        <div role="img" aria-label="Article image" className="h-36 bg-ki-sand flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-ki-charcoal opacity-30" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 20.25h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12.75c0 .828.672 1.5 1.5 1.5z" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-2 p-4 flex-1">
                          <span className={`inline-block bg-ki-sand text-xs font-semibold rounded px-2 py-1 self-start uppercase ${tableAccentText}`}>
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
                  : (
                      <p className="text-ki-charcoal opacity-50 text-sm col-span-2">No injury articles yet.</p>
                    )
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
                Three players out. One system broken. Here is the truth about Liverpool's injury crisis.
              </h2>
              <p className="text-ki-charcoal text-sm leading-relaxed opacity-80">
                It is not bad luck. It is not a coincidence. When the same muscle groups keep breaking down on the same type of player, someone has to ask the question that nobody at the club wants to answer. The numbers tell a damning story.
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

          {/* Sidebar — 30% */}
          <aside className="w-full lg:w-[30%] flex flex-col gap-6">

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

            {/* Doubtful Players */}
            <div className="bg-ki-white rounded-xl p-4">
              <h3 className="text-ki-black font-bold text-base mb-3">Doubtful</h3>
              <div className="flex flex-col gap-3">
                {doubtful.map((d, i) => (
                  <div key={i} className={`flex flex-col gap-1 ${i < doubtful.length - 1 ? "pb-3 border-b border-ki-sand" : ""}`}>
                    <p className="text-ki-black font-semibold text-sm">{d.player}</p>
                    <p className="text-ki-charcoal text-xs opacity-50">{d.reason}</p>
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
                      <td className={`py-1 pl-1 text-xs ${row.isLiverpool ? `${tableAccentText} font-bold` : "text-ki-charcoal opacity-50"}`}>
                        {row.pos}
                      </td>
                      <td className={`py-1 text-xs font-medium ${row.isLiverpool ? `${tableAccentText} font-bold` : "text-ki-black"}`}>
                        {row.club}
                      </td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>
                        {row.p}
                      </td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>
                        {row.gd}
                      </td>
                      <td className={`py-1 pr-1 text-center text-xs font-bold ${row.isLiverpool ? tableAccentText : "text-ki-black"}`}>
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
