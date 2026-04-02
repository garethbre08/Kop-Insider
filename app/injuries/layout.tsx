import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Injury Updates — Kop Insider",
  description: "The latest Liverpool FC injury news, squad availability and return dates.",
};

export default function InjuriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
