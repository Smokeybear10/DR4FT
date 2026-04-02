'use client'

type Props = {
  score: number
  label: string
  max?: number
  size?: number
}

export default function ScoreRing({ score, label, max = 100, size = 100 }: Props) {
  const percentage = Math.round((score / max) * 100)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  const isHigh = percentage >= 75
  const isMid = percentage >= 50 && percentage < 75
  const color = isHigh ? '#4ade80' : isMid ? '#fbbf24' : 'rgba(240, 240, 248, 0.3)'
  const glowClass = isHigh ? 'score-glow-high' : isMid ? 'score-glow-mid' : 'score-glow-low'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${glowClass}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="transform -rotate-90" style={{ width: size, height: size }}>
          {/* Track */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="3"
          />
          {/* Progress */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-score"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-2xl font-semibold tracking-wide"
            style={{ color }}
          >
            {score}
          </span>
        </div>
      </div>
      <span className="label">{label}</span>
    </div>
  )
}
