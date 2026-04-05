import { getLatestArticles, getFeaturedArticle, getOpinionArticles } from '@/lib/articles'
import { getPremierLeagueTable, getAllLiverpoolFixtures, getLiverpoolLiveScore } from '@/lib/football'
import { getArticleImages } from '@/lib/images'
import Link from 'next/link'
import MobileTabs from '@/components/MobileTabs'
import LiveScoreBar from '@/components/LiveScoreBar'

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

  const allArticles = [featuredArticle, ...latestArticles, ...opinionArticles].filter(Boolean)
  const imageMap = await getArticleImages(allArticles)

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
                    <div style={{ backgroundColor: '#E7DFC9', height: '220px', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {imageMap[featuredArticle.id] ? (
                        <img src={imageMap[featuredArticle.id]} alt={featuredArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: '#01586B', opacity: 0.2, fontSize: '28px', fontWeight: 700 }}>KOP INSIDER</span>
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
                      <div style={{ backgroundColor: '#E7DFC9', height: '150px', width: '100%', overflow: 'hidden' }}>
                        {imageMap[article.id] && (
                          <img src={imageMap[article.id]} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                      <div style={{ backgroundColor: '#E7DFC9', height: '100px', width: '100%', overflow: 'hidden' }}>
                        {imageMap[article.id] && (
                          <img src={imageMap[article.id]} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
          <div className="ki-desktop-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>

            {/* LEAGUE TABLE */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9' }}>
                Premier League Table
              </div>
              {tableData.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#333', opacity: 0.5 }}>Table unavailable</p>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', fontSize: '10px', color: '#333', opacity: 0.5, marginBottom: '6px', padding: '0 4px' }}>
                    <span>#</span><span>Team</span><span style={{ textAlign: 'right' }}>P</span><span style={{ textAlign: 'right' }}>GD</span><span style={{ textAlign: 'right' }}>Pts</span>
                  </div>
                  {tableData.slice(0, 5).map((row) => (
                    <div key={row.pos} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', alignItems: 'center', padding: '6px 4px', borderRadius: '6px', backgroundColor: row.lfc ? '#F3EEDD' : 'transparent', marginBottom: '2px' }}>
                      <span style={{ fontSize: '12px', fontWeight: row.lfc ? 700 : 400, color: row.lfc ? '#01586B' : '#333', opacity: row.lfc ? 1 : 0.5 }}>{row.pos}</span>
                      <span style={{ fontSize: '13px', fontWeight: row.lfc ? 700 : 400, color: row.lfc ? '#01586B' : '#111' }}>{row.shortName || row.team}</span>
                      <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.p}</span>
                      <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.gd}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, textAlign: 'right', color: row.lfc ? '#01586B' : '#111' }}>{row.pts}</span>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* FIXTURES */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9' }}>
                Next Fixtures
              </div>
              {fixtures.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#333', opacity: 0.5 }}>Fixtures unavailable</p>
              ) : (
                fixtures.map((fixture, i) => (
                  <div key={fixture.id ?? i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < fixtures.length - 1 ? '1px solid #F3EEDD' : 'none' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>
                        {fixture.isHome ? `Liverpool vs ${fixture.opponent}` : `${fixture.opponent} vs Liverpool`}
                      </div>
                      <div style={{ fontSize: '10px', color: '#333', opacity: 0.5, marginTop: '2px' }}>
                        {fixture.date} · {fixture.time} · {(fixture as any).competitionLabel}
                      </div>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', backgroundColor: fixture.isHome ? '#E7DFC9' : '#333', color: fixture.isHome ? '#01586B' : '#fff' }}>
                      {fixture.isHome ? 'Home' : 'Away'}
                    </span>
                  </div>
                ))
              )}
            </div>

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
