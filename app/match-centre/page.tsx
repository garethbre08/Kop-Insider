import { getRecentResults, getAllLiverpoolFixtures, getPremierLeagueTable } from '@/lib/football'
import MatchCentreClient from './MatchCentreClient'

export default async function MatchCentre() {
  const [results, fixtures, leagueTable] = await Promise.all([
    getRecentResults(),
    getAllLiverpoolFixtures(),
    getPremierLeagueTable(),
  ])

  return (
    <main style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>
      <div className="ki-container">
        <div className="ki-page-header">
          <h1 className="ki-page-title">Match Centre</h1>
          <p className="ki-page-subtitle">Liverpool FC results, fixtures and league table</p>
        </div>
        <MatchCentreClient results={results} fixtures={fixtures} leagueTable={leagueTable} />
      </div>
    </main>
  )
}
