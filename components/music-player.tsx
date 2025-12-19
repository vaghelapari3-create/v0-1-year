"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Heart } from "lucide-react"

interface MusicPlayerProps {
  onPlayingChange: (isPlaying: boolean) => void
  isVisible: boolean
}

export function MusicPlayer({ onPlayingChange, isVisible }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.4
    audio.preload = "auto"

    audio.src = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946e4a7a27.mp3"

    audio.addEventListener("canplaythrough", () => {
      setAudioReady(true)
    })

    audio.addEventListener("error", () => {
      audio.src = "https://cdn.pixabay.com/download/audio/2023/09/05/audio_168a3e0caa.mp3"
    })

    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  const handleClick = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      onPlayingChange(false)
      return
    }

    setIsLoading(true)

    try {
      if (audio.currentTime > 0 && audio.paused) {
        // Just resume
      } else {
        audio.currentTime = 0
      }

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        await playPromise
        setIsPlaying(true)
        onPlayingChange(true)
      }
    } catch (error) {
      try {
        audio.load()
        await audio.play()
        setIsPlaying(true)
        onPlayingChange(true)
      } catch (retryError) {
        const newAudio = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_946e4a7a27.mp3")
        newAudio.loop = true
        newAudio.volume = 0.4
        try {
          await newAudio.play()
          if (audioRef.current) {
            audioRef.current.pause()
          }
          audioRef.current = newAudio
          setIsPlaying(true)
          onPlayingChange(true)
        } catch (finalError) {
          console.log("[v0] Could not play audio")
        }
      }
    } finally {
      setIsLoading(false)
    }
  }, [isPlaying, onPlayingChange])

  if (!isVisible) return null

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        fixed top-6 right-6 z-[9999] w-14 h-14 rounded-full 
        flex items-center justify-center 
        transition-all duration-500 ease-out
        shadow-lg backdrop-blur-sm border-2
        cursor-pointer select-none
        touch-manipulation
        ${
          isPlaying
            ? "bg-rose-500 border-rose-300 scale-110"
            : "bg-white/90 border-rose-200 hover:scale-105 hover:bg-rose-50"
        }
        ${isLoading ? "animate-pulse" : ""}
      `}
      style={{ WebkitTapHighlightColor: "transparent" }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      <Heart
        className={`
          w-6 h-6 transition-all duration-300
          ${isPlaying ? "text-white fill-white animate-pulse" : "text-rose-500"}
        `}
      />
      {isPlaying && <span className="absolute inset-0 rounded-full animate-ping-slow bg-rose-400/30" />}
    </button>
  )
}
