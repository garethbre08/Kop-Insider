"use client";

import { createContext, useContext } from "react";

export interface MatchData {
  homeTeam: string;
  awayTeam: string;
  homeCrest: string;
  awayCrest: string;
  homeScore: number;
  awayScore: number;
  matchMinute: number;
  kickoffTime: string;
  kickoffDate: string;
  venue: string;
  competition: string;
  formation: string;
  lineup: { name: string; number: number; position: string }[];
}

interface MatchdayContextValue {
  isMatchday: boolean;
  isPreMatch: boolean;
  isLive: boolean;
  isFullTime: boolean;
  matchData: MatchData;
}

const defaultMatch: MatchData = {
  homeTeam: "Liverpool",
  awayTeam: "Man City",
  homeCrest: "LFC",
  awayCrest: "MCI",
  homeScore: 2,
  awayScore: 1,
  matchMinute: 67,
  kickoffTime: "17:30",
  kickoffDate: "Sat 1 Feb 2025",
  venue: "Anfield, Liverpool",
  competition: "Premier League",
  formation: "4-3-3",
  lineup: [
    { name: "Alisson",      number: 1,  position: "GK"  },
    { name: "Alexander-Arnold", number: 66, position: "RB"  },
    { name: "Konaté",       number: 5,  position: "CB"  },
    { name: "Van Dijk",     number: 4,  position: "CB"  },
    { name: "Robertson",    number: 26, position: "LB"  },
    { name: "Gravenberch",  number: 38, position: "CM"  },
    { name: "Mac Allister", number: 10, position: "CM"  },
    { name: "Szoboszlai",   number: 8,  position: "CM"  },
    { name: "Salah",        number: 11, position: "RW"  },
    { name: "Núñez",        number: 9,  position: "ST"  },
    { name: "Díaz",         number: 7,  position: "LW"  },
  ],
};

const MatchdayContext = createContext<MatchdayContextValue>({
  isMatchday: true,
  isPreMatch: false,
  isLive: true,
  isFullTime: false,
  matchData: defaultMatch,
});

export function MatchdayProvider({ children }: { children: React.ReactNode }) {
  const value: MatchdayContextValue = {
    isMatchday: true,
    isPreMatch: false,
    isLive: true,
    isFullTime: false,
    matchData: defaultMatch,
  };

  return (
    <MatchdayContext.Provider value={value}>
      {children}
    </MatchdayContext.Provider>
  );
}

export function useMatchday() {
  return useContext(MatchdayContext);
}
