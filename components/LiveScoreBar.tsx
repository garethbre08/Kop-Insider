"use client";

import { useEffect, useState } from "react";
import { useMatchday } from "@/context/MatchdayContext";
import { useTheme } from "@/context/ThemeContext";

function CrestBadge({ label, variant }: { label: string; variant: "home" | "away" }) {
  return (
    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
      variant === "home" ? "bg-ki-teal text-ki-white" : "bg-ki-sand text-ki-charcoal"
    }`}>
      {label}
    </div>
  );
}

function Countdown({ kickoffTime, kickoffDate }: { kickoffTime: string; kickoffDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const [hours, minutes] = kickoffTime.split(":").map(Number);
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);
    if (target.getTime() < Date.now()) target.setDate(target.getDate() + 1);

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("KO"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [kickoffTime, kickoffDate]);

  return <span className="text-ki-white font-bold text-sm tabular-nums">{timeLeft}</span>;
}

export default function LiveScoreBar() {
  const { isMatchday, isPreMatch, isLive, isFullTime, matchData } = useMatchday();
  const { theme } = useTheme();
  const isHome = theme === "home";

  if (!isMatchday) return null;

  const {
    homeTeam, awayTeam, homeCrest, awayCrest,
    homeScore, awayScore, matchMinute,
    kickoffTime, kickoffDate, competition,
  } = matchData;

  return (
    <div className="bg-ki-charcoal w-full animate-slide-down">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-4 flex-wrap">

          {/* Competition */}
          <span className="ki-score-competition text-ki-white opacity-40 text-xs font-medium hidden sm:block shrink-0">
            {competition}
          </span>

          {/* Match */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            {/* Home */}
            <div className="flex items-center gap-2">
              <CrestBadge label={homeCrest} variant="home" />
              <span className="text-ki-white font-semibold text-sm hidden sm:block">{homeTeam}</span>
            </div>

            {/* Score / countdown */}
            <div className="flex items-center gap-2 px-3">
              {isPreMatch ? (
                <div className="flex flex-col items-center">
                  <span className="text-ki-white opacity-50 text-xs">KO {kickoffTime}</span>
                  <Countdown kickoffTime={kickoffTime} kickoffDate={kickoffDate} />
                </div>
              ) : (
                <span className="text-ki-white font-bold text-xl tabular-nums">
                  {homeScore} – {awayScore}
                </span>
              )}
            </div>

            {/* Away */}
            <div className="flex items-center gap-2">
              <span className="text-ki-white font-semibold text-sm hidden sm:block">{awayTeam}</span>
              <CrestBadge label={awayCrest} variant="away" />
            </div>
          </div>

          {/* Status indicator */}
          <div className="ki-score-venue flex items-center gap-2 shrink-0">
            {isLive && (
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ki-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ki-red" />
                </span>
                <span className="text-xs font-bold text-ki-red">
                  {matchMinute}&apos;
                </span>
              </div>
            )}
            {isFullTime && (
              <span className="text-xs font-bold bg-ki-charcoal border border-ki-white/30 text-ki-white rounded px-2 py-0.5">
                FT
              </span>
            )}
            {isPreMatch && (
              <span className="text-ki-white opacity-40 text-xs">{kickoffDate}</span>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .ki-score-competition { display: none !important; }
          .ki-score-venue { display: none !important; }
        }
      `}</style>
    </div>
  );
}
