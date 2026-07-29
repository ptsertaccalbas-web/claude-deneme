'use client'

import { useRef, useState } from 'react'
import { ArrowRight, Check, BarChart3, Users, Zap, Menu, X, Globe } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'tr'

const dict: Record<string, Record<Lang, string>> = {
  'nav.features': { en: 'Features', tr: 'Özellikler' },
  'nav.stats': { en: 'Stats', tr: 'İstatistikler' },
  'nav.pricing': { en: 'Pricing', tr: 'Fiyatlandırma' },
  'nav.get-started': { en: 'Get Started', tr: 'Başlayın' },
  'hero.title': { en: 'Ship projects faster with clarity', tr: 'Projeleri netlikle daha hızlı teslim edin' },
  'hero.sub': { en: 'Orbit brings your team together with smart dashboards, automated workflows, and real-time collaboration — so you ship what matters.', tr: 'Orbit, ekibinizi akıllı panolar, otomatik iş akışları ve gerçek zamanlı iş birliği ile bir araya getirir — önemli olanı teslim edin.' },
  'hero.cta-trial': { en: 'Start free trial', tr: 'Ücretsiz dene' },
  'hero.cta-features': { en: 'See features', tr: 'Özellikleri gör' },
  'features.title': { en: 'Everything you need to deliver', tr: 'Teslimat için ihtiyacınız olan her şey' },
  'features.sub': { en: 'From first sketch to final deploy, Orbit keeps your team in sync.', tr: 'İlk taslaktan son deploy\'a kadar Orbit ekibinizi senkronize tutar.' },
  'features.analytics': { en: 'Analytics', tr: 'Analitik' },
  'features.analytics-desc': { en: 'Real-time insights into your team workload and project velocity with custom dashboards.', tr: 'Özel panolar ile ekibinizin iş yükü ve proje hızı hakkında gerçek zamanlı içgörüler.' },
  'features.collab': { en: 'Collaboration', tr: 'İş Birliği' },
  'features.collab-desc': { en: 'Built-in async updates, document sharing, and threaded discussions that keep everyone aligned.', tr: 'Herkesi aynı hizada tutan asenkron güncellemeler, belge paylaşımı ve tartışma konuları.' },
  'features.automation': { en: 'Automation', tr: 'Otomasyon' },
  'features.automation-desc': { en: 'Automate repetitive workflows, status updates, and cross-project dependencies in one click.', tr: 'Tek tıkla tekrarlayan iş akışlarını, durum güncellemelerini ve projeler arası bağımlılıkları otomatikleştirin.' },
  'stats.teams': { en: 'Active teams', tr: 'Aktif ekip' },
  'stats.retention': { en: 'Retention rate', tr: 'Memnuniyet oranı' },
  'stats.rating': { en: 'Average rating', tr: 'Ortalama puan' },
  'pricing.title': { en: 'Simple, transparent pricing', tr: 'Basit, şeffaf fiyatlandırma' },
  'pricing.sub': { en: 'No hidden fees. No surprises. Scale as you grow.', tr: 'Gizli ücret yok. Sürpriz yok. Büyüdükçe ölçeklenin.' },
  'pricing.popular': { en: 'Most popular', tr: 'En popüler' },
  'pricing.month': { en: '/month', tr: '/ay' },
  'pricing.trial': { en: 'Start free trial', tr: 'Ücretsiz dene' },
  'pricing.start': { en: 'Get started', tr: 'Başlayın' },
  'cta.title': { en: 'Ready to ship with confidence?', tr: 'Güvenle teslim etmeye hazır mısınız?' },
  'cta.sub': { en: 'Join thousands of teams already using Orbit to deliver projects on time.', tr: 'Projeleri zamanında teslim etmek için Orbit kullanan binlerce ekibe katılın.' },
  'cta.button': { en: 'Start your free trial', tr: 'Ücretsiz denemenizi başlatın' },
  'footer.tagline': { en: 'Orbit — Ship faster, together.', tr: 'Orbit — Birlikte daha hızlı teslim edin.' },
}

const starterFeatures: Record<Lang, string[]> = {
  en: ['Up to 10 projects', 'Basic analytics', '5 team members', 'Email support'],
  tr: ['10 projeye kadar', 'Temel analitik', '5 ekip üyesi', 'E-posta desteği'],
}

const proFeatures: Record<Lang, string[]> = {
  en: ['Unlimited projects', 'Advanced analytics', 'Unlimited members', 'Priority support', 'Custom integrations'],
  tr: ['Sınırsız proje', 'Gelişmiş analitik', 'Sınırsız üye', 'Öncelikli destek', 'Özel entegrasyonlar'],
}

const enterpriseFeatures: Record<Lang, string[]> = {
  en: ['Dedicated infra', 'SLA guarantee', 'SSO & audit logs', 'API access', 'Custom onboarding'],
  tr: ['Özel altyapı', 'SLA garantisi', 'SSO & denetim kaydı', 'API erişimi', 'Özel onboarding'],
}

const featuresData = [
  { icon: BarChart3, key: 'analytics' },
  { icon: Users, key: 'collab' },
  { icon: Zap, key: 'automation' },
]

