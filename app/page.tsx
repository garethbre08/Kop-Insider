import { getLatestArticles, getFeaturedArticle, getOpinionArticles } from '@/lib/articles'
import { getPremierLeagueTable, getAllLiverpoolFixtures, getLiverpoolLiveScore } from '@/lib/football'
import Link from 'next/link'
import MobileTabs from '@/components/MobileTabs'
import LiveScoreBar from '@/components/LiveScoreBar'
import Sidebar from '@/components/Sidebar'

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

export default async function Home() {
  const [featuredArticle, latestArticles, opinionArticles, tableData, fixtures, liveScore] = await Promise.all([
    getFeaturedArticle(),
    getLatestArticles(6),
    getOpinionArticles(1),
    getPremierLeagueTable(),
    getAllLiverpoolFixtures(),
    getLiverpoolLiveScore(),
  ])
  const opinionArticle = opinionArticles[0] || null

  return (
    <main style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>
      <LiveScoreBar liveScore={liveScore} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="ki-home-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* LEFT COLUMN — articles content wrapped in MobileTabs.
              On desktop: tab bar is hidden, articles show as default.
              On mobile: tab bar shows (News / Table / Fixtures). */}
          <div className="ki-mobile-tabs-wrapper">
            <MobileTabs tableData={tableData} fixtures={fixtures}>

              {/* HERO CARD */}
              {featuredArticle && (
                <Link href={`/article/${featuredArticle.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '16px' }}>
                  <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                    <div style={{ width: '100%', height: '220px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                      {featuredArticle.image_url && featuredArticle.image_url.length > 0 ? (
                        <img src={featuredArticle.image_url} alt={featuredArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#01586B', opacity: 0.2, fontSize: '20px', fontWeight: 700 }}>KOP INSIDER</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '20px' }}>
                      <span style={{ display: 'inline-block', backgroundColor: '#E7DFC9', color: '#01586B', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
                        {featuredArticle.category}
                      </span>
                      <div style={{ fontSize: '22px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '10px' }}>
                        {featuredArticle.title}
                      </div>
                      <div style={{ fontSize: '14px', color: '#333', opacity: 0.65, lineHeight: 1.5, marginBottom: '12px' }}>
                        {featuredArticle.excerpt}
                      </div>
                      <div style={{ fontSize: '12px', color: '#333', opacity: 0.45 }}>
                        Andy Anfield · {timeAgo(featuredArticle.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* 2 MEDIUM CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {latestArticles.slice(0, 2).map((article) => (
                  <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%' }}>
                      <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
                        {article.image_url && article.image_url.length > 0 ? (
                          <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                        )}
                      </div>
                      <div style={{ padding: '16px' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#E7DFC9', color: '#01586B', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                          {article.category}
                        </span>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#111', lineHeight: 1.35, marginBottom: '8px' }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.45 }}>
                          Andy Anfield · {timeAgo(article.created_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 3 SMALL CARDS */}
              <div className={latestArticles.slice(2, 5).length === 2 ? 'ki-grid-2' : 'ki-grid-3'} style={{ marginBottom: '16px' }}>
                {latestArticles.slice(2, 5).map((article) => (
                  <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%' }}>
                      <div style={{ width: '100%', height: '110px', overflow: 'hidden' }}>
                        {article.image_url && article.image_url.length > 0 ? (
                          <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                        )}
                      </div>
                      <div style={{ padding: '12px' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#E7DFC9', color: '#01586B', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                          {article.category}
                        </span>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', lineHeight: 1.35, marginBottom: '6px' }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.45 }}>
                          Andy Anfield · {timeAgo(article.created_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* OPINION STRIP */}
              {opinionArticle && (
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', borderLeft: '4px solid #01586B', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#01586B', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Opinion · Andy Anfield
                  </span>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>
                    {opinionArticle.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#333', opacity: 0.65, lineHeight: 1.5 }}>
                    {opinionArticle.excerpt}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#01586B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                        AA
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>Andy Anfield</div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.5 }}>Kop Insider Reporter</div>
                      </div>
                    </div>
                    <Link href={`/article/${opinionArticle.id}`}>
                      <button style={{ backgroundColor: '#01586B', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                        Read Full Article
                      </button>
                    </Link>
                  </div>
                </div>
              )}

            </MobileTabs>
          </div>

          {/* RIGHT SIDEBAR — hidden below 1024px, replaced by MobileTabs Table/Fixtures tabs */}
          <div className="ki-desktop-sidebar">
            <Sidebar />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .ki-desktop-sidebar { display: none !important; }
          .ki-home-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
