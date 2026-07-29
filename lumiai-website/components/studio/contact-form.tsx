"use client"

import { useState } from "react"
import { Lock, Send } from "lucide-react"
import { useStudioLang } from "./lang-context"

export default function StudioContactForm() {
  const { t } = useStudioLang()
  const [form, setForm] = useState({ name: "", company: "", phone: "", website: "" })
  const [sent, setSent] = useState(false)

  const update = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }))

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <Send className="h-5 w-5 text-accent" />
        </div>
        <p className="text-foreground">{t.formed}</p>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `New Application:
Name: ${form.name}
Company: ${form.company}
Phone: ${form.phone}
Web/IG: ${form.website}`
    window.location.href = `mailto:info@lumiaimedia.com?subject=Studio%20Application&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const fieldClass = "w-full rounded-xl border border-border bg-foreground/5 px-4 py-3.5 text-sm text-foreground placeholder-muted transition-colors focus:border-accent/50 focus:outline-none"
  const labelClass = "block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder={t.placeholders.name} value={form.name} onChange={update("name")} required className={fieldClass} />
      <label className={labelClass}>{t.fields.name}</label>

      <input placeholder={t.placeholders.company} value={form.company} onChange={update("company")} required className={fieldClass} />
      <label className={labelClass}>{t.fields.company}</label>

      <input placeholder={t.placeholders.phone} value={form.phone} onChange={update("phone")} required className={fieldClass} />
      <label className={labelClass}>{t.fields.phone}</label>

      <input placeholder={t.placeholders.web} value={form.website} onChange={update("website")} className={fieldClass} />
      <label className={labelClass}>{t.fields.web}</label>

      <button type="submit" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-background transition-all hover:bg-accent-hover active:scale-[0.97]">
        <Send className="h-4 w-4" /> {t.submit}
      </button>
    </form>
  )
}
