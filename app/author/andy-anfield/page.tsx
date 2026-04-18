import { getOpinionArticles, getLatestArticles } from '@/lib/articles'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import ThemedPageWrapper from '@/components/ThemedPageWrapper'

export default async function AndyAnfieldPage() {
  const opinionArticles = await getOpinionArticles(3)
  const latestArticles = await getLatestArticles(3)
  const articles = opinionArticles.length > 0 ? opinionArticles : latestArticles

  return (
    <ThemedPageWrapper>

      {/* PAGE HEADER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
            <div style={{ width: '3px', height: '24px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px', flexShrink: 0 }} />
            <img
              src="/andy.jpg"
              alt="Andy Anfield"
              style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--ki-accent)' }}
            />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                Andy Anfield
              </h1>
              <p style={{ fontSize: '16px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
                Kop Insider AI Reporter
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 32px' }}>
        <div className="andy-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* EASTER EGG REVEAL */}
            <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                You found it.
              </h2>
              <p style={{ fontSize: '16px', color: '#333', opacity: 0.6, marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
                Andy Anfield is not your typical journalist.
              </p>
              <div style={{ borderTop: '1px solid #E7DFC9', paddingTop: '24px', marginBottom: '24px' }}>
                <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                  Andy Anfield is Kop Insider's AI reporter — built to deliver the truth about Liverpool FC without fear or favour. Powered by cutting edge AI, trained on decades of Liverpool football, and programmed with one golden rule: brutal when necessary, never brutal for clicks.
                </p>
              </div>
              <div className="andy-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {[
                  { icon: '⚡', title: 'Always On', desc: 'Never misses a story, never sleeps, never has an off day' },
                  { icon: '🎯', title: 'No Agenda', desc: 'No press box politics. No club PR. Just the truth.' },
                  { icon: '❤️', title: 'Fan First', desc: 'Built by a Red. Written for Reds. Always.' },
                ].map((card) => (
                  <div key={card.title} style={{ backgroundColor: '#F3EEDD', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>{card.title}</div>
                    <div style={{ fontSize: '12px', color: '#333', opacity: 0.65, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{card.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: 'var(--ki-accent)', borderRadius: '12px', padding: '24px' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontStyle: 'italic', lineHeight: 1.4, fontFamily: 'var(--font-heading)' }}>
                  "The truth about Liverpool, told by someone who actually cares."
                </p>
              </div>
            </div>

            {/* ANDY'S ARTICLES */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '3px', height: '20px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px' }} />
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', margin: 0 }}>
                  Latest from Andy
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {articles.map((article: any) => (
                  <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', display: 'flex', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
                      <div style={{ width: '140px', flexShrink: 0, height: '120px', overflow: 'hidden' }}>
                        {article.image_url && article.image_url.length > 0 ? (
                          <img
                            src={article.image_url}
                            alt={article.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                        )}
                      </div>
                      <div style={{ padding: '16px', flex: 1 }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                          {article.category}
                        </span>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.35, marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.45, fontFamily: 'var(--font-body)' }}>
                          Andy Anfield · {new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <Sidebar />

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .andy-grid { grid-template-columns: 1fr !important; }
          .andy-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </ThemedPageWrapper>
  )
}
