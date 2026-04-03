"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import type { Article } from "@/lib/database.types";

type OpinionStripProps = {
  article?: Article | null;
};

export default function OpinionStrip({ article }: OpinionStripProps = {}) {
  const { theme } = useTheme();
  const isHome = theme === "home";

  const accentBorder = isHome ? "border-ki-red" : "border-ki-teal";
  const accentText   = isHome ? "text-ki-red"   : "text-ki-teal";
  const buttonBg     = isHome ? "bg-ki-red"      : "bg-ki-teal";

  const headline = article?.title
    ?? "Slot has got this wrong and nobody wants to say it. I will.";

  const excerpt = article?.excerpt
    ?? "Everyone is too busy celebrating the points tally to notice the cracks forming in behind. The system that looked unbreakable in October is starting to show its seams, and the manager needs to hear it.";

  return (
    <div className={`bg-ki-white rounded-xl border-l-4 ${accentBorder} p-6 flex flex-col gap-4 animate-fade-in-up`}>

      <span className={`text-xs font-bold tracking-widest uppercase ${accentText}`}>Opinion</span>

      <h2 className="text-ki-black font-bold text-2xl leading-snug" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {headline}
      </h2>

      <p className="text-ki-charcoal text-sm leading-relaxed">
        {excerpt}
      </p>

      <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-ki-sand flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ki-charcoal opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div>
            <Link href="/author/andy-anfield" className="text-ki-black font-semibold text-sm hover:underline">Andy Anfield</Link>
            <p className="text-ki-charcoal text-sm opacity-50">Kop Insider Reporter</p>
          </div>
        </div>

        <Link href={article ? `/article/${article.id}` : "/opinion"}>
          <button className={`${buttonBg} text-ki-white rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shrink-0`}>
            Read Full Article
          </button>
        </Link>
      </div>
    </div>
  );
}
