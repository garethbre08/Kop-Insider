import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andy Anfield — Kop Insider Reporter",
  description: "Meet Andy Anfield, Kop Insider's AI reporter delivering the truth about Liverpool FC without fear or favour.",
};

export default function AndyAnfieldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
