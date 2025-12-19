"use client"

import { useState, useCallback } from "react"
import { MiniEnvelope } from "@/components/mini-envelope"
import { WrongEnvelopePopup } from "@/components/wrong-envelope-popup"
import { BearContent } from "@/components/bear-content"
import { PhotoReveal } from "@/components/photo-reveal"
import { MiniLetter } from "@/components/mini-letter"
import { MemoryCard } from "@/components/memory-card"
import { HeartBurst } from "@/components/heart-burst"
import { GiftBox } from "@/components/gift-box"
import { ArrowLeft } from "lucide-react"

type ContentType = "bear" | "photo" | "letter" | "memory" | "hearts" | "gift"

interface EnvelopeData {
  id: number
  type: ContentType
  color: string
}

const envelopes: EnvelopeData[] = [
  { id: 1, type: "bear", color: "from-rose-400 to-rose-600" },
  { id: 2, type: "photo", color: "from-pink-400 to-pink-600" },
  { id: 3, type: "letter", color: "from-amber-400 to-amber-600" },
  { id: 4, type: "memory", color: "from-red-400 to-red-600" },
  { id: 5, type: "hearts", color: "from-fuchsia-400 to-fuchsia-600" },
  { id: 6, type: "gift", color: "from-rose-300 to-rose-500" },
]

interface EnvelopeGridProps {
  onGoBack?: () => void
}

export function EnvelopeGrid({ onGoBack }: EnvelopeGridProps) {
  const [openedEnvelope, setOpenedEnvelope] = useState<number | null>(null)
  const [showContent, setShowContent] = useState<ContentType | null>(null)
  const [firstEnvelopeCompleted, setFirstEnvelopeCompleted] = useState(false)
  const [showWrongPopup, setShowWrongPopup] = useState(false)

  const handleEnvelopeClick = useCallback(
    (envelope: EnvelopeData) => {
      if (!firstEnvelopeCompleted && envelope.id !== 1) {
        setShowWrongPopup(true)
        return
      }

      setOpenedEnvelope(envelope.id)
      setTimeout(() => {
        setShowContent(envelope.type)
      }, 500)
    },
    [firstEnvelopeCompleted],
  )

  const handleClose = useCallback(() => {
    if (openedEnvelope === 1 && !firstEnvelopeCompleted) {
      setFirstEnvelopeCompleted(true)
    }
    setShowContent(null)
    setOpenedEnvelope(null)
  }, [openedEnvelope, firstEnvelopeCompleted])

  const handleCloseWrongPopup = useCallback(() => {
    setShowWrongPopup(false)
  }, [])

  return (
    <div className="w-full">
      {onGoBack && (
        <button
          onClick={onGoBack}
          className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 
            bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-rose-200
            text-rose-600 hover:bg-rose-50 hover:scale-105 transition-all duration-300
            font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      )}

      <h2
        className="text-center text-3xl md:text-4xl font-bold text-rose-800/80 mb-10"
        style={{ fontFamily: "var(--font-dancing), cursive" }}
      >
        More Surprises Await
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
        {envelopes.map((envelope) => (
          <MiniEnvelope
            key={envelope.id}
            envelope={envelope}
            isOpened={openedEnvelope === envelope.id}
            onClick={() => handleEnvelopeClick(envelope)}
          />
        ))}
      </div>

      <WrongEnvelopePopup isOpen={showWrongPopup} onClose={handleCloseWrongPopup} />

      {showContent === "bear" && <BearContent onClose={handleClose} />}
      {showContent === "photo" && <PhotoReveal onClose={handleClose} />}
      {showContent === "letter" && <MiniLetter onClose={handleClose} />}
      {showContent === "memory" && <MemoryCard onClose={handleClose} />}
      {showContent === "hearts" && <HeartBurst onClose={handleClose} />}
      {showContent === "gift" && <GiftBox onClose={handleClose} />}
    </div>
  )
}
