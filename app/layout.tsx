import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="text-ki-black min-h-screen flex flex-col w-full overflow-x-hidden">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full animate-fade-in">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
