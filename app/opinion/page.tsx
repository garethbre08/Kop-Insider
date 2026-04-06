import type { Metadata } from 'next'
import { getOpinionArticles, getLatestArticles } from '@/lib/articles'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Opinion — Andy Anfield',
  description: 'Andy Anfield opinion pieces on Liverpool FC. Passionate, informed and brutal when necessary.',
}

export default async function OpinionPage() {
  const opinionArticles = await getOpinionArticles(6)
  const fallbackArticles = await getLatestArticles(6)
  const articles = opinionArticles.length > 0 ? opinionArticles : fallbackArticles

  return (
    <main style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>

      {/* PAGE HEADER */}
      <div style={{ backgroundColor: '#014d5e', width: '100%', padding: '32px 24px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <img src="/andy.jpg" alt="Andy Anfield" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Andy Anfield · Kop Insider Reporter
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Opinion
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>
              The truth about Liverpool, told by someone who actually cares. Brutal when necessary, never brutal for clicks.
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="opinion-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* FEATURED OPINION */}
            {articles[0] && (
              <Link href={`/article/${articles[0].id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', borderLeft: '4px solid #007F75', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                    {articles[0].image_url ? (
                      <img src={articles[0].image_url} alt={articles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#01586B', opacity: 0.2, fontSize: '24px', fontWeight: 700 }}>KOP INSIDER</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#01586B', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                      Featured Opinion
                    </span>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '10px' }}>
                      {articles[0].title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#333', opacity: 0.65, lineHeight: 1.5, marginBottom: '16px' }}>
                      {articles[0].excerpt}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src="/andy.jpg" alt="Andy Anfield" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>Andy Anfield</div>
                          <div style={{ fontSize: '11px', color: '#333', opacity: 0.45 }}>{new Date(articles[0].created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        </div>
                      </div>
                      <span style={{ backgroundColor: '#01586B', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '8px 16px', borderRadius: '20px' }}>
                        Read Article
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* OPINION GRID */}
            {articles.length > 1 && (
              <>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginTop: '8px' }}>
                  More Opinion
                </div>
                <div className="opinion-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {articles.slice(1, 5).map((article) => (
                    <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%' }}>
                        <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                          {article.image_url ? (
                            <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          ) : (
                            <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                          )}
                        </div>
                        <div style={{ padding: '16px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#01586B', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                            Opinion
                          </span>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: '#111', lineHeight: 1.35, marginBottom: '8px' }}>
                            {article.title}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <img src="/andy.jpg" alt="Andy Anfield" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontSize: '11px', color: '#333', opacity: 0.45 }}>Andy Anfield · {new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* NO ARTICLES FALLBACK */}
            {articles.length === 0 && (
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>✍️</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>No opinion pieces yet</div>
                <div style={{ fontSize: '14px', color: '#333', opacity: 0.5 }}>Andy is working on something. Check back soon.</div>
              </div>
            )}

          </div>

          {/* SIDEBAR */}
          <Sidebar />

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .opinion-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .opinion-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
