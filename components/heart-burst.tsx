"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface HeartBurstProps {
  onClose: () => void
}

export function HeartBurst({ onClose }: HeartBurstProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([])

  useEffect(() => {
    setIsVisible(true)
    // Generate random hearts
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 2,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-gradient-to-br from-[#ff6b9d]/90 to-[#c44569]/90 backdrop-blur-sm",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
    >
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white/60"
            style={{ width: heart.size, height: heart.size }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Center message */}
      <div
        className={cn(
          "relative text-center",
          "transition-all duration-700 ease-out",
          isVisible ? "scale-100" : "scale-50",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg mb-4"
          style={{ fontFamily: "var(--font-dancing), cursive" }}
        >
          I Love You!
        </h2>
        <p className="text-white/90 text-lg md:text-xl">More than words could ever say 💕</p>

        {/* Big beating heart */}
        <div className="mt-8 animate-heartbeat">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-24 h-24 md:w-32 md:h-32 text-white mx-auto drop-shadow-xl"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}
