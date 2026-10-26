'use client'

import { useEffect, useRef } from 'react'

export interface CelebrationState {
  scene: string
  presence: number
}

export const currentCelebration: CelebrationState = {
  scene: 'opening',
  presence: 1,
}

export const SCENE_EVENT = 'invitation:scene'
export const SHOWER_EVENT = 'invitation:shower'
export const BLESSED_EVENT = 'invitation:blessed'

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

interface CachedSprite {
  c: HTMLCanvasElement
  max: number
}

function makeSprite(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D) => void
): CachedSprite {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.translate(w / 2, h / 2)
  draw(ctx)
  return { c: canvas, max: Math.max(w, h) }
}

function buildSpriteLibrary() {
  const rosePetal = (c1: string, c2: string, stroke: string) =>
    makeSprite(48, 64, (ctx) => {
      const grad = ctx.createRadialGradient(0, 8, 2, 0, 0, 34)
      grad.addColorStop(0, c1)
      grad.addColorStop(1, c2)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, 30)
      ctx.bezierCurveTo(-26, 12, -22, -24, -4, -30)
      ctx.quadraticCurveTo(0, -24, 4, -30)
      ctx.bezierCurveTo(22, -24, 26, 12, 0, 30)
      ctx.fill()
      ctx.strokeStyle = stroke
      ctx.globalAlpha = 0.35
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(0, 26)
      ctx.quadraticCurveTo(2, 0, 0, -22)
      ctx.stroke()
    })

  const jasmine = makeSprite(64, 64, (ctx) => {
    for (let t = 0; t < 5; t++) {
      ctx.save()
      ctx.rotate((t * Math.PI * 2) / 5)
      const grad = ctx.createLinearGradient(0, 0, 0, -28)
      grad.addColorStop(0, '#f3ecd4')
      grad.addColorStop(1, '#fffdf5')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, -15, 8, 15, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#d9cfb2'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()
    }
    ctx.fillStyle = '#e6d27a'
    ctx.beginPath()
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2)
    ctx.fill()
  })

  const marigold = (c1: string, c2: string) =>
    makeSprite(64, 64, (ctx) => {
      for (let r = 0; r < 3; r++) {
        const count = 14 - r * 3
        const dist = 24 - r * 7
      for (let i = 0; i < showerCount; i++) {
          ctx.save()
          ctx.rotate((i * Math.PI * 2) / count + r * 0.3)
          ctx.fillStyle = r % 2 ? c2 : c1
          ctx.beginPath()
          ctx.ellipse(0, -dist + 6, 6 - r, 9 - r, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }
      ctx.fillStyle = '#b45309'
      ctx.beginPath()
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2)
      ctx.fill()
    })

  const spark = (c1: string, c2: string, star = false) =>
    makeSprite(48, 48, (ctx) => {
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 24)
      grad.addColorStop(0, c1)
      grad.addColorStop(0.25, c2)
      grad.addColorStop(1, 'rgba(255, 200, 90, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(-24, -24, 48, 48)
      if (star) {
        ctx.fillStyle = c1
        ctx.beginPath()
        for (let e = 0; e < 8; e++) {
          const rad = e % 2 ? 2.2 : 16
          const angle = (e * Math.PI) / 4
          ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad)
        }
        ctx.fill()
      }
    })

  const lotusPetal = (tint: string) =>
    makeSprite(56, 88, (ctx) => {
      ctx.shadowColor = 'rgba(120, 84, 50, 0.32)'
      ctx.shadowBlur = 5
      ctx.shadowOffsetY = 2
      const grad = ctx.createLinearGradient(0, 32, 0, -34)
      grad.addColorStop(0, '#f4ecd9')
      grad.addColorStop(0.55, '#fffdf7')
      grad.addColorStop(1, tint)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, 32)
      ctx.bezierCurveTo(-19, 18, -16, -16, 0, -34)
      ctx.bezierCurveTo(16, -16, 19, 18, 0, 32)
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.strokeStyle = '#cdbd9c'
      ctx.globalAlpha = 0.45
      ctx.lineWidth = 0.9
      for (const offset of [-6, 0, 6]) {
        ctx.beginPath()
        ctx.moveTo(offset * 0.3, 28)
        ctx.quadraticCurveTo(offset, 0, offset * 0.4, -26)
        ctx.stroke()
      }
    })

  const fullLotus = makeSprite(96, 76, (ctx) => {
    ctx.shadowColor = 'rgba(120, 84, 50, 0.28)'
    ctx.shadowBlur = 5
    ctx.shadowOffsetY = 2
    const drawTier = (
      rot: number,
      h: number,
      w: number,
      c1: string,
      c2: string
    ) => {
      ctx.save()
      ctx.translate(0, 18)
      ctx.rotate(rot)
      const grad = ctx.createLinearGradient(0, 0, 0, -h)
      grad.addColorStop(0, c1)
      grad.addColorStop(1, c2)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-w, -h * 0.35, -w * 0.6, -h * 0.8, 0, -h)
      ctx.bezierCurveTo(w * 0.6, -h * 0.8, w, -h * 0.35, 0, 0)
      ctx.fill()
      ctx.strokeStyle = '#d6c8a8'
      ctx.globalAlpha = 0.5
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.restore()
    }
    for (const r of [-1.25, 1.25]) drawTier(r, 30, 11, '#efe5cf', '#fbeff0')
    for (const r of [-0.7, 0.7]) drawTier(r, 38, 13, '#f3ead6', '#fdf1f2')
    drawTier(0, 44, 14, '#f6efdd', '#fff4f4')
    ctx.fillStyle = '#e8cf72'
    ctx.beginPath()
    ctx.ellipse(0, 12, 7, 3, 0, 0, Math.PI * 2)
    ctx.fill()
  })

  const riceGrain = (c1: string, c2: string) =>
    makeSprite(14, 28, (ctx) => {
      const grad = ctx.createLinearGradient(-5, 0, 5, 0)
      grad.addColorStop(0, c2)
      grad.addColorStop(0.45, c1)
      grad.addColorStop(1, c2)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, 5, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(90, 50, 10, 0.55)'
      ctx.lineWidth = 1.3
      ctx.stroke()
      ctx.fillStyle = 'rgba(255, 255, 240, 0.7)'
      ctx.beginPath()
      ctx.ellipse(-1.4, -3, 1.2, 4, 0, 0, Math.PI * 2)
      ctx.fill()
    })

  return {
    flowers: [
      jasmine,
      jasmine,
      rosePetal('#fff7f0', '#f3c6cf', '#c2687e'),
      rosePetal('#f7a3b5', '#c2365d', '#7d1535'),
      rosePetal('#ffd27a', '#f28a1a', '#a84b00'),
      marigold('#f59e0b', '#fbbf24'),
      marigold('#ea580c', '#f97316'),
    ],
    roses: [
      rosePetal('#f7a3b5', '#c2365d', '#7d1535'),
      rosePetal('#ffe0e6', '#e98aa2', '#a73a5a'),
      jasmine,
    ],
    marigold: [
      marigold('#ffd27a', '#f28a1a'),
      marigold('#ffe7a3', '#f5b301'),
      marigold('#f59e0b', '#fbbf24'),
    ],
    lotus: [
      lotusPetal('#f1cdd5'),
      lotusPetal('#f7e2e0'),
      lotusPetal('#ecc3cd'),
      lotusPetal('#f9ece6'),
      fullLotus,
      jasmine,
    ],
    sparkle: [
      spark('#fff6d8', 'rgba(236, 190, 96, 0.75)', true),
      spark('#ffffff', 'rgba(255, 221, 150, 0.7)', true),
    ],
    ember: [
      spark('#fff3c4', 'rgba(255, 160, 50, 0.8)', false),
      spark('#ffe9a8', 'rgba(245, 120, 40, 0.75)', false),
    ],
    grains: [
      riceGrain('#f7cf3d', '#d9a011'),
      riceGrain('#f5c52a', '#c98d0c'),
      riceGrain('#fbd955', '#e0a91a'),
      riceGrain('#f7cf3d', '#d9a011'),
      riceGrain('#d63b2f', '#9e1f18'),
      riceGrain('#fff1c7', '#e3cf95'),
    ],
  }
}

