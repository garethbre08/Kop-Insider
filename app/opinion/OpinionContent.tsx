"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { getOpinionArticles } from "@/lib/articles";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

const filters = ["All", "Match Reaction", "Transfers", "Player Form", "Tactics", "Club News"];

const featuredOpinion = {
  headline: "Slot has got this wrong and nobody wants to say it. I will.",
  excerpt:
    "Everyone is too busy celebrating the points tally to notice the cracks forming in behind. The system that looked unbreakable in October is starting to show its seams, and the manager needs to hear it.",
  date: "2 hours ago",
};

function Avatar({ size = "sm" }: { size?: "sm" | "lg" }) {
  const dim  = size === "lg" ? "h-20 w-20" : "h-10 w-10";
  const icon = size === "lg" ? "h-9 w-9"  : "h-5 w-5";
  return (
    <div className={`${dim} rounded-full bg-ki-sand flex items-center justify-center shrink-0`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`${icon} text-ki-charcoal opacity-40`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    </div>
  );
}

export default function OpinionContent({ sidebar }: { sidebar: React.ReactNode }) {
  const { theme } = useTheme();
  const isHome     = theme === "home";
  const pageBg     = isHome ? "bg-ki-gold"  : "bg-ki-cream";
  const accentText = isHome ? "text-ki-red" : "text-ki-teal";
  const accentBg   = isHome ? "bg-ki-red"   : "bg-ki-teal";
  const buttonBg   = isHome ? "bg-ki-red"   : "bg-ki-teal";

  const [activeFilter, setActiveFilter] = useState("All");
  const [opinionArticles, setOpinionArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    getOpinionArticles(5)
      .then(setOpinionArticles)
      .catch(console.error)
      .finally(() => setLoadingArticles(false));
  }, []);

  return (
    <main className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="ki-container">
        <div className="ki-page-header">
          <h1 className="ki-page-title">Opinion</h1>
          <p className="ki-page-subtitle">Andy Anfield's unfiltered take on Liverpool FC</p>
        </div>
        <div className="ki-page-layout">

          <div className="ki-main">

            <div className={`ki-card border-l-4 ${isHome ? "border-ki-red" : "border-ki-teal"} p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5`}>
              <Avatar size="lg" />
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <span className={`text-xs font-bold tracking-widest ${accentText}`}>KOP INSIDER OPINION</span>
                <h2 className="text-ki-black font-bold text-3xl leading-tight">Andy Anfield</h2>
                <p className="ki-meta" style={{ opacity: 0.5 }}>Kop Insider Reporter</p>
                <p className="text-ki-charcoal text-sm leading-relaxed mt-1">
                  The truth about Liverpool, told by someone who actually cares. Passionate. Informed. Brutal when it matters.
                </p>
                <a href="#" className={`flex items-center gap-1.5 text-xs font-semibold ${accentText} hover:opacity-70 transition-opacity mt-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @AndyAnfield
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              <span className="ki-meta shrink-0 mr-1" style={{ opacity: 0.5 }}>Filter by</span>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors shrink-0 min-h-[44px] ${
                    activeFilter === f
                      ? `${accentBg} text-ki-white`
                      : "bg-ki-white text-ki-charcoal border border-ki-sand hover:border-ki-charcoal"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <article className="ki-card animate-fade-in-up">
              <div style={{ width: '100%', height: '220px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                {opinionArticles[0]?.image_url && opinionArticles[0].image_url.length > 0 ? (
                  <img src={opinionArticles[0].image_url} alt={opinionArticles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#01586B', opacity: 0.2, fontSize: '20px', fontWeight: 700 }}>KOP INSIDER</span>
                  </div>
                )}
              </div>
              <div className="ki-card-body-hero flex flex-col gap-3">
                <span className={`text-xs font-bold tracking-widest ${accentText}`}>FEATURED OPINION</span>
                <h2 className="ki-headline-hero">{opinionArticles[0]?.title || featuredOpinion.headline}</h2>
                <p className="ki-excerpt">{opinionArticles[0]?.excerpt || featuredOpinion.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-ki-sand">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" />
                    <div>
                      <p className="text-ki-black font-semibold text-sm">Andy Anfield</p>
                      <p className="ki-meta">{featuredOpinion.date}</p>
                    </div>
                  </div>
                  <button className={`${buttonBg} text-ki-white rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity shrink-0`}>
                    Read Full Article
                  </button>
                </div>
              </div>
            </article>

            <div className="ki-grid-2">
              {loadingArticles
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="ki-card flex flex-col animate-pulse">
                      <div className="ki-card-img ki-card-img-medium" />
                      <div className="ki-card-body-medium flex flex-col gap-3">
                        <div className="h-4 w-24 bg-ki-sand rounded" />
                        <div className="h-5 bg-ki-sand rounded" />
                        <div className="h-4 bg-ki-sand rounded w-3/4" />
                        <div className="h-3 w-20 bg-ki-sand rounded mt-2" />
                      </div>
                    </div>
                  ))
                : opinionArticles.length > 0
                ? opinionArticles.map((article, i) => (
                    <article
                      key={article.id}
                      className="ki-card flex flex-col animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div style={{ width: '100%', height: '160px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                        {article.image_url && article.image_url.length > 0 ? (
                          <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#01586B', opacity: 0.2, fontSize: '16px', fontWeight: 700 }}>KOP INSIDER</span>
                          </div>
                        )}
                      </div>
                      <div className="ki-card-body-medium flex flex-col gap-2 flex-1">
                        <span className={`ki-tag ${accentText}`}>{formatCategory(article.category)}</span>
                        <h3 className="ki-headline-small">{article.title}</h3>
                        <p className="ki-excerpt line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center gap-2 mt-auto pt-2">
                          <Avatar size="sm" />
                          <div>
                            <p className="text-ki-black text-xs font-semibold">Andy Anfield</p>
                            <p className="ki-meta">{timeAgo(article.created_at)}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                : (
                    <p className="ki-meta col-span-2" style={{ opacity: 0.5 }}>
                      Andy has not written any opinion pieces yet. Check back soon.
                    </p>
                  )
              }
            </div>

            <div className="flex justify-center pt-2">
              <button className={`ki-btn-outline ${isHome ? "!text-ki-red !border-ki-red hover:!bg-ki-red" : ""}`}>
                Load More
              </button>
            </div>

          </div>

          <aside className="ki-sidebar">{sidebar}</aside>
        </div>
      </div>
    </main>
  );
}
