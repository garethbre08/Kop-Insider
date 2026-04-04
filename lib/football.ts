const BASE_URL = 'https://api.football-data.org/v4'
const API_KEY = process.env.FOOTBALL_DATA_API_KEY

const headers = {
  'X-Auth-Token': API_KEY || '',
}

export async function getPremierLeagueTable() {
  try {
    const res = await fetch(`${BASE_URL}/competitions/PL/standings`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch table')
    const data = await res.json()
    const standings = data.standings[0].table
    return standings.map((row: any) => ({
      pos: row.position,
      team: row.team.name,
      shortName: row.team.shortName,
      crest: row.team.crest,
      p: row.playedGames,
      w: row.won,
      d: row.draw,
      l: row.lost,
      gd: row.goalDifference > 0 ? `+${row.goalDifference}` : `${row.goalDifference}`,
      pts: row.points,
      lfc: row.team.name.includes('Liverpool'),
    }))
  } catch (error) {
    console.error('Table fetch error:', error)
    return []
  }
}

export async function getLiverpoolFixtures() {
  try {
    const res = await fetch(`${BASE_URL}/teams/64/matches?status=SCHEDULED&limit=5`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch fixtures')
    const data = await res.json()
    return data.matches.slice(0, 3).map((match: any) => {
      const isHome = match.homeTeam.name.includes('Liverpool')
      const opponent = isHome ? match.awayTeam.name : match.homeTeam.name
      const opponentCrest = isHome ? match.awayTeam.crest : match.homeTeam.crest
      const date = new Date(match.utcDate)
      const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
      const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      return {
        id: match.id,
        opponent,
        opponentCrest,
        date: formattedDate,
        time: formattedTime,
        isHome,
        competition: match.competition.name,
        venue: isHome ? 'Anfield' : opponent,
      }
    })
  } catch (error) {
    console.error('Fixtures fetch error:', error)
    return []
  }
}

export async function getLiverpoolLiveScore() {
  try {
    const res = await fetch(`${BASE_URL}/teams/64/matches?status=LIVE`, {
      headers,
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch live score')
    const data = await res.json()
    if (!data.matches || data.matches.length === 0) return null
    const match = data.matches[0]
    const isHome = match.homeTeam.name.includes('Liverpool')
    return {
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeCrest: match.homeTeam.crest,
      awayCrest: match.awayTeam.crest,
      homeScore: match.score.fullTime.home ?? match.score.halfTime.home ?? 0,
      awayScore: match.score.fullTime.away ?? match.score.halfTime.away ?? 0,
      minute: match.minute || 0,
      status: match.status,
      competition: match.competition.name,
      isHome,
    }
  } catch (error) {
    console.error('Live score fetch error:', error)
    return null
  }
}

export async function getRecentResults() {
  try {
    const res = await fetch(`${BASE_URL}/teams/64/matches?status=FINISHED&limit=3`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch results')
    const data = await res.json()
    return data.matches.slice(0, 3).map((match: any) => {
      const isHome = match.homeTeam.name.includes('Liverpool')
      const lfcScore = isHome ? match.score.fullTime.home : match.score.fullTime.away
      const oppScore = isHome ? match.score.fullTime.away : match.score.fullTime.home
      const opponent = isHome ? match.awayTeam.name : match.homeTeam.name
      const result = lfcScore > oppScore ? 'W' : lfcScore < oppScore ? 'L' : 'D'
      return {
        id: match.id,
        opponent,
        lfcScore,
        oppScore,
        isHome,
        result,
        competition: match.competition.name,
        date: new Date(match.utcDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      }
    })
  } catch (error) {
    console.error('Results fetch error:', error)
    return []
  }
}
