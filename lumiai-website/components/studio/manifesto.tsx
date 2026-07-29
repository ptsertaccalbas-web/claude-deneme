"use client"

import { CameraOff, Clapperboard, Crown } from "lucide-react"
import { useStudioLang } from "./lang-context"

export default function StudioManifesto() {
  const { t } = useStudioLang()
  const icons = [CameraOff, Clapperboard, Crown]

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="text-center">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{t.manifestoBadge}</span>
          <h2 className="mb-10 font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl md:text-4xl">{t.manifestoTitle}</h2>
        </div>

        <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:grid-cols-3">
          {t.manifesto.map((c, i) => {
            const Icon = icons[i]
            return (
              <div key={i} className="group relative rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/15 md:p-7">
                <Icon className="absolute right-5 top-5 h-5 w-5 text-accent/40 md:h-6 md:w-6" />
                <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{c.label}</span>
                <h3 className="mb-2 font-serif text-lg font-semibold text-foreground md:text-xl">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{c.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
