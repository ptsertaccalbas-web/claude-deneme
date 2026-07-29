"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function StudioMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const words = [
    "GÖRÜNMEYEN SETLER", "SİNEMATİK YZ", "MARKA MİMARİSİ",
    "STEALTH PRODÜKSİYON", "4K DOKU", "YÜKSEK STATÜ",
  ]

  useEffect(() => {
    const el = trackRef.current
    if (!el || !el.children.length) return
    const setW = el.scrollWidth / 4
    gsap.set(el, { x: 0 })
    const tween = gsap.to(el, {
      x: -setW,
      duration: 40,
      ease: "none",
      repeat: -1,
    })
    el.onpointerenter = () => tween.pause()
    el.onpointerleave = () => tween.resume()
    return () => { tween.kill() }
  }, [])

  return (
    <div className="relative overflow-hidden border-y border-border py-5">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span key={i} className="mx-6 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/15">
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
