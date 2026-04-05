'use client'
import { useState } from 'react'

const TEAL     = '#01586B'
const SAND     = '#E7DFC9'
const CREAM    = '#F3EEDD'
const BLACK    = '#111111'
const CHARCOAL = '#333333'
const RED      = '#C8102E'
const WHITE    = '#FFFFFF'

const outcomeBorderColor: Record<string, string> = { W: TEAL, D: SAND, L: RED }

type Result = {
  id: number
  opponent: string
  lfcScore: number
  oppScore: number
  isHome: boolean
  result: string
  competition: string
  competitionLabel: string
  date: string
}

type Fixture = {
  id?: number
  opponent: string
  date: string
  time: string
  isHome: boolean
  competition: string
  competitionLabel: string
  venue: string
}

type TableRow = {
  pos: number
  team: string
  shortName?: string
  p: number
  gd: string
  pts: number
  lfc: boolean
}

type Props = {
  results: Result[]
  fixtures: Fixture[]
  leagueTable: TableRow[]
}

type Filter = 'All' | 'Premier League' | 'Champions League' | 'FA Cup'
const FILTERS: Filter[] = ['All', 'Premier League', 'Champions League', 'FA Cup']

function CrestCircle({ variant }: { variant: 'liverpool' | 'opponent' }) {
  return (
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: variant === 'liverpool' ? TEAL : SAND, flexShrink: 0 }} />
  )
}

function CompBadge({ label }: { label: string }) {
  return (
    <span style={{ fontSize: '10px', fontWeight: 700, color: CHARCOAL, opacity: 0.5 }}>
      {label}
    </span>
  )
}

export default function MatchCentreClient({ results, fixtures, leagueTable }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  const filteredResults = activeFilter === 'All'
    ? results
    : results.filter((r) => r.competition.includes(activeFilter === 'FA Cup' ? 'FA Cup' : activeFilter === 'Champions League' ? 'Champions' : activeFilter))

  const filteredFixtures = activeFilter === 'All'
    ? fixtures
    : fixtures.filter((f) => f.competition.includes(activeFilter === 'FA Cup' ? 'FA Cup' : activeFilter === 'Champions League' ? 'Champions' : activeFilter))

  return (
    <div className="ki-page-layout">

      {/* Main */}
      <div className="ki-main">

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: isActive ? 'none' : `1px solid ${SAND}`,
                  backgroundColor: isActive ? TEAL : WHITE,
                  color: isActive ? WHITE : CHARCOAL,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Recent Results */}
        <section>
          <h2 className="ki-section-title">Recent Results</h2>
          {filteredResults.length === 0 ? (
            <p className="ki-meta">No results for this competition.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  style={{ backgroundColor: WHITE, borderRadius: '12px', borderLeft: `4px solid ${outcomeBorderColor[result.result] ?? SAND}`, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: BLACK }}>Liverpool</span>
                    <CrestCircle variant="liverpool" />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{ fontWeight: 700, fontSize: '24px', color: BLACK, width: '24px', textAlign: 'center' }}>{result.lfcScore}</span>
                    <span style={{ fontWeight: 700, fontSize: '18px', color: CHARCOAL, opacity: 0.4 }}>–</span>
                    <span style={{ fontWeight: 700, fontSize: '24px', color: BLACK, width: '24px', textAlign: 'center' }}>{result.oppScore}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-start' }}>
                    <CrestCircle variant="opponent" />
                    <span style={{ fontWeight: 600, fontSize: '14px', color: BLACK }}>{result.opponent}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, minWidth: '80px', gap: '4px' }}>
                    <CompBadge label={result.competitionLabel} />
                    <span className="ki-meta">{result.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Fixtures */}
        <section>
          <h2 className="ki-section-title">Upcoming Fixtures</h2>
          {filteredFixtures.length === 0 ? (
            <p className="ki-meta">No fixtures for this competition.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredFixtures.map((fixture, i) => (
                <div key={fixture.id ?? i} style={{ backgroundColor: WHITE, borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: BLACK }}>Liverpool</span>
                    <CrestCircle variant="liverpool" />
                  </div>

                  <span style={{ fontWeight: 700, fontSize: '14px', color: CHARCOAL, opacity: 0.4, flexShrink: 0 }}>vs</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-start' }}>
                    <CrestCircle variant="opponent" />
                    <span style={{ fontWeight: 600, fontSize: '14px', color: BLACK }}>{fixture.opponent}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0, minWidth: '140px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, borderRadius: '4px', padding: '2px 8px', backgroundColor: fixture.isHome ? SAND : CHARCOAL, color: fixture.isHome ? TEAL : WHITE }}>
                        {fixture.isHome ? 'Home' : 'Away'}
                      </span>
                      <CompBadge label={fixture.competitionLabel} />
                    </div>
                    <span className="ki-meta">{fixture.date} · {fixture.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Sidebar */}
      <aside className="ki-sidebar">
        <div className="ki-sidebar-card">
          <h3 className="ki-section-title">Premier League 2024/25</h3>
          {leagueTable.length === 0 ? (
            <p className="ki-meta">Table unavailable.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '13px', minWidth: '260px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ fontSize: '11px', color: CHARCOAL, opacity: 0.5, borderBottom: `1px solid ${SAND}` }}>
                    <th style={{ textAlign: 'left', fontWeight: 500, paddingBottom: '8px', width: '24px' }}>#</th>
                    <th style={{ textAlign: 'left', fontWeight: 500, paddingBottom: '8px' }}>Club</th>
                    <th style={{ textAlign: 'center', fontWeight: 500, paddingBottom: '8px', width: '24px' }}>P</th>
                    <th style={{ textAlign: 'center', fontWeight: 500, paddingBottom: '8px', width: '32px' }}>GD</th>
                    <th style={{ textAlign: 'center', fontWeight: 500, paddingBottom: '8px', width: '32px' }}>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {leagueTable.map((row) => (
                    <tr key={row.pos} style={{ backgroundColor: row.lfc ? CREAM : 'transparent' }}>
                      <td style={{ padding: '4px', fontSize: '12px', color: row.lfc ? TEAL : CHARCOAL, fontWeight: row.lfc ? 700 : 400, opacity: row.lfc ? 1 : 0.5 }}>{row.pos}</td>
                      <td style={{ padding: '4px', fontSize: '12px', fontWeight: row.lfc ? 700 : 500, color: row.lfc ? TEAL : BLACK }}>{row.shortName || row.team}</td>
                      <td style={{ padding: '4px', textAlign: 'center', fontSize: '12px', color: CHARCOAL, opacity: row.lfc ? 1 : 0.5 }}>{row.p}</td>
                      <td style={{ padding: '4px', textAlign: 'center', fontSize: '12px', color: CHARCOAL, opacity: row.lfc ? 1 : 0.5 }}>{row.gd}</td>
                      <td style={{ padding: '4px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: row.lfc ? TEAL : BLACK }}>{row.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </aside>

    </div>
  )
}
