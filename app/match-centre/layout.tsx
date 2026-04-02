import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Match Centre — Kop Insider",
  description: "Liverpool FC results, upcoming fixtures and the latest Premier League table.",
};

export default function MatchCentreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
