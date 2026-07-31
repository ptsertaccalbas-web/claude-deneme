# 🏭 N-PAK Modeli — Endüstriyel Web Sitesi Dönüşüm Şablonu

> Hedef: Sıradan bir B2B sanayi sitesini, LUMI AI "Karanlık, Sinematik, Premium" vizyonuyla dönüştürmek.
> Türetildiği proje: N-PAK Ambalaj (n-pak-ambalaj.vercel.app)

---

## Aşama 1: Ön Hazırlık

```
□ Müşterinin mevcut sitesini tara (varsa)
□ Gerçek ürün fotolarını, videolarını, kataloglarını al
□ Sektör listesini çıkar (müşteri hangi sektörlere hizmet veriyor)
□ Referans pattern'leri seç (B2B endüstriyel için varsayılan: Hubtown + Oryzo + Linear)
```

**Varsayılan pattern'ler:**
- 3D obje (hubtown tarzı monolit/ürün geometrisi)
- Değer kartları (Hubtown)
- UI-as-Hero mockup (Linear)
- SplitText kinetik tipografi (Sleep Well)
- Sticky feature grid (Shopify Editions)
- Chapter storytelling (Sleep Well)
- Hover image swap (Lando Norris)

---

## Aşama 2: Marka Tokens & Tasarım Sistemi

### Varsayılan Renk Paleti (Endüstriyel)
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

### Font Pairing
- **Display:** Oswald (700-800) — endüstriyel, güçlü
- **Body:** Inter (400-600) — okunabilir, teknik
- Alternatif: Bebas Neue + Inter (daha agresif)

### Zorunlu İmza Bileşenleri
- [ ] Noise overlay (`body::after` SVG fractal noise, `mix-blend-mode: overlay`, `opacity: 0.035`)
- [ ] Ambient glow (fixed radial gradient, asla floating orb değil)
- [ ] Custom cursor (nokta + halka, opsiyonel)
- [ ] Design token'lar (`@theme inline`, direkt renk class'ı yasak)
- [ ] ALL CAPS tracking (+0.04em ila +0.08em)

---

## Aşama 3: Layout Yapısı (Sıralı)

```
1.  Hero (3D obje + video background + SplitText)
    ├── Video arkaplan (müşterinin üretim videosu, opacity 0.2)
    ├── 3D ürün monolit (Three.js, mouse-reveal ışık)
    ├── SplitText kinetik başlık (char stagger, rotateX entry)
    ├── UI mockup panel (Linear tarzı katalog/numbers preview)
    ├── CTA butonları (mikro-interaction scale)
    └── Scroll progress bar (fixed top, accent renk)

2.  Marquee (yatay kayan terimler, GSAP loop)

3.  Stats (3 sütun: kuruluş yılı, tecrübe, sektör sayısı)

4.  Values (Hubtown tarzı değer kartları: kalite/uzmanlık/güven/hız vb.)

5.  Chapter Bridge (01/N — tam genişlik bölüm ayracı, büyük numara)

6.  Products (Sticky feature grid)
    ├── Sticky sol menü (sayfa içi linkler)
    └── Scroll sağ içerik (hover'da ürün fotoğrafı)

7.  Chapter Bridge (02/N)

8.  Flagship Section (distribütör/ana ürün vurgusu)

9.  Process/Süreç (4 adım)

10. Sectors (sektör grid'i, 4-8 kart, gradient overlay)

11. Brands (hover image swap)

12. About (3 sütun kurumsal değer)

13. Quick Links (katalog/kariyer/teklif)

14. Chapter Bridge (N/N)

15. Contact (form + iletişim bilgileri)

16. Footer
```

---

## Aşama 4: Animasyon Katmanı

| Element | Animasyon | Teknik |
|---------|-----------|--------|
| Hero başlık | Kinetik tipografi | GSAP SplitText chars, stagger 0.04, rotateX:-90 → 0 |
| Hero mockup | Scale + fade-in | GSAP fromTo scale 0.85, delay 0.8 |
| Section girişi | Fade-up | CSS `opacity-0 translate-y-8` + GSAP ScrollTrigger `to()` |
| Kartlar | Stagger | GSAP stagger 0.06, translate-y-30 → 0 |
| Marquee | Continuous loop | GSAP `to({x: -scrollW/2, duration:40, repeat:-1})` |
| Butonlar | Hover/active scale | CSS `micro-btn` class: hover 1.03, active 0.97 |
| Brands | Hover image | CSS opacity transition, arkaplan fotoğrafı |
| Sectors | Hover zoom | CSS scale(1.05) + gradient overlay |

---

## Aşama 5: Asset Entegrasyonu

- Müşterinin mevcut sitesinden tüm fotoğrafları çek (product images, banners, sektör fotoları)
- Unsplash/Pexels placeholder'ları sadece gerçek foto yokken kullan
- Video varsa → hero background (opaklık düşük, gradient overlay ile)
- Katalog PDF varsa → quick links'e ekle
- Varsayılan `img` yoksa: gradient + pattern ile geçici doldur

---

## Aşama 6: Build & Deploy

```
□ npm run build (hatasız)
□ npx vercel --prod --yes
□ Custom domain varsa DNS kontrol (Namecheap → Cloudflare → Vercel)
```

---

## Tekrar Kullanılabilir Component'ler

Bu şablondaki tüm component'ler packages/shared/ altında toplanmıştır:
- `magnetic.tsx` → cursor hover effect
- `scroll-camera.tsx` → Three.js Z-ekseni kamera
- `webgpu.tsx` → WebGPU detection badge
- `shaders.ts` → film grain + liquid transition GLSL

---

## Notlar

- **İterasyon sırası:** Önce hızlı kazanımlar (kinetik tipografi, değer kartları, hover swap), sonra yapısal değişiklikler (sticky grid, chapter bridge, progress bar)
- **Her deploy öncesi build kontrolü zorunlu**
- **Müşteri assets** her zaman placeholder'dan önce gelir
- **Ponytail modu:** Tasarım aşamasında `lite`, build/deploy'da `full`
