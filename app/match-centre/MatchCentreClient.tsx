'use client'
import { useState } from 'react'

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

type Props = {
  results: Result[]
  fixtures: Fixture[]
}

type Filter = 'All' | 'Premier League' | 'Champions League' | 'FA Cup'
const FILTERS: Filter[] = ['All', 'Premier League', 'Champions League', 'FA Cup']

export default function MatchCentreClient({ results, fixtures }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  const filteredResults = activeFilter === 'All'
    ? results
    : results.filter((r) => r.competition.includes(activeFilter === 'FA Cup' ? 'FA Cup' : activeFilter === 'Champions League' ? 'Champions' : activeFilter))

  const filteredFixtures = activeFilter === 'All'
    ? fixtures
    : fixtures.filter((f) => f.competition.includes(activeFilter === 'FA Cup' ? 'FA Cup' : activeFilter === 'Champions League' ? 'Champions' : activeFilter))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* FILTER PILLS */}
      <div className="filter-pills" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter
          return (
            <button
              key={filter}
              className="filter-pill"
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: isActive ? 'none' : '1.5px solid #E7DFC9',
                backgroundColor: isActive ? 'var(--ki-accent)' : '#fff',
                color: isActive ? '#fff' : '#333',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s',
              }}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* RECENT RESULTS */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '3px', height: '20px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px', flexShrink: 0 }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', margin: 0 }}>
            Recent Results
          </h2>
        </div>
        {filteredResults.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>No results for this competition.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {filteredResults.map((result) => (
              <div
                key={result.id}
                style={{
                  backgroundColor: '#FDFCFA',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  borderLeft: result.result === 'W' ? '4px solid #007F75' : result.result === 'L' ? '4px solid #C8102E' : '4px solid #E7DFC9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
                className="result-card-inner"
              >
                <div className="result-card-score" style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111', textAlign: 'right', flex: 1, fontFamily: 'var(--font-body)' }}>
                    Liverpool
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', minWidth: '24px', textAlign: 'center' }}>
                      {result.lfcScore}
                    </span>
                    <span style={{ fontSize: '16px', color: '#333', opacity: 0.4 }}>—</span>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', minWidth: '24px', textAlign: 'center' }}>
                      {result.oppScore}
                    </span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111', flex: 1, fontFamily: 'var(--font-body)' }}>
                    {result.opponent}
                  </span>
                </div>
                <div className="result-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                    {result.competitionLabel} · {result.date}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    backgroundColor: result.result === 'W' ? 'rgba(0,127,117,0.1)' : result.result === 'L' ? 'rgba(200,16,46,0.1)' : 'rgba(0,0,0,0.06)',
                    color: result.result === 'W' ? '#007F75' : result.result === 'L' ? '#C8102E' : '#333333',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'nowrap',
                  }}>
                    {result.result === 'W' ? 'Win' : result.result === 'L' ? 'Loss' : 'Draw'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* UPCOMING FIXTURES */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '3px', height: '20px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px', flexShrink: 0 }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', fontFamily: 'var(--font-heading)', margin: 0 }}>
            Upcoming Fixtures
          </h2>
        </div>
        {filteredFixtures.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>No fixtures for this competition.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {filteredFixtures.map((fixture, i) => (
              <div
                key={fixture.id ?? i}
                style={{
                  backgroundColor: '#FDFCFA',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
                className="fixture-card-inner"
              >
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111', fontFamily: 'var(--font-body)', flex: 1 }}>
                  {fixture.isHome ? `Liverpool vs ${fixture.opponent}` : `${fixture.opponent} vs Liverpool`}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span style={{ fontSize: '12px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                    {fixture.date} · {fixture.time} · {fixture.competitionLabel}
                  </span>
                  <span className="fixture-card-badge" style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    backgroundColor: fixture.isHome ? '#C8102E' : '#00A398',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'nowrap',
                  }}>
                    {fixture.isHome ? 'Home' : 'Away'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .filter-pills {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .filter-pills::-webkit-scrollbar { display: none; }
          .filter-pill {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            padding: 6px 10px !important;
            font-size: 11px !important;
          }
          .result-card-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .result-card-score {
            width: 100% !important;
            justify-content: center !important;
          }
          .result-card-meta {
            width: 100% !important;
            justify-content: space-between !important;
          }
          .fixture-card-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .fixture-card-badge {
            align-self: flex-start !important;
          }
        }
      `}</style>
    </div>
  )
}
