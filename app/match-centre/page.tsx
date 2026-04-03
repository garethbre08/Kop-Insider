"use client";

import { useTheme } from "@/context/ThemeContext";

const results = [
  {
    opponent: "Everton",
    liverpoolScore: 3,
    opponentScore: 0,
    competition: "Premier League",
    date: "Sun 26 Jan 2025",
    outcome: "win",
  },
  {
    opponent: "Tottenham",
    liverpoolScore: 1,
    opponentScore: 1,
    competition: "FA Cup",
    date: "Wed 22 Jan 2025",
    outcome: "draw",
  },
  {
    opponent: "Nottm Forest",
    liverpoolScore: 0,
    opponentScore: 1,
    competition: "Premier League",
    date: "Sat 18 Jan 2025",
    outcome: "loss",
  },
];

const fixtures = [
  {
    opponent: "Man City",
    competition: "Premier League",
    date: "Sat 1 Feb 2025",
    time: "17:30",
    venue: "H",
  },
  {
    opponent: "PSG",
    competition: "Champions League",
    date: "Tue 4 Feb 2025",
    time: "20:00",
    venue: "A",
  },
  {
    opponent: "Arsenal",
    competition: "Premier League",
    date: "Sun 9 Feb 2025",
    time: "16:30",
    venue: "H",
  },
];

const leagueTable = [
  { pos: 1,  club: "Liverpool",       p: 24, gd: "+38", pts: 58, isLiverpool: true  },
  { pos: 2,  club: "Arsenal",         p: 24, gd: "+22", pts: 51, isLiverpool: false },
  { pos: 3,  club: "Man City",        p: 24, gd: "+19", pts: 48, isLiverpool: false },
  { pos: 4,  club: "Chelsea",         p: 24, gd: "+11", pts: 44, isLiverpool: false },
  { pos: 5,  club: "Aston Villa",     p: 24, gd: "+8",  pts: 40, isLiverpool: false },
  { pos: 6,  club: "Tottenham",       p: 24, gd: "+6",  pts: 38, isLiverpool: false },
  { pos: 7,  club: "Newcastle",       p: 24, gd: "+5",  pts: 36, isLiverpool: false },
  { pos: 8,  club: "Man United",      p: 24, gd: "-2",  pts: 31, isLiverpool: false },
  { pos: 9,  club: "Brighton",        p: 24, gd: "+3",  pts: 30, isLiverpool: false },
  { pos: 10, club: "West Ham",        p: 24, gd: "-1",  pts: 28, isLiverpool: false },
  { pos: 11, club: "Fulham",          p: 24, gd: "0",   pts: 27, isLiverpool: false },
  { pos: 12, club: "Brentford",       p: 24, gd: "-3",  pts: 26, isLiverpool: false },
  { pos: 13, club: "Wolves",          p: 24, gd: "-5",  pts: 24, isLiverpool: false },
  { pos: 14, club: "Crystal Palace",  p: 24, gd: "-4",  pts: 23, isLiverpool: false },
  { pos: 15, club: "Everton",         p: 24, gd: "-8",  pts: 20, isLiverpool: false },
  { pos: 16, club: "Nottm Forest",    p: 24, gd: "-7",  pts: 19, isLiverpool: false },
  { pos: 17, club: "Bournemouth",     p: 24, gd: "-9",  pts: 18, isLiverpool: false },
  { pos: 18, club: "Leicester",       p: 24, gd: "-14", pts: 14, isLiverpool: false },
  { pos: 19, club: "Ipswich",         p: 24, gd: "-17", pts: 12, isLiverpool: false },
  { pos: 20, club: "Southampton",     p: 24, gd: "-22", pts: 8,  isLiverpool: false },
];

function CrestCircle({ variant }: { variant: "liverpool" | "opponent" }) {
  return (
    <div className={`h-10 w-10 rounded-full shrink-0 ${variant === "liverpool" ? "bg-ki-teal" : "bg-ki-sand"}`} />
  );
}

