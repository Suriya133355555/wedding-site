'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { GalleryPhoto } from './gallery-data'

interface GalleryLightboxProps {
  photos: GalleryPhoto[]
  activeIndex: number | null
  onClose: () => void
  onSelect: (index: number) => void
}

export function GalleryLightbox({
  photos,
  activeIndex,
  onClose,
  onSelect,
}: GalleryLightboxProps) {
  const [mounted, setMounted] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onSelect((activeIndex - 1 + photos.length) % photos.length)
      } else if (e.key === 'ArrowRight') {
        onSelect((activeIndex + 1) % photos.length)
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, onClose, onSelect, photos.length])

  if (!mounted || activeIndex === null) return null
  const photo = photos[activeIndex]
  if (!photo) return null

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect((activeIndex - 1 + photos.length) % photos.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect((activeIndex + 1) % photos.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onSelect((activeIndex + 1) % photos.length)
      } else {
        onSelect((activeIndex - 1 + photos.length) % photos.length)
      }
    }
  }

  const lightboxContent = (
    <div
      className="fixed inset-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none overflow-hidden"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
    >
      {/* Top Header Controls */}
      <div
        className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4 z-30 pointer-events-auto bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[#e2ca9c] text-[13px] tracking-[0.25em] font-['Jost',sans-serif]">
          {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>

        <button
          onClick={onClose}
          className="p-2.5 text-[#fff3dc] hover:text-[#e2ca9c] bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center cursor-pointer shadow-lg"
          aria-label="Close Lightbox (Esc)"
        >
          <X size={24} />
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 text-[#f7e6c4] bg-black/50 hover:bg-black/80 border border-[#b8955a]/40 hover:border-[#b8955a] rounded-full transition-all cursor-pointer backdrop-blur-sm shadow-xl"
        aria-label="Previous photograph (Left Arrow)"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 text-[#f7e6c4] bg-black/50 hover:bg-black/80 border border-[#b8955a]/40 hover:border-[#b8955a] rounded-full transition-all cursor-pointer backdrop-blur-sm shadow-xl"
        aria-label="Next photograph (Right Arrow)"
      >
        <ChevronRight size={30} />
      </button>

      {/* Image & Caption Stage */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-2 md:p-3 bg-[#f7eed9] border-2 border-[#b8955a] shadow-[0_25px_60px_rgba(0,0,0,0.8)] rounded-sm">
          {/* Subtle gold corner brackets */}
          <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#8c6b32]" />
          <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#8c6b32]" />
          <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#8c6b32]" />
          <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#8c6b32]" />

          <img
            key={photo.src}
            src={photo.src}
            alt={photo.title}
            className="max-w-[85vw] max-h-[66vh] object-contain rounded-[1px] animate-in fade-in zoom-in-95 duration-200"
          />
        </div>

        {/* Caption Card */}
        <div className="mt-4 text-center max-w-[580px] px-4 animate-in fade-in duration-300">
          <span className="text-[#d8b577] text-[10px] md:text-[11px] tracking-[0.25em] font-['Jost',sans-serif] uppercase">
            {photo.tag}
          </span>
          <h3 className="font-['Cormorant',Georgia,serif] text-[24px] md:text-[32px] text-[#fff6e6] font-normal leading-tight my-1">
            {photo.title}
          </h3>
          <p className="text-[#d9c7a6] text-[13px] md:text-[14px] font-['Jost',sans-serif] leading-relaxed">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  )

  return createPortal(lightboxContent, document.body)
}
