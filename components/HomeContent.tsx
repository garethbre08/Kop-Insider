"use client";

import ArticleCard from "@/components/ArticleCard";
import OpinionStrip from "@/components/OpinionStrip";
import MatchdayHeroCard from "@/components/MatchdayHeroCard";
import { useMatchday } from "@/context/MatchdayContext";
import { useTheme } from "@/context/ThemeContext";
import type { Article } from "@/lib/database.types";

const leagueTable = [
  { pos: 1, club: "Liverpool",   p: 24, gd: "+38", pts: 58, isLiverpool: true  },
  { pos: 2, club: "Arsenal",     p: 24, gd: "+22", pts: 51, isLiverpool: false },
  { pos: 3, club: "Man City",    p: 24, gd: "+19", pts: 48, isLiverpool: false },
  { pos: 4, club: "Chelsea",     p: 24, gd: "+11", pts: 44, isLiverpool: false },
  { pos: 5, club: "Aston Villa", p: 24, gd: "+8",  pts: 40, isLiverpool: false },
];

const fixtures = [
  { venue: "H", opponent: "Everton",    date: "Sat 1 Feb",  time: "12:30" },
  { venue: "A", opponent: "Tottenham",  date: "Sat 8 Feb",  time: "17:30" },
  { venue: "H", opponent: "Wolves",     date: "Sat 15 Feb", time: "15:00" },
];

type HomeContentProps = {
  featuredArticle: Article | null;
  latestArticles: Article[];
  opinionArticle: Article | null;
};

export default function HomeContent({
  featuredArticle,
  latestArticles,
  opinionArticle,
}: HomeContentProps) {
  const { isMatchday } = useMatchday();
  const { theme } = useTheme();
  const isHome = theme === "home";
  const pageBg     = isHome ? "bg-ki-gold"   : "bg-ki-cream";
  const accentText = isHome ? "text-ki-red"  : "text-ki-teal";
  const accentBg   = isHome ? "bg-ki-red"    : "bg-ki-teal";

  const [a0, a1, a2, a3, a4] = latestArticles;

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Main bento grid — 70% */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">

          {/* Hero — replaced by matchday card on matchdays */}
          {isMatchday ? (
            <MatchdayHeroCard />
          ) : (
            <ArticleCard article={featuredArticle} size="hero" delay={0} />
          )}

          {/* Two medium cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ArticleCard article={a0 ?? null} size="medium" delay={100} />
            <ArticleCard article={a1 ?? null} size="medium" delay={200} />
          </div>

          {/* Three small cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ArticleCard article={a2 ?? null} size="small" delay={150} />
            <ArticleCard article={a3 ?? null} size="small" delay={250} />
            <ArticleCard article={a4 ?? null} size="small" delay={350} />
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
                  <tr key={row.pos} className={row.isLiverpool ? "bg-ki-sand rounded" : ""}>
                    <td className={`py-1.5 pl-1 text-xs ${row.isLiverpool ? `${accentText} font-bold` : "text-ki-charcoal opacity-50"}`}>{row.pos}</td>
                    <td className={`py-1.5 text-sm font-medium ${row.isLiverpool ? accentText : "text-ki-black"}`}>{row.club}</td>
                    <td className={`py-1.5 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>{row.p}</td>
                    <td className={`py-1.5 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>{row.gd}</td>
                    <td className={`py-1.5 pr-1 text-center text-xs font-bold ${row.isLiverpool ? accentText : "text-ki-black"}`}>{row.pts}</td>
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

      {/* Opinion strip — full width below bento grid */}
      <div className="mt-8">
        <OpinionStrip article={opinionArticle} />
      </div>
    </div>
    </div>
  );
}
