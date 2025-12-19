"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, Calendar } from "lucide-react"

interface MemoryCardProps {
  onClose: () => void
}

export function MemoryCard({ onClose }: MemoryCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/60 backdrop-blur-sm",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative max-w-sm w-full perspective-1000",
          "transition-all duration-500 ease-out",
          isVisible ? "scale-100" : "scale-50",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Flip card container */}
        <div
          className={cn(
            "relative w-full aspect-[3/4] cursor-pointer",
            "transition-transform duration-700 transform-style-preserve-3d",
            isFlipped && "rotate-y-180",
          )}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          {/* Front side */}
          <div
            className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#f39c12] to-[#d68910] p-6 flex flex-col items-center justify-center">
              <Calendar className="w-16 h-16 text-white/90 mb-4" />
              <h3 className="text-white text-2xl font-bold text-center">A Special Memory</h3>
              <p className="text-white/80 text-sm mt-2">Tap to reveal</p>
            </div>
          </div>

          {/* Back side */}
          <div
            className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#fef9f3] to-[#fdf4e8] p-6 flex flex-col">
              <h4 className="text-[#8b4513] text-xl mb-3" style={{ fontFamily: "var(--font-dancing), cursive" }}>
                Our First Meet
              </h4>
              <p className="text-[#5c4033] text-sm leading-relaxed flex-1">
                Remember when we first met? IN BUS.. My heart skipped a beat. That moment changed everything. I knew right then
                that you were special. Every day since has been an adventure I never want to end.
              </p>
              <p className="text-[#d68910] text-xs italic mt-4">December 15, 2024 ✨</p>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#f39c12] shadow-lg hover:bg-[#d68910] flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
