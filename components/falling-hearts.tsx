"use client"

import { useEffect, useState, useRef } from "react"

interface Heart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
  rotation: number
}

export function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const idCounterRef = useRef(0)

  useEffect(() => {
    const createHeart = (): Heart => ({
      id: idCounterRef.current++,
      left: Math.random() * 100,
      delay: 0,
      duration: 10 + Math.random() * 8,
      size: 10 + Math.random() * 14,
      opacity: 0.2 + Math.random() * 0.3,
      rotation: Math.random() * 360,
    })

    // Initial batch of hearts
    const initialHearts: Heart[] = Array.from({ length: 20 }, () => ({
      ...createHeart(),
      delay: Math.random() * 8,
    }))
    setHearts(initialHearts)

    // Continuously add new hearts for infinite effect
    const interval = setInterval(() => {
      setHearts((prev) => {
        // Remove hearts that have fallen (keep last 30)
        const filtered = prev.slice(-30)
        return [...filtered, createHeart()]
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute -top-8 animate-fall-smooth"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-rose-400 animate-sway"
            style={{
              width: heart.size,
              height: heart.size,
              opacity: heart.opacity,
              transform: `rotate(${heart.rotation}deg)`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
