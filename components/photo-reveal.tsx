"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface PhotoRevealProps {
  onClose: () => void
}

export function PhotoReveal({ onClose }: PhotoRevealProps) {
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
          "relative max-w-lg w-full bg-white rounded-xl shadow-2xl overflow-hidden",
          "transition-all duration-500 ease-out",
          isVisible ? "scale-100 rotate-0" : "scale-50 rotate-12",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Polaroid style frame */}
        <div className="p-4 pb-16 bg-white">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-gray-100">
            <img src="/romantic-couple-photo-sunset.jpg" alt="Our special moment" className="w-full h-full object-cover" />
            {/* Photo overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-[#8b4513] text-xl" style={{ fontFamily: "var(--font-dancing), cursive" }}>
            Our beautiful moment together 💕
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Decorative tape */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#f5e6c8]/80 rotate-2 shadow-sm" />
      </div>
    </div>
  )
}
