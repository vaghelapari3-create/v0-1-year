"use client"

import { useState, useEffect } from "react"

const lines = [
  { text: "Happy 1 Year", isMain: true },
  { text: "12 Months", isMain: false },
  { text: "365 Days", isMain: false },
  { text: "8,760 Hours", isMain: false },
  { text: "5,25,600 Minutes", isMain: false },
  { text: "31,536,000 Seconds", isMain: false },
  { text: "of Togetherness", isMain: true, isLast: true },
]

export function AnniversaryText() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    lines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index])
      }, index * 1000)
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
      {/* Soft background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-200/20 blur-3xl" />

      <div className="relative z-10 text-center space-y-4 md:space-y-5">
        {lines.map((line, index) => (
          <div key={index} className="overflow-hidden">
            <p
              style={{
                opacity: visibleLines.includes(index) ? 1 : 0,
                transform: visibleLines.includes(index) ? "translateY(0px)" : "translateY(50px)",
                filter: visibleLines.includes(index) ? "blur(0px)" : "blur(8px)",
                transition: "all 1.4s cubic-bezier(0.22, 0.61, 0.36, 1)",
              }}
              className={`
                ${
                  line.isMain && !line.isLast
                    ? // Using Parisienne (Brush Script style) for main anniversary heading
                      "font-[var(--font-brush)] text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-rose-500 via-pink-400 to-rose-600 bg-clip-text text-transparent drop-shadow-lg animate-text-glow"
                    : line.isLast
                      ? // Using Parisienne for the "of Togetherness" text as well
                        "font-[var(--font-brush)] text-3xl md:text-4xl lg:text-5xl text-rose-400 mt-4"
                      : "font-[var(--font-cormorant)] text-xl md:text-2xl lg:text-3xl font-light text-rose-300/90 tracking-widest"
                }
              `}
            >
              {line.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
