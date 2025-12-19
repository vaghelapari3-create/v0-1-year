"use client"

import { useState, useEffect, useCallback } from "react"
import { MainEnvelope } from "@/components/main-envelope"
import { LetterContent } from "@/components/letter-content"
import { EnvelopeGrid } from "@/components/envelope-grid"
import { ParticleEffect } from "@/components/particle-effect"
import { MusicPlayer } from "@/components/music-player"
import { FallingHearts } from "@/components/falling-hearts"
import { ConfettiBurst } from "@/components/confetti-burst"
import { AnniversaryText } from "@/components/anniversary-text"

export default function Home() {
  const [stage, setStage] = useState<"intro" | "sealed" | "letter" | "grid">("intro")
  const [showParticles, setShowParticles] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroComplete(true)
      setShowConfetti(false)
      setStage("sealed")
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleSealClick = () => {
    setShowParticles(true)
    setEnvelopeOpened(true)
    setTimeout(() => {
      setStage("letter")
      setShowParticles(false)
    }, 800)
  }

  const handleShowGrid = () => {
    setShowParticles(true)
    setTimeout(() => {
      setStage("grid")
      setShowParticles(false)
    }, 800)
  }

  const handleGoBack = useCallback(() => {
    setShowParticles(true)
    setTimeout(() => {
      setStage("intro")
      setShowConfetti(true)
      setEnvelopeOpened(false)
      setShowParticles(false)
      setTimeout(() => {
        setShowConfetti(false)
        setStage("sealed")
      }, 8000)
    }, 500)
  }, [])

  return (
    <main
      className={`min-h-screen flex items-center justify-center overflow-hidden relative transition-all duration-1000 ease-out ${
        isMusicPlaying
          ? "bg-gradient-to-br from-rose-50 via-pink-50 to-red-50"
          : "bg-gradient-to-br from-[#fdf6f0] via-[#fef9f5] to-[#fff5ee]"
      }`}
    >
      {stage === "sealed" && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('/soft-pink-rose-petals-romantic-bokeh-lights-dreamy.jpg')`,
              filter: "blur(3px)",
            }}
          />
          {/* Soft overlay to ensure envelope stands out */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50/70 via-pink-50/60 to-red-50/70" />
        </div>
      )}

      <MusicPlayer onPlayingChange={setIsMusicPlaying} isVisible={envelopeOpened} />

      {isMusicPlaying && <FallingHearts />}

      {showConfetti && stage === "intro" && <ConfettiBurst />}

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div
          className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl transition-all duration-1000 ${
            isMusicPlaying ? "bg-rose-200/30" : "bg-rose-100/20"
          }`}
        />
        <div
          className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 ${
            isMusicPlaying ? "bg-pink-200/30" : "bg-pink-100/20"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/3 w-48 h-48 rounded-full blur-3xl transition-all duration-1000 ${
            isMusicPlaying ? "bg-red-100/20" : "bg-red-50/10"
          }`}
        />
      </div>

      {showParticles && <ParticleEffect />}

      <div className="relative z-20 w-full max-w-4xl mx-auto px-4">
        <div
          className={`transition-all duration-1000 ease-out ${
            stage === "intro" ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute pointer-events-none"
          }`}
        >
          {stage === "intro" && <AnniversaryText />}
        </div>

        <div
          className={`transition-all duration-700 ease-out ${
            stage === "sealed" ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute pointer-events-none"
          }`}
        >
          {stage === "sealed" && <MainEnvelope onSealClick={handleSealClick} />}
        </div>

        <div
          className={`transition-all duration-700 ease-out ${
            stage === "letter" ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute pointer-events-none"
          }`}
        >
          {stage === "letter" && <LetterContent onShowGrid={handleShowGrid} />}
        </div>

        <div
          className={`transition-all duration-700 ease-out ${
            stage === "grid" ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute pointer-events-none"
          }`}
        >
          {stage === "grid" && <EnvelopeGrid onGoBack={handleGoBack} />}
        </div>
      </div>
    </main>
  )
}
