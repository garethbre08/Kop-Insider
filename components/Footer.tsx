import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#333333', width: '100%', marginTop: '64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 32px' }}>
        <div className="ki-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', marginBottom: '40px' }}>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>Kop Insider</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>
              The truth about Liverpool, told by someone who actually cares.
            </div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '6px' }}>
              Powered by Andy Anfield
            </div>
            <Link href="/author/andy-anfield" style={{ textDecoration: 'none' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', cursor: 'pointer' }}>
                Meet Andy Anfield →
              </span>
            </Link>
          </div>

          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Navigation</div>
            {[
              { label: 'Home',          href: '/'             },
              { label: 'Match Centre',  href: '/match-centre' },
              { label: 'Transfer Talk', href: '/transfer-talk' },
              { label: 'Injuries',      href: '/injuries'     },
              { label: 'Opinion',       href: '/opinion'      },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '10px', cursor: 'pointer' }}>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>

          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Follow Us</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginBottom: '10px', cursor: 'pointer' }}>
              X / Twitter
            </div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', cursor: 'pointer' }}>
              Instagram
            </div>
          </div>

        </div>

        <div className="ki-footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            © 2025 Kop Insider. All rights reserved.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            Built for Reds. By Reds.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ki-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ki-footer-bottom { flex-direction: column !important; gap: 8px !important; text-align: center !important; }
        }
      `}</style>
    </footer>
  )
}
