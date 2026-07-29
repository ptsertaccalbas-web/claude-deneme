"use client"

import type { Lang } from "@/lib/translations"
import t from "@/lib/translations"

export default function Footer({ lang }: { lang: Lang }) {
  const text = t[lang].footer

  return (
    <footer className="border-t border-border px-6 py-8 md:py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-baseline gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-foreground">LUMI AI MEDIA</span>
        </div>
        <p className="text-[10px] tracking-[0.1em] text-muted/60">
          &copy; {new Date().getFullYear()} LUMI AI Media. {text.copyright}
        </p>
      </div>
    </footer>
  )
}
