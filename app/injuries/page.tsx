import type { Metadata } from 'next'
import { getArticlesByCategory } from '@/lib/articles'
import InjurySidebar from '@/components/InjurySidebar'
import Link from 'next/link'
import ThemedPageWrapper from '@/components/ThemedPageWrapper'

export const metadata: Metadata = {
  title: 'Injury Updates',
  description: 'Full Liverpool FC injury tracker. Who is out, who is doubtful and when are they coming back?',
}

export default async function InjuriesPage() {
  const injuryArticles = await getArticlesByCategory('injuries', 6)

  return (
    <ThemedPageWrapper>

      {/* PAGE HEADER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '3px', height: '24px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px' }} />
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)' }}>
              Injury Updates
            </h1>
          </div>
          <p style={{ fontSize: '16px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', paddingLeft: '13px' }}>
            The latest Liverpool FC injury and fitness news from Andy Anfield
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 32px' }}>
        <div className="injuries-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* FEATURED INJURY */}
            {injuryArticles[0] && (
              <Link href={`/article/${injuryArticles[0].id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
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
                    <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Injuries
                    </span>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
                      {injuryArticles[0].title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#333', opacity: 0.65, lineHeight: 1.5, marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
                      {injuryArticles[0].excerpt}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src="/logo.png" alt="Kop Insider" style={{ width: '20px', height: '20px', borderRadius: '4px', objectFit: 'contain' }} />
                      <span style={{ fontSize: '12px', color: '#333', opacity: 0.45, fontFamily: 'var(--font-body)' }}>Kop Insider · {new Date(injuryArticles[0].created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* MORE INJURY NEWS */}
            {injuryArticles.length > 1 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', marginTop: '8px' }}>
                  <div style={{ width: '3px', height: '20px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', margin: 0 }}>
                    More Injury News
                  </h2>
                </div>
                <div className="injuries-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {injuryArticles.slice(1, 5).map((article) => (
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
                            Injuries
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
            {injuryArticles.length === 0 && (
              <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏥</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>No injury updates yet</div>
                <div style={{ fontSize: '14px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>Andy is monitoring the latest sources. Check back soon.</div>
              </div>
            )}

          </div>

          {/* SIDEBAR */}
          <InjurySidebar />

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
    </ThemedPageWrapper>
  )
}
