export function Starfield() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-shambhala-deep via-shambhala-night to-shambhala-deep" />
      <div className="absolute inset-0 starfield opacity-40" />
      <div className="absolute inset-0 starfield opacity-20" style={{ backgroundPosition: '50% 50%' }} />
      {/* Andean mountain silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-30"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ height: '200px' }}
      >
        <path
          d="M0,200 L0,140 L120,60 L220,110 L340,40 L460,90 L580,30 L700,80 L820,50 L940,100 L1060,70 L1200,120 L1200,200 Z"
          fill="url(#mountainGrad)"
        />
        <path
          d="M0,200 L0,170 L100,120 L200,150 L320,100 L440,140 L560,90 L680,130 L800,110 L920,150 L1040,120 L1200,160 L1200,200 Z"
          fill="url(#mountainGrad2)"
        />
        <defs>
          <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e3c32" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#111815" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="mountainGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2520" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0f0c" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