export default function SaasLanding() {
  const [lang, setLang] = useState<Lang>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  const t = (key: string) => dict[key]?.[lang] ?? key

  useGSAP(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    gsap.from('.hero-title', { opacity: 0, y: 80, duration: 0.8, ease: 'expo.out', delay: 0.2 })
    gsap.from('.hero-sub', { opacity: 0, y: 30, duration: 0.8, delay: 0.8, ease: 'power3.out' })
    gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, delay: 1.2, ease: 'power3.out' })
    gsap.from('.feature-card', { scrollTrigger: { trigger: '#features', start: 'top 80%' }, opacity: 0, y: 60, stagger: 0.15, duration: 0.8, ease: 'power4.out' })
    gsap.from('.stat-item', { scrollTrigger: { trigger: '#stats', start: 'top 85%' }, opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: 'power3.out' })
    gsap.from('.pricing-card', { scrollTrigger: { trigger: '#pricing', start: 'top 80%' }, opacity: 0, y: 60, stagger: 0.1, duration: 0.7, ease: 'power4.out' })
    gsap.from('.cta-section', { scrollTrigger: { trigger: '.cta-wrap', start: 'top 85%' }, opacity: 0, scale: 0.95, duration: 0.8, ease: 'power3.out' })

    return () => { lenis.destroy() }
  }, [])

  const scrollTo = (id: string) => lenisRef.current?.scrollTo(id, { offset: -80, duration: 1.2 })
  const toggleLang = () => setLang(l => l === 'en' ? 'tr' : 'en')

  const sections = [
    { id: 'features', label: t('nav.features') },
    { id: 'stats', label: t('nav.stats') },
    { id: 'pricing', label: t('nav.pricing') },
  ]

  const plans = [
    { name: 'Starter', price: '19', features: starterFeatures[lang], popular: false },
    { name: 'Pro', price: '49', features: proFeatures[lang], popular: true },
    { name: 'Enterprise', price: '99', features: enterpriseFeatures[lang], popular: false },
  ]

  return (
    <div ref={mainRef} className="bg-background text-foreground">
      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <button onClick={() => scrollTo('top')} className="text-xl font-bold tracking-tight">Orbit</button>
          <nav className="hidden md:flex items-center gap-8">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="text-sm text-muted hover:text-foreground transition-colors">{s.label}</button>
            ))}
            <button onClick={toggleLang} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors">
              <Globe size={14} /> {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <button onClick={() => scrollTo('pricing')} className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity">
              {t('nav.get-started')}
            </button>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleLang} className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors">
              <Globe size={12} /> {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-background px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {sections.map((s) => (
                <button key={s.id} onClick={() => { setMenuOpen(false); scrollTo(s.id) }} className="text-sm text-muted hover:text-foreground text-left">{s.label}</button>
              ))}
              <button onClick={() => { setMenuOpen(false); scrollTo('pricing') }} className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-background text-center">
                {t('nav.get-started')}
              </button>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="hero-title text-balance text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">{t('hero.title')}</h1>
          <p className="hero-sub mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted md:text-xl">{t('hero.sub')}</p>
          <div className="hero-cta mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button onClick={() => scrollTo('pricing')} className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity">
              {t('hero.cta-trial')} <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo('features')} className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium text-muted hover:text-foreground transition-colors">
              {t('hero.cta-features')}
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{t('features.title')}</h2>
            <p className="mt-4 text-pretty text-muted">{t('features.sub')}</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((f) => (
              <div key={f.key} className="feature-card rounded-2xl border border-border p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
                  <f.icon size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">{t(`features.${f.key}`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`features.${f.key}-desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="border-y border-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: '12K+', label: t('stats.teams') },
              { value: '98%', label: t('stats.retention') },
              { value: '4.9', label: t('stats.rating') },
            ].map((s) => (
              <div key={s.label} className="stat-item text-center">
                <p className="text-4xl font-bold tracking-tight text-accent md:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{t('pricing.title')}</h2>
            <p className="mt-4 text-pretty text-muted">{t('pricing.sub')}</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`pricing-card relative rounded-2xl border p-8 ${p.popular ? 'border-accent bg-accent/5' : 'border-border'}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-medium text-background">
                    {t('pricing.popular')}
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${p.price}</span>
                  <span className="text-sm text-muted">{t('pricing.month')}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('top')} className={`mt-8 w-full rounded-full py-3 text-sm font-medium transition-opacity hover:opacity-90 ${p.popular ? 'bg-accent text-background' : 'border border-border text-muted hover:text-foreground'}`}>
                  {p.popular ? t('pricing.trial') : t('pricing.start')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-wrap px-6 py-28">
        <div className="cta-section mx-auto max-w-3xl rounded-3xl border border-border p-12 text-center md:p-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{t('cta.title')}</h2>
          <p className="mt-4 text-pretty text-muted">{t('cta.sub')}</p>
          <button onClick={() => scrollTo('top')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity">
            {t('cta.button')} <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
          <p>{t('footer.tagline')}</p>
          <div className="flex gap-6">Twitter GitHub Docs</div>
        </div>
      </footer>
    </div>
  )
}