export default function MatchCentre() {
  const { theme } = useTheme();
  const isHome = theme === "home";
  const accent = isHome ? "bg-ki-red" : "bg-ki-teal";
  const accentText = isHome ? "text-ki-red" : "text-ki-teal";
  const accentBorder = isHome ? "border-ki-red" : "border-ki-teal";
  const buttonBg = isHome ? "bg-ki-red" : "bg-ki-teal";
  const pageBg = isHome ? "bg-ki-gold" : "bg-ki-cream";

  const outcomeBorder: Record<string, string> = {
    win:  isHome ? "border-ki-red" : "border-ki-teal",
    draw: "border-ki-sand",
    loss: "border-ki-red",
  };

  return (
    <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Recent Results */}
            <section>
              <h2 className="text-ki-black font-bold text-xl mb-4">Recent Results</h2>
              <div className="flex flex-col gap-3">
                {results.map((result, i) => (
                  <div
                    key={i}
                    className={`bg-ki-white rounded-xl border-l-4 ${outcomeBorder[result.outcome]} p-4 flex items-center gap-4`}
                  >
                    {/* Liverpool side */}
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <span className="text-ki-black font-semibold text-sm hidden sm:block">Liverpool</span>
                      <CrestCircle variant="liverpool" />
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-ki-black font-bold text-2xl w-6 text-center">{result.liverpoolScore}</span>
                      <span className="text-ki-charcoal opacity-40 font-bold text-lg">–</span>
                      <span className="text-ki-black font-bold text-2xl w-6 text-center">{result.opponentScore}</span>
                    </div>

                    {/* Opponent side */}
                    <div className="flex items-center gap-3 flex-1 justify-start">
                      <CrestCircle variant="opponent" />
                      <span className="text-ki-black font-semibold text-sm hidden sm:block">{result.opponent}</span>
                    </div>

                    {/* Meta */}
                    <div className="hidden md:flex flex-col items-end shrink-0 min-w-[120px]">
                      <span className="text-ki-charcoal text-xs opacity-50">{result.competition}</span>
                      <span className="text-ki-charcoal text-xs opacity-50">{result.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Fixtures */}
            <section>
              <h2 className="text-ki-black font-bold text-xl mb-4">Upcoming Fixtures</h2>
              <div className="flex flex-col gap-3">
                {fixtures.map((fixture, i) => (
                  <div key={i} className="bg-ki-white rounded-xl p-4 flex items-center gap-4 flex-wrap">
                    {/* Liverpool side */}
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <span className="text-ki-black font-semibold text-sm hidden sm:block">Liverpool</span>
                      <CrestCircle variant="liverpool" />
                    </div>

                    {/* VS */}
                    <span className="text-ki-charcoal opacity-40 font-bold text-sm shrink-0">vs</span>

                    {/* Opponent side */}
                    <div className="flex items-center gap-3 flex-1 justify-start">
                      <CrestCircle variant="opponent" />
                      <span className="text-ki-black font-semibold text-sm hidden sm:block">{fixture.opponent}</span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col items-end gap-1 shrink-0 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold rounded px-2 py-0.5 ${
                          fixture.venue === "H" ? `${accent} text-ki-white` : "bg-ki-sand text-ki-charcoal"
                        }`}>
                          {fixture.venue === "H" ? "Home" : "Away"}
                        </span>
                        <span className={`text-xs font-semibold ${accentText}`}>{fixture.competition}</span>
                      </div>
                      <span className="text-ki-charcoal text-xs opacity-50">{fixture.date} · {fixture.time}</span>
                      <button className={`${buttonBg} text-ki-white rounded-full px-4 py-1 text-xs font-semibold hover:opacity-90 transition-opacity mt-1`}>
                        Buy Tickets
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar — 1 col */}
          <aside className="flex flex-col gap-6">
            <div className="bg-ki-white rounded-xl p-4">
              <h3 className="text-ki-black font-bold text-base mb-3">Premier League 2024/25</h3>
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[260px]">
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
                    <tr
                      key={row.pos}
                      className={row.isLiverpool ? "bg-ki-sand" : ""}
                    >
                      <td className={`py-1 pl-1 text-xs ${row.isLiverpool ? `${accentText} font-bold` : "text-ki-charcoal opacity-50"}`}>
                        {row.pos}
                      </td>
                      <td className={`py-1 text-xs font-medium ${row.isLiverpool ? `${accentText} font-bold` : "text-ki-black"}`}>
                        {row.club}
                      </td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>
                        {row.p}
                      </td>
                      <td className={`py-1 text-center text-xs ${row.isLiverpool ? "text-ki-charcoal" : "text-ki-charcoal opacity-50"}`}>
                        {row.gd}
                      </td>
                      <td className={`py-1 pr-1 text-center text-xs font-bold ${row.isLiverpool ? accentText : "text-ki-black"}`}>
                        {row.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
