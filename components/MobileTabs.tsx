'use client'
import { useTheme } from '@/context/ThemeContext'

type TableRow = {
  pos: number
  team: string
  shortName?: string
  p: number
  gd: string
  pts: number
  lfc: boolean
}

type Fixture = {
  id?: number
  opponent: string
  date: string
  time: string
  isHome: boolean
  competition?: string
  competitionLabel?: string
}

type Props = {
  children: React.ReactNode
  tableData: TableRow[]
  fixtures: Fixture[]
}

export default function MobileTabs({ children, tableData, fixtures }: Props) {
  const { theme } = useTheme()
  const teal = theme === 'away' ? 'rgb(0, 163, 152)' : '#01586B'

  const tableRows = tableData.slice(0, 8)

  return (
    <>
      {/* ARTICLES — always visible */}
      <div>{children}</div>

      {/* FIXTURES — below articles on mobile, hidden on desktop */}
      <div className="ki-mobile-only" style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', marginTop: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9' }}>
          Next Fixtures
        </div>
        {fixtures.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#333', opacity: 0.5 }}>Fixtures unavailable</p>
        ) : (
          fixtures.map((fixture, i) => (
            <div key={fixture.id ?? i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < fixtures.length - 1 ? '1px solid #F3EEDD' : 'none' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '4px' }}>
                  {fixture.isHome ? `Liverpool vs ${fixture.opponent}` : `${fixture.opponent} vs Liverpool`}
                </div>
                <div style={{ fontSize: '10px', color: '#333', opacity: 0.5 }}>
                  {fixture.date} · {fixture.time} · {fixture.competitionLabel}
                </div>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', backgroundColor: fixture.isHome ? '#C8102E' : '#00A398', color: '#fff' }}>
                {fixture.isHome ? 'Home' : 'Away'}
              </span>
            </div>
          ))
        )}
      </div>

      {/* TABLE — below fixtures on mobile, hidden on desktop */}
      <div className="ki-mobile-only" style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', marginTop: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9' }}>
          Premier League Table
        </div>
        {tableRows.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#333', opacity: 0.5 }}>Table unavailable</p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', fontSize: '10px', color: '#333', opacity: 0.5, marginBottom: '8px', padding: '0 4px' }}>
              <span>#</span><span>Team</span><span style={{ textAlign: 'right' }}>P</span><span style={{ textAlign: 'right' }}>GD</span><span style={{ textAlign: 'right' }}>Pts</span>
            </div>
            {tableRows.map((row) => (
              <div key={row.pos} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', alignItems: 'center', padding: '6px 4px', paddingLeft: row.lfc ? '10px' : '4px', paddingRight: row.lfc ? '10px' : '4px', marginLeft: row.lfc ? '-4px' : '0', marginRight: row.lfc ? '-4px' : '0', borderRadius: '6px', backgroundColor: row.lfc ? 'rgba(243, 238, 221, 0.7)' : 'transparent', marginBottom: '2px' }}>
                <span style={{ fontSize: '12px', fontWeight: row.lfc ? 700 : 400, color: row.lfc ? teal : '#333', opacity: row.lfc ? 1 : 0.5 }}>{row.pos}</span>
                <span style={{ fontSize: '13px', fontWeight: row.lfc ? 700 : 500, color: row.lfc ? teal : '#111' }}>{row.shortName || row.team}</span>
                <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.p}</span>
                <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.gd}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, textAlign: 'right', color: row.lfc ? teal : '#111' }}>{row.pts}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .ki-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  )
}
