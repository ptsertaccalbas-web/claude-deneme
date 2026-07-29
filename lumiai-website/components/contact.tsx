"use client"

import { Lock } from "lucide-react"
import type { Lang } from "@/lib/translations"
import t from "@/lib/translations"
import WaitlistForm from "./waitlist-form"

export default function Contact({ lang }: { lang: Lang }) {
  const text = t[lang].contact

  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-lg text-center">
        <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
          {lang === "tr" ? "BAŞVURU · İLETİŞİM" : "APPLY · CONTACT"}
        </span>
        <h2 className="mb-2 font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          {text.title}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted md:text-base">
          {text.subtitle}
        </p>
        <div className="mb-6 flex items-center justify-center gap-2 text-[10px] text-muted/60">
          <Lock className="h-3 w-3" />
          {lang === "tr" ? "Bilgileriniz gizli tutulur, üçüncü taraflarla paylaşılmaz." : "Your information is kept confidential."}
        </div>
        <div className="text-left">
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
