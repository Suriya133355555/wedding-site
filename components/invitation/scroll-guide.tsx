'use client'

import { ArrowDown, ArrowUp } from 'lucide-react'

interface ScrollGuideProps {
  progress: number
  onScrollNext: () => void
}

export function ScrollGuide({ progress, onScrollNext }: ScrollGuideProps) {
  const isNearEnd = progress >= 0.92

  const getGuideText = (p: number) => {
    if (p < 0.12) return 'Scroll to unfold our wedding invitation'
    if (p < 0.23) return 'Scroll to view auspicious ceremonies'
    if (p < 0.35) return 'Scroll to bless the bride & groom'
    if (p < 0.46) return 'Scroll to meet Karthikeyan & Divya Shree'
    if (p < 0.57) return 'Scroll for venue & Google Maps directions'
    if (p < 0.68) return 'Scroll for the live Muhurtham countdown'
    if (p < 0.80) return 'Scroll to view our photo gallery'
    if (p < 0.92) return 'Scroll to send blessings & compliments'
    return 'Return to top · Blessed beginning'
  }

  const guideText = getGuideText(progress)
  const percentText = Math.min(100, Math.round(progress * 100))

  return (
    <div
      onClick={onScrollNext}
      role="button"
      tabIndex={0}
      aria-label={guideText}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onScrollNext()
      }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] cursor-pointer group select-none transition-all duration-300 hover:scale-[1.03]"
    >
      <div className="relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#200c14]/90 hover:bg-[#2c101c]/95 border border-[#e5b849]/60 hover:border-[#ffd700] shadow-[0_8px_30px_rgba(0,0,0,0.65),0_0_15px_rgba(229,184,73,0.3)] backdrop-blur-md">
        {/* Glowing Indicator Dot */}
        <span className="w-2 h-2 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700] animate-pulse" />

        {/* Guidance Text in Luminous Gold & Crisp White */}
        <span className="text-[12px] md:text-[13px] font-medium font-['Jost',sans-serif] tracking-wider text-[#ffffff] group-hover:text-[#fff4d1] transition-colors whitespace-nowrap">
          {guideText}
        </span>

        {/* Percentage Badge */}
        <span className="text-[10px] tracking-widest text-[#ffd700] font-['Jost',sans-serif] font-semibold bg-[#ffd700]/15 px-2 py-0.5 rounded-full border border-[#ffd700]/30">
          {percentText}%
        </span>

        {/* Direction Icon */}
        <span className="text-[#ffd700] transition-transform duration-300 group-hover:translate-y-0.5">
          {isNearEnd ? (
            <ArrowUp size={16} className="animate-bounce" />
          ) : (
            <ArrowDown size={16} className="animate-bounce" />
          )}
        </span>

        {/* Bottom Gold Progress Fill Line */}
        <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d4a337] via-[#ffd700] to-[#fff4d1] transition-all duration-200"
            style={{ width: `${percentText}%` }}
          />
        </div>
      </div>
    </div>
  )
}
