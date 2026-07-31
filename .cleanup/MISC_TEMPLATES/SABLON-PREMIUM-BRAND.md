# 👤 Arabasarrafı Modeli — Premium Brand Web Sitesi Şablonu

> Hedef: Kişisel marka / premium showroom / B2C satış sitesi.
> Türetildiği proje: Arabasarrafı (arabasarrafi.vercel.app)
> Varsayılan vibe: **Karanlık, premium, güven odaklı**

---

## Aşama 0: Proje Yapısı

```
[firma]/
├── app/
│   ├── globals.css        # @theme inline tokens
│   ├── layout.tsx         # next/font + metadata + suppressHydrationWarning
│   └── page.tsx           # "use client" — tüm component'ler inline
├── lib/
│   └── lang-context.tsx   # dictionary + LangProvider + useLang hook
├── public/
│   └── ...                # fotoğraflar
├── package.json
└── next.config.ts
```

**Tek sayfa, "use client", monolithic.** Component'ler inline fonksiyonlar (Header, MarqueeBar, RevealSection, CustomCursor, PageContent). Router/sayfa yok.

---

## Aşama 1: Marka Tokens (globals.css)

### Varsayılan Palet (Premium Dark)
```css
@theme inline {
  --color-background: #1A1A1A;
  --color-foreground: #F5F5F0;
  --color-muted: #8A8F98;
  --color-border: rgba(245,245,240,0.08);
  --color-accent: #C9A96E;       /* altın */
  --color-accent-hover: #B8944F;
  --color-accent-dim: rgba(201,169,110,0.1);
  --color-surface: #242424;
  --color-surface-muted: #2A2A2A;
}
```

### Zorunlu İmza Bileşenleri (globals.css)
- [ ] **Noise overlay** — `body::after` SVG fractal noise, `mix-blend-mode: overlay`, `opacity: 0.025`
- [ ] **Ambient glow** — section'larda `radial-gradient` arkaplan, asla floating orb değil
- [ ] **Design token** — direkt renk class'ı yasak (`text-white`, `bg-black`)
- [ ] **ALL CAPS tracking** — `tracking-widest` (+0.08em)
- [ ] **Selection** — `::selection { background: accent; color: background; }`

---

## Aşama 2: Layout Sırası (16 blok)

```
1.  Header (fixed, nav + dil toggle + WhatsApp/CTA buton)
2.  Hero (bg foto + ambient glow + title + desc + 3 CTA)
3.  Marquee (GSAP loop, 8 terim)
4.  Stats (4 sütun, sosyal kanıt)
5.  Services (kart grid, hover bg foto)
6.  Products/Showcase (grid, sahibinden/listing linki)
7.  About (2 sütun: text + foto, kişisel marka)
8.  Contact (3 kart: iletişim kanalları)
9.  Location (tek satır, Maps linki)
10. Bottom CTA (gradient bg, 3 buton)
11. Footer (brand + social links + powered by)
```

---

## Aşama 3: Component Pattern'leri

### Header
```tsx
function Header({ lenis }: { lenis: Lenis | null }) {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useLang()
  // scrollTo helper: lenis.scrollTo("#hero", { offset: -80 })
  // Desktop: logo + nav (services/about/contact) + catalog link + dil toggle + WhatsApp CTA
  // Mobile: hamburger menu, aynı linkler + dil toggle
}
```

### Hero
```tsx
<section id="hero">
  {/* Full-screen bg img opacity-15 + gradient overlay */}
  {/* Ambient glow radial-gradient circles */}
  <span className="hero-fade">{t("hero.badge")}</span>
  <h1 className="hero-fade">{t("hero.title1")} <span class="text-accent">{t("hero.title2")}</span> {t("hero.title3")}</h1>
  <p className="hero-fade">{t("hero.desc")}</p>
  {/* 3 CTA: WhatsApp (accent), Phone (border), Catalog (accent border) */}
  {/* Social links: Instagram, YouTube, TikTok */}
</section>
```

### MarqueeBar (GSAP Loop)
```tsx
function MarqueeBar() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()
  const items = [t("marquee.1"), ...t("marquee.8")]
  useGSAP(() => {
    const track = trackRef.current
    if (!track) return
    gsap.to(track, { x: -track.scrollWidth/2, duration: 30, repeat: -1, ease: "none" })
    track.addEventListener("mouseenter", () => gsap.to(track, { timeScale: 0.3, duration: 0.3 }))
    track.addEventListener("mouseleave", () => gsap.to(track, { timeScale: 1, duration: 0.3 }))
  }, [])
  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div ref={trackRef} className="flex w-max gap-12 will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-medium tracking-[0.08em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {item}
          </span>
        ))}
      </div>
    </div>
  )
}
```

