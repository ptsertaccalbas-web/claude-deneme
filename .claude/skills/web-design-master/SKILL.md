---
name: web-design-master
description: Kusursuz, insan eli değmiş gibi görünen, yapay zeka ürünü olduğu belli olmayan web siteleri tasarlar. v0 + Lovable + basement.studio prompt'larından derlenmiş kurallarla. Next.js 16 + Tailwind v4 + Motion + GSAP + Lenis. En az hata, en kaliteli çıktı.
---

# Web Design Master — Kusursuz Tasarım Yeteneği

## Misyon
En az prompt hatasıyla, en kaliteli, insan yapımı görünen, modern web siteleri tasarlamak.

## Kaynak
Bu skill'in kuralları şu prompt'lardan derlenmiştir:
- **v0 (Vercel)** sistem prompt'u — 142k ⭐ repo'dan sızdırılmış tasarım kuralları
- **Lovable** sistem prompt'u — design-token-first yaklaşımı
- **basement.studio** tech stack analizi
- Kendi deneyimlerimiz (LUMI AI stüdyo sitesi)

## Tech Stack (2026)
```
Framework: Next.js 16 + React 19 + TypeScript 5
Styling:   Tailwind CSS v4 (@import "tailwindcss")
Animasyon: Motion (layout/gestures) + GSAP 3.15 (ScrollTrigger/SplitText)
Scroll:    Lenis 1.3 (React adapter ile)
3D:        @react-three/fiber v9 + drei (selektif)
Icons:     lucide-react
Font:      max 2 aile (1 başlık serif + 1 gövde sans)
Deploy:    Vercel
```

---

## 🔴 KESİNLİKLE YAPMA (v0 Anti-Patterns)

| AI Deseni | Neden Yanlış | Doğrusu |
|-----------|-------------|---------|
| Floating orbs / blurry gradient circles | **v0: "NEVER generate abstract shapes like gradient circles or decorative blobs"** | Noise texture + plain background |
| 5'ten fazla renk | **v0: "ALWAYS use exactly 3-5 colors total"** | 1 primary + 2-3 nötr + 1 accent |
| Gradyan arkaplan | **v0: "Avoid gradients entirely unless explicitly asked"** | Düz renk, en fazla noise overlay |
| Opposing temperature gradient (pink→green) | **v0: "NEVER mix opposing temperatures"** | Analog renkler (blue→teal) |
| Daire/tile içinde ikonlar | AI'nın imzası | Yalın ikon, direkt metin yanında |
| Glassmorphism (backdrop-blur) | AI'nın favorisi | border + düz arkaplan |
| Emoji ikon olarak | **v0: "NEVER use emojis as icons"** | Lucide ikonlar |
| Direkt renk sınıfları | **v0: "DO NOT use direct colors like text-white, bg-white"** | Design token: `text-foreground`, `bg-background` |
| Her section aynı py | Tekdüze = AI | py-20, py-28, py-16 değişken |
| Tam simetrik hero | AI'nın default layout'u | Asimetrik veya tek taraflı |
| `<body>`'a arkaplan rengi | **v0: "ALWAYS add background to `<html>` tag"** | `<html className="bg-background">` |
| Custom spacing `p-[16px]` | **v0: "Prefer Tailwind spacing scale"** | `p-4` |
| 3'ten fazla font ailesi | **v0: "ALWAYS limit to maximum 2 font families"** | 1 başlık + 1 gövde |

---

## 🟢 RENK SİSTEMİ (v0 Standardı)

### Kural: Tam olarak 3-5 renk
```
1 primary brand  → vurgu rengi (buton, ikon, link)
2-3 nötr         → arkaplan, yüzey, kenarlık, metin
0-1 accent       → opsiyonel ikincil vurgu
```

### LUMI AI Studio için:
```css
@theme inline {
  --color-background: #0B0B0B;
  --color-foreground: #FFFFFF;
  --color-muted: #9CA3AF;
  --color-border: rgba(255,255,255,0.08);
  --color-accent: #E5C158;
}
```
Toplam: 5 renk ✅

### Asla:
- Purple/mor baskın renk (v0: "NEVER use purple or violet prominently")
- Opposing gradient (orange→blue, red→cyan)
- 3'ten fazla renk stop'lu gradient

---

## 🟢 TİPOGRAFİ (v0 Standardı)

