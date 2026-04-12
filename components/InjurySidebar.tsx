import { getPremierLeagueTable, getAllLiverpoolFixtures } from '@/lib/football'

const INJURY_LIST = [
  {
    name: 'Kostas Tsimikas',
    position: 'LB',
    injury: 'Knee',
    status: 'out',
    expected: 'Unknown',
  },
  {
    name: 'Federico Chiesa',
    position: 'FW',
    injury: 'Muscle',
    status: 'out',
    expected: 'Unknown',
  },
  {
    name: 'Harvey Elliott',
    position: 'MF',
    injury: 'Ankle',
    status: 'out',
    expected: 'Unknown',
  },
  {
    name: 'Conor Bradley',
    position: 'RB',
    injury: 'Hamstring',
    status: 'out',
    expected: 'Unknown',
  },
  {
    name: 'Wataru Endo',
    position: 'MF',
    injury: 'Knee',
    status: 'out',
    expected: 'Unknown',
  },
]

const statusConfig = {
  out: {
    label: 'Out',
    backgroundColor: 'rgba(200,16,46,0.1)',
    color: '#C8102E',
    dot: '#C8102E',
  },
  training: {
    label: 'Training',
    backgroundColor: 'rgba(0,127,117,0.1)',
    color: '#007F75',
    dot: '#007F75',
  },
  doubt: {
    label: 'Doubtful',
    backgroundColor: 'rgba(212,175,55,0.1)',
    color: '#D4AF37',
    dot: '#D4AF37',
  },
}

export default async function InjurySidebar() {
  const tableData = await getPremierLeagueTable()
  const fixtures = await getAllLiverpoolFixtures()

  const outCount = INJURY_LIST.filter(p => p.status === 'out').length
  const trainingCount = INJURY_LIST.filter(p => p.status === 'training').length
  const doubtCount = INJURY_LIST.filter(p => p.status === 'doubt').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>

      {/* INJURY TRACKER */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>

        {/* TITLE */}
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '3px', height: '16px', backgroundColor: '#C8102E', borderRadius: '2px', flexShrink: 0 }} />
          Injury Tracker
        </div>

        {/* SUMMARY STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          <div style={{ borderRadius: '8px', padding: '10px', textAlign: 'center', border: '2px solid #E7DFC9' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#C8102E', fontFamily: 'var(--font-heading)' }}>{outCount}</div>
            <div style={{ fontSize: '12px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', marginTop: '2px' }}>Out</div>
          </div>
          <div style={{ borderRadius: '8px', padding: '10px', textAlign: 'center', border: '2px solid #E7DFC9' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#D4AF37', fontFamily: 'var(--font-heading)' }}>{doubtCount}</div>
            <div style={{ fontSize: '12px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', marginTop: '2px' }}>Doubtful</div>
          </div>
          <div style={{ borderRadius: '8px', padding: '10px', textAlign: 'center', border: '2px solid #E7DFC9' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#007F75', fontFamily: 'var(--font-heading)' }}>{trainingCount}</div>
            <div style={{ fontSize: '12px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', marginTop: '2px' }}>Training</div>
          </div>
        </div>

        {/* PLAYER LIST */}
        {INJURY_LIST.map((player, i) => {
          const config = statusConfig[player.status as keyof typeof statusConfig]
          return (
            <div key={player.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < INJURY_LIST.length - 1 ? '1px solid #F3EEDD' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: config.dot, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>
                    {player.name}
                  </div>
                  <div style={{ fontSize: '10px', color: '#333', opacity: 0.4, fontFamily: 'var(--font-body)', marginTop: '2px' }}>
                    {player.position} · {player.injury}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', backgroundColor: config.backgroundColor, color: config.color, fontFamily: 'var(--font-body)', display: 'block', marginBottom: '3px' }}>
                  {config.label}
                </span>
                <div style={{ fontSize: '10px', color: '#333', opacity: 0.4, fontFamily: 'var(--font-body)' }}>
                  {player.expected}
                </div>
              </div>
            </div>
          )
        })}

        {/* FOOTER NOTE */}
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E7DFC9' }}>
          <p style={{ fontSize: '10px', color: '#333', opacity: 0.4, fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
            Injury data updated regularly. Always check official Liverpool FC channels for confirmed team news.
          </p>
        </div>
      </div>

      {/* LEAGUE TABLE */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '3px', height: '16px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px', flexShrink: 0 }} />
          Premier League Table
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', fontSize: '10px', color: '#333', opacity: 0.5, marginBottom: '6px', padding: '0 4px' }}>
          <span>#</span><span>Team</span><span style={{ textAlign: 'right' }}>P</span><span style={{ textAlign: 'right' }}>GD</span><span style={{ textAlign: 'right' }}>Pts</span>
        </div>
        {tableData.slice(0, 8).map((row: any) => (
          <div key={row.pos} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', alignItems: 'center', padding: '6px 4px', borderRadius: '6px', backgroundColor: row.lfc ? 'rgba(243,238,221,0.7)' : 'transparent', marginBottom: '2px' }}>
            <span style={{ fontSize: '12px', fontWeight: row.lfc ? 700 : 400, color: '#111', opacity: row.lfc ? 1 : 0.5 }}>{row.pos}</span>
            <span style={{ fontSize: '13px', fontWeight: row.lfc ? 700 : 500, color: '#111' }}>{row.shortName || row.team}</span>
            <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.p}</span>
            <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.gd}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, textAlign: 'right', color: '#111' }}>{row.pts}</span>
          </div>
        ))}
      </div>

      {/* NEXT FIXTURES */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '3px', height: '16px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px', flexShrink: 0 }} />
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
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '4px', backgroundColor: fixture.isHome ? '#C8102E' : '#00A398', color: '#fff', whiteSpace: 'nowrap', marginLeft: '8px', fontFamily: 'var(--font-body)' }}>
              {fixture.isHome ? 'Home' : 'Away'}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
