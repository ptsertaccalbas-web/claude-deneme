# LUMI Studio Design System — Referans Şablon

> Tüm web sitesi tasarımlarında bu şablon referans alınır.
> Sektöre göre renk/font/içerik değişebilir, yapı sabit kalır.

---

## Renk Paleti
| Rol | Değer | Kullanım |
|-----|-------|----------|
| Zemin | `#0B0B0B` | Body arkaplan |
| Yüzey | `#111` (60% opacity) | Kart arkaplan |
| Vurgu | `#E5C158` (gold) | Buton, badge, ikon, başlık vurgu |
| Metin ana | `#FFFFFF` | Başlık, önemli metin |
| Metin yan | `#9CA3AF` | Açıklama, alt metin |
| Kenarlık | `rgba(255,255,255,0.08)` | Kart ve input border |

---

## Tipografi
| Rol | Font | Boyut (mobil → desktop) |
|-----|------|--------------------------|
| Hero başlık | Playfair Display (serif) | 4xl → 7xl |
| Bölüm başlık | Playfair Display (serif) | 2xl → 4xl |
| Kart başlık | Playfair Display (serif) | base → lg |
| Badge/Etiket | Inter (sans) | 10px uppercase tracking-[0.15em] |
| Gövde metin | Inter (sans) | sm → base |
| Buton | Inter (sans) bold | sm → base |

---

## Bileşen Standartları

### Header
- Fixed `top-0 z-50`, `px-6 py-5`
- Sol: altın nokta (•) + LUMI (uppercase bold tracking-[0.3em]) + alt satır AI MEDIA STUDIO (8px muted)
- Sağ: TR/EN toggle (rounded-full, border-white/[0.08])
- Sağ alt: floating chat butonu (rounded-full bg-gold)

### Hero
- `min-h-screen` flex column center
- Canvas particle efekti (altın tonları, 50-120 particle)
- Başlık: serif, bold, gold vurgulu kelime
- Alt metin: muted, max-w-xl
- CTA: rounded-full, gold bg, black bold text, arrow icon

### Marquee Band
- `border-y border-white/[0.04]` ince üst/alt çizgi
- `animate-marquee` 30s linear infinite
- İçerik: uppercase tracking-[0.2em] text-white/15
- 4x tekrar ile kesintisiz döngü

### Portfolio / Kart Grid
- **Mobil**: tek kolon `space-y-6`
- **Tablet (sm:)**: 2 kolon `grid grid-cols-2 gap-6`
- **Desktop (lg:)**: 3 kolon `grid-cols-3`
- Kartlar: `rounded-2xl border border-white/[0.08]`
- Her kartta özel gradient arkaplan + lens flare + grain doku
- Play ikonu: rounded-full, border-white/[0.12], hover'da gold

### Manifesto / Özellik Kartları
- Başlık: serif, text-center
- Kart grid: mobil 1, tablet 2, desktop 3 kolon
- Kart: `rounded-2xl border border-white/[0.08] bg-[#111]/60`
- Sağ üstte ikon (gold/40 opacity)
- BÖLÜM I/II/III etiketleri: uppercase tracking-[0.15em] gold

### Form Bölümü
- `max-w-lg text-center` ile ortalanmış
- Badge + h2 serif başlık + muted açıklama
- Kilit ikonlu gizlilik notu
- Input: `rounded-xl border border-white/[0.08] bg-white/[0.03]`
- Focus: `border-[#E5C158]/50`
- Label: 10px uppercase tracking-[0.15em] gold
- Submit: `rounded-full` gold bg, full-width

### Footer
- `border-t border-white/[0.06]`
- Mobil: flex-col center, Desktop: flex-row space-between
- Logo (gold nokta + uppercase) + telif hakkı (muted, 10px)

---

## Responsive Kırılım Noktaları
| Breakpoint | Genişlik | Davranış |
|------------|----------|----------|
| Mobil (default) | 320-640px | Tek kolon, full-width buton |
| Tablet (sm:) | 640-768px | 2 kolon grid |
| Tablet geniş (md:) | 768-1024px | Daha büyük yazı, daha geniş padding |
| Desktop (lg:) | 1024px+ | 3 kolon grid, max-w-5xl/6xl |

---

## Altın Kurallar (web-design-master ile uyumlu)
1. Her section badge/başlık ortalanmış (text-center)
2. Border her yerde aynı: `border-white/[0.08]`
3. Vurgu tek renk: gold `#E5C158`
4. Kart köşe: `rounded-2xl`, buton: `rounded-full`
5. Mobil-first: önce dikey stack, sonra grid
6. Tüm sayfa çift dilli (TR/EN) — context provider ile
7. Lenis smooth scroll her zaman aktif
