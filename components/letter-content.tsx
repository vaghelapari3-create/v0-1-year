"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Heart, Sparkles } from "lucide-react"

interface LetterContentProps {
  onShowGrid: () => void
}

export function LetterContent({ onShowGrid }: LetterContentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={cn(
        "relative max-w-2xl mx-auto transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
    >
      {/* Letter paper */}
      <div className="relative bg-gradient-to-br from-[#fefcf3] via-[#fdf8e8] to-[#fcf4dc] rounded-lg shadow-2xl p-8 md:p-12">
        {/* Paper texture */}
        <div className="absolute inset-0 rounded-lg opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEiIGZpbGw9IiNjY2MiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')]" />

        {/* Lined paper effect */}
        <div
          className="absolute inset-x-8 top-20 bottom-8 opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #b8c4d4 31px, #b8c4d4 32px)",
          }}
        />

        {/* Red margin line */}
        <div className="absolute left-12 top-8 bottom-8 w-px bg-[#e8a0a0]/40" />

        {/* Content */}
        <div className="relative z-10 pl-6">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#8b4513] mb-6"
            style={{ fontFamily: "var(--font-dancing), cursive" }}
          >
            My Dearest Love,
          </h1>

          <div className="space-y-4 text-[#5c4033] text-lg leading-relaxed">
            <p>
              Every moment with you feels like a beautiful dream that I never want to wake up from. Your smile lights up
              my world in ways words cannot describe.
            </p>
            <p>
              I created this special place just for us(SHH!! secrett)  a digital treasure chest filled with our memories, my feelings,
              and little surprises that remind me of you.
            </p>
            <p>
              Click the button on the right to discover more love letters, photos, and messages I&apos;ve prepared just
              for you.
            </p>
            <p className="pt-4 italic">
              Forever yours,
              <br />
              <span className="text-2xl text-[#c23a3a]" style={{ fontFamily: "var(--font-dancing), cursive" }}>
                With all my heart ❤️
              </span>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <Heart className="w-6 h-6 text-[#c23a3a]/40" fill="currentColor" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Sparkles className="w-5 h-5 text-[#d4a574]/60" />
        </div>

        {/* Open more button */}
        <button
          onClick={onShowGrid}
          className={cn(
            "absolute -right-4 top-1/2 -translate-y-1/2",
            "w-12 h-12 md:w-14 md:h-14 rounded-full",
            "bg-gradient-to-br from-[#c23a3a] to-[#a01f1f]",
            "shadow-lg hover:shadow-xl",
            "flex items-center justify-center",
            "transition-all duration-300 hover:scale-110",
            "group cursor-pointer",
          )}
        >
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6 text-white transition-transform group-hover:translate-x-1"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
            <div className="absolute inset-0 animate-ping opacity-30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Hint text */}
      <p className="text-center mt-6 text-muted-foreground text-sm italic">Click the arrow to see more surprises →</p>
    </div>
  )
}
