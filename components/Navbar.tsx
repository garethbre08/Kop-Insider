"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const bg        = theme === "away" ? "#01586B" : "#C8102E";
  const pinstripe = theme === "away" ? "#01586B" : "#007F75";

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
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: 700, fontSize: '24px', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
                Kop Insider
              </span>
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

        {/* DECORATIVE STRIPE */}
        <div style={{ width: '100%', height: '6px', backgroundColor: pinstripe, flexShrink: 0 }} />

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
        }
        .ki-nav-link:hover span { font-weight: 600 !important; color: #fff !important; }
      `}</style>
    </>
  );
}
