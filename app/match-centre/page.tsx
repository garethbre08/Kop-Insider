import type { Metadata } from 'next'
import { getRecentResults, getAllLiverpoolFixtures } from '@/lib/football'
import MatchCentreClient from './MatchCentreClient'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Match Centre',
  description: 'Liverpool FC results, upcoming fixtures and live scores across all competitions. Premier League, Champions League, FA Cup and more.',
}

export default async function MatchCentre() {
  const [results, fixtures] = await Promise.all([
    getRecentResults(),
    getAllLiverpoolFixtures(),
  ])

  return (
    <div style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '3px', height: '24px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px' }} />
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)' }}>
              Match Centre
            </h1>
          </div>
          <p style={{ fontSize: '16px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', paddingLeft: '13px' }}>
            Liverpool FC results, fixtures and live scores across all competitions
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 32px' }}>
        <div className="match-centre-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>
          <MatchCentreClient results={results} fixtures={fixtures} />
          <aside className="ki-desktop-sidebar">
            <Sidebar />
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .match-centre-grid { grid-template-columns: 1fr !important; }
          .ki-desktop-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  )
}
