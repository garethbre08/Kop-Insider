const BASE_URL = 'https://api.football-data.org/v4'
const API_KEY = process.env.FOOTBALL_DATA_API_KEY

const headers = {
  'X-Auth-Token': API_KEY || '',
}

function getCompetitionLabel(name: string): string {
  if (name.includes('Champions League') || name.includes('UEFA Champions')) return 'UCL'
  if (name.includes('FA Cup')) return 'FAC'
  if (name.includes('Carabao') || name.includes('League Cup') || name.includes('EFL Cup')) return 'CC'
  if (name.includes('Premier League')) return 'PL'
  return name.substring(0, 3).toUpperCase()
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
    return data.matches.slice(0, 5).map((match: any) => {
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
        competitionLabel: getCompetitionLabel(match.competition.name),
        venue: isHome ? 'Anfield' : opponent,
        timestamp: date.getTime() / 1000,
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

export async function getLiverpoolCupFixtures() {
  try {
    const CUP_API_KEY = process.env.API_FOOTBALL_KEY
    const LIVERPOOL_ID = 40
    const SEASON = 2025

    const competitions = [
      { id: 45, name: 'FA Cup', short: 'FAC' },
      { id: 48, name: 'Carabao Cup', short: 'CC' },
    ]

    const allFixtures = await Promise.all(
      competitions.map(async (comp) => {
        const res = await fetch(
          `https://v3.football.api-sports.io/fixtures?team=${LIVERPOOL_ID}&season=${SEASON}&league=${comp.id}&status=NS`,
          {
            headers: { 'x-apisports-key': CUP_API_KEY || '' },
            next: { revalidate: 3600 },
          }
        )
        if (!res.ok) return []
        const data = await res.json()
        return (data.response || []).map((item: any) => {
          const isHome = item.teams.home.id === LIVERPOOL_ID
          const opponent = isHome ? item.teams.away.name : item.teams.home.name
          const opponentCrest = isHome ? item.teams.away.logo : item.teams.home.logo
          const date = new Date(item.fixture.date)
          const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
          const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
          return {
            id: item.fixture.id,
            opponent,
            opponentCrest,
            date: formattedDate,
            time: formattedTime,
            isHome,
            competition: comp.name,
            competitionLabel: comp.short,
            venue: isHome ? 'Anfield' : opponent,
            timestamp: item.fixture.timestamp,
          }
        })
      })
    )

    return allFixtures.flat().sort((a, b) => a.timestamp - b.timestamp).slice(0, 5)
  } catch (error) {
    console.error('Cup fixtures fetch error:', error)
    return []
  }
}

export async function getAllLiverpoolFixtures() {
  try {
    const [leagueFixtures, cupFixtures] = await Promise.all([
      getLiverpoolFixtures(),
      getLiverpoolCupFixtures(),
    ])

    return [...leagueFixtures, ...cupFixtures]
      .sort((a: any, b: any) => a.timestamp - b.timestamp)
      .slice(0, 5)
  } catch (error) {
    console.error('All fixtures fetch error:', error)
    return []
  }
}

export async function getRecentResults() {
  try {
    const res = await fetch(`${BASE_URL}/teams/64/matches?status=FINISHED&limit=5`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch results')
    const data = await res.json()
    return data.matches.slice(0, 5).map((match: any) => {
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
        competitionLabel: getCompetitionLabel(match.competition.name),
        date: new Date(match.utcDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      }
    })
  } catch (error) {
    console.error('Results fetch error:', error)
    return []
  }
}
