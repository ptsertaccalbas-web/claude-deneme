"use client"

import type { Lang } from "@/lib/translations"
import t from "@/lib/translations"

export default function Stats({ lang }: { lang: Lang }) {
  const s = t[lang].stats
  const items = [
    { value: "47+", label: s.firms },
    { value: "38", label: s.ssl },
    { value: "52", label: s.domains },
    { value: "7", label: s.tools },
  ]

  return (
    <section className="border-y border-border px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="mb-1 font-serif text-3xl font-bold text-accent sm:text-4xl">{item.value}</div>
              <div className="text-xs tracking-[0.1em] text-muted/60 uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
