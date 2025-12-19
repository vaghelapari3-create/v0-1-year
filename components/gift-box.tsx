"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, Gift } from "lucide-react"

interface GiftBoxProps {
  onClose: () => void
}

export function GiftBox({ onClose }: GiftBoxProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

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
          "relative max-w-xs w-full",
          "transition-all duration-500 ease-out",
          isVisible ? "scale-100" : "scale-50",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gift box */}
        <div className="relative cursor-pointer" onClick={() => setIsOpened(true)}>
          {/* Box base */}
          <div
            className={cn(
              "relative w-full aspect-square rounded-xl",
              "bg-gradient-to-br from-[#9b59b6] to-[#8e44ad]",
              "shadow-2xl overflow-hidden",
              "transition-all duration-500",
              isOpened && "scale-90",
            )}
          >
            {/* Ribbon vertical */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-[#f1c40f]" />
            {/* Ribbon horizontal */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-[#f1c40f]" />

            {/* Bow */}
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "transition-all duration-500",
                isOpened && "scale-0 opacity-0",
              )}
            >
              <div className="relative">
                <div className="absolute -left-6 -top-2 w-12 h-8 bg-[#f1c40f] rounded-full rotate-45" />
                <div className="absolute -right-6 -top-2 w-12 h-8 bg-[#f1c40f] rounded-full -rotate-45" />
                <div className="relative w-6 h-6 bg-[#e8b923] rounded-full z-10" />
              </div>
            </div>

            {/* Gift icon when closed */}
            {!isOpened && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white/80 text-sm">Tap to open</p>
              </div>
            )}
          </div>

          {/* Revealed content */}
          {isOpened && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "transition-all duration-500",
                isOpened ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
            >
              <div className="text-center bg-white rounded-xl p-6 shadow-xl">
                <Gift className="w-16 h-16 text-[#9b59b6] mx-auto mb-4" />
                <h3 className="text-[#8b4513] text-2xl mb-2" style={{ fontFamily: "var(--font-dancing), cursive" }}>
                  A Promise
                </h3>
                <p className="text-[#5c4033] text-sm">
                  I promise to love you unconditionally, to support you in your dreams, and to be your partner forever.
                  💜
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sparkle effects */}
        {isOpened && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#f1c40f] rounded-full animate-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#9b59b6] shadow-lg hover:bg-[#8e44ad] flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
