'use client'

import { useEffect, useRef, useState, memo } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, QrCode, FileText } from 'lucide-react'
import {
  CelebrationCanvas,
  currentCelebration,
  SCENE_EVENT,
  SHOWER_EVENT,
  BLESSED_EVENT, 
} from '@/components/invitation/celebration-canvas'
import { EventsDialog, WEDDING_EVENTS, MAPS_URL } from '@/components/invitation/events-dialog'
import { WeddingCountdown } from '@/components/invitation/wedding-countdown'
import { ScrollGuide } from '@/components/invitation/scroll-guide'

const clamp = (v: number) => Math.max(0, Math.min(1, v))
const norm = (val: number, min: number, max: number) => clamp((val - min) / (max - min))
const smooth = (t: number) => t * t * (3 - 2 * t)

// Opening Atmosphere with Drifting Clouds & Fluttering Butterflies
function OpeningAtmosphere() {
  return (
    <div
      className="opening-atmosphere"
      data-layer="opening-atmosphere"
      aria-hidden="true"
    >
      <div className="cloud-plane cloud-plane-left" data-air-depth="-22">
        <Image
          className="intro-cloud cloud-left"
          src="/art/cloud.webp"
          alt=""
          width={1200}
          height={502}
          sizes="(max-width: 760px) 100vw, 78vw"
          loading="lazy"
        />
      </div>
      <div className="cloud-plane cloud-plane-right" data-air-depth="-12">
        <Image
          className="intro-cloud cloud-right"
          src="/art/cloud.webp"
          alt=""
          width={1200}
          height={502}
          sizes="(max-width: 760px) 100vw, 73vw"
          loading="lazy"
        />
      </div>

      {[0, 1, 2, 3].map((idx) => (
        <div key={idx} className={`butterfly-position butterfly-${idx}`}>
          <div className="butterfly-parallax" data-air-depth={18 + idx * 9}>
            <div className="butterfly-flight">
              <div className="butterfly-wings">
                <span className="butterfly-wing wing-left">
                  <img src="/art/butterfly.webp" alt="" width={320} height={320} />
                </span>
                <span className="butterfly-wing wing-right">
                  <img src="/art/butterfly.webp" alt="" width={320} height={320} />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Blessing Controls with Akshantalu Shower Button & Blessings Counter
function BlessingControls() {
  const [blessingCount, setBlessingCount] = useState(0)

  useEffect(() => {
    const onBlessed = (e: Event) => {
      const customEvent = e as CustomEvent<number>
      setBlessingCount((prev) => prev + (customEvent.detail || 1))
    }
    window.addEventListener(BLESSED_EVENT, onBlessed)
    return () => window.removeEventListener(BLESSED_EVENT, onBlessed)
  }, [])

  return (
    <div
      className="blessing-controls"
      data-layer="blessing-controls"
      style={{
        position: 'relative',
        zIndex: 20,
        marginTop: '-40px',
        background: 'linear-gradient(135deg, rgba(40, 12, 20, 0.94), rgba(22, 6, 11, 0.97))',
        border: '1.5px solid #e5b849',
        boxShadow: '0 15px 40px rgba(0,0,0,0.7), 0 0 20px rgba(229,184,73,0.3)',
      }}
    >
      <span className="eyebrow uppercase tracking-[0.22em] text-[#FFF3C4] font-medium">
        MAṄGALA ĀŚĪRVĀDAM
      </span>
      <button
        className="gold-button akshantalu-button"
        style={{
          background: 'linear-gradient(135deg, #b3801f, #ffd700 55%, #a36d17)',
          color: '#220710',
          fontWeight: 600,
          boxShadow: '0 8px 25px rgba(255,215,0,0.45)',
        }}
        onClick={() => window.dispatchEvent(new Event(SHOWER_EVENT))}
      >
        Shower akshantalu
      </button>
      <p className="tap-hint text-[#FFF9E6]">
        Tap anywhere to bless the couple
        {blessingCount > 0 && (
          <>
            {' · '}
            <b className="text-[#ffd700]">{blessingCount}</b>{' '}
            {blessingCount === 1 ? 'blessing' : 'blessings'}
          </>
        )}
      </p>
    </div>
  )
}

interface FilmStageProps {
  onDetails: (index: number) => void
  onOpenQr: () => void
  activeEventIndex: number
  onEventSlide: (index: number) => void
  onEventTouchStart: (e: React.TouchEvent) => void
  onEventTouchEnd: (e: React.TouchEvent) => void
}

const FilmStage = memo(function FilmStage({ onDetails, onOpenQr, activeEventIndex, onEventSlide, onEventTouchStart, onEventTouchEnd }: FilmStageProps) {
  return (
    <main
      className="film-stage"
      aria-label="Karthikeyan and Divya Shree's scrolling wedding invitation"
    >
      {/* SCENE 1: OPENING GOPURAM SCENE */}
      <div className="film-scene opening-scene" data-scene="opening">
        <div className="opening-glow" />
        <OpeningAtmosphere />

        <div className="opening-title" data-layer="opening-title">
          {/* Sacred Invocations in Bright Luminous Gold */}
          <p className="eyebrow text-[#722f37] tracking-[0.25em] font-semibold mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Sri Aanai Kutty Muneeswaran Thunai · Sri Murugan Thunai
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto my-2.5" />
          <p className="eyebrow tiny text-[#ffffff] tracking-[0.25em] font-medium drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]">
            WITH THE BLESSINGS OF OUR FAMILIES
          </p>
          <h1 className="my-3 text-[#722f37] drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]">
            Karthikeyan<span className="text-[#ffd700]">&amp;</span>Divya Shree
          </h1>
          <p className="opening-date text-[18px] md:text-[20px] font-semibold tracking-wide text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            Reception: Saturday, 31 October 2026 · 6:00 pm onwards
          </p>
          <p className="opening-date text-[18px] md:text-[20px] font-semibold tracking-wide text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            Muhurtham: Sunday, 1 November 2026 · 7:30 am – 9:00 am IST
          </p>
          <p className="eyebrow tiny text-[#ffffff] tracking-[0.22em] font-medium drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]">
            JAYAM MAHAL · VILLUPURAM
          </p>
        </div>

        <Image
          className="opening-temple art"
          data-layer="opening-temple"
          src="/art/temple.webp"
          alt="Traditional Dravidian temple gopuram rising majestically into the sky"
          width={1100}
          height={1849}
          sizes="(max-width: 760px) 100vw, min(92vw, 1220px)"
          priority
        />
      </div>

      {/* SCENE 2: GATE SCENE - THE AUSPICIOUS INVITATION CARD */}
      <section
        className="film-scene gate-scene"
        data-scene="gate"
        aria-label="The wedding invitation"
      >
        <div className="paper-fill" />
        <Image
          className="gate-frame frame-art art"
          data-layer="gate-frame"
          src="/art/gate.webp"
          alt="Carved wedding gateway with jasmine garlands and auspicious brass lamps"
          width={1376}
          height={768}
          sizes="(max-width: 760px) 100vw, 110vw"
          loading="lazy"
        />

        {/* High Contrast Royal Burgundy & Gold Invitation Plaque */}
        <div className="invitation-words-anchor" data-layer="invitation-words">
          <div
            className="invitation-words"
            style={{
              background:
                "linear-gradient(145deg, rgba(46, 12, 22, 0.94), rgba(24, 6, 12, 0.97))",
              border: "2px solid #e5b849",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.7), 0 0 35px rgba(229,184,73,0.3)",
              borderRadius: "4px",
              padding: "24px 28px",
            }}
          >
            <span className="eyebrow text-[#ffd700] tracking-[0.2em] font-semibold">
              IN THE PRESENCE OF LOVE &amp; TRADITION
            </span>
            <h2 className="my-2 text-[38px] md:text-[56px] text-[#ffffff] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              <em>Wedding Invitation</em>
            </h2>

            <div className="my-2.5 leading-relaxed">
              <p className="font-semibold text-[#ffe082] text-[16px] md:text-[18px] mb-1 tracking-wide">
                Mr. B. SEETHARAMAN &amp; Mrs. S. SARASWATHI
              </p>
              <p className="text-[13px] md:text-[14px] text-[#ffe082] max-w-lg mx-auto leading-relaxed">
                cordially invite you and solicit your gracious presence and
                blessings with family and friends on the occasion of the wedding
                of their son
              </p>
            </div>

            <div className="my-3">
              <h3 className="text-[28px] md:text-[40px] text-[#ffffff] font-normal leading-tight">
                <span className="text-[15px] md:text-[18px] text-[#ffd700] italic block md:inline md:mr-2 font-medium">
                  Selvan:
                </span>
                B.S. Karthikeyan
              </h3>
              <span className="text-[#ffd700] font-['Cormorant',Georgia,serif] italic text-[20px] md:text-[24px] my-0.5 block">
                with
              </span>
              <h3 className="text-[28px] md:text-[40px] text-[#ffffff] font-normal leading-tight">
                <span className="text-[15px] md:text-[18px] text-[#ffd700] italic block md:inline md:mr-2 font-medium">
                  Selvi:
                </span>
                M. Divya Shree
              </h3>
            </div>

            <div className="w-20 h-[1.5px] bg-[#e5b849] mx-auto my-3" />

            <p className="text-[#d4a337] text-[14px] md:text-[15px] leading-relaxed">
              On Sunday 1st November 2026, between 7:30 a.m. to 9:00 a.m.
              <br />
              at{" "}
              <b className="text-[#ffd700]">Jayam Mahal Thirumana Mandapam</b>,
            </p>

            <span className="eyebrow block mt-3 text-[#ffd700] tracking-[0.2em] font-medium text-[11px]">
              VILLUPURAM, TAMIL NADU
            </span>
          </div>
        </div>
      </section>

      {/* SCENE 3: CELEBRATIONS & CEREMONIES (RECEPTION & MUHURTHAM) */}
      <section
        className="film-scene events-scene"
        data-scene="events"
        aria-label="Reception and Muhurtham celebrations"
      >
        <div className="paper-fill" />
        <Image
          className="event-surround frame-art art"
          data-layer="event-surround"
          src="/art/gate.webp"
          alt=""
          width={1376}
          height={768}
          sizes="(max-width: 760px) 100vw, 118vw"
          loading="lazy"
        />
        <p className="events-label eyebrow tracking-[0.25em] text-[#ffd700] font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          AUSPICIOUS CELEBRATIONS &amp; CEREMONIES
        </p>

        <div
          className="event-window"
          data-layer="event-window"
          data-tilt="5"
          onTouchStart={onEventTouchStart}
          onTouchEnd={onEventTouchEnd}
        >
          <div
            className="event-reel"
            data-layer="event-reel"
            style={{ transform: `translateX(-${activeEventIndex * 50}%)` }}
          >
            {WEDDING_EVENTS.map((ev, idx) => (
              <article
                key={ev.title}
                className="event-invitation"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(46, 14, 24, 0.96), rgba(28, 7, 14, 0.98))",
                  border: "1.5px solid #d4a337",
                }}
              >
                <div className="event-portrait border border-[#e5b849]/60">
                  <Image
                    src={
                      idx === 0 ? "/images/couple.webp" : "/images/hands.webp"
                    }
                    alt={ev.title}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 760px) 100vw, 43vw"
                    loading="lazy"
                  />
                </div>
                <div className="event-copy">
                  <span className="eyebrow tracking-[0.18em] text-[#ffffff] font-semibold">
                    {idx === 0
                      ? "CELEBRATION EVENING"
                      : "SACRED VOWS & WEDDING FEAST"}
                  </span>
                  <h2 className="text-[#ffffff] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                    {ev.title}
                  </h2>
                  <p className="font-semibold text-[#ffd700]">
                    {ev.date}
                    <br />
                    <span className="text-[#ffd700] font-normal">
                      {ev.time}
                    </span>
                  </p>
                  <p className="event-short text-[#ffe082]">{ev.copy}</p>
                  <button
                    className="gold-button"
                    style={{
                      background:
                        "linear-gradient(135deg, #d4a337, #ffd700 55%, #b3801f)",
                      color: "#240a13",
                      fontWeight: 600,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                    }}
                    onClick={() => onDetails(idx)}
                  >
                    Ceremony details <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEventSlide(activeEventIndex - 1);
            }}
            disabled={activeEventIndex === 0}
            aria-label="Previous celebration"
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#d4a337] text-[#240a13] font-bold shadow-lg hover:scale-110 transition-transform ${activeEventIndex === 0 ? "opacity-40 cursor-not-allowed" : "pointer-events-auto"}`}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEventSlide(activeEventIndex + 1);
            }}
            disabled={activeEventIndex === 1}
            aria-label="Next celebration"
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#d4a337] text-[#240a13] font-bold shadow-lg hover:scale-110 transition-transform ${activeEventIndex === 1 ? "opacity-40 cursor-not-allowed" : "pointer-events-auto"}`}
          >
            ›
          </button>
        </div>

        <div className="event-pips">
          <span data-layer="pip-one" />
          <span data-layer="pip-two" />
        </div>
      </section>

      {/* SCENE 4: BRIDE & GROOM SCENE WITH AKSHANTALU SHOWER */}
      <section
        className="film-scene couple-scene"
        data-scene="couple"
        aria-label="The bride and groom"
      >
        <div className="couple-sky" />
        <Image
          className="couple-temple temple-side left art"
          src="/art/temple.webp"
          alt=""
          width={1100}
          height={1849}
          sizes="(max-width: 760px) 100vw, 49vw"
          loading="lazy"
        />
        <Image
          className="couple-temple temple-side right art"
          src="/art/temple.webp"
          alt=""
          width={1100}
          height={1849}
          sizes="(max-width: 760px) 100vw, 49vw"
          loading="lazy"
        />
        <Image
          className="couple-temple main-temple art"
          data-layer="couple-temple"
          src="/art/temple.webp"
          alt="Sacred temple gopuram behind the bride and groom"
          width={1100}
          height={1849}
          sizes="(max-width: 760px) 100vw, 80vw"
          loading="lazy"
        />

        <div className="couple-heading" data-layer="couple-heading">
          <span className="eyebrow tracking-[0.25em] text-[#ffd700] font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            A SACRED UNION · THE BRIDE &amp; GROOM
          </span>
        </div>

        <Image
          className="illustrated-couple art"
          data-layer="illustrated-couple"
          src="/art/couple.webp"
          alt="Illustrated South Indian bride and groom holding auspicious wedding garlands"
          width={900}
          height={1512}
          sizes="(max-width: 760px) 100vw, 74vw"
          loading="lazy"
        />

        <BlessingControls />
      </section>

      {/* SCENE 6: VENUE & ACCESSIBLE GOOGLE MAPS SECTION */}
      <section
        className="film-scene venue-scene plum-scene"
        data-scene="venue"
        aria-label="The wedding venue and location"
        style={{ overflowY: "auto" }}
      >
        <div className="arch-paper" />
        <Image
          className="plum-frame frame-art art"
          src="/art/plum.webp"
          alt=""
          width={1376}
          height={768}
          sizes="(max-width: 760px) 100vw, 110vw"
          loading="lazy"
        />

        <div className="venue-copy-anchor" data-layer="venue-copy">
          <div className="venue-copy">
            <span className="eyebrow tracking-[0.22em] text-[#ffd700] font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              WHERE OUR FOREVER BEGINS · VENUE &amp; LOCATION
            </span>
            <h2 className="my-1.5 text-[32px] md:text-[52px] text-[#ffffff] font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Jayam Mahal
              <br />
              <em className="text-[#ffd700]">Thirumana Mandapam</em>
            </h2>

            <div className="text-[14px] md:text-[15px] text-[#ffe082] leading-relaxed max-w-lg mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
              <p className="font-semibold text-[#ffffff]">
                No. 29, Ganapathi Nagar, Trichy Trunk Road,
              </p>
              <p>Villupuram, Tamil Nadu - 605602</p>
            </div>

            <div className="w-20 h-[1.5px] bg-[#ffd700] mx-auto my-2.5" />

            {/* Interactive Accessible Map & QR Code from Invitation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 max-w-xl mx-auto my-3 items-stretch text-left">
              {/* Interactive Accessible Map */}
              <div className="md:col-span-7 bg-[#240b15]/95 p-2.5 border-2 border-[#e5b849] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1px] bg-[#1a0810]">
                  <iframe
                    title="Interactive Map for Jayam Mahal Thirumana Mandapam, Villupuram"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=79.47,11.92,79.51,11.96&layer=mapnik&marker=11.942,79.492"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-[#ffe082] font-['Jost',sans-serif]">
                  <span>Jayam Mahal · Villupuram</span>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#ffd700] font-medium"
                  >
                    View Large Map ↗
                  </a>
                </div>
              </div>

              {/* Actual QR Code from Printed Invitation */}
              <div className="md:col-span-5 bg-[#240b15]/95 p-2.5 border-2 border-[#e5b849] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.7)] text-center flex flex-col items-center justify-between">
                <span className="eyebrow text-[10px] tracking-[0.2em] text-[#ffd700] block mb-0.5 uppercase font-semibold">
                  FROM PRINTED INVITATION
                </span>
                <div className="relative p-1 bg-white border border-[#cfb986] rounded-sm shadow-inner my-1">
                  <img
                    src="/invitation-qr.png"
                    alt="Scan for Location QR Code from actual wedding invitation"
                    className="w-24 h-24 md:w-28 md:h-28 object-contain"
                  />
                </div>
                <p className="text-[11px] text-[#ffe082] font-['Jost',sans-serif] leading-tight">
                  Scan with camera for GPS navigation
                </p>
              </div>
            </div>

            <div className="text-[13px] md:text-[14px] text-[#ffe082] mb-3 leading-snug">
              <p>
                <b className="text-[#ffd700]">Reception:</b> Saturday, 31
                October 2026 · 6:00 pm onwards
              </p>
              <p>
                <b className="text-[#ffd700]">Muhurtham:</b><span className="text-[#d4a337]"> Sunday, 1 November
                2026 · 7:30 am – 9:00 am</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                className="gold-button wine-button inline-flex items-center gap-2 px-5 py-2.5 text-[13px] rounded-sm text-[#ffffff] bg-[var(--wine)] hover:bg-[#7d4954] border border-[#ffd700]/50 transition-colors shadow-md"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions in Google Maps <MapPin size={15} />
              </a>

              <button
                className="gold-button inline-flex items-center gap-2 px-5 py-2.5 text-[13px] rounded-sm bg-gradient-to-r from-[#d4a337] to-[#ffd700] text-[#240a13] font-semibold transition-colors shadow-md cursor-pointer"
                onClick={onOpenQr}
              >
                Enlarge QR Code <QrCode size={15} />
              </button>
            </div>
          </div>
        </div>

        <Image
          className="venue-temple art"
          data-layer="venue-temple"
          src="/art/temple.webp"
          alt="Golden temple illustration below venue details"
          width={1100}
          height={1849}
          sizes="(max-width: 760px) 100vw, 60vw"
          loading="lazy"
        />
      </section>

      {/* SCENE 7: LIVE MUHURTHAM COUNTDOWN SCENE */}
      <section
        className="film-scene countdown-scene"
        data-scene="countdown"
        aria-label="Counting down to the Muhurtham"
      >
        <div className="paper-fill" />
        <div className="memories-ornament" aria-hidden="true">
          <Image
            src="/art/gate.webp"
            alt=""
            width={1376}
            height={768}
            sizes="(max-width: 760px) 100vw, 100vw"
            loading="lazy"
          />
        </div>

        <div className="countdown-heading" data-layer="countdown-heading">
          <span className="tracking-[0.2em] text-[#722F37] font-semibold block text-[16px] md:text-[22px] mb-1 drop-shadow-[0_1px_1px_rgba(184,134,11,0.25)]">
            UNTIL THE SACRED MUHURTHAM
          </span>
          <h2 className="my-2.5 text-[42px] md:text-[72px] text-[#722F37] font-normal leading-tight">
            <em className="not-italic [-webkit-text-stroke:0.1px_#ffd700]">
              Counting the days
            </em>
          </h2>

          <p className="text-[#d4a337] text-[15px] md:text-[17px] mb-6 font-['Jost',sans-serif] font-medium">
            Sunday, 1 November 2026 · 7:30 a.m. to 9:00 a.m. · IST
          </p>
          <WeddingCountdown />

          <div className="w-20 h-[1.5px] bg-[#ffd700] mx-auto my-6" />

          <p className="text-[#38101c] text-[14px] md:text-[15px] max-w-md mx-auto italic font-['Cormorant',Georgia,serif] text-[22px]">
            &ldquo;Two lives, two souls, united in love and blessed by divine
            grace.&rdquo;
          </p>
        </div>
      </section>

      {/* SCENE 9: FINAL AUSPICIOUS BLESSING SCENE */}
      <section
        className="film-scene final-scene"
        data-scene="final"
        aria-label="With compliments and save the date"
      >
        <Image
          className="final-landscape art"
          data-layer="final-landscape"
          src="/art/landscape.webp"
          alt="Sacred South Indian temple landscape framed by palms and hills"
          width={1376}
          height={768}
          sizes="(max-width: 760px) 100vw, 100vw"
          loading="lazy"
        />

        <div className="final-words-anchor" data-layer="final-words">
          <div className="final-card">
            <div className="final-rule" aria-hidden="true">
              <i />
              <span>✦</span>
              <i />
            </div>

            <span className="final-kicker">WITH BEST COMPLIMENTS FROM</span>
            <p className="final-hosts">
              S. Aravind Kumar &amp; Sakthiya Aravind
            </p>

            <div className="final-divider" aria-hidden="true" />

            <h2 className="final-title">
              Our forever
              <br />
              begins <em>with you.</em>
            </h2>

            <p className="final-couple">
              B.S. Karthikeyan <em className="text-[#ffd700]">&amp;</em> M. Divya Shree
            </p>
            <span className="final-date">
              SUNDAY · 1 NOVEMBER 2026 · VILLUPURAM
            </span>

            <div className="final-rule small" aria-hidden="true">
              <i />
              <span>✦</span>
              <i />
            </div>

            <div className="final-actions">
              <a
                className="final-btn final-btn-outline"
                href="/wedding.ics"
                download="karthikeyan-divyashree-wedding.ics"
              >
                <CalendarDays size={16} aria-hidden="true" />
                <span>Save to Calendar</span>
              </a>
              <a
                className="final-btn final-btn-gold"
                href="/invitation.jpeg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={16} aria-hidden="true" />
                <span>View Invitation</span>
              </a>
            </div>

            <small className="final-venue">
              Jayam Mahal Thirumana Mandapam · Villupuram, Tamil Nadu
            </small>
          </div>
        </div>

        <p
          className="tap-hint final-hint text-[#ffffff] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          aria-hidden="true"
        >
          Tap anywhere to scatter lotus petals &amp; bless the couple
        </p>
      </section>
    </main>
  );
})

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const maxScrollRef = useRef(1)
  const reducedMotionRef = useRef(false)

  const [isReady, setIsReady] = useState(false)
  const [activeEventIndex, setActiveEventIndex] = useState(0)
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [eventTouchStartX, setEventTouchStartX] = useState(0)

  const handleEventTouchStart = (e: React.TouchEvent) => {
    setEventTouchStartX(e.touches[0].clientX)
  }

  const handleEventTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    const diff = eventTouchStartX - endX
    if (Math.abs(diff) > 40) {
      setActiveEventIndex((prev) => Math.max(0, Math.min(1, prev + (diff > 0 ? 1 : -1))))
    }
  }

  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const stage = root.querySelector('.film-stage') as HTMLElement
    if (!stage) return

    const layerMap: Record<string, HTMLElement> = {}
    const sceneForLayer: Record<string, string> = {}
    const sceneElements: Record<string, HTMLElement> = {}

    root.querySelectorAll<HTMLElement>('[data-layer]').forEach((el) => {
      const layerName = el.dataset.layer!
      layerMap[layerName] = el
      sceneForLayer[layerName] = el.closest<HTMLElement>('[data-scene]')?.dataset.scene || ''
    })

    root.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
      sceneElements[el.dataset.scene!] = el
    })

    const eventArticles = Array.from(root.querySelectorAll<HTMLElement>('.event-invitation'))
    const airPlanes = Array.from(root.querySelectorAll<HTMLElement>('[data-air-depth]')).map((el) => ({
      node: el,
      depth: Number(el.dataset.airDepth),
    }))

    const sceneOffsets: Record<string, number> = {}
    const activeScenes = new Set<string>()
    const styleCache = new WeakMap<HTMLElement, Record<string, string>>()

    const setFastStyle = (el: HTMLElement, prop: string, val: string) => {
      let cache = styleCache.get(el)
      if (!cache) {
        cache = {}
        styleCache.set(el, cache)
      }
      if (cache[prop] !== val) {
        cache[prop] = val
        // @ts-expect-error fast style assignment
        el.style[prop] = val
      }
    }

    const setFastAttr = (el: HTMLElement, attr: string, val: unknown) => {
      const sVal = String(val)
      if (el.getAttribute(attr) !== sVal) {
        el.setAttribute(attr, sVal)
      }
    }

    const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mediaQuery.matches
    setReducedMotion(mediaQuery.matches)

    let isRunning = true
    let rafId = 0
    let lastTs = 0
    let currentScroll = window.scrollY
    let targetScroll = window.scrollY
    let prevAppliedScroll = -1
    let vpWidth = window.innerWidth
    let vpHeight = window.innerHeight
    let inputMode = 'wheel'
    let targetParallaxX = 0
    let targetParallaxY = 0
    let currentParallaxX = 0
    let currentParallaxY = 0
    let touchResetTimeout: ReturnType<typeof setTimeout>

    const requestRender = () => {
      if (isRunning && !document.hidden && !rafId) {
        rafId = requestAnimationFrame(renderLoop)
      }
    }

    const updateDimensions = () => {
      vpWidth = window.innerWidth
      vpHeight = stage.clientHeight
      maxScrollRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      targetScroll = window.scrollY
      prevAppliedScroll = -1
      requestRender()
    }

    const onScroll = () => {
      targetScroll = window.scrollY
      requestRender()
    }

    const onWheel = () => {
      inputMode = 'wheel'
    }

    const onTouchStart = () => {
      inputMode = 'touch'
    }

    const onMotionPreferenceChange = () => {
      reducedMotionRef.current = mediaQuery.matches
      setReducedMotion(mediaQuery.matches)
      targetParallaxX = targetParallaxY = 0
      prevAppliedScroll = -1
      requestRender()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || reducedMotionRef.current || targetScroll / maxScrollRef.current > 0.15) {
        return
      }
      targetParallaxX = (e.clientX / vpWidth) * 2 - 1
      targetParallaxY = (e.clientY / vpHeight) * 2 - 1
      requestRender()
    }

    const resetParallax = () => {
      targetParallaxX = targetParallaxY = 0
      requestRender()
    }

    const onPointerDown = (e: PointerEvent) => {
      if (
        e.pointerType !== 'touch' ||
        reducedMotionRef.current ||
        targetScroll / maxScrollRef.current > 0.12 ||
        (e.target instanceof Element && e.target.closest('button,a'))
      ) {
        return
      }
      targetParallaxX = ((e.clientX / vpWidth) * 2 - 1) * 1.5
      targetParallaxY = ((e.clientY / vpHeight) * 2 - 1) * 1.5
      clearTimeout(touchResetTimeout)
      touchResetTimeout = setTimeout(resetParallax, 900)
      requestRender()
    }

    const onVisibility = () => {
      setFastAttr(root, 'data-page-visible', !document.hidden)
      if (document.hidden) {
        cancelAnimationFrame(rafId)
        rafId = 0
        lastTs = 0
      } else {
        targetScroll = window.scrollY
        requestRender()
      }
    }

    const transformLayer = (
      layerName: string,
      txRatio: number,
      tyRatio: number,
      scale = 1,
      rotDeg = 0,
      opacity = 1
    ) => {
      const scene = sceneForLayer[layerName]
      if (scene && !activeScenes.has(scene)) return
      const el = layerMap[layerName]
      if (el) {
        setFastStyle(
          el,
          'transform',
          `translate3d(${((txRatio * vpWidth) / 100).toFixed(3)}px,${((tyRatio * vpHeight) / 100).toFixed(3)}px,0) scale(${scale.toFixed(4)}) rotate(${rotDeg.toFixed(3)}deg)`
        )
        setFastStyle(el, 'opacity', opacity.toFixed(4))
      }
    }

    const computeScene = (
      sceneName: string,
      inStart: number,
      inEnd: number,
      outStart: number,
      outEnd: number,
      progress: number
    ) => {
      const el = sceneElements[sceneName]
      if (!el) return

      let offset =
        (1 - smooth(norm(progress, inStart, inEnd))) * 100 -
        smooth(norm(progress, outStart, outEnd)) * 105

      let isActive = progress >= inStart - 0.025 && progress <= outEnd + 0.015

      if (sceneName === 'opening') {
        offset = 0
        isActive = progress < 0.18
      } else if (sceneName === 'final') {
        offset = (1 - smooth(norm(progress, inStart, inEnd))) * 100
        isActive = progress >= inStart - 0.025
      }

      if (reducedMotionRef.current) {
        isActive = progress >= inStart && (sceneName === 'final' || progress < outEnd)
        offset = 0
      }

      setFastAttr(el, 'data-active', isActive)
      setFastStyle(el, 'visibility', isActive ? 'visible' : 'hidden')

      const isInteractive = isActive && Math.abs(offset) < 18
      setFastStyle(el, 'pointerEvents', isInteractive ? 'auto' : 'none')
      el.inert = !isInteractive
      setFastAttr(el, 'aria-hidden', !isInteractive)

      if (isActive) {
        activeScenes.add(sceneName)
        sceneOffsets[sceneName] = offset
        setFastStyle(el, 'transform', `translate3d(0,${((offset * vpHeight) / 100).toFixed(3)}px,0)`)
      }
    }

    // Smooth 9-scene sequence
    const applyProgress = (progress: number) => {
      const reduced = reducedMotionRef.current
      activeScenes.clear()
      setCurrentProgress(progress)

      computeScene('opening', 0, 0, 0.12, 0.20, progress)
      computeScene('gate', 0.12, 0.18, 0.42, 0.48, progress)
      computeScene('events', 0.28, 0.33, 0.50, 0.56, progress)
      computeScene('couple', 0.46, 0.49, 0.74, 0.80, progress)
      computeScene('venue', 0.66, 0.72, 0.86, 0.92, progress)
      computeScene('countdown', 0.78, 0.82, 0.94, 1.00, progress)
      computeScene('final', 0.88, 0.92, 1.00, 1.06, progress)

      // Identify dominant scene
      let dominant = 'opening'
      for (const sc of [
        'opening',
        'gate',
        'events',
        'couple',
        'venue',
        'countdown',
        'final',
      ]) {
        if (activeScenes.has(sc) && Math.abs(sceneOffsets[sc] ?? 999) <= 50) {
          dominant = sc
        }
      }

      currentCelebration.presence = Math.max(0, 1 - Math.abs(sceneOffsets[dominant] ?? 0) / 100)
      if (currentCelebration.scene !== dominant) {
        currentCelebration.scene = dominant
        window.dispatchEvent(new Event(SCENE_EVENT))
      }

      // Layer transformations
      transformLayer(
        'opening-title',
        0,
        reduced ? 0 : -norm(progress, 0.015, 0.11) * 85,
        1,
        0,
        1 - norm(progress, 0.06, 0.11)
      )
      transformLayer(
        'opening-temple',
        0,
        reduced ? 0 : 85 - norm(progress, 0, 0.18) * 225,
        reduced ? 1 : 0.91 + norm(progress, 0, 0.15) * 0.28
      )
      transformLayer(
        'opening-atmosphere',
        0,
        reduced ? 0 : -norm(progress, 0.10, 0.18) * 28,
        1,
        0,
        1 - smooth(norm(progress, 0.06, 0.15))
      )

      // Gate Scene
      transformLayer(
        'invitation-words',
        0,
        reduced ? 0 : 8 - norm(progress, 0.11, 0.23) * 12,
        1,
        0,
        norm(progress, 0.10, 0.14) * (1 - norm(progress, 0.23, 0.27))
      )
      transformLayer(
        'gate-frame',
        0,
        reduced ? 0 : -norm(progress, 0.14, 0.25) * 6,
        1 + norm(progress, 0.12, 0.25) * 0.05
      )

      // Events Reel
      transformLayer(
        'event-window',
        0,
        reduced ? 0 : 3 - norm(progress, 0.24, 0.35) * 6,
        reduced ? 1 : 0.99 + norm(progress, 0.24, 0.35) * 0.02
      )
      transformLayer('event-surround', 0, reduced ? 0 : 2 - norm(progress, 0.22, 0.35) * 4)

      // Couple Scene
      transformLayer('blessing-controls', 0, 0, 1, 0, norm(progress, 0.46, 0.50))
      transformLayer(
        'couple-heading',
        0,
        reduced ? 0 : 8 - norm(progress, 0.46, 0.49) * 10,
        1,
        0,
        norm(progress, 0.46, 0.49) * (1 - norm(progress, 0.66, 0.70))
      )
      transformLayer(
        'couple-temple',
        0,
        reduced ? 0 : 16 - norm(progress, 0.46, 0.66) * 35,
        1 + norm(progress, 0.46, 0.55) * 0.1
      )
      transformLayer(
        'illustrated-couple',
        0,
        reduced ? 0 : 55 - norm(progress, 0.46, 0.49) * 72,
        reduced ? 1 : 0.8 + norm(progress, 0.46, 0.49) * 0.23
      )

      // Venue Scene
      transformLayer(
        'venue-copy',
        0,
        reduced ? 0 : 14 - norm(progress, 0.66, 0.92) * 25,
        1,
        0,
        norm(progress, 0.66, 0.71) * (1 - norm(progress, 0.87, 0.92))
      )
      transformLayer('venue-temple', 0, reduced ? 0 : 35 - norm(progress, 0.66, 0.92) * 47, 1)

      // Countdown Scene
      transformLayer(
        'countdown-heading',
        0,
        reduced ? 0 : 12 - norm(progress, 0.78, 1.00) * 20,
        1,
        0,
        norm(progress, 0.78, 0.83) * (1 - norm(progress, 0.95, 1.00))
      )

      // Final Scene
      transformLayer('final-landscape', 0, reduced ? 0 : 12 - norm(progress, 0.88, 1.06) * 12, 1.02)
      transformLayer(
        'final-words',
        0,
        reduced ? 0 : 12 - norm(progress, 0.88, 1.06) * 12,
        1,
        0,
        norm(progress, 0.88, 0.93) * (1 - norm(progress, 1.01, 1.06))
      )
    }

    const renderLoop = (ts: number) => {
      rafId = 0
      const dt = lastTs ? Math.min(ts - lastTs, 64) : 16.67
      lastTs = ts

      const damping = reducedMotionRef.current
        ? 1
        : 1 - Math.exp(-dt / (inputMode === 'touch' ? 80 : 190))
      currentScroll += (targetScroll - currentScroll) * damping

      if (Math.abs(targetScroll - currentScroll) < 0.12) {
        currentScroll = targetScroll
      }

      const progress = clamp(currentScroll / maxScrollRef.current)
      const isSettled = currentScroll === targetScroll

      setFastAttr(root, 'data-scroll-moving', !isSettled)

      if (prevAppliedScroll !== currentScroll) {
        prevAppliedScroll = currentScroll
        applyProgress(progress)
      }

      // Parallax lerp for atmospheric planes
      if (activeScenes.has('opening') && !reducedMotionRef.current) {
        const pFactor = 1 - Math.exp(-dt / 240)
        currentParallaxX += (targetParallaxX - currentParallaxX) * pFactor
        currentParallaxY += (targetParallaxY - currentParallaxY) * pFactor

        if (Math.abs(targetParallaxX - currentParallaxX) < 0.001) currentParallaxX = targetParallaxX
        if (Math.abs(targetParallaxY - currentParallaxY) < 0.001) currentParallaxY = targetParallaxY

        airPlanes.forEach(({ node, depth }) => {
          setFastStyle(
            node,
            'transform',
            `translate3d(${(currentParallaxX * depth).toFixed(2)}px,${(currentParallaxY * depth * 0.6).toFixed(2)}px,0)`
          )
        })
      }

      const needsParallax =
        activeScenes.has('opening') &&
        !reducedMotionRef.current &&
        (currentParallaxX !== targetParallaxX || currentParallaxY !== targetParallaxY)

      if (!isSettled || needsParallax) {
        requestRender()
      } else {
        lastTs = 0
      }
    }

    window.addEventListener('resize', updateDimensions)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.documentElement.addEventListener('pointerleave', resetParallax)
    document.addEventListener('visibilitychange', onVisibility)
    mediaQuery.addEventListener('change', onMotionPreferenceChange)

    if (isRunning) {
      setIsReady(true)
      updateDimensions()
    }

    updateDimensions()

    return () => {
      isRunning = false
      cancelAnimationFrame(rafId)
      clearTimeout(touchResetTimeout)
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.documentElement.removeEventListener('pointerleave', resetParallax)
      document.removeEventListener('visibilitychange', onVisibility)
      mediaQuery.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

  const handleScrollNext = () => {
    if (currentProgress >= 0.92) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const nextProgress = Math.min(1, currentProgress + 0.12)
      const targetY = nextProgress * maxScrollRef.current
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={containerRef}
      id="invitation-top"
      className={`invitation-film ${isReady ? 'ready' : ''} ${reducedMotion ? 'reduced' : ''}`}
    >
      {/* Cinematic Film Preloader with Karthik & Divya Monogram */}
      <div className="film-loader" aria-hidden={isReady}>
        <span className="loader-monogram text-[#ffd700]">
          K<em>&amp;</em>D
        </span>
        <div style={{ background: '#722f37' }} />
        <span className="eyebrow text-[#722f37] tracking-[0.25em]">UNFOLDING OUR WEDDING STORY</span>
      </div>

      {/* Main Invitation Stage */}
      <FilmStage
        onDetails={(idx) => { setActiveEventIndex(idx); setEventDialogOpen(true) }}
        activeEventIndex={activeEventIndex}
        onEventSlide={setActiveEventIndex}
        onEventTouchStart={handleEventTouchStart}
        onEventTouchEnd={handleEventTouchEnd}
        onOpenQr={() => setQrModalOpen(true)}
      />

      {/* Dynamic Interactive Scroll Guide Indicator (Guides till the very end!) */}
      <ScrollGuide progress={currentProgress} onScrollNext={handleScrollNext} />

      {/* Procedural Canvas Celebration Particles */}
      <CelebrationCanvas disabled={reducedMotion} />

      {/* Virtual Scroll Track for 1800svh Experience */}
        <div className="scroll-track" style={{ height: '1500svh' }} aria-hidden="true" />

      {/* Floating Monogram Return-To-Top Link */}
      <a
        className="film-monogram"
        href="#invitation-top"
        aria-label="Return to the beginning"
        style={{
          background: 'rgba(32, 10, 18, 0.88)',
          border: '1.5px solid #ffd700',
          color: '#ffd700',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        K<em className="text-[#ffffff]">&amp;</em>D
      </a>

      {/* Event Details Modal Dialog */}
      <EventsDialog
        eventIndex={eventDialogOpen ? activeEventIndex : null}
        onClose={() => setEventDialogOpen(false)}
      />

      {/* Google Maps Location QR Code Modal */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setQrModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Venue Location QR Code"
        >
          <div
            className="relative bg-[#200c14] border-2 border-[#ffd700] p-6 md:p-8 rounded-sm shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="eyebrow block text-[#ffd700] text-[11px] tracking-[0.2em] mb-2 uppercase font-semibold">
              SCAN FOR VENUE LOCATION
            </span>
            <h3 className="font-['Cormorant',Georgia,serif] text-[26px] text-[#ffffff] font-normal leading-tight mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Jayam Mahal Thirumana Mandapam
            </h3>

            <div className="p-2.5 bg-white border-2 border-[#ffd700] rounded-sm inline-block shadow-inner mb-4">
              <img
                src="/invitation-qr.png"
                alt="QR Code for Jayam Mahal Thirumana Mandapam Google Maps location from wedding invitation"
                className="w-48 h-48 mx-auto object-contain"
              />
            </div>

            <p className="text-[#ffe082] text-[13px] font-['Jost',sans-serif] mb-5 leading-relaxed">
              No. 29, Ganapathi Nagar, Trichy Trunk Road, Villupuram - 605602
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                className="gold-button inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13px] rounded-sm bg-gradient-to-r from-[#d4a337] to-[#ffd700] text-[#240a13] font-semibold transition-colors shadow-lg"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps <MapPin size={15} />
              </a>

              <button
                className="text-[#ffd700] hover:text-[#ffffff] text-[12px] font-['Jost',sans-serif] py-1 cursor-pointer transition-colors"
                onClick={() => setQrModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
