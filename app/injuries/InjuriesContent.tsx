"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { getArticlesByCategory } from "@/lib/articles";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

const injuries = [
  { player: "Diogo Jota",             position: "FWD", injury: "Knee ligament", severity: "Serious",  return: "April 2025"  },
  { player: "Joel Matip",             position: "CB",  injury: "ACL",           severity: "Serious",  return: "Season over" },
  { player: "Trent Alexander-Arnold", position: "RB",  injury: "Hamstring",     severity: "Moderate", return: "1–2 weeks"   },
  { player: "Harvey Elliott",         position: "MID", injury: "Ankle sprain",  severity: "Minor",    return: "This week"   },
  { player: "Stefan Bajčetić",        position: "MID", injury: "Muscle strain", severity: "Moderate", return: "3 weeks"     },
  { player: "Ibrahima Konaté",        position: "CB",  injury: "Thigh",         severity: "Minor",    return: "10 days"     },
];

const returningSoon = [
  { player: "Trent Alexander-Arnold", position: "RB",  date: "Sat 1 Feb",  progress: 80 },
  { player: "Harvey Elliott",         position: "MID", date: "Wed 29 Jan", progress: 90 },
  { player: "Ibrahima Konaté",        position: "CB",  date: "Sat 1 Feb",  progress: 75 },
];

const doubtful = [
  { player: "Luis Díaz",            reason: "Knock sustained in training Thursday" },
  { player: "Andy Robertson",       reason: "Carrying a shoulder complaint, monitored" },
  { player: "Alexis Mac Allister",  reason: "Illness — missed Friday session" },
];

const severityStyles: Record<string, string> = {
  Serious:  "ki-tag-serious",
  Moderate: "ki-tag-moderate",
  Minor:    "ki-tag-minor",
};

const injured      = injuries.filter((i) => i.severity === "Serious" || i.severity === "Moderate").length;
const doubtfulCount = doubtful.length;
const available    = 25 - injuries.length - doubtfulCount;


