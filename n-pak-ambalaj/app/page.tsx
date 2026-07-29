"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import {
  Phone, Mail, MapPin, Shield, ChevronRight,
  Menu, X, Package, Layers, Building2, Warehouse,
  Ruler, Cog, Award, Users, CheckCircle, ArrowUpRight
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const PHONE = "+90 282 692 46 88"
const EMAIL = "info@sarfilm.com"
const ADDRESS = "Rumeli Mah. Karaağaç Sok. No:73, Çorlu / Tekirdağ"

const products = [
  { icon: Layers, title: "Corex Dunnage Kasa", desc: "Oluklu polipropilen levhalardan, ihtiyaca özel koruyucu kasalar." },
  { icon: Warehouse, title: "PP Seperatör", desc: "Nakliye ve depolamada hacim avantajı sağlayan endüstriyel seperatörler." },
  { icon: Building2, title: "Endüstriyel Metal Kasa", desc: "Otomotiv, beyaz eşya ve savunma sanayii için ağır parça taşımacılığı." },
  { icon: Ruler, title: "3M Endüstriyel Bantlar", desc: "3M bant, yapıştırıcı, elektrik-elektronik ve bina bakım ürün tedariği." },
  { icon: Cog, title: "Özel Bant Uygulama", desc: "ADLER & CAVALLO işbirliğiyle özel bant uygulama aparatları." },
  { icon: Shield, title: "Metal Kasa & Avadanlık", desc: "Özel üretim metal kasalar ve endüstriyel avadanlık çözümleri." },
]

const brands = [
  { name: "3M", role: "Distribütör" },
  { name: "SIKA", role: "Yetkili Tedarikçi" },
  { name: "ORAFOL", role: "Çözüm Ortağı" },
  { name: "PROSSIVE", role: "Kendi Markamız" },
  { name: "CAOULO", role: "Kendi Markamız" },
  { name: "ADLER", role: "Çözüm Ortağı" },
]

const stats = [
  { value: "2013", label: "kuruluş" },
  { value: "10+", label: "yıl tecrübe" },
  { value: "10+", label: "sektör" },
]

const aboutItems = [
  { icon: Shield, title: "kalite", desc: "Ürün ve hizmetlerde üstün kalite standardı" },
  { icon: Users, title: "uzman kadro", desc: "Tecrübeli teknik ve üretim ekibi" },
  { icon: CheckCircle, title: "güvenilirlik", desc: "Lider markaların yetkili çözüm ortağı" },
]

function Header({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const links = [
    { label: "ürünler", href: "#products" },
    { label: "markalar", href: "#brands" },
    { label: "kurumsal", href: "#about" },
    { label: "iletişim", href: "#contact" },
  ]
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <button onClick={() => onNav("#hero")} className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <span className="font-heading text-sm font-semibold tracking-wider">N</span>
          </div>
          <div className="hidden sm:block">
            <span className="block font-heading text-sm font-semibold leading-tight tracking-wide text-foreground">N-PAK</span>
            <span className="block text-[10px] leading-tight text-muted">ambalaj & paketleme</span>
          </div>
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button key={l.label} onClick={() => onNav(l.href)} className="text-sm text-muted transition-colors hover:text-foreground">
              {l.label}
            </button>
          ))}
          <a href={`tel:${PHONE}`} className="ml-2 flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover">
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-t border-border bg-background px-6 py-4 md:hidden">
          {links.map((l) => (
            <button key={l.label} onClick={() => { onNav(l.href); setOpen(false) }} className="py-1 text-left text-sm text-muted transition-colors hover:text-foreground">
              {l.label}
            </button>
          ))}
          <a href={`tel:${PHONE}`} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-background">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      )}
    </header>
  )
}

