"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const [headlines, setHeadlines] = useState<string[]>([
    'Liverpool FC News — Kop Insider',
    'Loading latest headlines...',
  ]);

  useEffect(() => {
    fetch('/api/headlines')
      .then(res => res.json())
      .then(data => {
        if (data.headlines && data.headlines.length > 0) {
          setHeadlines(data.headlines);
        }
      })
      .catch(() => {});
  }, []);

  const tickerBg = theme === 'away' ? '#ffffff' : '#007F75';
  const tickerText = theme === 'away' ? '#111111' : '#ffffff';
  const separator = '|';
  const tickerContent = headlines.join(` ${separator} `) + ` ${separator} `;
  const bg = theme === "away" ? "rgb(0, 163, 152)" : "#C8102E";

  const links = [
    { label: "Match Centre", href: "/match-centre" },
    { label: "Transfer Talk", href: "/transfer-talk" },
    { label: "Injuries", href: "/injuries" },
    { label: "Opinion", href: "/opinion" },
  ];

  return (
    <>
      <nav style={{ backgroundColor: bg, width: '100%', position: 'sticky', top: 0, zIndex: 50, transition: 'background-color 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>

          {/* LEFT — Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="ki-nav-desktop">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="ki-nav-link" style={{ textDecoration: 'none' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: pathname === link.href ? 600 : 500, letterSpacing: '0.2px', color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.75)', textDecoration: 'none', borderBottom: pathname === link.href ? '2px solid #fff' : '2px solid transparent', paddingBottom: '4px', transition: 'all 0.2s' }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* LEFT — Hamburger (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}
            className="ki-hamburger"
          >
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#fff', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#fff', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#fff', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>

          {/* CENTRE — Logo absolutely positioned */}
          <div className="ki-nav-logo" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img
                src="/logo.png"
                alt="Kop Insider"
                style={{
                  height: '60px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
            </Link>
          </div>

          {/* RIGHT — Home/Away Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '24px', padding: '6px' }}>
              <button onClick={() => setTheme('home')} style={{ padding: '6px 16px', borderRadius: '18px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none', backgroundColor: theme === 'home' ? '#fff' : 'transparent', color: theme === 'home' ? bg : 'rgba(255,255,255,0.8)', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}>
                Home
              </button>
              <button onClick={() => setTheme('away')} style={{ padding: '6px 16px', borderRadius: '18px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none', backgroundColor: theme === 'away' ? '#fff' : 'transparent', color: theme === 'away' ? bg : 'rgba(255,255,255,0.8)', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}>
                Away
              </button>
            </div>
          </div>

        </div>

        {/* NEWS TICKER */}
        <div style={{ width: '100%', height: '44px', backgroundColor: tickerBg, overflow: 'hidden', display: 'flex', alignItems: 'center', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: theme === 'away' ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
          {/* LABEL */}
          <div style={{ backgroundColor: theme === 'away' ? '#F3EEDD' : 'rgba(0,0,0,0.2)', color: theme === 'away' ? '#111111' : '#ffffff', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0, borderRight: theme === 'away' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
            Latest News
          </div>
          {/* SCROLLING TEXT */}
          <div style={{ overflow: 'hidden', flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
            <div className="ki-ticker-content" style={{ whiteSpace: 'nowrap', animation: 'ki-ticker 45s linear infinite', fontSize: '14px', fontWeight: 500, color: tickerText, fontFamily: 'var(--font-body)', letterSpacing: '0.2px', paddingLeft: '24px' }}>
              {tickerContent} {tickerContent} {tickerContent}
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div style={{ backgroundColor: bg, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: pathname === link.href ? 600 : 500, letterSpacing: '0.2px', color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.75)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        )}

      </nav>

      <style>{`
        @media (min-width: 769px) {
          .ki-hamburger { display: none !important; }
        }
        @media (max-width: 768px) {
          .ki-nav-desktop { display: none !important; }
          .ki-nav-logo img { height: 36px !important; }
        }
        .ki-nav-link:hover span { font-weight: 600 !important; color: #fff !important; }
      `}</style>
    </>
  );
}
