'use client'

import { useEffect } from 'react'
import { CalendarDays, MapPin, X } from 'lucide-react'

export interface EventDetail {
  title: string
  date: string
  time: string
  venue: string
  address: string
  copy: string
  mapUrl: string
}

export const MAPS_URL =
  'https://maps.google.com/?q=Jayam+Mahal+Thirumana+Mandapam+Ganapathi+Nagar+Trichy+Trunk+Road+Villupuram+Tamil+Nadu+605602'

export const WEDDING_EVENTS: EventDetail[] = [
  {
    title: 'Reception Evening',
    date: 'Saturday, 31 October 2026',
    time: '6:00 pm onwards',
    venue: 'Jayam Mahal Thirumana Mandapam',
    address: 'No. 29, Ganapathi Nagar, Trichy Trunk Road, Villupuram - 605602',
    copy: 'An auspicious evening of joy, celebration, and warm welcomes as our families come together. Solicit your gracious presence and blessings.',
    mapUrl: MAPS_URL,
  },
  {
    title: 'The Sacred Muhurtham',
    date: 'Sunday, 1 November 2026',
    time: '7:30 am to 9:00 am',
    venue: 'Jayam Mahal Thirumana Mandapam',
    address: 'No. 29, Ganapathi Nagar, Trichy Trunk Road, Villupuram - 605602',
    copy: 'In the divine presence of Sri Aanai Kutty Muneeswaran and Sri Murugan, join us for the sacred wedding ceremony, mangalya dharanam, and traditional wedding.',
    mapUrl: MAPS_URL,
  },
]

interface EventsDialogProps {
  eventIndex: number | null
  onClose: () => void
}

export function EventsDialog({ eventIndex, onClose }: EventsDialogProps) {
  useEffect(() => {
    if (eventIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [eventIndex, onClose])

  if (eventIndex === null) return null
  const event = WEDDING_EVENTS[eventIndex]
  if (!event) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="event-dialog relative w-full max-w-[540px] p-8 md:p-10 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#e5b849] hover:text-[#ffd700] transition-colors rounded-sm cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <span className="eyebrow block text-[#ffd700] text-[10px] tracking-[0.2em] mb-2 uppercase">
          KARTHIKEYAN &amp; DIVYA SHREE · THE CELEBRATIONS
        </span>

        <h2
          id="dialog-title"
          className="dialog-title font-['Cormorant',Georgia,serif] text-[36px] md:text-[46px] text-[#FFF9E6] font-normal leading-tight mb-3"
        >
          {event.title}
        </h2>

        <p className="dialog-description text-[#FFF0C2] text-[14px] md:text-[15px] leading-relaxed mb-5 font-['Jost',sans-serif]">
          {event.copy}
        </p>

        <div className="dialog-date border-t border-[#cfb986] pt-4 mb-3 text-[16px] md:text-[17px] leading-normal font-['Jost',sans-serif]">
          <p className="font-medium text-[#d4a337]">{event.date}</p>
          <p className="text-[#ffd700] text-[15px]">{event.time}</p>
        </div>

        <div className="mb-6 font-['Jost',sans-serif]">
          <p className="font-medium text-[#FFF9E6] text-[15px]">{event.venue}</p>
          <p className="text-[#FFF0C2] text-[13px] leading-relaxed">{event.address}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            className="gold-button inline-flex items-center gap-2 px-5 py-2.5 text-[13px] rounded-sm text-[#ffe9a8] border border-[#e5b849] bg-transparent hover:bg-[#e5b849] hover:text-[#2a0a13] transition-colors"
            href="/wedding.ics"
            download="karthikeyan-divyashree-wedding.ics"
          >
            Save to Calendar <CalendarDays size={15} />
          </a>

          <a
            className="gold-button inline-flex items-center gap-2 px-5 py-2.5 text-[13px] rounded-sm bg-[#946f35] hover:bg-[#765426] text-[#fff7df] transition-colors"
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps <MapPin size={15} />
          </a>
        </div>
      </div>
    </div>
  )
}
