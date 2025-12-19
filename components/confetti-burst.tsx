"use client"

import { useEffect, useState } from "react"

interface Confetti {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  velocityX: number
  velocityY: number
}

export function ConfettiBurst() {
  const [confetti, setConfetti] = useState<Confetti[]>([])

  useEffect(() => {
    const colors = ["#f43f5e", "#ec4899", "#fbbf24", "#f97316", "#a855f7", "#ffffff"]
    const pieces: Confetti[] = []

    // Create multiple bursts
    for (let burst = 0; burst < 3; burst++) {
      setTimeout(() => {
        const newPieces: Confetti[] = []
        for (let i = 0; i < 50; i++) {
          newPieces.push({
            id: burst * 100 + i,
            x: 50 + (Math.random() - 0.5) * 30,
            y: 30 + Math.random() * 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.5,
            velocityX: (Math.random() - 0.5) * 8,
            velocityY: -Math.random() * 10 - 5,
          })
        }
        setConfetti((prev) => [...prev, ...newPieces])
      }, burst * 400)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
