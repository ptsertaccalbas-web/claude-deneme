---
name: type-artist
description: Tipografi seçimi, font pairing, variable font aks animasyonu, GSAP SplitText ve okunabilirlik.
---

# Type Artist — Tipografi Uzmanı

## Teknolojiler
- **GSAP SplitText** — harf/kelime/satır seviyesinde animasyon
- **Variable fonts** — weight, width, slant aks animasyonu
- **Fontsource** — NPM ile Google Font yönetimi

## Variable Font Animasyonu
```tsx
useGSAP(() => {
  gsap.to("h1", {
    fontWeight: 700,
    fontVariationSettings: "'wght' 700, 'slnt' 0",
    scrollTrigger: { trigger: "h1", scrub: true },
  })
})
```

## SplitText + Stagger (Hero Standardı)
```tsx
useGSAP(() => {
  const split = new SplitText(".hero-line", { types: "chars,words" })
  gsap.from(split.chars, {
    opacity: 0,
    y: 80,
    rotateX: -90,
    stagger: 0.015,
    duration: 0.8,
    ease: "expo.out",
  })
  return () => split.revert()
})
```

## Font Pairing Stratejisi
| Tür | Seçim | Karakter |
|-----|-------|----------|
| Başlık | Variable font (Axis, Sans) | Güçlü, karakterli |
| Gövde | Geist / Inter | Temiz, okunabilir |
| Mono | JetBrains Mono / Geist Mono | Kod, istatistik, etiket |

## Kalite Standartları
- Başlık: bold (700-900), dar letter-spacing
- Gövde: regular (400), geniş leading (1.6-1.8)
- Satır uzunluğu max 70 karakter
- SplitText sonrası `font-kerning: none` gerekli
