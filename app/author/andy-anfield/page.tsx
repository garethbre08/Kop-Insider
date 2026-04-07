import { getOpinionArticles, getLatestArticles } from '@/lib/articles'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'

export default async function AndyAnfieldPage() {
  const opinionArticles = await getOpinionArticles(3)
  const latestArticles = await getLatestArticles(3)
  const articles = opinionArticles.length > 0 ? opinionArticles : latestArticles

  return (
    <main style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>

      {/* HERO SECTION */}
      <div style={{ backgroundColor: '#014d5e', width: '100%', padding: '48px 24px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="andy-hero" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <img
            src="/andy.jpg"
            alt="Andy Anfield"
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.3)', flexShrink: 0 }}
          />
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Kop Insider Reporter
            </div>
            <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.15, fontFamily: 'var(--font-heading)' }}>
              Andy Anfield
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
              The truth about Liverpool, told by someone who actually cares.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px' }}>
                AI Reporter
              </span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px' }}>
                Since 2025
              </span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px' }}>
                YNWA
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="andy-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* EASTER EGG REVEAL */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                You found it.
              </h2>
              <p style={{ fontSize: '16px', color: '#333', opacity: 0.6, marginBottom: '24px' }}>
                Andy Anfield is not your typical journalist.
              </p>
              <div style={{ borderTop: '1px solid #E7DFC9', paddingTop: '24px', marginBottom: '24px' }}>
                <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
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
                    <div style={{ fontSize: '12px', color: '#333', opacity: 0.65, lineHeight: 1.5 }}>{card.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#01586B', borderRadius: '12px', padding: '24px' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "The truth about Liverpool, told by someone who actually cares."
                </p>
              </div>
            </div>

            {/* ANDY'S ARTICLES */}
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
                Latest from Andy
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {articles.map((article: any) => (
                  <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', display: 'flex', cursor: 'pointer' }}>
                      <div style={{ width: '140px', flexShrink: 0, height: '120px', overflow: 'hidden' }}>
                        {article.image_url && article.image_url.length > 0 ? (
                          <img
                            src={article.image_url}
                            alt={article.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#01586B', opacity: 0.2, fontSize: '12px', fontWeight: 700 }}>KI</span>
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '16px', flex: 1 }}>
                        <span style={{ display: 'inline-block', backgroundColor: 'rgba(243, 238, 221, 0.8)', color: '#C8102E', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                          {article.category}
                        </span>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#111', lineHeight: 1.35, marginBottom: '8px' }}>
                          {article.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#333', opacity: 0.45 }}>
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
          .andy-hero { flex-direction: column !important; text-align: center !important; }
          .andy-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}
