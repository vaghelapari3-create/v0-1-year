"use client"

import { useEffect, useCallback } from "react"

interface WrongEnvelopePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function WrongEnvelopePopup({ isOpen, onClose }: WrongEnvelopePopupProps) {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
      onClick={handleClose}
    >
      <div
        className="bg-white/95 backdrop-blur-md px-10 py-8 rounded-3xl shadow-2xl border border-rose-100 mx-4"
        style={{
          animation: "popup 2.5s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-rose-500">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <p className="text-xl md:text-2xl text-rose-600 font-semibold text-center">Oops!!</p>
          <p className="text-base text-rose-500 text-center">You are opening the wrong envelope.</p>
          <p className="text-sm text-rose-400 text-center mt-1">Please start with the first one</p>
        </div>
      </div>
    </div>
  )
}
