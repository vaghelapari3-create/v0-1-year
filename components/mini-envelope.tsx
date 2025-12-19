"use client"

import { cn } from "@/lib/utils"

interface MiniEnvelopeProps {
  envelope: {
    id: number
    type: string
    color: string
  }
  isOpened: boolean
  onClick: () => void
}

export function MiniEnvelope({ envelope, isOpened, onClick }: MiniEnvelopeProps) {
  const getColors = (colorClass: string) => {
    const colorMap: Record<string, { from: string; to: string; flap: string }> = {
      "from-rose-400 to-rose-600": { from: "#fb7185", to: "#e11d48", flap: "#fda4af" },
      "from-pink-400 to-pink-600": { from: "#f472b6", to: "#db2777", flap: "#f9a8d4" },
      "from-amber-400 to-amber-600": { from: "#fbbf24", to: "#d97706", flap: "#fcd34d" },
      "from-red-400 to-red-600": { from: "#f87171", to: "#dc2626", flap: "#fca5a5" },
      "from-fuchsia-400 to-fuchsia-600": { from: "#e879f9", to: "#c026d3", flap: "#f0abfc" },
      "from-rose-300 to-rose-500": { from: "#fda4af", to: "#f43f5e", flap: "#fecdd3" },
    }
    return colorMap[colorClass] || { from: "#fb7185", to: "#e11d48", flap: "#fda4af" }
  }

  const colors = getColors(envelope.color)

  return (
    <button
      onClick={onClick}
      disabled={isOpened}
      className={cn(
        "relative w-full aspect-[4/3] overflow-visible group",
        "transition-all duration-700 ease-out",
        "hover:scale-105 hover:-translate-y-1",
        "focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-background rounded-sm",
        isOpened && "scale-95 opacity-40 pointer-events-none",
      )}
    >
      <svg viewBox="0 0 160 120" className="w-full h-full drop-shadow-lg" style={{ overflow: "visible" }}>
        {/* Envelope body */}
        <rect x="0" y="0" width="160" height="120" rx="4" fill={`url(#bodyGradient-${envelope.id})`} />

        {/* Front pocket - bottom part of envelope */}
        <path
          d="M 0 45 L 80 85 L 160 45 L 160 116 Q 160 120 156 120 L 4 120 Q 0 120 0 116 Z"
          fill={`url(#pocketGradient-${envelope.id})`}
        />

        {/* Inner shadow line */}
        <path d="M 0 45 L 80 85 L 160 45" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

        {/* Triangular flap with smooth animation */}
        <path
          d={
            isOpened
              ? "M 0 4 Q 0 0 4 0 L 156 0 Q 160 0 160 4 L 80 -40 Z"
              : "M 0 4 Q 0 0 4 0 L 156 0 Q 160 0 160 4 L 80 55 Z"
          }
          fill={`url(#flapGradient-${envelope.id})`}
          className="transition-all duration-700 ease-out"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
          }}
        />

        {/* Flap inner decorative line */}
        {!isOpened && <path d="M 10 6 L 80 50 L 150 6" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />}

        {/* Gradients */}
        <defs>
          <linearGradient id={`bodyGradient-${envelope.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
          <linearGradient id={`pocketGradient-${envelope.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
          <linearGradient id={`flapGradient-${envelope.id}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.flap} />
          </linearGradient>
        </defs>
      </svg>

      {/* Heart seal - centered on the flap meeting point - NO LABELS */}
      <div
        className={cn(
          "absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-10 h-10 rounded-full bg-white/95 shadow-md",
          "flex items-center justify-center",
          "transition-all duration-700 ease-out",
          "group-hover:scale-110 group-hover:shadow-lg",
          isOpened && "scale-0 opacity-0",
        )}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-rose-500">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Sparkle burst effect when opened */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                animation: `burst 0.8s ease-out ${i * 0.05}s forwards`,
                transform: `rotate(${i * 30}deg) translateY(-40px)`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  )
}
