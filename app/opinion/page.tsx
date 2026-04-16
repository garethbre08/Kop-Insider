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
    <div style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>

      {/* PAGE HEADER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '3px', height: '24px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px' }} />
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)' }}>
              Opinion
            </h1>
          </div>
          <p style={{ fontSize: '16px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', paddingLeft: '13px' }}>
            Andy Anfield's take on Liverpool FC. Passionate, informed and brutal when necessary.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 32px' }}>
        <div className="opinion-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* FEATURED OPINION */}
            {articles[0] && (
              <Link href={`/article/${articles[0].id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', borderLeft: '4px solid var(--ki-accent)', overflow: 'hidden', cursor: 'pointer' }}>
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
                    <span style={{ color: 'var(--ki-accent)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
                      Featured Opinion
                    </span>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
                      {articles[0].title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#333', opacity: 0.65, lineHeight: 1.5, marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                      {articles[0].excerpt}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src="/andy.jpg"
                          alt="Andy Anfield"
                          style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', fontFamily: 'var(--font-body)' }}>Andy Anfield</div>
                          <div style={{ fontSize: '11px', color: '#333', opacity: 0.45, fontFamily: 'var(--font-body)' }}>{new Date(articles[0].created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        </div>
                      </div>
                      <button style={{ backgroundColor: '#C8102E', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                        Read Article
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* OPINION GRID */}
            {articles.length > 1 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', marginTop: '8px' }}>
                  <div style={{ width: '3px', height: '20px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', margin: 0 }}>
                    More Opinion
                  </h2>
                </div>
                <div className="opinion-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {articles.slice(1, 5).map((article) => (
                    <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                          {article.image_url ? (
                            <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          ) : (
                            <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                          )}
                        </div>
                        <div style={{ padding: '16px' }}>
                          <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                            Opinion
                          </span>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                            {article.title}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <img src="/logo.png" alt="Kop Insider" style={{ width: '20px', height: '20px', borderRadius: '4px', objectFit: 'contain' }} />
                            <span style={{ fontSize: '11px', color: '#333', opacity: 0.45, fontFamily: 'var(--font-body)' }}>Kop Insider · {new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
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
              <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>✍️</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                  No opinion pieces yet
                </div>
                <div style={{ fontSize: '14px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
                  Andy is working on something. Check back soon.
                </div>
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
    </div>
  )
}
