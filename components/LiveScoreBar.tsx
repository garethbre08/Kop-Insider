"use client";

type LiveScore = {
  homeTeam: string
  awayTeam: string
  homeCrest: string
  awayCrest: string
  homeScore: number
  awayScore: number
  minute: number
  status: string
  competition: string
  isHome: boolean
}

type Props = {
  liveScore: LiveScore | null
}

export default function LiveScoreBar({ liveScore }: Props) {
  if (!liveScore) return null

  return (
    <div style={{ backgroundColor: '#222222', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

        {/* Competition */}
        <span className="ki-score-competition" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 500, flexShrink: 0 }}>
          {liveScore.competition}
        </span>

        {/* Match */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{liveScore.homeTeam}</span>
          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px', padding: '0 8px' }}>
            {liveScore.homeScore} – {liveScore.awayScore}
          </span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{liveScore.awayTeam}</span>
        </div>

        {/* Live indicator + minute */}
        <div className="ki-score-venue" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#C8102E', opacity: 0.75, animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />
            <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C8102E', display: 'inline-block' }} />
          </span>
          <span style={{ color: '#C8102E', fontSize: '12px', fontWeight: 700 }}>{liveScore.minute}&apos;</span>
        </div>

      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @media (max-width: 480px) {
          .ki-score-competition { display: none !important; }
          .ki-score-venue { display: none !important; }
        }
      `}</style>
    </div>
  )
}
