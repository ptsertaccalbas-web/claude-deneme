---
name: tasarim-rehberi
description: LUMI AI Media proje-ozel talimat (kaynak: .opencode/skill/tasarim-rehberi.md)
---

> Kaynak: .opencode/skill/tasarim-rehberi.md -- opencode ile senkron tutulur, biri guncellenince digeri de guncellenmeli.

# Web Sitesi Tasarım Rehberi

> 2026 — B2B/endüstriyel odaklı. Ne işe yaradığı belli olan kurallar, yasak listesi değil.
> **30 Temmuz 2026 güncellemesi:** Kullanıcı geri bildirimi — tüm siteler aynı kalıp/renk/font/efektle
> çıkıyordu, özgünlük yoktu. Sebep: "LUMI AI Design DNA" (renk paleti + imza efektleri) her MÜŞTERİ
> sitesine birebir uygulanıyordu. Düzeltme: bu DNA sadece LUMI'nin kendi sitesi (`lumiai-website/`)
> içindir. Müşteri siteleri için her adımda sektöre/markaya özgü TÜRETME zorunlu — aşağıya bak.

---

## ⚠️ KİME NE UYGULANIR (önce bunu oku)

| Proje | Ne kullanılır |
|---|---|
| **LUMI'nin kendi sitesi** (`lumiai-website/`) | Aşağıdaki "LUMI AI Design DNA" birebir — bu LUMI'nin kendi marka kimliği |
| **Müşteri sitesi** (arabasarrafi, corlu-ilgi-dis, n-pak vb. — HERKES) | LUMI paletini/efektlerini KOPYALAMA. "Müşteri Sitesi İçin Türetme Süreci" bölümünü uygula — her müşteri kendi renk/font/efekt setini alır |

Bu ayrım yapılmazsa sonuç: her site aynı koyu+altın renk, aynı custom cursor,
aynı noise, aynı marquee ile çıkar — insan eli değmemiş, şablon hissi verir.

---

## LUMI AI Design DNA (SADECE `lumiai-website/` için)

**Karanlık, Sinematik, Premium.**
- Karanlık: `#0A0A0A` fon, ambient glow, asla düz siyah değil
- Sinematik: Scroll bir video player gibi, her section bir kare
- Premium: ≤4 renk, bold tipografi, bol whitespace

### Renk Sistemi (LUMI'nin kendi paleti)

```json
{
  "background": "#0A0A0A",
  "surface": "#1A1A1A",
  "foreground": "#F5F5F0",
  "muted": "#8A8F98",
  "border": "#2D2D2D",
  "accent": "#E5C158",
  "accent-hover": "#D4A530"
}
```

### İmza Efektleri (SADECE LUMI'nin kendi sitesinde)

