import type { Metadata } from 'next'
import { getRecentResults, getAllLiverpoolFixtures } from '@/lib/football'

export const metadata: Metadata = {
  title: 'Match Centre',
  description: 'Liverpool FC results, upcoming fixtures and live scores across all competitions. Premier League, Champions League, FA Cup and more.',
}
import MatchCentreClient from './MatchCentreClient'
import Sidebar from '@/components/Sidebar'

export default async function MatchCentre() {
  const [results, fixtures] = await Promise.all([
    getRecentResults(),
    getAllLiverpoolFixtures(),
  ])

  return (
    <main style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>
      <div className="ki-container">
        <div className="ki-page-header">
          <h1 className="ki-page-title">Match Centre</h1>
          <p className="ki-page-subtitle">Liverpool FC results, fixtures and league table</p>
        </div>
        <div className="ki-page-layout">
          <MatchCentreClient results={results} fixtures={fixtures} />
          <aside className="ki-sidebar">
            <Sidebar />
          </aside>
        </div>
      </div>
    </main>
  )
}
