---
name: design-craftsman
description: "İnsan eli değmiş" hissi için doku, özel imleç, magnetic buton, custom SVG ve renk psikolojisi.
---

# Design Craftsman — Doku & Mikro-Interaction Ustası

## Araçlar
- SVG noise/grain overlay
- CSS custom properties
- Motion (magnetic hover)
- Custom cursor (CSS + JS)

## Noise/Grain Overlay (3 satır CSS)
```css
body::after {
  content: "";
  position: fixed; inset: 0; z-index: 9999;
  pointer-events: none;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,...");
  mix-blend-mode: overlay;
}
```
Bu overlay **AI'nın steril dijital görünümünü kıran en önemli detaydır.**

## Magnetic Buton Pattern
```tsx
const magnetic = (e: MouseEvent, ref: RefObject<HTMLDivElement>) => {
  const rect = ref.current!.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width/2) * 0.3
  const y = (e.clientY - rect.top - rect.height/2) * 0.3
  gsap.to(ref.current, { x, y, duration: 0.3, ease: "power3.out" })
}
// onMouseLeave: gsap.to(ref, { x:0, y:0, duration: 0.5 })
```

## Custom Cursor
```css
* { cursor: none; }
.cursor-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; position: fixed; pointer-events: none; z-index: 99999; }
.cursor-ring { width: 32px; height: 32px; border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; position: fixed; pointer-events: none; z-index: 99999; }
```

## Tasarım İlkeleri
- **Asimetri**: Izgarayı tam kırma, rastgele boşluklar kullan
- **Doku**: Gradient yerine noise, düz renk yerine grain
- **Özgün Renk**: Tailwind varsayılan paletini kullanma, kendi tonlarını oluştur
- **İmza Efekti**: Her projede farklı bir mikro-dokunuş (rastgele particle, özel divider, vb.)
