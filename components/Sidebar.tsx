import { getPremierLeagueTable, getAllLiverpoolFixtures } from '@/lib/football'

export default async function Sidebar() {
  const tableData = await getPremierLeagueTable()
  const fixtures = await getAllLiverpoolFixtures()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>

      {/* LEAGUE TABLE */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9' }}>
          Premier League Table
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', fontSize: '10px', color: '#333', opacity: 0.5, marginBottom: '6px', padding: '0 4px' }}>
          <span>#</span><span>Team</span><span style={{ textAlign: 'right' }}>P</span><span style={{ textAlign: 'right' }}>GD</span><span style={{ textAlign: 'right' }}>Pts</span>
        </div>
        {tableData.slice(0, 8).map((row: any) => (
          <div key={row.pos} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', alignItems: 'center', padding: '6px 4px', paddingLeft: row.lfc ? '10px' : '4px', paddingRight: row.lfc ? '10px' : '4px', marginLeft: row.lfc ? '-4px' : '0', marginRight: row.lfc ? '-4px' : '0', borderRadius: '6px', backgroundColor: row.lfc ? 'rgba(243, 238, 221, 0.7)' : 'transparent', marginBottom: '2px' }}>
            <span style={{ fontSize: '12px', fontWeight: row.lfc ? 700 : 400, color: row.lfc ? '#C8102E' : '#333', opacity: row.lfc ? 1 : 0.5 }}>{row.pos}</span>
            <span style={{ fontSize: '13px', fontWeight: row.lfc ? 700 : 500, color: row.lfc ? '#C8102E' : '#111' }}>{row.shortName || row.team}</span>
            <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.p}</span>
            <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.gd}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, textAlign: 'right', color: row.lfc ? '#C8102E' : '#111' }}>{row.pts}</span>
          </div>
        ))}
      </div>

      {/* NEXT FIXTURES */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9', fontFamily: 'var(--font-heading)' }}>
          Next Fixtures
        </div>
        {fixtures.slice(0, 3).map((fixture: any, i: number) => (
          <div key={fixture.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F3EEDD' : 'none' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', marginBottom: '3px', fontFamily: 'var(--font-body)' }}>
                {fixture.isHome ? `Liverpool vs ${fixture.opponent}` : `${fixture.opponent} vs Liverpool`}
              </div>
              <div style={{ fontSize: '11px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
                {fixture.date} · {fixture.time} · {fixture.short || fixture.competition}
              </div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '4px', backgroundColor: fixture.isHome ? 'rgba(231, 223, 201, 0.7)' : '#333', color: fixture.isHome ? '#C8102E' : '#fff', whiteSpace: 'nowrap', marginLeft: '8px', fontFamily: 'var(--font-body)', letterSpacing: '0.3px' }}>
              {fixture.isHome ? 'Home' : 'Away'}
            </span>
          </div>
        ))}
      </div>

      {/* HONOURS */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9', fontFamily: 'var(--font-heading)' }}>
          Liverpool Honours
        </div>
        {[
          { label: 'League Titles', count: 20, last: '2024-25' },
          { label: 'European Cups', count: 6, last: '2019' },
          { label: 'FA Cups', count: 8, last: '2022' },
          { label: 'League Cups', count: 10, last: '2024' },
          { label: 'UEFA Cups', count: 3, last: '2001' },
          { label: 'UEFA Super Cups', count: 4, last: '2019' },
          { label: 'Club World Cup', count: 1, last: '2019' },
        ].map((honour, i) => (
          <div key={honour.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 6 ? '1px solid #F3EEDD' : 'none' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>
                {honour.label}
              </div>
              <div style={{ fontSize: '10px', color: '#333', opacity: 0.4, fontFamily: 'var(--font-body)' }}>
                Last: {honour.last}
              </div>
            </div>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#C8102E', fontFamily: 'var(--font-heading)', minWidth: '32px', textAlign: 'right' }}>
              {honour.count}
            </span>
          </div>
        ))}
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E7DFC9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
            Total Major Trophies
          </span>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#007F75', fontFamily: 'var(--font-heading)' }}>
            52
          </span>
        </div>
      </div>

    </div>
  )
}
