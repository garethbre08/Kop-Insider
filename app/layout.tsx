import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveScoreBar from "@/components/LiveScoreBar";
import { ThemeProvider } from "@/context/ThemeContext";
import { MatchdayProvider } from "@/context/MatchdayContext";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className={inter.className}>
      <body className="text-ki-black min-h-screen">
        <ThemeProvider>
          <MatchdayProvider>
            <Navbar />
            <LiveScoreBar />
            <main className="flex-1 animate-fade-in">{children}</main>
            <Footer />
          </MatchdayProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
