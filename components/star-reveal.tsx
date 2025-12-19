"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, Star } from "lucide-react"

interface StarRevealProps {
  onClose: () => void
}

export function StarReveal({ onClose }: StarRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; opacity: number }[]>([])

  useEffect(() => {
    setIsVisible(true)
    // Generate random stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.8 + 0.2,
    }))
    setStars(newStars)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-gradient-to-b from-[#0c1445] via-[#1a237e] to-[#283593]",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
    >
      {/* Stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Shooting star */}
      <div
        className="absolute w-1 h-16 bg-gradient-to-t from-transparent via-white to-transparent rotate-45 animate-ping"
        style={{ top: "20%", left: "30%", animationDuration: "3s" }}
      />

      {/* Center content */}
      <div
        className={cn(
          "relative text-center max-w-md",
          "transition-all duration-700 ease-out",
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-8 h-8 text-[#ffd700] fill-current animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <h2
          className="text-white text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg"
          style={{ fontFamily: "var(--font-dancing), cursive" }}
        >
          My Wish Upon a Star
        </h2>

        <p className="text-white/90 text-lg leading-relaxed">
          If I could wish upon a star tonight, I would wish for more time with you. Every moment we share is precious,
          and I want a lifetime of them.
        </p>

        <p className="text-[#ffd700] text-xl mt-6 italic">You are my brightest star ⭐</p>
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
