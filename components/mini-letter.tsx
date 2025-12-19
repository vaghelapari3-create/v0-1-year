"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, Heart } from "lucide-react"

interface MiniLetterProps {
  onClose: () => void
}

export function MiniLetter({ onClose }: MiniLetterProps) {
  const [isVisible, setIsVisible] = useState(false)

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
          "relative max-w-md w-full",
          "transition-all duration-500 ease-out",
          isVisible ? "scale-100 translate-y-0" : "scale-75 translate-y-8",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Note paper */}
        <div className="relative bg-gradient-to-br from-[#fff5f5] to-[#ffe8e8] rounded-lg shadow-2xl p-6 md:p-8">
          {/* Paper lines */}
          <div
            className="absolute inset-x-6 top-16 bottom-6 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, #ffb8b8 23px, #ffb8b8 24px)",
            }}
          />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <Heart className="w-8 h-8 text-[#e74c3c] fill-current animate-heartbeat" />
            </div>

            <p
              className="text-[#8b4513] text-xl md:text-2xl text-center leading-relaxed"
              style={{ fontFamily: "var(--font-dancing), cursive" }}
            >
              &ldquo;You are my today and all of my tomorrows. Every love story is beautiful, but ours is my
              favorite.&rdquo;
            </p>

            <p className="text-center mt-6 text-[#c0392b] font-medium">— Your Secret Admirer</p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#e74c3c] shadow-lg hover:bg-[#c0392b] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
