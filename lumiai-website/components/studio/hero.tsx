"use client"

import { useEffect, useRef } from "react"
import { useStudioLang } from "./lang-context"

export default function StudioHero() {
  const { t } = useStudioLang()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0, h = 0
    const particles: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = []

    const init = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      const count = w > 1024 ? 120 : w > 768 ? 80 : 50
      particles.length = 0
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          a: Math.random() * 0.4 + 0.1,
        })
      }
    }
    init()
    window.addEventListener("resize", init)

    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(229,193,88,${p.a})`; ctx!.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener("resize", init); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-32 md:pt-28">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg md:max-w-2xl lg:max-w-3xl">
        <h1 className="mb-5 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {t.heroTitle1} <br />
          <span className="text-accent">{t.heroTitle2}</span>
        </h1>
        <p className="mb-10 text-sm leading-relaxed text-muted md:text-base lg:text-lg">
          {t.heroSub}
        </p>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-background transition-all hover:bg-accent-hover active:scale-[0.97] md:px-10 md:py-4 md:text-base"
        >
          {t.cta} <span className="text-lg">↘</span>
        </a>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
