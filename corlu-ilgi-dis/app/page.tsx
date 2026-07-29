"use client"

import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import {
  Phone, MessageCircle, Star, MapPin, Clock, Shield,
  Smile, Syringe, Braces, Scan, Sparkles, ChevronRight,
  Menu, X, Quote
} from "lucide-react"
import { useState } from "react"

gsap.registerPlugin(ScrollTrigger)

const PHONE = "+90 532 367 76 59"
const WHATSAPP = "https://wa.me/905323677659"
const ADDRESS = "Çorlu / Tekirdağ"
const MAPS_URL = "https://maps.google.com/?q=Çorlu+İlgi+Diş"

const services = [
  { icon: Smile, title: "Genel Diş Hekimliği", desc: "Dolgu, kanal tedavisi, diş taşı temizliği" },
  { icon: Syringe, title: "İmplant", desc: "Tek dişten tam ağız implant tedavisine kadar" },
  { icon: Braces, title: "Ortodonti", desc: "Tel ve şeffaf plak tedavileri" },
  { icon: Sparkles, title: "Estetik Diş", desc: "Laminate veneer, zirkonyum, gülüş tasarımı" },
  { icon: Scan, title: "Röntgen & Görüntüleme", desc: "Dijital panoramik röntgen" },
  { icon: Shield, title: "Çocuk Diş", desc: "Pedodonti, koruyucu uygulamalar" },
]

const reviews = [
  { name: "Ayşe K.", text: "Çok ilgili ve güler yüzlü bir ekip. Tedavimden çok memnun kaldım.", rating: 5 },
  { name: "Mehmet D.", text: "Uzun süredir ertelediğim implant tedavimi sorunsuz tamamladılar.", rating: 5 },
  { name: "Zeynep A.", text: "Temiz ve hijyenik bir ortam. Gönül rahatlığıyla gidebilirsiniz.", rating: 5 },
]

const stats = [
  { value: "5.0", label: "Google Puanı", icon: Star },
  { value: "8+", label: "Hasta Yorumu", icon: MessageCircle },
  { value: "10+", label: "Yıllık Deneyim", icon: Shield },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <Smile className="h-6 w-6 text-accent" />
          <span className="font-serif text-xl font-semibold tracking-tight">Çorlu İlgi Diş</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a href="#services" className="transition-colors hover:text-accent">Hizmetler</a>
          <a href="#about" className="transition-colors hover:text-accent">Hakkımızda</a>
          <a href="#reviews" className="transition-colors hover:text-accent">Yorumlar</a>
          <a href="#contact" className="transition-colors hover:text-accent">İletişim</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all hover:bg-accent-hover md:flex">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border bg-surface px-6 py-6 text-base md:hidden">
          <a href="#services" onClick={() => setOpen(false)} className="transition-colors hover:text-accent">Hizmetler</a>
          <a href="#about" onClick={() => setOpen(false)} className="transition-colors hover:text-accent">Hakkımızda</a>
          <a href="#reviews" onClick={() => setOpen(false)} className="transition-colors hover:text-accent">Yorumlar</a>
          <a href="#contact" onClick={() => setOpen(false)} className="transition-colors hover:text-accent">İletişim</a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </nav>
      )}
    </header>
  )
}

