"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface MainEnvelopeProps {
  onSealClick: () => void
}

export function MainEnvelope({ onSealClick }: MainEnvelopeProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center animate-float">
      <div className="relative w-80 h-52 md:w-[420px] md:h-[280px]">
        {/* Envelope back/body */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#c93c3c] to-[#a82828] rounded-sm shadow-2xl">
          {/* Inner V-fold lines on back */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 280" preserveAspectRatio="none">
            <path d="M 0 0 L 210 140 L 420 0" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          </svg>
        </div>

        {/* Envelope front pocket */}
        <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-b from-[#d64545] to-[#b32d2d] rounded-b-sm">
          {/* Bottom fold shadow */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#9a2222] to-transparent" />
          {/* Paper texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Envelope flap (triangular top) */}
        <div className="absolute top-0 left-0 right-0 h-[50%] overflow-visible">
          <svg
            className="absolute top-0 left-0 w-full h-full drop-shadow-lg"
            viewBox="0 0 420 140"
            preserveAspectRatio="none"
          >
            {/* Flap shadow */}
            <path d="M 0 0 L 0 8 L 210 148 L 420 8 L 420 0 Z" fill="rgba(0,0,0,0.15)" />
            {/* Main flap */}
            <path d="M 0 0 L 210 140 L 420 0 Z" fill="url(#flapGradient)" />
            {/* Flap inner fold line */}
            <path d="M 10 4 L 210 130 L 410 4" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <defs>
              <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc5555" />
                <stop offset="100%" stopColor="#c43c3c" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <button
          onClick={onSealClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={cn(
            "absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
            "w-20 h-20 md:w-24 md:h-24 cursor-pointer",
            "transition-all duration-500 ease-out",
            isHovering ? "scale-110" : "scale-100",
          )}
        >
          {/* Realistic wax seal */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <defs>
              {/* Main wax gradient - warm skin/beige tone */}
              <radialGradient id="waxMain" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#f5dcc8" />
                <stop offset="30%" stopColor="#e8c4a8" />
                <stop offset="60%" stopColor="#d4a882" />
                <stop offset="100%" stopColor="#c49268" />
              </radialGradient>
              {/* Highlight */}
              <radialGradient id="waxHighlight" cx="30%" cy="25%" r="35%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              {/* Shadow filter */}
              <filter id="waxShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Wax drips for organic look */}
            <ellipse cx="20" cy="85" rx="10" ry="15" fill="url(#waxMain)" />
            <ellipse cx="50" cy="90" rx="12" ry="16" fill="url(#waxMain)" />
            <ellipse cx="80" cy="84" rx="9" ry="13" fill="url(#waxMain)" />
            <ellipse cx="35" cy="88" rx="7" ry="10" fill="url(#waxMain)" />
            <ellipse cx="68" cy="87" rx="8" ry="11" fill="url(#waxMain)" />

            {/* Main circular seal body */}
            <circle cx="50" cy="48" r="40" fill="url(#waxMain)" filter="url(#waxShadow)" />

            {/* Inner decorative ring */}
            <circle cx="50" cy="48" r="32" fill="none" stroke="#b8936a" strokeWidth="2" opacity="0.4" />
            <circle cx="50" cy="48" r="28" fill="none" stroke="#c9a577" strokeWidth="1" opacity="0.3" />

            {/* Heart emblem in center */}
            <path
              d="M50 68 
                 C50 68 32 54 32 40 
                 C32 32 38 26 46 26 
                 C49 26 50 29 50 29 
                 C50 29 51 26 54 26 
                 C62 26 68 32 68 40 
                 C68 54 50 68 50 68Z"
              fill="#a07850"
              opacity="0.8"
            />

            {/* Heart inner highlight */}
            <path
              d="M50 60 
                 C50 60 38 50 38 42 
                 C38 37 42 33 47 33 
                 C49 33 50 35 50 35 
                 C50 35 51 33 53 33 
                 C58 33 62 37 62 42 
                 C62 50 50 60 50 60Z"
              fill="#c49a70"
              opacity="0.4"
            />

            {/* Top highlight shine */}
            <ellipse cx="38" cy="30" rx="14" ry="10" fill="url(#waxHighlight)" />
          </svg>
        </button>

        {/* Decorative corner flourishes */}
        <div className="absolute bottom-3 left-3 text-[#ffd700]/40 text-xl">&#10022;</div>
        <div className="absolute bottom-3 right-3 text-[#ffd700]/40 text-xl">&#10022;</div>
      </div>

      {/* Instruction text */}
      <p className="mt-10 text-muted-foreground text-lg italic font-medium tracking-wide opacity-80">
        Click the seal to open...
      </p>
    </div>
  )
}
