import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveScoreBar from "@/components/LiveScoreBar";
import StatusBar from "@/components/StatusBar";
import { ThemeProvider } from "@/context/ThemeContext";
import { MatchdayProvider } from "@/context/MatchdayContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kop Insider — Liverpool FC News",
  description: "The latest Liverpool FC news, opinion, transfer talk and match analysis from Kop Insider.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="text-ki-black min-h-screen flex flex-col w-full overflow-x-hidden">
        <ThemeProvider>
          <MatchdayProvider>
            <StatusBar />
            <Navbar />
            <LiveScoreBar />
            <main className="flex-1 w-full animate-fade-in">{children}</main>
            <Footer />
          </MatchdayProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
