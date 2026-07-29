"use client"

import { Search, Target, Globe, Share2, Clapperboard } from "lucide-react"
import type { Lang } from "@/lib/translations"
import t from "@/lib/translations"

const iconMap = [Search, Target, Globe, Share2, Clapperboard]

export default function Services({ lang }: { lang: Lang }) {
  const text = t[lang].services

  return (
    <section id="services" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
            {lang === "tr" ? "HİZMETLER · NE YAPIYORUZ" : "SERVICES · WHAT WE DO"}
          </span>
          <p className="text-lg text-foreground/80 md:text-xl">{text.subtitle}</p>
        </div>

        <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:grid-cols-3">
          {text.items.map((item, i) => {
            const Icon = iconMap[i]
            return (
              <div key={i} className="group relative rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/15 md:p-7">
                <Icon className="absolute right-5 top-5 h-5 w-5 text-accent/40 md:h-6 md:w-6" />
                <h3 className="mb-2 font-serif text-lg font-semibold text-foreground md:text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
