"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface BearContentProps {
  onClose: () => void
}

type BearState = "question" | "happy" | "sad"

export function BearContent({ onClose }: BearContentProps) {
  const [bearState, setBearState] = useState<BearState>("question")

  const handleYes = () => {
    setBearState("happy")
  }

  const handleNo = () => {
    setBearState("sad")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-scale-up relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Question state */}
        {bearState === "question" && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="w-48 h-48 md:w-56 md:h-56 mb-6 rounded-2xl overflow-hidden bg-rose-50">
              <img
                src="/cute-white-fluffy-bear-asking-question-adorable-ca.jpg"
                alt="Cute bear asking question"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8">Are you happy with me?</p>
            <div className="flex gap-4 w-full">
              <button
                onClick={handleYes}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-full 
                         hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
              >
                YES
              </button>
              <button
                onClick={handleNo}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-rose-400 to-red-500 text-white font-semibold rounded-full 
                         hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
              >
                NO
              </button>
            </div>
          </div>
        )}

        {/* Happy state */}
        {bearState === "happy" && (
          <div className="flex flex-col items-center text-center animate-bounce-in">
            <div className="w-48 h-48 md:w-56 md:h-56 mb-6 rounded-2xl overflow-hidden bg-amber-50">
              <img src="/cute-white-fluffy-bear-dancing-happy-celebrating-c.jpg" alt="Happy dancing bear" className="w-full h-full object-cover" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-amber-500 animate-bounce">YAYAYAYA!!</p>
            <p className="text-lg text-gray-600 mt-2">Come on, dance with me!</p>
          </div>
        )}

        {/* Sad state */}
        {bearState === "sad" && (
          <div className="flex flex-col items-center text-center animate-shake">
            <div className="w-48 h-48 md:w-56 md:h-56 mb-6 rounded-2xl overflow-hidden bg-gray-100">
              <img src="/cute-white-fluffy-bear-sad-crying-upset-cartoon.jpg" alt="Sad bear" className="w-full h-full object-cover" />
            </div>
            <p className="text-xl md:text-2xl font-medium text-gray-500">Now don&apos;t talk to me!!</p>
          </div>
        )}
      </div>
    </div>
  )
}
