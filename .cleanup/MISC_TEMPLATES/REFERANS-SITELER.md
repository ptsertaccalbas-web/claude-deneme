# Referans Siteler — LUMI AI Tasarım Kütüphanesi

> Her site ziyaret edilmiş, detaylı analiz edilmiş ve projelerde kullanılmak üzere pattern'lere ayrılmıştır.
> Güncelleme: 27 Temmuz 2026

---

## Kategori 1: 3D Sinematik Derinlik & WebGPU

### 1. Oryzo AI (Lusion)
**URL:** https://oryzo.ai/
**Studio:** Lusion (Bristol)
**Ödül:** Awwwards Site of the Month (Nisan 2026)

**Alınacak Pattern:**
- Tek 3D obje odağı (inertial fizik + atalet hissi)
- 3D→2D geçişi (obje flat UI'a dönüşür)
- Z-ekseni scroll kamera
- Orbit hover etkileşimi
- Satirik/mizahi marka tonu

**Teknik:** Three.js WebGL + GSAP
**Palet:** Siyah + cork kahve (`#8B7355`) + krem
**Öne Çıkan Bölüm:** Hero 3D coaster + scroll ile derinlik

---

### 2. IVRESS (Utsubo)
**URL:** https://brand.ivress.co.jp/
**Studio:** Utsubo
**Ödül:** FWA Site of the Month (Mayis 2026)

**Alınacak Pattern:**
- WebGPU + TSL (Three.js Shading Language) — tek kod iki backend
- Chapter-based storytelling (9 bölüm)
- Kucuk traveler figuru ile kullanici baglantisi
- Isik/golge oyunlari + ambient glow
- Ses tasarimi ile hikaye anlatimi

**Teknik:** Three.js WebGPURenderer + WebGL fallback, TSL shader
**Palet:** Siyah + sicak isik (`#E8D5B7`) + koyu lacivert (`#1A1A2E`)
**Öne Çıkan Bölüm:** Chapter gecisleri, ambient isiklandirma

---

### 3. GQ & AP Extraordinary Lab (Immersive Garden)
**URL:** https://www.gq.com/sponsored/story/the-extraordinary-lab
**Studio:** Immersive Garden
**Ödül:** Awwwards Site of the Day (Mart 2026)

**Alınacak Pattern:**
- Continuous scroll timeline (media player gibi)
- Theater.js ile timeline orkestrasyonu
- Scroll ile kamera + ses + UI senkronizasyonu
- 1:1 gercekci urun render (saat)
- Sound design interaktif entegrasyon

**Teknik:** Three.js + Theater.js + GSAP, Nuxt.js
**Palet:** Siyah + altin (`#C0A060`) + metalik
**Öne Çıkan Bölüm:** Scroll-driven timeline, urun detay render

---

### 4. Hubtown (Unseen Studio)
**URL:** https://hubtown.co.in/
**Studio:** Unseen Studio
**Ödül:** Awwwards Site of the Day (Haziran 2026)

**Alınacak Pattern:**
- **B2B'de 3D prestij** — sıkıcı sektör premium gösterilebilir
- Mouse-reveal interaksiyonu (imlec 3D'yi aydinlatir)
- 3D monolit + su yansimasi
- Value sections (Future → Innovation → ...)
- Loading screen → seamless hero gecisi
- Hashtag/sayi gosterimi (proje adetleri)

**Teknik:** Three.js WebGL + GSAP, Nuxt + Vue
**Palet:** Siyah + neon mavi (`#4A7CFF`) + koyu mavi (`#0A1628`)
**Öne Çıkan Bölüm:** Hero 3D monolit + mouse-reveal, value section siralamasi

---

## Kategori 2: Bento Grid & Premium UI

### 5. Apple
**URL:** https://www.apple.com/

**Alınacak Pattern:**
- Full-bleed hero + clean tipografi hiyerarsisi
- 2'li promo grid + carousel
- Translucent blur navbar
- Hero'da tek urun odağı
- Footer organizasyonu

**Teknik:** Next.js, custom CSS
**Palet:** Beyaz + siyah + mavi (`#0071E3`)
**Öne Çıkan Bölüm:** Hero section, promo kart grid, footer

---

### 6. Linear
**URL:** https://linear.app/

**Alınacak Pattern:**
- UI-as-hero (product arayuzu sayfanin kendisi)
- Karanlik tema + mor aksan
- Numerik section rehberligi (1.0 Intake, 2.0 Plan...)
- Hero cycle text animasyonu
- Code/terminal gorsellestirme
- Changelog timeline

**Teknik:** Next.js + custom UI
**Palet:** Siyah (`#0A0A0B`) + mor (`#5E6AD2`) + gri (`#8A8F98`)
**Öne Çıkan Bölüm:** Hero (UI demo), numerik section sirasi

---

### 7. Notion
**URL:** https://www.notion.so/

**Alınacak Pattern:**
- Customer logos bar (social proof)
- Feature ikon + kisa aciklama grid
- Istatistik row'u (100M+ users)
- Testimonial/quote karti
- Trusted by satiri

**Teknik:** Next.js
**Palet:** Beyaz + kirmizi (`#E16259`) + gri
**Öne Çıkan Bölüm:** Logo bar, feature grid, testimonial section

---

### 8. Lando Norris
**URL:** https://landonorris.com/

**Alınacak Pattern:**
- Full-screen foto immersion
- Hover image swap pattern (kartlar)
- Scroll-based storytelling (foto + kronoloji)
- ALL CAPS section label ("ON TRACK", "OFF TRACK")
- Interaktif scroll ("tap to lock")
- Imza SVG animasyonu

**Teknik:** Webflow + Rive
**Palet:** Siyah + lime yesil (`#C8FF05`) + altin
**Öne Çıkan Bölüm:** Kask Hall of Fame (hover swap), scroll storytelling

---

## Kategori 3: Scroll & Kinetik Tipografi

### 9. OceanX 2025
**URL:** https://2025.oceanx.org/

**Alınacak Pattern:**
- Horizontal scroll timeline (chapter-based)
- Map navigation + parallax map effect
- "Keep Exploring" CTA patterni
- Chapter-based narrative (7 chapter)
- Loading assets state yonetimi

**Teknik:** Lenis + GSAP ScrollTrigger + WebGL
**Palet:** Okyanus mavisi (`#0B1A2E`) + acik mavi (`#4A90D9`)
**Öne Çıkan Bölüm:** Timeline navigation, map chapter gecisleri

---

### 10. Shopify Editions Spring '26
**URL:** https://www.shopify.com/editions/spring2026

**Alınacak Pattern:**
- Sticky anchor navigation (cok bolumlu siteler icin)
- Feature kart patterni (gorsel + baslik + aciklama + CTA)
- Video poster hero (thumbnail hover/click)
- Loading state + notification signup
- Sag ust kategori bazli scroll-to navigation

**Teknik:** Next.js + custom
**Palet:** Siyah + mor (`#7C3AED`) + yesil (`#22C55E`)
**Öne Çıkan Bölüm:** Sticky nav, feature grid, loading state

---

### 11. Sleep Well Creative
**URL:** https://sleep-well-creatives.com/

**Alınacak Pattern:**
- **Kinetik tipografi** (SplitText, harf/kelime stagger)
- Texture morphing gecisler (tunnel → floor → lamp)
- Z-ekseni 3D kamera hareketi
- Audio entegrasyonu (ambient + voiceover)
- Scroll-driven narrative (7 bolum, farkli scroll mekanigi her bolumde)
- Progresif disclosure (01-07 bolum numaralari)
- Data viz (heart rate, sleep cycle)

**Teknik:** Webflow + GSAP + Three.js
**Palet:** Siyah + altin (`#E8D5B7`) + koyu marine (`#1A1A2E`)
**Öne Çıkan Bölüm:** SplitText hero, texture morph gecis, Z-camera

---

## Kategori 4: Oyunlaştırma & Kesif

### 12. Bruno Simon Portfolio
**URL:** https://bruno-simon.com/

**Alınacak Pattern:**
- 3D fizik tabanli portfolyo (Cannon.js)
- Matcap malzeme ile performansli 3D
- Basari sistemi (achievements)
- Multiplayer (Whisper mesaj, liderlik tablosu)
- Gamepad destegi
- Tüm UI 3D dunya icinde

**Teknik:** Three.js + Cannon.js + TSL, WebGPU
**Palet:** Sicak portakal + mavi + yesil
**Öne Çıkan Bölüm:** 3D dunya, fizik motoru, achievements

---

### 13. Messenger — Abeto
**URL:** https://messenger.abeto.co/

**Alınacak Pattern:**
- Kucuk gezegen konsepti (kesif dunyasi)
- Cel-shaded (cizgi film) gorsel stil
- WebSocket multiplayer
- Emoji iletisimi
- UI tamamen WebGL icinde (HTML overlay yok)
- WASM ile GPU glyph rendering

**Teknik:** Three.js + WebSocket + WASM
**Palet:** Pastel/suluboya (acik mavi, yesil, pembe)
**Öne Çıkan Bölüm:** Gezegen kesifi, multiplayer etkilesim

---

### 14. The Deep Sea — Neal.fun
**URL:** https://neal.fun/deep-sea/

**Alınacak Pattern:**
- **Scroll = mekanik** (sadece scroll ile kesif)
- Gradient gecisle derinlik hissi (mavi → siyah)
- Scroll mesafesi = okyanus derinligi (11,000m)
- Basit SVG/illustrasyon + guclu hikaye
- Kilometre taslari ("Everest yuksekligine scroll ettin")
- Sadece HTML/CSS/JS — 3D gerekmez

**Teknik:** Saf HTML/CSS/JS (3D yok)
**Palet:** Acik mavi → koyu mavi → siyah gradient
**Öne Çıkan Bölüm:** Scroll-driven derinlik, canli karsilastirmalari

---

### 15. Lacoste Ace Breaker
**URL:** https://members-play.lacoste.com/ace-breaker-rg/gb/en/

**Alınacak Pattern:**
- Marka + arcade oyun birlestirmesi
- Gercek odullerle oyunlastirma (bilet, polo)
- Tenis temali brick-breaker
- Vue.js + Three.js entegrasyonu
- Power-up'lar (multi-ball, laser, dev top)
- Liderlik tablosu

**Teknik:** Three.js + Vue.js
**Palet:** Lacoste yesili + beyaz + toprak kahverengisi
**Öne Çıkan Bölüm:** Oyun mekanigi, marka entegrasyonu

---

## Proje Tipi × Referans Eşleştirme

| Proje Tipi | Birincil Referans | Ikincil Referans |
|------------|-------------------|------------------|
| Endüstriyel B2B (N-Pak, Çorlu) | Hubtown | Oryzo |
| Premium brand (LUMI AI) | IVRESS | Sleep Well |
| SaaS landing | Linear | Notion |
| Portfolyo | Lando Norris | Bruno Simon |
| E-ticaret | Apple | Oryzo |
| Scroll story | Sleep Well | OceanX |
| Çok bölümlü site | Shopify Editions | GQ Lab |
| Oyun/etkilesim | Bruno Simon | Lacoste |
| Egitim/kesif | Deep Sea | OceanX |

---

## Hizli Ziyaret Listesi

```
oryzo.ai                   — 3D inertial + Z-camera
brand.ivress.co.jp         — WebGPU + TSL + chapter story
gq.com/sponsored/story/... — Timeline + Theater.js
hubtown.co.in              — B2B 3D monolit + mouse-reveal
apple.com                  — Full-bleed hero + grid
linear.app                 — UI-as-hero + dark theme
notion.so                  — Logo bar + feature grid
landonorris.com            — Hover swap + scroll story
2025.oceanx.org            — Horizontal timeline + map
shopify.com/editions/...   — Sticky nav + feature grid
sleep-well-creatives.com   — Kinetik tipografi + Z-camera
bruno-simon.com            — 3D fizik + achievements
messenger.abeto.co         — Gezegen + multiplayer
neal.fun/deep-sea          — Scroll = mekanik
members-play.lacoste.com   — Marka + arcade
```
