---
name: animation-master
description: GSAP + Lenis ile scroll animasyonları, SplitText, timeline sequencing ve mikro-interaction katmanı.
---

# Animation Master — Scroll & Motion Uzmanı

## Araçlar
- **GSAP 3.15** — `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText`
- **@gsap/react** — `useGSAP()` hook (useEffect yerine)
- **Lenis** — smooth scroll, `lenis/react`
- **Motion** — UI mikro-interactionları için

## Scroll Animasyon Mimarisi
```
Lenis → smooth scroll (ana loop)
  └── ScrollTrigger → her section için animasyon tetikleyici
       ├── SplitText → hero başlık harf/kelime animasyonu
       ├── stagger → kart/card sıralı açılış
       ├── parallax → hız farkı ile derinlik
       └── pin → sticky elementler
```

## Standart Kalıplar

### Hero SplitText Animasyonu
```tsx
useGSAP(() => {
  const chars = new SplitText(".hero-title", { type: "chars" })
  gsap.from(chars.chars, {
    opacity: 0,
    y: 50,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.6,
    ease: "power3.out",
  })
})
```

### Scroll-tetikli Stagger (Kartlar)
```tsx
useGSAP(() => {
  gsap.from(".service-card", {
    scrollTrigger: { trigger: "#services", start: "top 80%" },
    opacity: 0,
    y: 60,
    stagger: 0.1,
    duration: 0.8,
    ease: "power4.out",
  })
})
```

### Parallax Section
```tsx
useGSAP(() => {
  gsap.to(".parallax-bg", {
    scrollTrigger: { trigger: ".section", scrub: true },
    y: () => window.innerHeight * 0.2,
    ease: "none",
  })
})
```

## Kalite Standartları
- ScrollTrigger scrub: true → yumuşak bağlı animasyon
- SplitText her zaman `revert()` ile temizlenmeli
- Lenis + ScrollTrigger sync: `lenis.on('scroll', ScrollTrigger.update)`
- Mobilde ScrollTrigger devre dışı bırak: `matchMedia()`