export default function Page() {
  const lenisRef = useRef<Lenis | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const brandsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((t) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.lagSmoothing(0) }
  }, [])

  const scrollTo = (id: string) => lenisRef.current?.scrollTo(id, { offset: -80 })

  useGSAP(() => {
    gsap.to(".hero-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 })
    gsap.to(".hero-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 })
    gsap.to(".hero-cta > *", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1, delay: 0.3 })

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.to(el, { opacity: 1, y: 0, scrollTrigger: { trigger: el, start: "top 85%" }, duration: 0.6, ease: "power3.out" })
    })

    gsap.utils.toArray<HTMLElement>(".stagger > *").forEach((child, i) => {
      gsap.to(child, { opacity: 1, y: 0, scrollTrigger: { trigger: child.parentElement, start: "top 85%" }, duration: 0.5, ease: "power3.out", delay: i * 0.08 })
    })

    ScrollTrigger.refresh()
  }, [])

  return (
    <div>

      <Header onNav={scrollTo} />

      {/* Hero */}
      <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden bg-foreground px-6 pt-24">
        <div className="absolute inset-0 -z-10 bg-foreground" />
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col items-start justify-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/5 px-4 py-1.5 opacity-0 text-xs font-medium tracking-wider text-accent reveal">
            <Award className="h-3 w-3" /> 3M türkiye distribütörü
          </div>
          <h1 className="hero-title max-w-3xl translate-y-8 text-balance font-heading text-5xl font-bold leading-[1.05] tracking-tight text-background sm:text-6xl lg:text-7xl">
            ENDÜSTRİYEL BANT<br className="sm:hidden" />
            <span className="text-accent"> VE PAKETLEME</span>
          </h1>
          <p className="hero-desc mt-6 max-w-xl translate-y-8 text-balance text-base leading-relaxed text-background/60 sm:text-lg">
            2013&apos;ten beri Çorlu&apos;da, savunma sanayiinden otomotive birçok sektöre
            koruyucu paketleme ve endüstriyel bant çözümleri sunuyoruz.
          </p>
          <div className="hero-cta mt-10 flex flex-col gap-4 sm:flex-row">
            <button onClick={() => scrollTo("#products")} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-heading text-sm font-semibold tracking-wider text-foreground transition-all hover:bg-accent-hover sm:w-auto">
              ürünleri incele <ChevronRight className="h-4 w-4" />
            </button>
            <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-background/20 px-8 py-3.5 font-heading text-sm font-semibold tracking-wider text-background transition-all hover:border-accent hover:text-accent">
              <Phone className="h-4 w-4" /> hemen arayın
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="border-b border-border px-6 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="reveal translate-y-8 opacity-0 space-y-1">
              <span className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{s.value}</span>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" ref={productsRef} className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal translate-y-8 opacity-0 mx-auto mb-16 max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">ürünler</p>
            <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">ENDÜSTRİYEL ÇÖZÜMLER</h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">3M distribütörlüğü ve kendi üretimimizle geniş ürün yelpazesi.</p>
          </div>
          <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.title} className="translate-y-8 opacity-0 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <p.icon className="mb-4 h-6 w-6 text-accent" />
                <h3 className="font-heading text-lg font-semibold leading-tight tracking-wide">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3M */}
      <section className="bg-foreground px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="reveal translate-y-8 opacity-0">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
              <Award className="h-7 w-7 text-foreground" />
            </div>
            <h2 className="text-balance font-heading text-3xl font-bold leading-[1.1] tracking-tight text-background sm:text-4xl">3M YETKİLİ DİSTRİBÜTÖRÜ</h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-background/60">
              3M Bant, Yapıştırıcılar, Elektrik & Elektronik ve Bina Bakım ürün gruplarında
              Türkiye distribütörü olarak 10 yılı aşkın süredir hizmet veriyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" ref={brandsRef} className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="reveal translate-y-8 opacity-0 mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">markalar</p>
            <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">TEMSİL ETTİKLERİMİZ</h2>
          </div>
          <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((b) => (
              <div key={b.name} className="translate-y-8 opacity-0 flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-foreground font-heading text-lg font-semibold tracking-wider text-background">
                  {b.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-base font-semibold tracking-wide">{b.name}</p>
                  <p className="text-sm text-muted">{b.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" ref={aboutRef} className="bg-surface px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal translate-y-8 opacity-0 mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">kurumsal</p>
            <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">N-PAK AMBALAJ</h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
              N-PAK Ambalaj & Sarfilm Endüstriyel Bantlar, 2013 yılında Çorlu&apos;da kuruldu.
              10 yılı aşkın süredir koruyucu ürünler ve teknik destek ile birçok sektöre
              hizmet vermektedir. 3M, SIKA, ORAFOL gibi dünya markalarının çözüm ortağıdır.
            </p>
          </div>
          <div className="stagger mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
            {aboutItems.map((i) => (
              <div key={i.title} className="translate-y-8 opacity-0 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <i.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading text-base font-semibold tracking-wide">{i.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="reveal translate-y-8 opacity-0 mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">iletişim</p>
            <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">BİZE ULAŞIN</h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-2">
            <div className="reveal translate-y-8 opacity-0 space-y-4">
              {[
                { icon: Phone, label: "telefon", value: PHONE, href: `tel:${PHONE}` },
                { icon: Mail, label: "e-posta", value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: MapPin, label: "adres", value: ADDRESS },
              ].map((i) => (
                <div key={i.label} className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-4">
                    <i.icon className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="text-xs text-muted">{i.label}</p>
                      {i.href ? (
                        <a href={i.href} className="text-sm font-medium transition-colors hover:text-accent">{i.value}</a>
                      ) : (
                        <p className="text-sm font-medium">{i.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal translate-y-8 opacity-0 rounded-2xl border border-border bg-surface p-6">
              <h3 className="mb-5 font-heading text-lg font-semibold tracking-wide">hızlı bilgi formu</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.open(`mailto:${EMAIL}`, "_blank") }}>
                <input type="text" required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent" placeholder="adınız soyadınız" />
                <input type="tel" required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent" placeholder="telefon" />
                <textarea rows={3} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent" placeholder="mesajınız..." />
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 font-heading text-sm font-semibold tracking-wide text-background transition-all hover:bg-foreground/90">
                  <Mail className="h-4 w-4" /> gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground font-heading text-xs font-semibold text-background">N</div>
            <span className="font-heading text-sm font-semibold tracking-wide">N-PAK ambalaj & paketleme</span>
          </div>
          <p className="text-xs text-muted">© {new Date().getFullYear()} N-PAK Ambalaj & Sarfilm Endüstriyel Bantlar</p>
        </div>
      </footer>

    </div>
  )
}
