import type { Metadata } from 'next'
import { getArticlesByCategory } from '@/lib/articles'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Injury Updates',
  description: 'Full Liverpool FC injury tracker. Who is out, who is doubtful and when are they coming back?',
}

export default async function InjuriesPage() {
  const injuryArticles = await getArticlesByCategory('injuries', 6)

  return (
    <main style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>

      {/* PAGE HEADER */}
      <div style={{ backgroundColor: '#014d5e', width: '100%', padding: '32px 24px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Kop Insider
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Injury Updates
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>
            The latest Liverpool FC injury and fitness news from Andy Anfield.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="injuries-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* FEATURED INJURY */}
            {injuryArticles[0] && (
              <Link href={`/article/${injuryArticles[0].id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                    {injuryArticles[0].image_url ? (
                      <img src={injuryArticles[0].image_url} alt={injuryArticles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#01586B', opacity: 0.2, fontSize: '24px', fontWeight: 700 }}>KOP INSIDER</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{ display: 'inline-block', backgroundColor: '#E7DFC9', color: '#01586B', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Injuries
                    </span>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '10px' }}>
                      {injuryArticles[0].title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#333', opacity: 0.65, lineHeight: 1.5, marginBottom: '12px' }}>
                      {injuryArticles[0].excerpt}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src="/andy.jpg" alt="Andy Anfield" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '12px', color: '#333', opacity: 0.45 }}>Andy Anfield · {new Date(injuryArticles[0].created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* INJURY GRID */}
            {injuryArticles.length > 1 && (
              <>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginTop: '8px' }}>
                  More Injury News
                </div>
                <div className="injuries-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {injuryArticles.slice(1, 5).map((article) => (
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
                          <span style={{ display: 'inline-block', backgroundColor: '#E7DFC9', color: '#01586B', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                            Injuries
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
            {injuryArticles.length === 0 && (
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏥</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>No injury updates yet</div>
                <div style={{ fontSize: '14px', color: '#333', opacity: 0.5 }}>Andy is monitoring the latest sources. Check back soon.</div>
              </div>
            )}

          </div>

          {/* SIDEBAR */}
          <Sidebar />

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .injuries-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .injuries-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