export default function Page() {
  const mainRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((t) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.lagSmoothing(0) }
  }, [])

  useGSAP(() => {
    gsap.from(".hero-title", { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" })
    gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 0.6, delay: 0.2, ease: "power3.out" })
    gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.5, delay: 0.4, ease: "power3.out", stagger: 0.1 })

    gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, scrollTrigger: { trigger: el, start: "top 85%" }, duration: 0.6, ease: "power3.out" })
    })

    ScrollTrigger.refresh()
  }, [])

  const scrollTo = (id: string) => lenisRef.current?.scrollTo(id, { offset: -80 })

  return (
    <div ref={mainRef}>
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--color-accent-light),transparent_60%)]" />
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/50 px-4 py-1.5 text-xs font-medium text-accent">
            <Star className="h-3 w-3 fill-accent text-accent" /> 5.0 — Çorlu'da Güvenilir Diş Hekiminiz
          </div>
          <h1 className="hero-title font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Sağlıklı ve<br />
            <span className="text-accent">Güzel Gülüşler</span>
          </h1>
          <p className="hero-desc mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Çorlu'da modern diş hekimliği. Uzman ekibimizle implant, ortodonti, estetik
            ve genel diş tedavilerinde yanınızdayız.
          </p>
          <div className="hero-cta mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => scrollTo("#contact")} className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-medium text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 sm:w-auto">
              Ücretsiz Muayene Randevusu <ChevronRight className="h-4 w-4" />
            </button>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 font-medium transition-all hover:border-accent hover:text-accent sm:w-auto">
              <MessageCircle className="h-4 w-4" /> WhatsApp'tan Yazın
            </a>
          </div>
          <div className="hero-cta mt-8 flex items-center justify-center gap-2 text-sm text-muted">
            <Clock className="h-4 w-4" /> Hafta içi 09:00 — 19:00 · Cumartesi 09:00 — 16:00
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface px-6 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="fade-up space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <s.icon className="h-4 w-4 text-accent" />
                <span className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</span>
              </div>
              <p className="text-xs text-muted sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Hizmetlerimiz</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Tüm Diş Tedavileriniz İçin</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">Modern teknoloji ve deneyimli kadromuzla ağız ve diş sağlığınızı koruyoruz.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="fade-up group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-surface px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="fade-up">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Hakkımızda</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Özel Çorlu İlgi Ağız ve Diş Sağlığı Polikliniği</h2>
            <p className="mt-6 leading-relaxed text-muted">
              Çorlu'da modern tıp teknolojileriyle donatılmış kliniğimizde, hastalarımıza
              en iyi tedavi deneyimini sunmak için çalışıyoruz. Engelli hasta erişimine
              uygun fiziksel altyapımız ve hijyen standartlarımızla güvenli bir ortamda
              hizmet veriyoruz.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-light"><MapPin className="h-4 w-4 text-accent" /></div>
                <div><p className="font-medium">Adres</p><p className="text-sm text-muted">{ADDRESS}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-light"><Phone className="h-4 w-4 text-accent" /></div>
                <div><p className="font-medium">Telefon</p><p className="text-sm text-muted">{PHONE}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-light"><Clock className="h-4 w-4 text-accent" /></div>
                <div><p className="font-medium">Çalışma Saatleri</p><p className="text-sm text-muted">Hafta içi 09:00-19:00 · Cmt 09:00-16:00</p></div>
              </div>
            </div>
          </div>
          <div className="fade-up relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent-light to-accent/10" />
            <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-surface p-4 shadow-lg">
              <div className="flex items-center gap-2"><Star className="h-5 w-5 fill-amber-400 text-amber-400" /> 5.0 Google Puanı</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Hasta Yorumları</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Hastalarımız Ne Diyor?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="fade-up rounded-2xl border border-border bg-surface p-6">
                <Quote className="mb-3 h-6 w-6 text-accent/40" />
                <p className="text-sm leading-relaxed text-muted">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />))}
                  </div>
                  <span className="text-xs font-medium">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="fade-up mt-8 text-center">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover">
              Google'da tüm yorumları görün <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-surface px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">İletişim</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Size Nasıl Yardımcı Olabiliriz?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">Randevu almak veya sorularınız için bize ulaşın.</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            <div className="fade-up space-y-6">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light"><Phone className="h-6 w-6 text-accent" /></div>
                  <div><p className="text-sm text-muted">Telefon</p><a href={`tel:${PHONE}`} className="font-medium transition-colors hover:text-accent">{PHONE}</a></div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light"><MessageCircle className="h-6 w-6 text-accent" /></div>
                  <div><p className="text-sm text-muted">WhatsApp</p><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-accent">Hemen yazın</a></div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light"><MapPin className="h-6 w-6 text-accent" /></div>
                  <div><p className="text-sm text-muted">Adres</p><p className="font-medium">{ADDRESS}</p></div>
                </div>
              </div>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-medium text-white transition-all hover:bg-accent-hover sm:inline-flex">
                <MessageCircle className="h-5 w-5" /> WhatsApp'tan Randevu Alın
              </a>
            </div>
            <div className="fade-up rounded-2xl border border-border bg-background p-6">
              <h3 className="mb-4 font-semibold">Hızlı Randevu Formu</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.open(WHATSAPP, "_blank") }}>
                <div>
                  <label className="mb-1.5 block text-sm text-muted">Adınız Soyadınız</label>
                  <input type="text" required className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-muted">Telefon Numaranız</label>
                  <input type="tel" required className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="05XX XXX XX XX" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-muted">Mesajınız</label>
                  <textarea rows={3} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent" placeholder="Randevu talebi, şikayet veya sorunuz..." />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-white transition-all hover:bg-accent-hover">
                  <MessageCircle className="h-4 w-4" /> WhatsApp'tan Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-accent" />
              <span className="font-serif text-base font-semibold">Çorlu İlgi Diş</span>
            </div>
            <p className="text-sm text-muted">© 2026 Özel Çorlu İlgi Ağız ve Diş Sağlığı Polikliniği</p>
            <p className="text-xs text-muted">Powered by LUMI AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
