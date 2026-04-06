"use client";

import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { useTheme } from "@/context/ThemeContext";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

type Props = {
  article: Article;
  related: Article[];
  sidebar: React.ReactNode;
};

export default function ArticlePageClient({ article, related, sidebar }: Props) {
  const { theme } = useTheme();
  const isHome = theme === "home";

  const pageBg       = isHome ? "bg-ki-gold"    : "bg-ki-cream";
  const accentText   = isHome ? "text-ki-red"   : "text-ki-teal";
  const accentBorder = isHome ? "border-ki-red" : "border-ki-teal";

  const paragraphs = article.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const [firstParagraph, ...restParagraphs] = paragraphs;
  const dropCapChar = firstParagraph?.charAt(0) ?? "";
  const dropCapRest = firstParagraph?.slice(1) ?? "";

  return (
    <main className={`${pageBg} min-h-screen transition-colors duration-300`}>

      {/* Back button */}
      <div className="ki-container" style={{ paddingBottom: 0 }}>
        <Link
          href="/"
          className={`inline-flex items-center gap-2 ${accentText} text-sm font-semibold hover:opacity-70 transition-opacity`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Kop Insider
        </Link>
      </div>

      {/* Article header */}
      <header className="bg-ki-white mt-4">
        <div style={{ maxWidth: "896px", margin: "0 auto", padding: "40px 24px" }} className="flex flex-col gap-5">
          <span className={`ki-tag ${accentText}`}>{formatCategory(article.category)}</span>
          <h1 className="text-ki-black font-bold text-3xl sm:text-4xl leading-tight max-w-3xl">
            {article.title}
          </h1>
          <p className="text-ki-charcoal text-xl max-w-2xl opacity-70 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-2 border-t border-ki-sand">
            <div className="ki-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ki-charcoal opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <Link href="/author/andy-anfield" className={`font-semibold text-sm ${accentText} hover:underline`}>
                Andy Anfield
              </Link>
              <span className="ki-meta">Kop Insider Reporter</span>
            </div>
            <span className="text-ki-charcoal opacity-30 mx-1">·</span>
            <span className="ki-meta">{timeAgo(article.created_at)}</span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="w-full h-96 bg-ki-sand flex items-center justify-center overflow-hidden">
        {article.image_url ? (
          <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span className="text-ki-teal opacity-20 font-bold text-4xl tracking-widest select-none">
            KOP INSIDER
          </span>
        )}
      </div>

      {/* Body */}
      <div className="ki-container">
        <div className="ki-page-layout">

          {/* Article body */}
          <div className="ki-main">

            {firstParagraph && (
              <p className="text-ki-charcoal text-lg leading-relaxed max-w-2xl mb-6">
                <span className={`text-6xl font-bold ${accentText} float-left leading-none mr-3 mt-1`}>
                  {dropCapChar}
                </span>
                {dropCapRest}
              </p>
            )}

            {restParagraphs.map((para, i) => (
              <p key={i} className="text-ki-charcoal text-lg leading-relaxed max-w-2xl mb-6">
                {para}
              </p>
            ))}

            {/* Source credit */}
            <div className={`bg-ki-cream border-l-4 ${accentBorder} p-6 rounded-r-xl mt-8 flex flex-col gap-3`}>
              <p className="text-ki-black font-bold text-sm">Source &amp; Credits</p>
              <p className="text-ki-charcoal text-sm leading-relaxed">
                This article was written by Andy Anfield, Kop Insider AI Reporter, informed by reporting from{" "}
                <span className="font-semibold text-ki-black">{article.source_journalist}</span> at{" "}
                <span className="font-semibold text-ki-black">{article.source_outlet}</span>.
              </p>
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${accentText} underline text-sm font-medium hover:opacity-70 transition-opacity`}
              >
                Read the original report →
              </a>
              <p className="ki-meta border-t border-ki-sand pt-3">
                Kop Insider always credits original journalism. We report independently — facts inform us, words are our own.
              </p>
            </div>

            {/* Share row */}
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              <span className="ki-meta">Share this article</span>
              <button className={`bg-ki-sand ${accentText} rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X
              </button>
              <button className={`bg-ki-sand ${accentText} rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy link
              </button>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="ki-sidebar">

            {/* More from Andy */}
            <div className="ki-sidebar-card">
              <h3 className={`ki-section-title ${accentText}`}>More from Andy</h3>
              <div className="flex flex-col gap-3">
                {related.length > 0
                  ? related.map((a, i) => (
                      <ArticleCard key={a.id} article={a} size="small" delay={i * 80} />
                    ))
                  : Array.from({ length: 3 }).map((_, i) => (
                      <ArticleCard key={i} article={null} size="small" />
                    ))
                }
              </div>
            </div>

            {sidebar}

          </aside>
        </div>
      </div>
    </main>
  );
}
