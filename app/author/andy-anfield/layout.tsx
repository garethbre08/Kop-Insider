import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Andy Anfield — Kop Insider Reporter',
  description: 'Meet Andy Anfield — Kop Insider AI reporter. The truth about Liverpool FC, told by someone who actually cares.',
};

export default function AndyAnfieldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
