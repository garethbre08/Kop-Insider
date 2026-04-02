"use client";

import { useEffect, useState } from "react";
import { useMatchday } from "@/context/MatchdayContext";
import { useTheme } from "@/context/ThemeContext";

// Formation row definitions for 4-3-3
// Each array is a row from GK (bottom) to forwards (top)
const formationRows: Record<string, string[][]> = {
  "4-3-3": [
    ["GK"],
    ["RB", "CB", "CB", "LB"],
    ["CM", "CM", "CM"],
    ["RW", "ST", "LW"],
  ],
};

function PitchGraphic({
  lineup,
  formation,
  accentBg,
}: {
  lineup: { name: string; number: number; position: string }[];
  formation: string;
  accentBg: string;
}) {
  const rows = formationRows[formation] ?? formationRows["4-3-3"];

  // Map position label → player
  const posMap: Record<string, typeof lineup[0]> = {};
  // Assign by matching position strings in order of rows
  const posOrder = rows.flat();
  let idx = 0;
  for (const pos of posOrder) {
    // find next unassigned player matching this broad position role
    const player = lineup[idx];
    if (player) posMap[`${pos}_${idx}`] = player;
    idx++;
  }

  // Rebuild as rows with player data
  let playerIdx = 0;
  const playerRows = rows.map((row) =>
    row.map(() => lineup[playerIdx++])
  );

  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ background: "#2d7a3a", minHeight: 200 }}>
      {/* Pitch markings */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Centre circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border border-white/20" />
        {/* Centre line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
        {/* Penalty box top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-10 border-b border-x border-white/20" />
        {/* Penalty box bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/5 h-10 border-t border-x border-white/20" />
      </div>

      {/* Players — rendered bottom (GK) to top (FWD) */}
      <div className="relative flex flex-col-reverse justify-around h-full py-3 px-2 gap-1" style={{ minHeight: 200 }}>
        {playerRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-around items-center">
            {row.map((player, pIdx) =>
              player ? (
                <div key={pIdx} className="flex flex-col items-center gap-0.5" style={{ minWidth: 48 }}>
                  <div className={`h-7 w-7 rounded-full ${accentBg} flex items-center justify-center text-ki-white text-xs font-bold shadow`}>
                    {player.number}
                  </div>
                  <span className="text-ki-white text-xs font-medium text-center leading-tight" style={{ fontSize: 10, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                    {player.name.split(" ").pop()}
                  </span>
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Countdown({ kickoffTime }: { kickoffTime: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const [hours, minutes] = kickoffTime.split(":").map(Number);
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);
    if (target.getTime() < Date.now()) target.setDate(target.getDate() + 1);

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Kick Off!"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [kickoffTime]);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-ki-charcoal opacity-50 text-xs uppercase tracking-widest">Kick Off In</span>
      <span className="text-ki-black font-bold text-3xl tabular-nums">{timeLeft}</span>
    </div>
  );
}

function CrestCircle({ label, variant }: { label: string; variant: "home" | "away" }) {
  return (
    <div className={`h-16 w-16 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
      variant === "home" ? "bg-ki-teal text-ki-white" : "bg-ki-sand text-ki-charcoal"
    }`}>
      {label}
    </div>
  );
}

export default function MatchdayHeroCard() {
  const { isPreMatch, isLive, isFullTime, matchData } = useMatchday();
  const { theme } = useTheme();
  const isHome = theme === "home";
  const accentBg   = isHome ? "bg-ki-red"   : "bg-ki-teal";
  const accentText = isHome ? "text-ki-red" : "text-ki-teal";

  const {
    homeTeam, awayTeam, homeCrest, awayCrest,
    homeScore, awayScore, matchMinute,
    kickoffTime, kickoffDate, venue, competition,
    lineup, formation,
  } = matchData;

  return (
    <div className="bg-ki-white rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="text-ki-charcoal opacity-50 text-xs">{competition}</span>
        <span className="text-ki-charcoal opacity-50 text-xs">{venue}</span>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center justify-between gap-4 px-5 pb-4">
        {/* Home */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <CrestCircle label={homeCrest} variant="home" />
          <span className="text-ki-black font-semibold text-sm text-center">{homeTeam}</span>
        </div>

        {/* Score / countdown */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          {isPreMatch ? (
            <Countdown kickoffTime={kickoffTime} />
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-ki-black font-bold text-4xl sm:text-5xl tabular-nums">{homeScore}</span>
              <span className="text-ki-charcoal opacity-30 font-bold text-2xl sm:text-3xl">–</span>
              <span className="text-ki-black font-bold text-4xl sm:text-5xl tabular-nums">{awayScore}</span>
            </div>
          )}

          {/* Status badge */}
          <div className="flex items-center gap-1.5 mt-1">
            {isLive && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ki-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ki-red" />
                </span>
                <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${accentBg} text-ki-white`}>
                  LIVE {matchMinute}&apos;
                </span>
              </>
            )}
            {isFullTime && (
              <span className="text-xs font-bold rounded-full px-3 py-0.5 bg-ki-charcoal text-ki-white">
                FT
              </span>
            )}
            {isPreMatch && (
              <span className="text-xs text-ki-charcoal opacity-50">{kickoffDate} · {kickoffTime}</span>
            )}
          </div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <CrestCircle label={awayCrest} variant="away" />
          <span className="text-ki-black font-semibold text-sm text-center">{awayTeam}</span>
        </div>
      </div>

      {/* Formation label */}
      <div className="px-5 pb-2 flex items-center justify-between">
        <span className="text-ki-charcoal opacity-40 text-xs">Starting XI</span>
        <span className={`text-xs font-bold ${accentText}`}>{formation}</span>
      </div>

      {/* Pitch */}
      <div className="px-5 pb-5">
        <PitchGraphic lineup={lineup} formation={formation} accentBg={accentBg} />
      </div>

      {/* Footer */}
      <div className="border-t border-ki-sand px-5 py-3 flex items-center justify-between">
        <span className="text-ki-charcoal opacity-50 text-xs">{kickoffDate}</span>
        <span className="text-ki-charcoal opacity-50 text-xs">{kickoffTime} KO</span>
      </div>
    </div>
  );
}
