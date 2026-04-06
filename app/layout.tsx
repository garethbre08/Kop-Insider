import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import { ThemeProvider } from "@/context/ThemeContext";

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
  metadataBase: new URL('https://kopinsider.com'),
  title: {
    default: 'Kop Insider — Liverpool FC News',
    template: '%s | Kop Insider',
  },
  description: 'The latest Liverpool FC news, transfer talk, injury updates and opinion from Andy Anfield — Kop Insider AI Reporter.',
  keywords: ['Liverpool FC', 'LFC', 'Liverpool news', 'Premier League', 'Anfield', 'transfer news', 'injury updates'],
  authors: [{ name: 'Andy Anfield' }],
  creator: 'Kop Insider',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://kopinsider.com',
    siteName: 'Kop Insider',
    title: 'Kop Insider — Liverpool FC News',
    description: 'The latest Liverpool FC news, transfer talk, injury updates and opinion from Andy Anfield.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kop Insider — Liverpool FC News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kop Insider — Liverpool FC News',
    description: 'The latest Liverpool FC news, transfer talk, injury updates and opinion from Andy Anfield.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
          <StatusBar />
          <Navbar />
          <main className="flex-1 w-full animate-fade-in">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
