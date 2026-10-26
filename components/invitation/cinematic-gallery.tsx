'use client'

import { useState } from 'react'
import { GALLERY_PHOTOS } from './gallery-data'
import { GalleryLightbox } from './gallery-lightbox'
import { Maximize2 } from 'lucide-react'

export function CinematicGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6">
      {/* Section Header with High Contrast Gold & White */}
      <div className="text-center mb-8">
        <span className="eyebrow block text-[#ffd700] text-[11px] md:text-[12px] tracking-[0.25em] uppercase font-['Jost',sans-serif] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
          MOMENTS OF GRACE &amp; TRADITION
        </span>
        <h2 className="font-['Cormorant',Georgia,serif] text-[36px] md:text-[54px] text-[#ffffff] font-normal leading-tight my-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Good things <em className="text-[#ffd700]">come in moments.</em>
        </h2>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto my-3" />
        <p className="text-[#ffe082] text-[14px] md:text-[16px] font-['Jost',sans-serif] max-w-md mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          A glimpse into the cherished celebrations, heirloom rituals, and joyful beginnings.
        </p>
      </div>

      {/* Editorial Asymmetrical Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-stretch">
        {/* Large Featured Photo - Spans 7 cols */}
        <div
          onClick={() => setLightboxIndex(0)}
          className="group relative md:col-span-7 bg-[#230b15]/90 p-2.5 md:p-3.5 border-2 border-[#e5b849] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(255,215,0,0.35)] transition-all duration-300 cursor-pointer rounded-[3px] flex flex-col justify-between"
        >
          {/* Subtle gold corner brackets */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#ffd700]" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#ffd700]" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#ffd700]" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#ffd700]" />

          <div className="relative overflow-hidden aspect-[16/10] bg-[#1a0810] rounded-[1px]">
            <img
              src={GALLERY_PHOTOS[0].src}
              alt={GALLERY_PHOTOS[0].title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-[#ffffff] text-xs font-['Jost',sans-serif] flex items-center gap-1.5 font-medium">
                <Maximize2 size={14} className="text-[#ffd700]" /> Expand photograph
              </span>
            </div>
          </div>

          <div className="pt-3 px-1.5 flex items-baseline justify-between">
            <div>
              <span className="text-[#ffd700] text-[10px] tracking-[0.2em] font-['Jost',sans-serif] uppercase font-semibold">
                {GALLERY_PHOTOS[0].tag}
              </span>
              <h3 className="font-['Cormorant',Georgia,serif] text-[22px] text-[#ffffff] font-normal leading-tight">
                {GALLERY_PHOTOS[0].title}
              </h3>
            </div>
            <span className="text-[#ffe082] text-sm font-['Jost',sans-serif] font-medium">01</span>
          </div>
        </div>

        {/* Tall Supporting Portrait - Spans 5 cols */}
        <div
          onClick={() => setLightboxIndex(1)}
          className="group relative md:col-span-5 bg-[#230b15]/90 p-2.5 md:p-3.5 border-2 border-[#e5b849] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(255,215,0,0.35)] transition-all duration-300 cursor-pointer rounded-[3px] flex flex-col justify-between"
        >
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#ffd700]" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#ffd700]" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#ffd700]" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#ffd700]" />

          <div className="relative overflow-hidden aspect-[4/5] bg-[#1a0810] rounded-[1px]">
            <img
              src={GALLERY_PHOTOS[1].src}
              alt={GALLERY_PHOTOS[1].title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-[#ffffff] text-xs font-['Jost',sans-serif] flex items-center gap-1.5 font-medium">
                <Maximize2 size={14} className="text-[#ffd700]" /> Expand photograph
              </span>
            </div>
          </div>

          <div className="pt-3 px-1.5 flex items-baseline justify-between">
            <div>
              <span className="text-[#ffd700] text-[10px] tracking-[0.2em] font-['Jost',sans-serif] uppercase font-semibold">
                {GALLERY_PHOTOS[1].tag}
              </span>
              <h3 className="font-['Cormorant',Georgia,serif] text-[22px] text-[#ffffff] font-normal leading-tight">
                {GALLERY_PHOTOS[1].title}
              </h3>
            </div>
            <span className="text-[#ffe082] text-sm font-['Jost',sans-serif] font-medium">02</span>
          </div>
        </div>

        {/* Row 2: 3 Asymmetric Columns */}
        {[2, 3, 4].map((idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative md:col-span-4 bg-[#230b15]/90 p-2.5 border-2 border-[#e5b849] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(255,215,0,0.35)] transition-all duration-300 cursor-pointer rounded-[3px]"
          >
            <div className="relative overflow-hidden aspect-[3/4] bg-[#1a0810] rounded-[1px]">
              <img
                src={GALLERY_PHOTOS[idx].src}
                alt={GALLERY_PHOTOS[idx].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="pt-2.5 px-1">
              <span className="text-[#ffd700] text-[10px] tracking-[0.2em] font-['Jost',sans-serif] uppercase font-semibold">
                {GALLERY_PHOTOS[idx].tag}
              </span>
              <h3 className="font-['Cormorant',Georgia,serif] text-[19px] text-[#ffffff] font-normal leading-tight">
                {GALLERY_PHOTOS[idx].title}
              </h3>
            </div>
          </div>
        ))}

        {/* Row 3: Lamps, Sangeet, Car */}
        {[5, 6, 7].map((idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative md:col-span-4 bg-[#230b15]/90 p-2.5 border-2 border-[#e5b849] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(255,215,0,0.35)] transition-all duration-300 cursor-pointer rounded-[3px]"
          >
            <div className="relative overflow-hidden aspect-[4/3] bg-[#1a0810] rounded-[1px]">
              <img
                src={GALLERY_PHOTOS[idx].src}
                alt={GALLERY_PHOTOS[idx].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="pt-2.5 px-1">
              <span className="text-[#ffd700] text-[10px] tracking-[0.2em] font-['Jost',sans-serif] uppercase font-semibold">
                {GALLERY_PHOTOS[idx].tag}
              </span>
              <h3 className="font-['Cormorant',Georgia,serif] text-[19px] text-[#ffffff] font-normal leading-tight">
                {GALLERY_PHOTOS[idx].title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox trigger button */}
      <div className="mt-9 text-center">
        <button
          onClick={() => setLightboxIndex(0)}
          className="gold-button inline-flex items-center gap-2.5 px-7 py-3 text-[14px] rounded-full bg-gradient-to-r from-[#d4a337] via-[#ffd700] to-[#b3801f] text-[#240a13] font-semibold transition-all cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(255,215,0,0.35)] hover:scale-105"
        >
          <Maximize2 size={16} className="text-[#421422]" />
          View Fullscreen Lightbox Gallery (8 Photos)
        </button>
      </div>

      {/* Lightbox Modal (Portaled directly to document.body) */}
      <GalleryLightbox
        photos={GALLERY_PHOTOS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelect={(idx) => setLightboxIndex(idx)}
      />
    </div>
  )
}
