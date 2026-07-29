"use client"

import { useEffect, useState } from "react"

export default function RawPage() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col justify-between px-8 py-10 md:px-16 md:py-14">
      {/* Noise texture */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top: tiny logo */}
      <div className="flex items-baseline gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500/60" />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Lumi</span>
      </div>

      {/* Middle: the statement */}
      <div className="flex flex-col items-start">
        <p
          className={`font-serif text-3xl leading-tight tracking-tight text-zinc-200 transition-all duration-[2000ms] ease-out sm:text-4xl md:text-5xl lg:text-6xl ${
            ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Yapay zeka
          <br />
          <span className="text-zinc-600">dijital varlığınızı</span>
          <br />
          yeniden inşa eder.
        </p>

        <div className={`mt-16 h-px w-12 bg-zinc-800 transition-all duration-[2000ms] delay-500 ${ready ? "opacity-100 w-12" : "opacity-0 w-0"}`} />

        <p
          className={`mt-8 max-w-md text-sm leading-relaxed text-zinc-600 transition-all duration-[2000ms] delay-700 ${
            ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Sessizce. Hissetmeden. Markanız dönüşürken siz işinize bakın.
        </p>
      </div>

      {/* Bottom: the whisper */}
      <div
        className={`flex items-end justify-between transition-all duration-[2000ms] delay-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-[11px] leading-relaxed text-zinc-700">
          Kimse fark etmeden.
          <br />
          Herkes hissettiğinde.
        </p>
        <a
          href="mailto:info@lumiaimedia.com"
          className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600 transition-colors hover:text-zinc-400"
        >
          info@lumiaimedia.com
        </a>
      </div>
    </main>
  )
}
