"use client"

import { MessageCircle } from "lucide-react"
import type { Lang } from "@/lib/translations"

export default function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
      <header className="fixed top-0 z-50 w-full px-6 py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-foreground">LUMI</span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-muted">AI MEDIA</span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/50 p-0.5">
          <button
            onClick={() => setLang("tr")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              lang === "tr" ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              lang === "en" ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <a
        href="#contact"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background shadow-lg shadow-accent/25 transition-all hover:scale-110 hover:shadow-accent/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </header>
  )
}