// Shoulder silhouette collision curve for couple
function coupleSilhouetteHeight(xRatio: number): number | null {
  if (xRatio < 0.19 || xRatio > 0.77) return null
  if (xRatio < 0.35) return 0.22
  if (xRatio < 0.4) return 0.14
  if (xRatio < 0.52) return 0.095
  if (xRatio < 0.58) return 0.215
  if (xRatio < 0.7) return 0.175
  return 0.27
}

const BOTTOM_BOUND = 0.895

interface Particle {
  kind: 'flower' | 'grain' | 'sparkle' | 'ember'
  s: CachedSprite
  x: number
  y: number
  py?: number
  vx: number
  vy: number
  term?: number
  rot: number
  vr: number
  flip: number
  vf: number
  swayA: number
  swayF: number
  phase: number
  size: number
  age: number
  life: number
  delay: number
  alpha?: number
  rest?: boolean
  stick?: boolean
  bounced?: boolean
  u?: number
  v?: number
}

interface CelebrationCanvasProps {
  disabled?: boolean
}

export function CelebrationCanvas({ disabled = false }: CelebrationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (disabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const sprites = buildSpriteLibrary()

    const isMobile = w < 760
    let w = window.innerWidth
    let h = window.innerHeight
    let dpr = 1
    let animId = 0
    let lastTime = 0
    let active = true
    const particles: Particle[] = []

    let currentScene = currentCelebration.scene
    let sceneStartTime = performance.now()
    let showerTimer = -1e9
    let grainAccumulator = 0
    let pointerX = -999
    let pointerY = -999
    let pointerVx = 0
    let pointerVy = 0
    let scrollPos = window.scrollY
    let prevPointerX = 0
    let prevPointerY = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    const getCoupleBounds = () => {
      const el = document.querySelector('.illustrated-couple')
      if (!el) return null
      const rect = el.getBoundingClientRect()
      return { x: rect.left, y: rect.top, w: rect.width, h: rect.height }
    }

    const getSceneConfig = () => {
      const isMobile = w < 760
      switch (currentScene) {
        case 'opening':
          return {
            rate: isMobile ? 0.35 : 0.7,
            make: (width: number) => ({
              kind: 'flower' as const,
              s: pick(sprites.flowers),
              x: rand(-50, width + 50),
              y: rand(-60, -20),
              vx: rand(-20, 25),
              vy: rand(25, 65),
              term: rand(45, 90),
              rot: rand(0, Math.PI * 2),
              vr: rand(-1.2, 1.2),
              flip: rand(0, Math.PI * 2),
              vf: rand(0.8, 2.5),
              swayA: rand(15, 45),
              swayF: rand(0.6, 1.4),
              phase: rand(0, Math.PI * 2),
              size: rand(14, 26),
              age: 0,
              life: rand(18, 30),
              delay: 0,
            }),
          }
        case 'couple':
          return {
            rate: isMobile ? 1.2 : 2.5,
            make: (width: number) => ({
              kind: 'grain' as const,
              s: pick(sprites.grains),
              x: rand(width * 0.15, width * 0.85),
              y: rand(-40, -10),
              vx: rand(-40, 40),
              vy: rand(120, 320),
              rot: rand(0, Math.PI * 2),
              vr: rand(-6, 6),
              flip: 0,
              vf: 0,
              swayA: 0,
              swayF: 0,
              phase: 0,
              size: rand(6, 12),
              age: 0,
              life: 14,
              delay: 0,
              stick: Math.random() < 0.45,
            }),
          }
        case 'final':
          return {
            rate: isMobile ? 0.8 : 1.8,
            make: (width: number) => ({
              kind: 'flower' as const,
              s: pick(sprites.lotus),
              x: rand(-40, width + 40),
              y: rand(-50, -10),
              vx: rand(-25, 30),
              vy: rand(30, 80),
              term: rand(50, 110),
              rot: rand(0, Math.PI * 2),
              vr: rand(-1, 1),
              flip: rand(0, Math.PI * 2),
              vf: rand(0.7, 2.2),
              swayA: rand(20, 50),
              swayF: rand(0.5, 1.2),
              phase: rand(0, Math.PI * 2),
              size: rand(18, 34),
              age: 0,
              life: rand(16, 26),
              delay: 0,
            }),
          }
        default:
          return {
            rate: isMobile ? 0.2 : 0.45,
            make: (width: number) => ({
              kind: 'flower' as const,
              s: pick(sprites.roses),
              x: rand(-50, width + 50),
              y: rand(-50, -20),
              vx: rand(-15, 20),
              vy: rand(25, 60),
              term: rand(40, 85),
              rot: rand(0, Math.PI * 2),
              vr: rand(-1, 1),
              flip: rand(0, Math.PI * 2),
              vf: rand(0.6, 2),
              swayA: rand(15, 35),
              swayF: rand(0.5, 1.2),
              phase: rand(0, Math.PI * 2),
              size: rand(14, 24),
              age: 0,
              life: rand(18, 28),
              delay: 0,
            }),
          }
      }
    }

    const showerAkshantalu = (count = 110) => {
      const couple = getCoupleBounds()
      const targetX = couple ? couple.x + couple.w * 0.5 : w * 0.5
      const targetW = couple ? couple.w * 0.75 : w * 0.5
      const showerCount = isMobile ? Math.min(count, 45) : count

      for (let i = 0; i < count; i++) {
        particles.push({
          kind: 'grain',
          s: pick(sprites.grains),
          x: targetX + rand(-targetW * 0.5, targetW * 0.5),
          y: rand(-80, -10),
          vx: rand(-70, 70),
          vy: rand(260, 580),
          rot: rand(0, Math.PI * 2),
          vr: rand(-9, 9),
          flip: 0,
          vf: 0,
          swayA: 0,
          swayF: 0,
          phase: 0,
          size: rand(7, 13),
          age: 0,
          life: 14,
          delay: rand(0, 0.45),
          stick: Math.random() < 0.62,
        })
      }
      triggerLoop()
    }

    const spawnBurst = (x: number, y: number) => {
      const isCouple = currentScene === 'couple'
      const count = isCouple ? 40 : 25
      const collection = isCouple
        ? sprites.grains
        : currentScene === 'final'
        ? sprites.lotus
        : sprites.flowers

      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2)
        const speed = rand(60, 240)
        particles.push({
          kind: isCouple ? 'grain' : 'flower',
          s: pick(collection),
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - rand(30, 90),
          term: rand(45, 95),
          rot: rand(0, Math.PI * 2),
          vr: rand(-3, 3),
          flip: rand(0, Math.PI * 2),
          vf: rand(1, 4),
          swayA: rand(10, 30),
          swayF: rand(0.8, 1.8),
          phase: rand(0, Math.PI * 2),
          size: isCouple ? rand(7, 12) : rand(14, 28),
          age: 0,
          life: rand(10, 20),
          delay: 0,
          stick: isCouple ? Math.random() < 0.5 : false,
        })
      }
      triggerLoop()
    }

    const onSceneChange = () => {
      if (currentCelebration.scene !== currentScene) {
        currentScene = currentCelebration.scene
        sceneStartTime = performance.now()
      }
      triggerLoop()
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('button, a, input, [role="button"]')) return
      spawnBurst(e.clientX, e.clientY)
      if (currentScene === 'couple') {
        window.dispatchEvent(new CustomEvent(BLESSED_EVENT, { detail: 1 }))
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      pointerVx = e.clientX - prevPointerX
      pointerVy = e.clientY - prevPointerY
      prevPointerX = e.clientX
      prevPointerY = e.clientY
      pointerX = e.clientX
      pointerY = e.clientY
    }

    const onPointerLeave = () => {
      pointerX = -999
      pointerY = -999
      pointerVx = 0
      pointerVy = 0
    }

    const onShower = () => {
      showerAkshantalu(140)
      window.dispatchEvent(new CustomEvent(BLESSED_EVENT, { detail: 1 }))
    }

    const triggerLoop = () => {
      if (active && !document.hidden && !animId) {
        animId = requestAnimationFrame(loop)
      }
    }

    const loop = (time: number) => {
      animId = 0
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.064) : 0.016
      lastTime = time

      const sceneCfg = getSceneConfig()
      const couple = getCoupleBounds()
      const timeInScene = (time - sceneStartTime) / 1000

      // Spawn background ambient particles
      grainAccumulator +=
        sceneCfg.rate *
        Math.max(0, currentCelebration.presence) *
        Math.min(1, timeInScene / 0.6 + 0.3) *
        dt

      while (grainAccumulator >= 1) {
        grainAccumulator -= 1
        particles.push(sceneCfg.make(w))
      }

      const scrollDelta =
        (window.scrollY - scrollPos) * (1 - Math.exp((-dt * 1000) / 190))
      scrollPos += scrollDelta

      pointerVx *= Math.exp(-dt * 5)
      pointerVy *= Math.exp(-dt * 5)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let restingGrains = 0

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        if (p.delay > 0) {
          p.delay -= dt
          continue
        }
        p.age += dt

        if (p.kind === 'grain') {
          if (p.rest) {
            restingGrains++
            if (!couple || p.age > 9) {
              particles.splice(i, 1)
              continue
            }
            p.x = couple.x + (p.u ?? 0) * couple.w
            p.y = couple.y + (p.v ?? 0) * couple.h
          } else {
            p.py = p.y
            p.vy = Math.min(p.vy + 1100 * dt, 950)
            p.vx *= Math.exp(-dt * 0.4)
            p.x += p.vx * dt
            p.y += p.vy * dt
            p.rot += p.vr * dt

            // Collision with couple silhouette
            if (couple && p.vy > 0) {
              const u = (p.x - couple.x) / couple.w
              const surfaceHeight = p.bounced
                ? null
                : coupleSilhouetteHeight(u)

              const settle = (v: number) => {
                p.rest = true
                p.age = 0
                p.u = u
                p.v = v
                p.vr = 0
              }

              if (
                surfaceHeight !== null &&
                (p.py ?? p.y) < couple.y + surfaceHeight * couple.h &&
                p.y >= couple.y + surfaceHeight * couple.h
              ) {
                if (p.stick) {
                  settle(surfaceHeight + rand(0, 0.035))
                } else {
                  p.bounced = true
                  p.vy *= -0.28
                  p.vx += rand(-120, 120)
                }
              } else if (
                u > 0.17 &&
                u < 0.85 &&
                p.y >= couple.y + BOTTOM_BOUND * couple.h &&
                (p.py ?? p.y) < couple.y + BOTTOM_BOUND * couple.h
              ) {
                settle(BOTTOM_BOUND + rand(-0.025, 0.02))
              }
            }
          }
        } else {
          p.vx *= Math.exp(-dt * 1.3)
          p.vy += ((p.term ?? 60) - p.vy) * Math.min(1, dt * 1.6)
          p.y -= scrollDelta * 0.3

          // Mouse breeze reaction
          if (pointerX > -999) {
            const dx = p.x - pointerX
            const dy = p.y - pointerY
            const distSq = dx * dx + dy * dy
            if (distSq < 16000) {
              const force = (1 - distSq / 16000) * Math.min(1, dt * 7)
              p.vx += (pointerVx - p.vx) * force * 0.7 + dx * force * 2
              p.vy += (pointerVy - p.vy) * force * 0.5 + dy * force * 2
              p.vr += pointerVx * force * 0.002
            }
          }

          const sway = Math.sin(p.age * p.swayF + p.phase) * p.swayA
          p.x += (p.vx + sway) * dt
          p.y += p.vy * dt
          p.rot += p.vr * dt
          p.flip += p.vf * dt
        }

        // Bound checks
        if (
          p.age > p.life ||
          p.y > h + 60 ||
          p.y < -h ||
          p.x < -120 ||
          p.x > w + 120
        ) {
          particles.splice(i, 1)
          continue
        }

        let alpha = 1
        if (p.rest) {
          alpha = p.age > 8 ? 9 - p.age : 1
        } else if (p.alpha) {
          alpha = p.alpha * Math.min(1, p.age * 1.5)
        }

        const scale = (p.size * dpr) / p.s.max
        const cosR = Math.cos(p.rot)
        const sinR = Math.sin(p.rot)
        const flipScale =
          p.kind === 'flower' ? 0.25 + 0.75 * Math.abs(Math.cos(p.flip)) : 1

        ctx.globalAlpha = Math.max(0, alpha)
        ctx.setTransform(
          cosR * flipScale * scale,
          sinR * flipScale * scale,
          -sinR * scale,
          cosR * scale,
          p.x * dpr,
          p.y * dpr
        )
        ctx.drawImage(p.s.c, -p.s.c.width / 2, -p.s.c.height / 2)
      }

      // Evict excessive resting grains
      if (restingGrains > 520) {
        let toRemove = restingGrains - 520
        for (let j = 0; j < particles.length && toRemove > 0; j++) {
          if (particles[j].rest) {
            particles.splice(j--, 1)
            toRemove--
          }
        }
      }

      ctx.globalAlpha = 1
      if (particles.length > 0 || sceneCfg.rate > 0) {
        triggerLoop()
      } else {
        lastTime = 0
      }
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId)
        animId = 0
        lastTime = 0
      } else {
        triggerLoop()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener(SCENE_EVENT, onSceneChange)
    window.addEventListener(SHOWER_EVENT, onShower)
    window.addEventListener('click', onClick)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    onSceneChange()

    return () => {
      active = false
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener(SCENE_EVENT, onSceneChange)
      window.removeEventListener(SHOWER_EVENT, onShower)
      window.removeEventListener('click', onClick)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.addEventListener('visibilitychange', onVisibilityChange)
    }
  }, [disabled])

  if (disabled) return null
  return <canvas ref={canvasRef} className="celebration-layer" aria-hidden="true" />
}
