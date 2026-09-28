export function Mandala({ size = 200, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
    >
      <g className="animate-spin-slow" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="100" cy="100" r="90" fill="none" stroke="#d4a849" strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="#d4a849" strokeWidth="0.8" opacity="0.4" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x1 = 100 + Math.cos(angle) * 75
          const y1 = 100 + Math.sin(angle) * 75
          const x2 = 100 + Math.cos(angle) * 90
          const y2 = 100 + Math.sin(angle) * 90
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#d4a849"
              strokeWidth="0.8"
              opacity="0.5"
            />
          )
        })}
      </g>
      <g className="animate-spin-reverse" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="100" cy="100" r="55" fill="none" stroke="#d4a849" strokeWidth="0.6" opacity="0.5" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const x = 100 + Math.cos(angle) * 55
          const y = 100 + Math.sin(angle) * 55
          return <circle key={i} cx={x} cy={y} r="2.5" fill="#d4a849" opacity="0.6" />
        })}
      </g>
      <g className="animate-breathe" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="100" cy="100" r="35" fill="none" stroke="#d4a849" strokeWidth="1" opacity="0.4" />
        <path
          d="M100 70 L106 96 L132 100 L106 104 L100 130 L94 104 L68 100 L94 96 Z"
          fill="#d4a849"
          opacity="0.7"
        />
      </g>
      <circle cx="100" cy="100" r="4" fill="#111815" stroke="#d4a849" strokeWidth="1" />
    </svg>
  )
}