1. Noise overlay (SVG feTurbulence, `opacity: 0.025`)
2. Ambient glow (CSS radial gradient, asla floating blob değil)
3. Custom cursor (nokta + halka)
4. Lenis + GSAP ScrollTrigger sync (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add()`)
5. GSAP marquee (CSS `@keyframes` DEĞİL)
6. Design token (`text-white` yok, `text-foreground`)
7. ALL CAPS tracking (+0.04em ila +0.08em)
8. GSAP section reveal (`data-reveal` + `opacity-0 translate-y-8` → `gsap.to()`)

---

## Müşteri Sitesi İçin Türetme Süreci (ZORUNLU — her müşteri sitesinde)

Her müşteri projesine BAŞLAMADAN önce şu 4 soruyu kendi kendine cevapla (gerekirse
müşteriden bilgi al), ve palet/font/efekt setini SIFIRDAN türet:

1. **Sektör ne?** (Endüstriyel / Premium-lüks / Sağlık / Teknoloji / Yerel esnaf / vb.)
2. **Müşterinin mevcut markası var mı?** (logo, sosyal medya, tabela rengi) — varsa
   O renkten türet, LUMI'nin altın-koyu paletini KOPYALAMA.
3. **Rakipler nasıl?** (hepsi aynı görünüyorsa farklılaşma fırsatı; hepsi belli bir
   dilde konuşuyorsa o dile uy ya da bilinçli şekilde kır)
4. **Bu iş kime hitap ediyor?** (premium/lüks alıcı mı, günlük/yerel müşteri mi)

### Renk Türetme (LUMI paleti değil — her seferinde yeni)
Aşağıdaki gibi sabit bir palet YOK — her proje için 1 primary + 2-3 nötr + 0-1
accent seçilir; kaynak: müşterinin mevcut markası (varsa) → sektör konvansiyonu
(yoksa) → bilinçli farklılaşma (rakipler tekdüzeyse). `web-design-master`
skill'indeki "max 5 renk" kuralına uy, ama HANGİ 5 renk olduğu projeye özel olsun.

### İmza Efekti Seçimi (araç kutusu, zorunlu liste değil)
Aşağıdakilerden projeye uygun olanları seç — hepsini her sitede kullanma:
- Noise overlay → sinematik/premium hissi gereken projelerde
- Custom cursor → premium/yaratıcı sektörlerde; yerel esnaf/günlük hizmette gereksiz
- GSAP marquee → sosyal kanıt/çeşitlilik vurgulanacaksa
- Ambient glow → koyu temalı projelerde; açık/canlı temada gereksiz
- Kinetik tipografi (SplitText) → hero'da güçlü bir mesaj varsa

Karar verirken sor: "Bu efekt BU müşterinin markasına bir şey katıyor mu, yoksa
sadece LUMI'nin imzasını mı tekrarlıyor?" İkincisiyse kullanma.

---

## Tipografi

### Font Pairing

| Sektör | Display | Body |
|--------|---------|------|
| Endüstriyel / İmalat | **Oswald** (700) | **Inter** (400) |
| Endüstriyel / Premium | **Bebas Neue** (700) | **Inter** (400) |
| Hukuk / Finans | **Playfair Display** (700) | **Inter** (400) |
| Teknoloji / SaaS | **Inter** (700) | **Inter** (400) |
| Sağlık / Medikal | **DM Serif Display** (400) | **DM Sans** (400) |
| Yaratıcı / Ajans | **Instrument Serif** (400) | **Inter** (400) |
| Minimal / Lüks | **Cormorant Garamond** (600) | **Inter** (300) |

Max 2 font ailesi. Display body'de kullanılmaz.

### Modular Scale (Major Third 1.25)

| Step | Desktop | clamp() |
|------|---------|---------|
| H1 | 3.75rem (60px) | `clamp(2.5rem, 3vw+1rem, 3.75rem)` |
| H2 | 2.5rem (40px) | `clamp(1.75rem, 2vw+0.5rem, 2.5rem)` |
| H3 | 1.5rem (24px) | `clamp(1.25rem, 1vw+0.25rem, 1.5rem)` |
| Body | 1-1.125rem | `clamp(1rem, 0.5vw+0.5rem, 1.125rem)` |

- H1-H2: `text-wrap: balance`, line-height 1.05-1.1
- Body: `text-pretty`, line-height 1.6
- ALL CAPS: tracking +0.04em, weight 500-600

---

## Referans Kütüphanesi

### Proje Tipi → Pattern Eşleştirme (ESAS karar mekanizması — aşağıdaki tek "şablon" değil)

Her proje kendi tipine göre BURADAN layout sırası alır. Aynı proje tipi olsa bile
en az bir bölüm sırasını/vurgusunu projeye özgü değiştir (ör. hangi bölüm önce
gelir, kaç istatistik gösterilir, kart mı bento mu kullanılır).

| Proje Tipi | Layout Sırası | Referans |
|------------|--------------|----------|
| Endüstriyel üretici (N-Pak, Çorlu) | Hero → Values → Products → Contact | Hubtown, Oryzo |
| Premium brand (LUMI AI) | Chapter-based storytelling | IVRESS, Sleep Well |
| SaaS ürün | UI-as-hero → feature grid → CTA | Linear, Shopify |
| Portfolyo | Full-screen foto → masonry → scroll story | Lando Norris |
| E-ticaret / ürün vitrini | Bento grid → product hero → hover | Apple, Oryzo |
| Yerel esnaf/hizmet (araç galerisi, klinik, atölye) | Hero → Sosyal kanıt → Hizmetler → Vitrin → İletişim | — sade, güven odaklı, az efekt |
| Kişisel marka / uzman (avukat, danışman) | Hero → Otorite/deneyim → Hizmetler → İletişim | — güven + sadelik |

Yukarıdaki tabloda proje tipin yoksa UYDURMA — en yakın 2 tipi karşılaştır,
hangisine daha yakınsa onu temel al ve projeye göre uyarla.

### Örnek Layout (SADECE "Premium brand / chapter-based" tipi için — diğer tipler kendi sırasını kullanır)

```
Header (fixed, blur)
  → Hero (asimetrik, başlık tek tarafta, min-h-screen)
  → Marquee (GSAP loop, 8+ item)
  → Stats (4 items, scroll-trigger stagger)
  → Services/Products (heterojen kart boyutları)
  → About (2 column grid)
  → Contact (3 column cards + map)
  → CTA (full-width, gradient bg)
  → Footer
```

- Her section farklı `py` değeri (20/24/28/32)
- Her section `data-reveal` wrapper + fade-up
- CTA butonları `lenis.scrollTo()` ile, `<a href="#id">` değil

---

## Pratik Kurallar

### Yap
- `gsap.to()` + CSS initial state (`opacity-0 translate-y-8`)
- Design token kullan (direkt renk class'ı yok)
- `next/font` ile self-host, `font-display: swap`
- `clamp()` ile fluid typography
- Mobilde canvas partikül sayısını yarıya indir, custom cursor kapat

### Yapma
- `gsap.from()` kullanma
- Emoji ikon olarak kullanma (Lucide kullan)
- Section başlığında ALL CAPS etiket kullanma
- Aynı padding'i her yerde tekrarlama

### Ponytail ile Uyum

Tasarım kararlarını verirken ponytail `lite` seviyesinde çalış. Kod yazma/deploy aşamasında `full`'a geç. Ponytail "gereksiz şişkinliği kes" der, "tasarımı kötü yap" demez.

---

## Hata Tespit

- 1. hata: düzelt, bildir
- 2. hata: farklı yaklaşım dene
- 3. hata: dur, bana strateji sor
