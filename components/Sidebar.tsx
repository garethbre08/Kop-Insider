import { getPremierLeagueTable, getAllLiverpoolFixtures } from '@/lib/football'

export default async function Sidebar() {
  const tableData = await getPremierLeagueTable()
  const fixtures = await getAllLiverpoolFixtures()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>

      {/* LEAGUE TABLE */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9' }}>
          Premier League Table
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', fontSize: '10px', color: '#333', opacity: 0.5, marginBottom: '6px', padding: '0 4px' }}>
          <span>#</span><span>Team</span><span style={{ textAlign: 'right' }}>P</span><span style={{ textAlign: 'right' }}>GD</span><span style={{ textAlign: 'right' }}>Pts</span>
        </div>
        {tableData.slice(0, 8).map((row: any) => (
          <div key={row.pos} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', alignItems: 'center', padding: '6px 4px', borderRadius: '6px', backgroundColor: row.lfc ? '#F3EEDD' : 'transparent', marginBottom: '2px' }}>
            <span style={{ fontSize: '12px', fontWeight: row.lfc ? 700 : 400, color: row.lfc ? '#01586B' : '#333', opacity: row.lfc ? 1 : 0.5 }}>{row.pos}</span>
            <span style={{ fontSize: '13px', fontWeight: row.lfc ? 700 : 500, color: row.lfc ? '#01586B' : '#111' }}>{row.shortName || row.team}</span>
            <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.p}</span>
            <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.gd}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, textAlign: 'right', color: row.lfc ? '#01586B' : '#111' }}>{row.pts}</span>
          </div>
        ))}
      </div>

      {/* NEXT FIXTURES */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9' }}>
          Next Fixtures
        </div>
        {fixtures.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#333', opacity: 0.5 }}>Fixtures unavailable</p>
        ) : (
          fixtures.slice(0, 3).map((fixture: any, i: number) => (
            <div key={fixture.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F3EEDD' : 'none' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', marginBottom: '3px' }}>
                  {fixture.isHome ? `Liverpool vs ${fixture.opponent}` : `${fixture.opponent} vs Liverpool`}
                </div>
                <div style={{ fontSize: '11px', color: '#333', opacity: 0.5 }}>
                  {fixture.date} · {fixture.time} · {fixture.competitionLabel || fixture.competition}
                </div>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', backgroundColor: fixture.isHome ? '#E7DFC9' : '#333', color: fixture.isHome ? '#01586B' : '#fff', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                {fixture.isHome ? 'Home' : 'Away'}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}
