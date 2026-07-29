"use client"

import { useState } from "react"
import { Send, Check, Loader2 } from "lucide-react"

interface FormData {
  name: string
  surname: string
  phone: string
  email: string
  company: string
}

export default function WaitlistForm() {
  const [form, setForm] = useState<FormData>({ name: "", surname: "", phone: "", email: "", company: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    } catch {}
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <Check className="h-6 w-6 text-accent" />
        </div>
        <p className="text-foreground/70 text-sm">
          {form.name ? `${form.name}, başvurunuz alındı. En kısa sürede dönüş yapacağız.` : "Başvurunuz alındı. En kısa sürede dönüş yapacağız."}
        </p>
      </div>
    )
  }

  const fieldClass = "w-full rounded-xl border border-border bg-foreground/5 px-4 py-3.5 text-sm text-foreground placeholder-muted transition-colors focus:border-accent/50 focus:outline-none"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Ad" value={form.name} onChange={update("name")} required className={fieldClass} />
      <input type="text" placeholder="Soyad" value={form.surname} onChange={update("surname")} required className={fieldClass} />
      <input type="tel" placeholder="Telefon" value={form.phone} onChange={update("phone")} required className={fieldClass} />
      <input type="email" placeholder="E-posta" value={form.email} onChange={update("email")} required className={fieldClass} />
      <input type="text" placeholder="Firma Adı" value={form.company} onChange={update("company")} className={fieldClass} />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-background shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Gönderiliyor..." : "Bekleme listesine katılın"}
      </button>
    </form>
  )
}
