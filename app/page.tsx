"use client";

import Link from "next/link";
import OpinionStrip from "@/components/OpinionStrip";
import MatchdayHeroCard from "@/components/MatchdayHeroCard";
import { useMatchday } from "@/context/MatchdayContext";

const articles = [
  {
    id: 1,
    category: "Match Report",
    headline: "Dominant Display Sends Liverpool Seven Points Clear at the Top",
    excerpt:
      "A stunning first-half performance from Salah and Núñez put the game beyond doubt before the break, as Arne Slot's side continue their relentless march towards the title.",
    meta: "Andy Anfield · 2 hours ago",
    hero: true,
  },
  {
    id: 2,
    category: "Transfer Talk",
    headline: "Slot Drops Hint Over January Signing as Midfield Cover Sought",
    excerpt:
      "The Reds boss refused to rule out activity in the winter window after a string of injuries left the engine room stretched.",
    meta: "Andy Anfield · 4 hours ago",
    hero: false,
  },
  {
    id: 3,
    category: "Opinion",
    headline: "Why Liverpool's High Line Is the Bravest Tactical Bet in the League",
    excerpt:
      "Every manager who has tried it has eventually blinked. Slot hasn't — and it's paying off in spectacular fashion.",
    meta: "Andy Anfield · 6 hours ago",
    hero: false,
  },
  {
    id: 4,
    category: "Injuries",
    headline: "Trent Returns to Full Training Ahead of Derby Clash",
    excerpt:
      "The right-back has been cleared to feature after missing three games with a hamstring complaint.",
    meta: "Andy Anfield · 8 hours ago",
    hero: false,
  },
  {
    id: 5,
    category: "Match Centre",
    headline: "Player Ratings: Who Shone and Who Struggled Against City",
    excerpt:
      "A controversial nine from us for Salah, a harsh five for the keeper. See if you agree with our verdicts.",
    meta: "Andy Anfield · 10 hours ago",
    hero: false,
  },
  {
    id: 6,
    category: "Transfer Talk",
    headline: "Florentino Opens Door on Bellingham Return — But Liverpool Move First",
    excerpt:
      "Whispers from Spain suggest the midfielder is unsettled, and Anfield scouts have been given the green light to run the rule.",
    meta: "Andy Anfield · 12 hours ago",
    hero: false,
  },
];

const leagueTable = [
  { pos: 1, club: "Liverpool", p: 24, gd: "+38", pts: 58, isLiverpool: true },
  { pos: 2, club: "Arsenal", p: 24, gd: "+22", pts: 51, isLiverpool: false },
  { pos: 3, club: "Man City", p: 24, gd: "+19", pts: 48, isLiverpool: false },
  { pos: 4, club: "Chelsea", p: 24, gd: "+11", pts: 44, isLiverpool: false },
  { pos: 5, club: "Aston Villa", p: 24, gd: "+8", pts: 40, isLiverpool: false },
];

const fixtures = [
  { venue: "H", opponent: "Everton", date: "Sat 1 Feb", time: "12:30" },
  { venue: "A", opponent: "Tottenham", date: "Sat 8 Feb", time: "17:30" },
  { venue: "H", opponent: "Wolves", date: "Sat 15 Feb", time: "15:00" },
];

function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full bg-ki-sand flex items-center justify-center ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ki-charcoal opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 20.25h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12.75c0 .828.672 1.5 1.5 1.5z" />
      </svg>
    </div>
  );
}

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-ki-sand text-ki-teal text-xs font-semibold rounded px-2 py-1">
      {label}
    </span>
  );
}

