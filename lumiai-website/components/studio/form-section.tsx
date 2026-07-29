"use client"

import { Lock } from "lucide-react"
import { useStudioLang } from "./lang-context"
import StudioContactForm from "./contact-form"

export default function StudioFormSection() {
  const { t } = useStudioLang()

  return (
    <section id="apply" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-lg text-center">
        <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
          {t.formBadge}
        </span>
        <h2 className="mb-2 font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          {t.formTitle}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted md:text-base">
          {t.formDesc}
        </p>
        <div className="mb-6 flex items-center justify-center gap-2 text-[10px] text-muted/60">
          <Lock className="h-3 w-3" />
          {t.formPrivacy}
        </div>
        <div className="text-left">
          <StudioContactForm />
        </div>
      </div>
    </section>
  )
}
