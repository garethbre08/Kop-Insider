import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andy Anfield Opinion — Kop Insider",
  description: "Bold Liverpool FC opinion and editorial from Andy Anfield — honest, informed, and never dull.",
};

export default function OpinionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
