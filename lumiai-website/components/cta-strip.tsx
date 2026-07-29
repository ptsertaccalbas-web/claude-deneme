"use client"

import { ArrowRight } from "lucide-react"
import { useLenis } from "./lenis-provider"

export default function CtaStrip({ lang }: { lang: "tr" | "en" }) {
  const lenis = useLenis()

  const scrollToForm = () => lenis?.scrollTo("#contact", { offset: -80, duration: 1.2 })

  return (
    <section className="relative border-y border-border px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {lang === "tr" ? "Dijital dönüşüme hazır mısın?" : "Ready for digital transformation?"}
        </h2>
        <p className="mb-8 text-sm text-muted">
          {lang === "tr"
            ? "Sınırlı sayıda firma kabul ediyoruz. Bekleme listesine katıl, öncelikli erişim kazan."
            : "We accept a limited number of firms. Join the waitlist for early access."}
        </p>
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-background shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {lang === "tr" ? "Bekleme listesine katılın" : "Join the waitlist"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
