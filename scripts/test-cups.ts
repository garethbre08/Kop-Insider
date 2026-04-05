async function testCupFixtures() {
  const API_KEY = process.env.API_FOOTBALL_KEY
  const LIVERPOOL_ID = 40
  const SEASON = 2025

  console.log('Testing FA Cup...')
  const facRes = await fetch(
    `https://v3.football.api-sports.io/fixtures?team=${LIVERPOOL_ID}&season=${SEASON}&league=45&status=NS`,
    {
      headers: { 'x-apisports-key': API_KEY || '' }
    }
  )
  const facData = await facRes.json()
  console.log('FA Cup response:', JSON.stringify(facData, null, 2))

  console.log('Testing Carabao Cup...')
  const ccRes = await fetch(
    `https://v3.football.api-sports.io/fixtures?team=${LIVERPOOL_ID}&season=${SEASON}&league=48&status=NS`,
    {
      headers: { 'x-apisports-key': API_KEY || '' }
    }
  )
  const ccData = await ccRes.json()
  console.log('Carabao Cup response:', JSON.stringify(ccData, null, 2))
}

testCupFixtures()
