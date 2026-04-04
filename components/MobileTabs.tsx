'use client'
import { useState } from 'react'

type Tab = 'articles' | 'table' | 'fixtures'

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
}

type Props = {
  children: React.ReactNode
  tableData: TableRow[]
  fixtures: Fixture[]
}

export default function MobileTabs({ children, tableData, fixtures }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('articles')

  const tabs = [
    { id: 'articles' as Tab, label: 'News'     },
    { id: 'table'    as Tab, label: 'Table'    },
    { id: 'fixtures' as Tab, label: 'Fixtures' },
  ]

  // Show top 8 only for mobile readability
  const tableRows = tableData.slice(0, 8)

  return (
    <>
      {/* TAB BAR — hidden on desktop via CSS */}
      <div className="ki-mobile-tab-bar" style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '4px', display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.2s',
              backgroundColor: activeTab === tab.id ? '#01586B' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#333',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ARTICLES TAB */}
      {activeTab === 'articles' && (
        <div>{children}</div>
      )}

      {/* TABLE TAB */}
      {activeTab === 'table' && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px' }}>
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
                <div key={row.pos} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px 28px 32px', gap: '4px', alignItems: 'center', padding: '8px 4px', borderRadius: '6px', backgroundColor: row.lfc ? '#F3EEDD' : 'transparent', marginBottom: '2px' }}>
                  <span style={{ fontSize: '12px', fontWeight: row.lfc ? 700 : 400, color: row.lfc ? '#01586B' : '#333', opacity: row.lfc ? 1 : 0.5 }}>{row.pos}</span>
                  <span style={{ fontSize: '13px', fontWeight: row.lfc ? 700 : 500, color: row.lfc ? '#01586B' : '#111' }}>{row.shortName || row.team}</span>
                  <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.p}</span>
                  <span style={{ fontSize: '12px', textAlign: 'right', color: '#333', opacity: 0.6 }}>{row.gd}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, textAlign: 'right', color: row.lfc ? '#01586B' : '#111' }}>{row.pts}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* FIXTURES TAB */}
      {activeTab === 'fixtures' && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px' }}>
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
                  <div style={{ fontSize: '12px', color: '#333', opacity: 0.5 }}>
                    {fixture.date} · {fixture.time}
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', backgroundColor: fixture.isHome ? '#E7DFC9' : '#333', color: fixture.isHome ? '#01586B' : '#fff' }}>
                  {fixture.isHome ? 'Home' : 'Away'}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .ki-mobile-tab-bar { display: none !important; }
        }
      `}</style>
    </>
  )
}