### RevealSection (GSAP ScrollTrigger)
```tsx
function RevealSection({ children, className = "" }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } })
  }, [])
  return <div ref={ref} className={`opacity-0 translate-y-8 ${className}`}>{children}</div>
}
```

### CustomCursor
```tsx
function CustomCursor() {
  // dot + ring, gsap mouse tracking
  // ring scale 1.5 on a/button hover
  // hidden on mobile (md:block)
}
```

### Service/Product Cards
```tsx
// Data array: { icon, title, desc, phone, tag, img }
// Grid: sm:grid-cols-2 lg:grid-cols-4
// Card: rounded-2xl border border-border bg-surface p-8
// Hover: -translate-y-1 border-accent/20 + bg img opacity-15
```

### Stats Section
```tsx
// Data array: { value, label, icon }
// Grid: grid-cols-2 md:grid-cols-4
// GSAP stagger: gsap.utils.toArray(".stat-item") scrollTrigger
```

---

## Aşama 4: TR/EN Dil Desteği (lib/lang-context.tsx)

```tsx
// LangProvider context
// useLang() hook returns { lang, setLang, t }
// d[lang][key] dictionary: 60+ key/value pairs
// Header'da Globe butonu: setLang(lang === "tr" ? "en" : "tr")
// layout.tsx: <html lang="tr" suppressHydrationWarning>
```

### Kurulum adımları:
1. `lib/lang-context.tsx` oluştur (dictionary TR + EN)
2. `page.tsx`: Page'i `<LangProvider>` ile sar, `PageContent`'te `useLang()` kullan
3. Tüm text string'leri `t("key")` ile değiştir
4. Header'a dil toggle butonu ekle (desktop + mobile)
5. `layout.tsx`: `<html>`'e `suppressHydrationWarning` ekle

---

## Aşama 5: GSAP + Lenis Kurulumu

```tsx
useEffect(() => {
  const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return () => { lenis.destroy(); gsap.ticker.lagSmoothing(0) }
}, [])

useGSAP(() => {
  gsap.to(".hero-fade", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 })
  gsap.to(".hero-cta", { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power3.out" })
  ScrollTrigger.refresh()
}, [])
```

---

## Aşama 6: Bağımlılıklar (package.json)

```json
{
  "dependencies": {
    "next": "16",
    "react": "^19",
    "react-dom": "^19",
    "gsap": "^3.15",
    "@gsap/react": "^2",
    "lenis": "^1.3",
    "lucide-react": "^1.27"
  }
}
```

---

## Aşama 7: Referans Pattern Eşleştirmesi

| Element | Referans |
|---------|----------|
| Hero (bg foto + ambient glow) | Hubtown hero |
| Stats | Linear numeric section |
| Service cards (hover bg) | Lando Norris hover swap |
| About (text + foto) | Lando Norris personal |
| Marquee | Studio/LUMI marquee |
| TR/EN | Lumiai SaaS landing pattern |

---

## Aşama 8: Mobil Kontroller

- [ ] Header hamburger çalışıyor (nav + dil toggle)
- [ ] Butonlar full-width mobilde (flex-col)
- [ ] Kartlar tek sütun (grid → 1 col)
- [ ] Yazılar taşmıyor (text-balance, break-words)
- [ ] Custom cursor mobilde gizli (md:block)
- [ ] Marquee mobilde çalışıyor (taşma yok)
- [ ] Hero metin mobilde okunabilir (clamp size)

---

## Aşama 9: Build & Deploy

```
□ npm run build (hatasız)
□ vercel --prod
□ Custom domain varsa DNS ayarı
```

---

## Kullanım Senaryosu

Bu şablon şu projeler için uygun:
- **Araç galerisi / showroom** (arabasarrafı)
- **Kişisel marka / portfolyo** (İbrahim Sarı)
- **Premium hizmet** (PPF, detaylandırma, restore)
- **Ürün tanıtım** (4-8 ürünlü showcase)
- **Lokasyon bazlı hizmet** (Konya/Karatay)