### Kural: Max 2 font ailesi
```
Başlık: Playfair Display / Cinzel (serif, karakterli)
Gövde:  Inter / DM Sans / Geist (sans, okunabilir)
```

### Asla:
- Gövde metninde dekoratif font
- 14px'ten küçük font
- 1.4-1.6 aralığı dışında line-height

---

## 🟢 DÜZEN (Layout)

### Kural: Mobile-first, flexbox öncelikli
1. Flexbox (çoğu layout için)
2. CSS Grid (sadece karmaşık 2D layout'lar için)
3. Asla float veya absolute (mecbur kalmadıkça)

### Section Ritmi (asla aynı olmasın)
```
Hero:      min-h-screen
Services:  py-28
Stats:     py-20
Process:   py-20
Contact:   py-28
Footer:    py-8
```

### Metin dengeleme
```tsx
<h1 className="text-balance">Önemli başlık</h1>
<p className="text-pretty">Açıklama metni</p>
```

---

## 🟢 DOKU & ARKAPLAN

### Noise overlay (her zaman)
```css
body::after {
  content: "";
  position: fixed; inset: 0; z-index: 9998;
  pointer-events: none; opacity: 0.035;
  background-image: url("data:image/svg+xml,...");
  mix-blend-mode: overlay;
}
```

### Asla:
- Gradyan daireler, blur kareler, süs blob'ları (v0: "NEVER")
- Cam efektleri (backdrop-blur)
- Gereksiz parıltı/glow elementleri

---

## 🎯 ANİMASYON STANDARTLARI

### GSAP ScrollTrigger (scroll animasyonları)
```tsx
useGSAP(() => {
  gsap.to(".card", {
    scrollTrigger: { trigger: "#section", start: "top 85%" },
    opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
  })
}, [])
```
**Not:** `gsap.to()` kullan, `gsap.from()` değil. Başlangıç durumu CSS'te `opacity-0 translate-y-8` ile ver.

### Lenis ScrollTo (CTA)
```tsx
<button onClick={() => lenis?.scrollTo("#contact", { offset: -80, duration: 1.2 })}>
```
Asla `<a href="#contact">` kullanma.

### Motion (sadece interaktif elementler)
```tsx
<motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
```
Motion'ı sadece hover/press gibi kullanıcı etkileşimlerinde kullan. Scroll animasyonları GSAP'a ait.

---

## 📐 BÖLÜM ŞABLONLARI

### Header
```tsx
<header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
  {/* Logo sol, nav/language sağ */}
</header>
```

### Hero
```tsx
<section className="relative flex min-h-screen items-center justify-center px-6">
  {/* Canvas particle veya noise background — ASLA floating orb DEĞİL */}
  {/* Başlık: SplitText GSAP ile karakter animasyonu */}
  {/* CTA: Lenis scrollTo ile, asla href değil */}
</section>
```

### Kart Grid
```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {/* Kartlar: border border-border, rounded-2xl, noise/plain bg */}
  {/* Hover: translate-y-1, border-accent */}
  {/* İkon: yalın Lucide, direkt metin yanında */}
</div>
```

### Form
```tsx
<form className="space-y-4">
  {/* Input: rounded-xl border border-border bg-background/50 */}
  {/* Focus: border-accent outline-none */}
  {/* Submit: bg-accent text-background rounded-full w-full */}
</form>
```

---

## 🔍 KALİTE KONTROL (Her çıktıdan önce)

- [ ] Floating orb/blob KULLANILMADI MI? (en kritik!)
- [ ] Toplam 5 veya az renk mi?
- [ ] Gradyan KULLANILMADI MI? (mecbur değilse)
- [ ] Arkaplan `<html>` tag'inde mi? (`<body>` değil)
- [ ] Design token'lar ile mi? (`text-foreground`, değil `text-white`)
- [ ] Max 2 font ailesi mi?
- [ ] Tailwind spacing scale mi? (`p-4`, değil `p-[16px]`)
- [ ] Noise overlay var mı?
- [ ] Lenis smooth scroll var mı?
- [ ] Scroll animasyonları GSAP `to()` ile mi?
- [ ] CTA butonları `lenis.scrollTo()` ile mi?
- [ ] Build hatasız mı?

---

## ⚡ PERFORMANS
- Lighthouse: 90+
- Motion: sadece interaktif elementler
- GSAP: sadece scroll animasyonları
- 3D (R3F): sadece anlamlıysa kullan, mobilde kapat
