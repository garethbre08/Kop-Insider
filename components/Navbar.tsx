'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'away' | 'home'>('away')
  const pathname = usePathname()
  const bg = theme === 'away' ? '#01586B' : '#C8102E'

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Match Centre', href: '/match-centre' },
    { label: 'Transfer Talk', href: '/transfer-talk' },
    { label: 'Injuries', href: '/injuries' },
    { label: 'Opinion', href: '/opinion' },
  ]

  return (
    <>
      <nav style={{ backgroundColor: bg, width: '100%', position: 'sticky', top: 0, zIndex: 50, transition: 'background-color 0.3s ease' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.3px' }}>Kop Insider</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <span style={{ color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: pathname === link.href ? 600 : 400, borderBottom: pathname === link.href ? '2px solid #fff' : '2px solid transparent', paddingBottom: '4px', transition: 'all 0.2s' }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '3px' }}>
              <button onClick={() => setTheme('home')} style={{ padding: '5px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none', backgroundColor: theme === 'home' ? '#fff' : 'transparent', color: theme === 'home' ? bg : 'rgba(255,255,255,0.8)', transition: 'all 0.2s' }}>
                Home
              </button>
              <button onClick={() => setTheme('away')} style={{ padding: '5px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none', backgroundColor: theme === 'away' ? '#fff' : 'transparent', color: theme === 'away' ? bg : 'rgba(255,255,255,0.8)', transition: 'all 0.2s' }}>
                Away
              </button>
            </div>
            <button style={{ backgroundColor: '#fff', color: bg, border: 'none', padding: '8px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ backgroundColor: bg, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: '14px 24px', color: '#fff', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
