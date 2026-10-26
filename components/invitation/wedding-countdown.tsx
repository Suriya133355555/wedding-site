'use client'

import { useState, useEffect } from 'react'

// Target: Sunday 1st November 2026, 7:30 AM IST
export const WEDDING_TIMESTAMP = Date.parse('2026-11-01T07:30:00+05:30')

export function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setTimeLeft(Math.max(0, WEDDING_TIMESTAMP - Date.now()))
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  const digits =
    timeLeft === null
      ? ['—', '—', '—', '—']
      : [
          Math.floor(timeLeft / 864e5),
          Math.floor(timeLeft / 36e5) % 24,
          Math.floor(timeLeft / 6e4) % 60,
          Math.floor(timeLeft / 1e3) % 60,
        ].map((v) => String(v).padStart(2, '0'))

  const labels = ['Days', 'Hours', 'Minutes', 'Seconds']

  return (
    <div className="countdown flex justify-center gap-3 md:gap-5">
      {labels.map((label, idx) => (
        <div key={label} className="text-center w-[64px] md:w-[84px]">
          <span
            key={digits[idx]}
            className="count-digit block rounded-[4px] py-2.5 md:py-3.5 px-1 font-['Cormorant',Georgia,serif] text-[30px] md:text-[40px] font-semibold leading-tight shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
            style={{
              background: 'linear-gradient(145deg, #38101c, #1f070e)',
              color: '#ffd700',
              border: '1.5px solid #e5b849',
              textShadow: '0 0 12px rgba(255,215,0,0.4)',
            }}
          >
            {digits[idx]}
          </span>
          <small className="block mt-2 text-[#ffffff] text-[10px] md:text-[12px] font-medium tracking-wider uppercase font-['Jost',sans-serif]">
            {label}
          </small>
        </div>
      ))}
    </div>
  )
}
