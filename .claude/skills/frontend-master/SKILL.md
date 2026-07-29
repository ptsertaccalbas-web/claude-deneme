---
name: frontend-master
description: Next.js + Tailwind CSS ile dönüşüm odaklı B2B web arayüzleri geliştirir, tasarım sistemini yönetir, UI/UX denetimi yapar.
---

# Frontend Master & Tasarım Sistemi Mimarı

## Teknolojiler
- Next.js App Router, React 19 Server Components
- Tailwind CSS v4 (`@theme inline` ile)
- Motion (fka Framer Motion) — `motion/react`
- GSAP 3.15 — `gsap`, `@gsap/react`
- Lenis — `lenis`, `lenis/react`

## Tasarım İlkeleri (Ruthless UI/UX Review)
1. **Görsel Hiyerarşi**: Her pikselin ticari amacı olmalı. Boşluk = değer.
2. **Güven Sınıfı**: Vercel/Linear estetiği — temiz, nefes alan, okunabilir.
3. **İnsan Eli**: AI ürünü belli olmamalı — rastgelelik, asimetri, doku (noise) ekle.
4. **Mobil First**: Önce mobil, sonra desktop. Breakpoint'leri hissettirme.
5. **Performans**: 90+ Lighthouse. Lazy load, code split, image optimize.

## Skill Referansları
Bu skill diğer yetenekleri koordine eder:
- `animation-master` → GSAP/Lenis scroll animasyonları
- `design-craftsman` → Noise, cursor, magnetic, custom SVG
- `type-artist` → Font pairing, variable fonts, split text
- `webgl-artist` → React Three Fiber + Drei 3D katmanı

## Kritik Kalite Kontrol Listesi
- [ ] Scroll smoothing var mı? (Lenis)
- [ ] Mikro-interaction var mı? (hover, magnetic, cursor)
- [ ] Doku katmanı var mı? (noise/grain overlay)
- [ ] Tipografi karakterli mi? (pairing, hiyerarşi)
- [ ] Animasyonlar anlamlı mı? (scroll-trigger, stagger)
- [ ] Mobilde kopma var mı?
- [ ] Yüklenme süresi < 2s mi?
