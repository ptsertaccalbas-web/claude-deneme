"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { useLenis } from "./lenis-provider"
import type { Lang } from "@/lib/translations"
import t from "@/lib/translations"

export default function Hero({ lang }: { lang: Lang }) {
  const text = t[lang].hero
  const lenis = useLenis()
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
      const count = w > 1024 ? 80 : w > 768 ? 60 : 40
      particles.length = 0
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 2.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
          a: Math.random() * 0.5 + 0.15,
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
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(229,193,88,${(1 - dist / 120) * 0.15})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener("resize", init); cancelAnimationFrame(raf) }
  }, [])

  const scrollTo = (id: string) => lenis?.scrollTo(id, { offset: -80, duration: 1.2 })

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-32 md:pt-28">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg md:max-w-2xl lg:max-w-3xl">
        <span className="mb-6 inline-block rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
          {text.badge}
        </span>

        <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {text.title}
        </h1>
        <p className="mb-10 text-sm leading-relaxed text-muted md:text-base lg:text-lg">
          {text.subtitle}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-background shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:px-10 md:py-4 md:text-base"
          >
            {text.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo("#services")}
            className="rounded-full border border-border bg-foreground/5 px-8 py-3.5 text-sm font-semibold text-foreground/70 transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-foreground hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:px-10 md:py-4 md:text-base"
          >
            {text.secondary}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