function ArticleCard({ article, size = "small", delay = 0 }: { article: typeof articles[0]; size?: "hero" | "medium" | "small"; delay?: number }) {
  const imageHeight = size === "hero" ? "h-64 sm:h-80" : size === "medium" ? "h-44" : "h-32";
  const headlineSize = size === "hero" ? "text-xl sm:text-2xl" : size === "medium" ? "text-base" : "text-sm";

  return (
    <article
      className="group bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="overflow-hidden">
        <PlaceholderImage className={`${imageHeight} group-hover:scale-105 transition-transform duration-300`} />
      </div>
      <div className="flex flex-col gap-2 p-4 flex-1">
        <CategoryTag label={article.category} />
        <h2 className={`text-ki-black font-bold leading-snug ${headlineSize}`}>
          {article.headline}
        </h2>
        {(size === "hero" || size === "medium") && (
          <p className="text-ki-charcoal text-sm line-clamp-2 opacity-70">
            {article.excerpt}
          </p>
        )}
        <p className="text-ki-charcoal text-xs opacity-50 mt-auto pt-1">
          <Link href="/author/andy-anfield" className="hover:underline">Andy Anfield</Link>
          {article.meta.replace("Andy Anfield", "")}
        </p>
      </div>
    </article>
  );
}

export default function Home() {
  const { isMatchday } = useMatchday();
  const [hero, medium1, medium2, small1, small2, small3] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Main bento grid — 70% */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">

          {/* Hero — replaced by matchday card on matchdays */}
          {isMatchday ? <MatchdayHeroCard /> : <ArticleCard article={hero} size="hero" delay={0} />}

          {/* Two medium cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ArticleCard article={medium1} size="medium" delay={100} />
            <ArticleCard article={medium2} size="medium" delay={200} />
          </div>

          {/* Three small cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ArticleCard article={small1} size="small" delay={150} />
            <ArticleCard article={small2} size="small" delay={250} />
            <ArticleCard article={small3} size="small" delay={350} />
          </div>
        </div>

        {/* Sidebar — 30% */}
        <aside className="w-full lg:w-[30%] flex flex-col gap-6">

          {/* Premier League Table */}
          <div className="bg-ki-white rounded-xl p-4">
            <h3 className="text-ki-black font-bold text-base mb-3">Premier League Table</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-ki-charcoal opacity-50 text-xs">
                  <th className="text-left font-medium pb-2 w-6">#</th>
                  <th className="text-left font-medium pb-2">Club</th>
                  <th className="text-center font-medium pb-2 w-6">P</th>
                  <th className="text-center font-medium pb-2 w-8">GD</th>
                  <th className="text-center font-medium pb-2 w-8">Pts</th>
                </tr>
              </thead>
              <tbody>
                {leagueTable.map((row) => (
                  <tr
                    key={row.pos}
                    className={`${row.isLiverpool ? "bg-ki-sand rounded" : ""}`}
                  >
                    <td className={`py-1.5 pl-1 text-xs ${row.isLiverpool ? "text-ki-teal font-bold" : "text-ki-charcoal opacity-50"}`}>{row.pos}</td>
                    <td className={`py-1.5 text-sm font-medium ${row.isLiverpool ? "text-ki-teal" : "text-ki-black"}`}>{row.club}</td>
                    <td className={`py-1.5 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>{row.p}</td>
                    <td className={`py-1.5 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>{row.gd}</td>
                    <td className={`py-1.5 pr-1 text-center text-xs font-bold ${row.isLiverpool ? "text-ki-teal" : "text-ki-black"}`}>{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Next Fixtures */}
          <div className="bg-ki-white rounded-xl p-4">
            <h3 className="text-ki-black font-bold text-base mb-3">Next Fixtures</h3>
            <div className="flex flex-col gap-3">
              {fixtures.map((fixture, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-xs font-bold rounded px-2 py-0.5 shrink-0 ${
                    fixture.venue === "H"
                      ? "bg-ki-teal text-ki-white"
                      : "bg-ki-sand text-ki-teal"
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

      {/* Opinion strip — full width below bento grid */}
      <div className="mt-8">
        <OpinionStrip />
      </div>
    </div>
  );
}