export default function InjuriesContent({ sidebar }: { sidebar: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 50); return () => clearTimeout(id); }, []);

  const [injuryArticles, setInjuryArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  useEffect(() => {
    getArticlesByCategory("injuries", 4)
      .then(setInjuryArticles)
      .catch(console.error)
      .finally(() => setLoadingArticles(false));
  }, []);

  const { theme } = useTheme();
  const isHome       = theme === "home";
  const pageBg       = isHome ? "bg-ki-gold"    : "bg-ki-cream";
  const accentText   = isHome ? "text-ki-red"   : "text-ki-teal";
  const buttonBg     = isHome ? "bg-ki-red"     : "bg-ki-teal";
  const progressFill = isHome ? "bg-ki-red"     : "bg-ki-teal";

  return (
    <main className={`${pageBg} min-h-screen transition-colors duration-300`}>
      <div className="ki-container">
        <div className="ki-page-header">
          <h1 className="ki-page-title">Injury Updates</h1>
          <p className="ki-page-subtitle">The latest Liverpool FC injury and fitness news</p>
        </div>
        <div className="ki-page-layout">

          <div className="ki-main">

            <div className="ki-grid-3">
              {[
                { value: injured,       label: "Currently Injured" },
                { value: doubtfulCount, label: "Doubtful"          },
                { value: available,     label: "Available"         },
              ].map((stat, i) => (
                <div key={i} className="ki-card p-4 flex flex-col items-center justify-center text-center gap-1">
                  <span className="text-ki-black font-bold text-4xl">{stat.value}</span>
                  <span className="ki-meta">{stat.label}</span>
                </div>
              ))}
            </div>

            <section>
              <h2 className="ki-section-title">Current Injuries</h2>
              <div className="overflow-x-auto rounded-xl border border-ki-sand">
                <div className="min-w-[500px]">
                  <div className="grid grid-cols-[2fr_auto_2fr_auto_auto] gap-4 px-4 py-3 bg-ki-white border-b border-ki-sand text-ki-charcoal opacity-60 text-xs font-semibold uppercase tracking-wide">
                    <span>Player</span>
                    <span className="hidden sm:block">Pos</span>
                    <span>Injury</span>
                    <span className="hidden sm:block">Severity</span>
                    <span>Return</span>
                  </div>
                  {injuries.map((row, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[2fr_auto_2fr_auto_auto] gap-4 px-4 py-3 items-center ${i % 2 === 0 ? "bg-ki-white" : "bg-ki-cream"}`}
                    >
                      <span className="text-ki-black font-semibold text-sm">{row.player}</span>
                      <span className={`hidden sm:block text-xs font-bold rounded px-2 py-0.5 bg-ki-sand ${accentText}`}>
                        {row.position}
                      </span>
                      <span className="text-ki-charcoal text-sm opacity-80">{row.injury}</span>
                      <span className={`hidden sm:inline-block text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 ${severityStyles[row.severity]}`}>
                        {row.severity}
                      </span>
                      <span className="ki-meta shrink-0">{row.return}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="ki-section-title">Returning Soon</h2>
              <div className="ki-grid-3">
                {returningSoon.map((p, i) => (
                  <div key={i} className="ki-card p-4 flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="ki-headline-small" style={{ marginBottom: 0 }}>{p.player}</p>
                      <span className={`text-xs font-semibold rounded px-2 py-0.5 bg-ki-sand shrink-0 ${accentText}`}>
                        {p.position}
                      </span>
                    </div>
                    <p className="ki-meta">Expected: {p.date}</p>
                    <div>
                      <div className="w-full bg-ki-sand rounded-full h-2">
                        <div
                          className={`${progressFill} h-2 rounded-full transition-all duration-700`}
                          style={{ width: mounted ? `${p.progress}%` : "0%" }}
                        />
                      </div>
                      <p className="ki-meta mt-1">{p.progress}% recovered</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="ki-section-title">Injury News</h2>
              <div className="ki-grid-2">
                {loadingArticles
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="ki-card flex flex-col animate-pulse">
                        <div className="ki-card-img ki-card-img-medium" />
                        <div className="ki-card-body-medium flex flex-col gap-3">
                          <div className="h-4 w-20 bg-ki-sand rounded" />
                          <div className="h-5 bg-ki-sand rounded" />
                        </div>
                      </div>
                    ))
                  : injuryArticles.length > 0
                  ? injuryArticles.map((article) => (
                      <article key={article.id} className="ki-card flex flex-col animate-fade-in-up">
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
                          <p className="ki-meta mt-auto pt-1">Andy Anfield · {timeAgo(article.created_at)}</p>
                        </div>
                      </article>
                    ))
                  : (
                      <p className="ki-meta col-span-2">No injury articles yet.</p>
                    )
                }
              </div>
            </section>

            <div className="ki-opinion-strip">
              <span className="ki-opinion-label">Opinion</span>
              <h2 className="ki-opinion-title">
                Three players out. One system broken. Here is the truth about Liverpool's injury crisis.
              </h2>
              <p className="text-ki-charcoal text-sm leading-relaxed opacity-80">
                It is not bad luck. It is not a coincidence. When the same muscle groups keep breaking down on the same type of player, someone has to ask the question that nobody at the club wants to answer. The numbers tell a damning story.
              </p>
              <div className="ki-opinion-footer flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <img src="/andy.jpg" alt="Andy Anfield — Kop Insider Reporter" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                  <div>
                    <p className="text-ki-black font-semibold text-sm">Andy Anfield</p>
                    <p className="text-ki-charcoal text-sm opacity-50">Kop Insider Reporter</p>
                  </div>
                </div>
                <button className={`${buttonBg} text-ki-white rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity shrink-0`}>
                  Read Full Article
                </button>
              </div>
            </div>

          </div>

          <aside className="ki-sidebar">{sidebar}</aside>
        </div>
      </div>
    </main>
  );
}
