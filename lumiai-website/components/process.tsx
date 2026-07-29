"use client"

import type { Lang } from "@/lib/translations"
import t from "@/lib/translations"

export default function Process({ lang }: { lang: Lang }) {
  const text = t[lang].process

  return (
    <section id="process" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
            {lang === "tr" ? "SÜREÇ · NASIL ÇALIŞIYOR" : "PROCESS · HOW IT WORKS"}
          </span>
          <p className="text-lg text-foreground/80 md:text-xl">{text.subtitle}</p>
        </div>

        <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:grid-cols-3">
          {text.steps.map((step, i) => (
            <div key={i} className="group relative rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/15 md:p-7">
              <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{step.step}</span>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground md:text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
