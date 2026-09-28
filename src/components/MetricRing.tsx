interface MetricRingProps {
  label: string
  value: number
  color: string
  size?: number
}

export function MetricRing({ label, value, color, size = 130 }: MetricRingProps) {
  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="metric-ring" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2a3530"
            strokeWidth="6"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1.5s ease-out',
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>
        <span
          className="absolute font-ritual text-2xl font-semibold"
          style={{ color }}
        >
          {value}%
        </span>
      </div>
      <span className="text-xs uppercase tracking-widest text-llama-300/70 font-medium">
        {label}
      </span>
    </div>
  )
}
