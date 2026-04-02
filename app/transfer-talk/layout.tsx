import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfer Talk — Kop Insider",
  description: "Liverpool FC transfer news, rumours, and the latest on incoming and outgoing players.",
};

export default function TransferTalkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
