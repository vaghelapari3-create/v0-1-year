"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export function ParticleEffect() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = ["#e74c3c", "#f39c12", "#ff6b9d", "#ffd700", "#e8b4b8"]
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 40,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-burst"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}
