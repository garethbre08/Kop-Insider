"use client";
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import MobileTabs from '@/components/MobileTabs';
import LiveScoreBar from '@/components/LiveScoreBar';
import type { Article } from '@/lib/database.types';

function timeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

type Props = {
  featuredArticle: Article | null;
  latestArticles: Article[];
  opinionArticle: Article | null;
  tableData: any[];
  fixtures: any[];
  liveScore: any;
  sidebar: React.ReactNode;
};

export default function HomePageContent({ featuredArticle, latestArticles, opinionArticle, tableData, fixtures, liveScore, sidebar }: Props) {
  const { theme } = useTheme();
  const pageBg        = theme === 'home' ? '#F0DFC0' : '#F3EEDD';
  const opinionBorder = 'var(--ki-accent)';
  const opinionLabel  = 'var(--ki-accent)';
  const buttonBg      = theme === 'home' ? '#C8102E' : 'rgb(0, 163, 152)';

  return (
    <main style={{ backgroundColor: pageBg, minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      <LiveScoreBar liveScore={liveScore} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 48px 24px' }}>
        <div className="ki-home-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div className="ki-mobile-tabs-wrapper">
            <MobileTabs tableData={tableData} fixtures={fixtures}>

              {/* HERO CARD */}
              {featuredArticle && (
                <Link href={`/article/${featuredArticle.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '16px' }}>
                  <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} className="ki-home-hero-card">
                    <div style={{ width: '100%', height: '280px', overflow: 'hidden' }}>
                      {featuredArticle.image_url && featuredArticle.image_url.length > 0 ? (
                        <img src={featuredArticle.image_url} alt={featuredArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#01586B', opacity: 0.2, fontSize: '20px', fontWeight: 700 }}>KOP INSIDER</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '24px' }}>
                      <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>
                        {featuredArticle.category}
                      </span>
                      <div style={{ fontSize: '26px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
                        {featuredArticle.title}
                      </div>
                      <div style={{ fontSize: '14px', color: '#333', opacity: 0.6, lineHeight: 1.6, marginBottom: '12px' }}>
                        {featuredArticle.excerpt}
                      </div>
                      <div style={{ fontSize: '11px', color: '#333', opacity: 0.4 }}>
                        Andy Anfield · {timeAgo(featuredArticle.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* OPINION STRIP */}
              {opinionArticle && (
                <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderTop: '1px solid rgba(0,0,0,0.06)', borderRight: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', borderLeft: `4px solid ${opinionBorder}`, marginBottom: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: opinionLabel, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    Opinion · Andy Anfield
                  </span>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#111', lineHeight: 1.3, fontFamily: 'var(--font-heading)' }}>
                    {opinionArticle.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#333', opacity: 0.6, lineHeight: 1.6 }}>
                    {opinionArticle.excerpt}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src="/andy.jpg" alt="Andy Anfield — Kop Insider Reporter" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>Andy Anfield</div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.4 }}>Kop Insider Reporter</div>
                      </div>
                    </div>
                    <Link href={`/article/${opinionArticle.id}`}>
                      <button style={{ backgroundColor: buttonBg, color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                        Read Full Article
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* GREEN DIVIDER */}
              <div style={{ height: '2px', backgroundColor: 'var(--ki-accent)', borderRadius: '1px', opacity: 0.4, marginBottom: '16px' }} />

              {/* 2 MEDIUM CARDS — ROW 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {latestArticles.slice(0, 2).map((article) => (
                  <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} className="ki-home-card">
                      <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
                        {article.image_url && article.image_url.length > 0 ? (
                          <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                        )}
                      </div>
                      <div style={{ padding: '16px' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '8px' }}>
                          {article.category}
                        </span>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#111', lineHeight: 1.35, marginBottom: '8px' }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.4 }}>
                          Andy Anfield · {timeAgo(article.created_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 3 SMALL CARDS */}
              {latestArticles.length > 2 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {latestArticles.slice(2, 5).map((article) => (
                    <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} className="ki-home-card">
                        <div style={{ width: '100%', height: '110px', overflow: 'hidden' }}>
                          {article.image_url && article.image_url.length > 0 ? (
                            <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          ) : (
                            <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                          )}
                        </div>
                        <div style={{ padding: '12px' }}>
                          <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' }}>
                            {article.category}
                          </span>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111111', lineHeight: 1.3, marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                            {article.title}
                          </div>
                          <div style={{ fontSize: '11px', color: '#333333', opacity: 0.4, fontFamily: 'var(--font-body)', marginTop: '6px' }}>
                            Andy Anfield · {timeAgo(article.created_at)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* 2 MEDIUM CARDS — ROW 2 */}
              {latestArticles.length > 5 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {latestArticles.slice(5, 7).map((article) => (
                    <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} className="ki-home-card">
                        <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
                          {article.image_url && article.image_url.length > 0 ? (
                            <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          ) : (
                            <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                          )}
                        </div>
                        <div style={{ padding: '16px' }}>
                          <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '8px' }}>
                            {article.category}
                          </span>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111111', lineHeight: 1.3, marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                            {article.title}
                          </div>
                          <div style={{ fontSize: '11px', color: '#333', opacity: 0.4 }}>
                            Andy Anfield · {timeAgo(article.created_at)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* MORE FROM KOP INSIDER */}
              <div style={{ borderTop: '2px solid var(--ki-accent)', paddingTop: '20px', marginTop: '32px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-body)' }}>
                  More from Kop Insider
                </div>
                {latestArticles.slice(7, 10).map((article) => (
                  <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', gap: '16px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '12px', paddingRight: '12px', alignItems: 'center', backgroundColor: '#FDFCFA', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '8px' }}>
                      <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        {article.image_url ? (
                          <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111', lineHeight: 1.35, marginBottom: '4px' }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.4 }}>
                          Andy Anfield · {new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                      <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0 }}>
                        {article.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

            </MobileTabs>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="ki-desktop-sidebar">
            {sidebar}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .ki-desktop-sidebar { display: none !important; }
          .ki-home-grid { grid-template-columns: 1fr !important; }
        }
        .ki-home-hero-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
          transform: translateY(-2px);
        }
        .ki-home-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  );
}
