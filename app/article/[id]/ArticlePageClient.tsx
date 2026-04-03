"use client";

import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { useTheme } from "@/context/ThemeContext";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

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

const fixtures = [
  { venue: "H", opponent: "Everton",    date: "Sat 1 Feb",  time: "12:30" },
  { venue: "A", opponent: "Tottenham",  date: "Sat 8 Feb",  time: "17:30" },
  { venue: "H", opponent: "Wolves",     date: "Sat 15 Feb", time: "15:00" },
];

type Props = {
  article: Article;
  related: Article[];
};

export default function ArticlePageClient({ article, related }: Props) {
  const { theme } = useTheme();
  const isHome = theme === "home";

  const accentText    = isHome ? "text-ki-red"    : "text-ki-teal";
  const accentBg      = isHome ? "bg-ki-red"      : "bg-ki-teal";
  const accentBorder  = isHome ? "border-ki-red"  : "border-ki-teal";
  const tagText       = isHome ? "text-ki-red"    : "text-ki-teal";
  const tableAccent   = isHome ? "text-ki-red"    : "text-ki-teal";

  const paragraphs = article.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const [firstParagraph, ...restParagraphs] = paragraphs;
  const dropCapChar  = firstParagraph?.charAt(0) ?? "";
  const dropCapRest  = firstParagraph?.slice(1) ?? "";

  return (
    <div className="min-h-screen">

      {/* Back button */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 ${accentText} text-sm font-semibold hover:opacity-70 transition-opacity`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Kop Insider
        </Link>
      </div>

      {/* Article header */}
      <header className="bg-ki-white mt-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-5">
          <span className={`inline-block bg-ki-sand text-xs font-bold tracking-widest uppercase rounded px-3 py-1 self-start ${tagText}`}>
            {formatCategory(article.category)}
          </span>

          <h1 className="text-ki-black font-bold text-3xl sm:text-4xl leading-tight max-w-3xl">
            {article.title}
          </h1>

          <p className="text-ki-charcoal text-xl max-w-2xl opacity-70 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author row */}
          <div className="flex items-center gap-3 pt-2 border-t border-ki-sand">
            <div className="h-10 w-10 rounded-full bg-ki-sand flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ki-charcoal opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <Link href="/author/andy-anfield" className={`font-semibold text-sm ${accentText} hover:underline`}>
                Andy Anfield
              </Link>
              <span className="text-ki-charcoal text-xs opacity-50">Kop Insider Reporter</span>
            </div>
            <span className="text-ki-charcoal opacity-30 mx-1">·</span>
            <span className="text-ki-charcoal text-xs opacity-50">{timeAgo(article.created_at)}</span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="w-full h-96 bg-ki-sand flex items-center justify-center">
        <span className="text-ki-teal opacity-20 font-bold text-4xl tracking-widest select-none">
          KOP INSIDER
        </span>
      </div>

      {/* Body — 70/30 layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Article body — 70% */}
          <div className="w-full lg:w-[70%]">

            {/* Drop cap first paragraph */}
            {firstParagraph && (
              <p className="text-ki-charcoal text-lg leading-relaxed max-w-2xl mb-6">
                <span className={`text-6xl font-bold ${accentText} float-left leading-none mr-3 mt-1`}>
                  {dropCapChar}
                </span>
                {dropCapRest}
              </p>
            )}

            {/* Remaining paragraphs */}
            {restParagraphs.map((para, i) => (
              <p key={i} className="text-ki-charcoal text-lg leading-relaxed max-w-2xl mb-6">
                {para}
              </p>
            ))}

            {/* Source credit box */}
            <div className={`bg-ki-cream border-l-4 ${accentBorder} p-6 rounded-r-xl mt-8 flex flex-col gap-3`}>
              <p className="text-ki-black font-bold text-sm">Source &amp; Credits</p>
              <p className="text-ki-charcoal text-sm leading-relaxed">
                This article was written by Andy Anfield, Kop Insider AI Reporter, informed by reporting from{" "}
                <span className="font-semibold text-ki-black">{article.source_journalist}</span> at{" "}
                <span className="font-semibold text-ki-black">{article.source_outlet}</span>.
              </p>
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${accentText} underline text-sm font-medium hover:opacity-70 transition-opacity`}
              >
                Read the original report →
              </a>
              <p className="text-ki-charcoal text-xs opacity-50 border-t border-ki-sand pt-3">
                Kop Insider always credits original journalism. We report independently — facts inform us, words are our own.
              </p>
            </div>

            {/* Share row */}
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              <span className="text-ki-charcoal text-sm opacity-50">Share this article</span>
              <button className={`bg-ki-sand ${accentText} rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X
              </button>
              <button className={`bg-ki-sand ${accentText} rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy link
              </button>
            </div>

          </div>

          {/* Sidebar — 30% */}
          <aside className="w-full lg:w-[30%] flex flex-col gap-6">

            {/* More from Andy */}
            <div className="flex flex-col gap-3">
              <h3 className={`text-xs font-bold tracking-widest uppercase ${accentText}`}>More from Andy</h3>
              <div className="flex flex-col gap-3">
                {related.length > 0
                  ? related.map((a, i) => (
                      <ArticleCard key={a.id} article={a} size="small" delay={i * 80} />
                    ))
                  : Array.from({ length: 3 }).map((_, i) => (
                      <ArticleCard key={i} article={null} size="small" />
                    ))
                }
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

            {/* League Table */}
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
                      <td className={`py-1 pl-1 text-xs ${row.isLiverpool ? `${tableAccent} font-bold` : "text-ki-charcoal opacity-50"}`}>{row.pos}</td>
                      <td className={`py-1 text-xs font-medium ${row.isLiverpool ? `${tableAccent} font-bold` : "text-ki-black"}`}>{row.club}</td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>{row.p}</td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>{row.gd}</td>
                      <td className={`py-1 pr-1 text-center text-xs font-bold ${row.isLiverpool ? tableAccent : "text-ki-black"}`}>{row.pts}</td>
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
