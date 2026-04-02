import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Match Centre", href: "/match-centre" },
  { label: "Transfer Talk", href: "/transfer-talk" },
  { label: "Injuries", href: "/injuries" },
  { label: "Opinion", href: "/opinion" },
];

const socialLinks = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-ki-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Left: Branding */}
          <div className="flex flex-col gap-3">
            <span className="text-ki-white font-bold text-xl tracking-tight">Kop Insider</span>
            <p className="text-sm leading-relaxed text-ki-white/45">
              The truth about Liverpool, told by someone who actually cares.
            </p>
            <p className="text-xs text-ki-white/45">Powered by Andy Anfield</p>
            <Link href="/author/andy-anfield" className="text-xs text-ki-white/45 hover:text-ki-white transition-colors">
              Meet Andy Anfield →
            </Link>
          </div>

          {/* Middle: Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-ki-white font-semibold text-sm">Navigation</span>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ki-white/45 hover:text-ki-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social */}
          <div className="flex flex-col gap-3">
            <span className="text-ki-white font-semibold text-sm">Follow Us</span>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="flex items-center gap-2 text-sm text-ki-white/45 hover:text-ki-white transition-colors"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-ki-white/10 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ki-white/45">© 2025 Kop Insider. All rights reserved.</p>
          <p className="text-xs text-ki-white/45">Built for Reds. By Reds.</p>
        </div>
      </div>
    </footer>
  );
}
