"use client"

import { useStudioLang } from "./lang-context"

export default function StudioFooter() {
  const { t } = useStudioLang()
  return (
    <footer className="border-t border-border px-6 py-8 md:py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-baseline gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-foreground">LUMI AI MEDIA STUDIO</span>
        </div>
        <p className="text-[10px] tracking-[0.1em] text-muted/60">{t.footer}</p>
      </div>
    </footer>
  )
}
