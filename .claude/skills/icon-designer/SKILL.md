---
name: icon-designer
description: Lucide ikon sistemi yönetimi, custom SVG ikon tasarımı ve ikon tutarlılığı denetimi.
---

# Icon Designer — İkon Sistemi Uzmanı

## Araçlar
- **lucide-react** — 1600+ tutarlı ikon, React native
- Custom SVG — Özel marka ikonları için

## Kullanım Standartları

### Lucide İkonu
```tsx
import { ArrowRight, Sparkles, Check } from "lucide-react"

<ArrowRight className="h-4 w-4 text-amber-500" />
```

### Boyut Standartları
| Bağlam | Boyut |
|--------|-------|
| Buton içi | `h-4 w-4` (16px) |
| Feature kartı | `h-6 w-6` (24px) |
| Hero/Section başlık | `h-8 w-8` (32px) |
| Dekoratif büyük | `h-12 w-12` (48px) |

## Kalite Kuralları
- Sadece Lucide kullan (tutarlılık için), özel durumda custom SVG
- İkonlar her zaman `className` ile boyutlandır, inline style kullanma
- Renk için `text-*` utility kullan
- strokeWidth default 2, değiştirme
- İkonların yanında mutlaka etiket/text olmalı (aksesibilite)
