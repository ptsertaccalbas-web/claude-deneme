# 🔴 KUSURSUZ WEB SİTESİ TASARIM SİSTEMİ

> 2026 — B2B/endüstriyel odaklı. Skills ağımızla uyumlu.
> Kaynak: v0 system prompt, web-design-master, type-artist, animation-master, design-system, frontend-master + sektör araştırması.

---

## BÖLÜM 0: KRİTİK HATALAR (GEÇMİŞTEKİ)

Önceki rehberde şu hatalar tespit edildi ve düzeltildi:

| # | Hata | Düzeltme |
|---|------|----------|
| 1 | ALL CAPS section etiketleri ("ÜRÜNLERİMİZ") | anti-pattern: hiç etiket kullanma veya küçük harf `hizmetler` |
| 2 | `gsap.from()` kullanımı | `gsap.to()` + CSS initial state (`opacity-0 translate-y-8`) |
| 3 | Simetrik hero (her şey ortalanmış) | Asimetrik layout, tek taraflı başlık |
| 4 | Tüm section'lar aynı `py-20 sm:py-28` | Her section farklı py: 20, 24, 28, 32 |
| 5 | Tüm kartlar eşit boyutta | Bazıları geniş, bazıları dar (masonry/heterojen) |
| 6 | `<a href="#section">` ile scroll | Lenis `scrollTo()` kullan |
| 7 | `text-white`, `bg-primary` gibi direkt renk | Design token: `text-foreground`, `bg-background` |
| 8 | Oswald H1'lerde weight 600 | Display heading'lerde 700-800 |
| 9 | ALL CAPS tracking eksik | +0.04em ila +0.08em |
| 10 | Section label "Hizmetlerimiz" kalıbı | Label kullanma veya farklı format dene |
| 11 | Oswald ALL CAPS'te letter-spacing yok | Eklenecek |
| 12 | Noise overlay yok | Her zaman ekle |
| 13 | SplitText yok (hero) | SplitText bonus plugin gerektirir, yoksa GSAP fade-up yeterli |
| 14 | `text-wrap: balance` yok | heading'lere ekle |
| 15 | hero section simsiyah (bg-primary) | Ambient glow + gradient bg |

---

## ⚠️ ÖNEMLİ: Ponytail Modu Yönetimi

Bu rehber kalite odaklıdır. Ponytail aktifken (full mod) "en kısa yol" dayatması tasarım kalitesini düşürür.
**Tasarım işine başlamadan önce ponytail'i `lite` seviyesine düşür veya kapat.** (`/ponytail lite`)
Ponytail sadece build/deploy aşamasında tekrar aktifleştirilebilir.

---

## BÖLÜM 1: TASARIM SÜRECİ — ROLE PLAY

### Aşama 0: Ön Araştırma (agent-browser / browser-use skill)

- [ ] **Rakip analizi:** Benzer firmaların siteleri taranıp referans olarak kaydedildi mi?
- [ ] **Firma OSINT:** Hedef firmanın mevcut web varlığı (varsa) incelendi mi?
- [ ] **3 referans sitesi** toplandı mı? (vibe/layout/renk/font seviyesinde)
- [ ] **Sektör trendi:** Sektördeki en iyi 3 site belirlendi mi? (design-to-code için girdi)

### Aşama 1: Keşif & Strateji (brainstorming skill)

- [ ] **Hedef net mi?** (satış/başvuru/bilgilendirme/portfolyo)
- [ ] **3 referans sitesi** toplandı mı? (vibe/layout/renk/font seviyesinde)
- [ ] **Sayfa listesi** çıkarıldı mı?
- [ ] **Sektör + marka kişiliği** belirlendi mi? (endüstriyel/teknoloji/lüks/yaratıcı)

### Aşama 2: Vibe Analizi & Marka Metaforu (type-artist + design-system skill)

- [ ] **Sektör eşleştirmesi:** doğru font pairing tablosundan seç
- [ ] **Marka metaforu:** 1 cümle (örn: "çelik kasa — sağlam, sade, işlevsel")
- [ ] **Renk paleti:** primary + 2-3 nötr + 1 accent (toplam ≤5)

### Aşama 3: Tasarım Sistemi Tokenları (design-system skill)

- [ ] `brands/[firma]/tokens.json` yazıldı mı?
- [ ] Renk kontrastı WCAG AA geçiyor mu? (body 4.5:1)
- [ ] Font pairing doğru mu? (max 2 aile)
- [ ] Modular scale belirlendi mi? (Major Third 1.25 veya Perfect Fourth 1.333)
- [ ] Line-height: body 1.5-1.7, heading 1.05-1.2
- [ ] Section spacing: en az 5rem (80px), her section farklı

### Aşama 4: Layout & Component Seçimi (web-design-master + animation-master)

- [ ] LenisProvider context pattern (GSAP ScrollTrigger ile senkronize: `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add()`)
- [ ] GSAP hero fade-up animasyonu (CSS initial state + `gsap.to()`, SplitText sadece bonus plugin varsa)
- [ ] Canvas partikül animasyonu (hero'da): değişken boyut (0.5-3px), bağlantı çizgileri (120px threshold), mobilde azalt
- [ ] Marquee: GSAP continuous loop `gsap.to({ x: -setW, duration: 40, repeat: -1 })`, hover pause, CSS `@keyframes` DEĞİL
- [ ] Scroll-tetikli section reveal: `data-reveal` attribute + CSS `translate-y-6 opacity-0` initial state + gsap scrollTrigger
- [ ] Stagger scroll animasyonları (GSAP `to()` ile, asla `gsap.from()`)
- [ ] Asimetrik layout (hero sağa/sola yaslı, section'lar farklı genişlik)
- [ ] Ambient glow (hafif, rahatsız etmeyen)
- [ ] Noise overlay her zaman
- [ ] Custom cursor (opsiyonel)
- [ ] Section py varyasyonları (20/24/28/32 asla aynı değil)

### Aşama 5: Kod Yazma (frontend-master + web-design-master)

- [ ] Design token'lar `@theme inline` ile tanımlandı mı? (en az: background, foreground, muted, border, accent, accent-hover, surface)
- [ ] `next/font` ile self-host + weight'ler belirtilmiş mi? (`weight: ["400", "500", "600", "700"]`)
- [ ] CSS variable adları tüm layout'lar arasında tutarlı mı? (main layout = studio layout)
- [ ] `<html>` tag'inde `bg-background text-foreground` var mı? (direkt renk yok)
- [ ] `font-display: swap`, `size-adjust` ile CLS koruması
- [ ] `clamp()` ile fluid typography
- [ ] `rem` birimleri (px sadece border-radius/shadow'da)
- [ ] CTA butonları `lenis.scrollTo()` ile
- [ ] `text-wrap: balance` heading'lerde
- [ ] `text-pretty` paragraflarda
- [ ] ALL CAPS text'lerde `tracking-wider` veya `tracking-widest`
- [ ] Tüm component'lerde direkt renk class'ı yok mu? (`text-white`, `bg-[#xxx]`, `border-white/[0.xx]` kontrolü)

### Aşama 6: Animasyon Katmanı (animation-master + type-artist)

- [ ] Lenis smooth scroll + GSAP ScrollTrigger sync (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add()`)
- [ ] Lenis config'te `gsap.ticker.lagSmoothing(0)` ile ticker uyumu
- [ ] GSAP ScrollTrigger ile section reveal (her section `data-reveal` wrapper + CSS initial state + `gsap.to()` scrollTrigger)
- [ ] Canvas partikül animasyonu (hero varsa): değişken boyut, bağlantı çizgileri, mobil performans
- [ ] Marquee GSAP loop: `gsap.to({ x: -setW, duration: 40, repeat: -1 })`, hover pause, `will-change-transform`
- [ ] GSAP hero fade-up: CSS `translate-y-8 opacity-0` + `gsap.to()` (SplitText sadece bonus plugin varsa)
- [ ] Stagger ile kart açılışları (`translate-y-8 opacity-0` + `stagger: 0.08`)
- [ ] `useGSAP()` hook (useEffect değil)
- [ ] `gsap.to()` + CSS initial state (`gsap.from()` DEĞİL)

### Aşama 7: Kalite Kontrol (web-design-master checklist)

#### 🔴 Kesinlikle Yasak (AI İmzası)
- [ ] Floating orb / gradient circle / blur blob? → ❌
- [ ] Opposing temperature gradient? (pembe→yeşil) → ❌
- [ ] Glassmorphism / backdrop-blur? → ❌
- [ ] Emoji as icon? → ❌ (Lucide kullan)
- [ ] Direkt renk class'ı? (`text-white`, `bg-black`) → ❌ (token kullan)
- [ ] `gsap.from()`? → ❌ (`gsap.to()` + CSS initial state)
- [ ] ALL CAPS section başlığı? → ❌ (küçük harf veya hiç etiket yok)
- [ ] 3+ font ailesi? → ❌ (max 2)
- [ ] Simetrik hero (her şey ortalanmış)? → ❌ (asimetrik zorunlu)
- [ ] `<a href="#section">` ile scroll? → ❌ (Lenis scrollTo)

#### 🟢 Zorunlu
- [ ] Noise overlay
- [ ] Lenis smooth scroll + GSAP ScrollTrigger sync
- [ ] GSAP ScrollTrigger section reveal (`data-reveal` + fade-up)
- [ ] GSAP marquee (CSS `@keyframes` DEĞİL)
- [ ] Design token'lar (direct class yok: `text-white`, `bg-[#xxx]`, `border-white/[0.xx]`)
- [ ] CSS variable tutarlılığı (tüm layout'lar aynı variable adlarını kullanıyor)
- [ ] `next/font` ile self-host + weight'ler belirtilmiş (`weight: [...]`)
- [ ] `font-display: swap`
- [ ] `clamp()` fluid heading
- [ ] `text-wrap: balance`
- [ ] `text-pretty`
- [ ] ALL CAPS tracking
- [ ] Build hatasız (`npm run build`)

### Aşama 8: Deploy (runtime-agent)

- [ ] Vercel deploy
- [ ] Domain kontrol (custom domain var mı?)
- [ ] Production URL çalışıyor mu?

---

## BÖLÜM 2: TİPOGRAFİ HİYERARŞİSİ

### Modular Scale (Major Third 1.25 — Önerilen)

```
Step | Desktop (rem) | Desktop (px) | Kullanım
-----|---------------|--------------|---------
H1   | 3.75          | 60           | Hero başlık
H2   | 2.5           | 40           | Section başlık
H3   | 1.5           | 24           | Kart başlık
H4   | 1.25          | 20           | Alt başlık
Body | 1-1.125       | 16-18        | Ana metin
Small| 0.875         | 14           | İkincil metin
```

**CSS (fluid + responsive):** `clamp(min, preferred, max)` ile her heading tüm ekranlarda doğru boyutta.

```css
h1 { font-size: clamp(2.5rem, 3vw + 1rem, 3.75rem); line-height: 1.05; font-weight: 700; text-wrap: balance; }
h2 { font-size: clamp(1.75rem, 2vw + 0.5rem, 2.5rem); line-height: 1.1; font-weight: 600; text-wrap: balance; }
h3 { font-size: clamp(1.25rem, 1vw + 0.25rem, 1.5rem); line-height: 1.2; font-weight: 600; }
h4 { font-size: clamp(1.125rem, 0.5vw + 0.5rem, 1.25rem); line-height: 1.3; font-weight: 600; }
p  { font-size: clamp(1rem, 0.5vw + 0.5rem, 1.125rem); line-height: 1.6; text-pretty; }
small { font-size: 0.875rem; line-height: 1.5; }
```

### Font Pairing (Sektör × Mood)

| Sektör | Display | Body | Mood |
|--------|---------|------|------|
| Endüstriyel / İmalat | **Oswald** (700) | **Inter** (400) | Güçlü, teknik, sağlam |
| Endüstriyel / Premium | **Bebas Neue** (700) | **Inter** (400) | Keskin, modern, agresif |
| Hukuk / Finans / Danışmanlık | **Playfair Display** (700) | **Inter** (400) | Prestijli, güvenilir |
| Teknoloji / SaaS | **Inter** (700) | **Inter** (400) | Temiz, modern, hızlı |
| Sağlık / Medikal | **DM Serif Display** (400) | **DM Sans** (400) | Şefkatli, temiz, güven |
| Yaratıcı / Ajans | **Instrument Serif** (400) | **Inter** (400) | Editoriyal, taze, özgün |
| Minimal / Lüks | **Cormorant Garamond** (600) | **Inter** (300) | Zarif, ince, premium |
| E-ticaret / Moda | **Playfair Display** (600) | **Lato** (300) | Şık, akıcı |

### Oswald Kullanım Kılavuzu

```
SADECE heading'lerde kullan. Body'de ASLA.

  H1:  weight 700-800,  tracking -0.02em,  line-height 1.05
  H2:  weight 600-700,  tracking -0.01em,  line-height 1.1
  H3:  weight 600,      tracking 0,        line-height 1.2
  ALL CAPS:              tracking +0.04em
```

### Görsel Hiyerarşi (H1→H2→H3→Body→Small)

Hiyerarşi sadece boyut değil, aynı zamanda:
- **Weight** (700→600→400)
- **Renk** (foreground→muted→border)
- **Spacing** (üst boşluk heading'lerde büyük)
- **Whitespace** (body'de bol line-height)

---

## BÖLÜM 3: AJAN/SKILL GÖREV DAĞILIMI

### Skill Yükleme Kuralı

Her aşamada **sadece o aşamanın skill'ini yükle** (`skill` tool'u ile). İş bitince context'te kalsın ama yeni skill yükle. Tümünü birden yükleme — gereksiz context israfı.

### Görev Tablosu

| # | Aşama | Yapacak Skill | Ne Yapacak | Paralel? |
|-------|-------|--------------|------------|----------|
| 0 | Ön araştırma (rakip/referans) | **agent-browser** veya **browser-use** | Sektördeki en iyi 3 siteyi tara, referans olarak kaydet | ❌ sıralı |
| 1 | Müşteri görüşmesi, ihtiyaç analizi | **brainstorming** | Soru sor, spec çıkar, onay al | ❌ sıralı |
| 2 | Vibe analizi + renk paleti | **design-system** | Sektöre uygun renk paleti + token yapısı | ✅ paralel |
| 2b | Font pairing kararı | **type-artist** | Sektör/font eşleştirmesi, weight/scale kararları | ✅ paralel |
| 3 | Tasarım token'ları JSON/CSS | **design-system** | `brands/[firma]/tokens.json` yaz, `@theme inline` için token mapping | ❌ sıralı |
| 4 | Layout + komponent seçimi | **web-design-master** | Lenis+GSAP sync, noise, glow, section sırası, asimetri, data-reveal pattern | ❌ sıralı |
| 5 | Kod yazma (Next.js + Tailwind v4) | **frontend-master** | Token'ları `@theme inline`'a dönüştür, sayfayı yaz, direkt renk class'ı KULLANMA | ❌ sıralı |
| 5b | Design token migration (mevcut varsa) | **frontend-master** | Eski kodda kalan direkt renkleri token'la değiştir, CSS variable tutarlılığını kontrol et | ❌ sıralı |
| 6 | Animasyon (GSAP + Lenis + ScrollTrigger) | **animation-master** | ScrollTrigger section reveal, marquee GSAP loop, canvas partiküller, stagger | ❌ sıralı |
| 7 | Kalite kontrol | **web-design-master** | Anti-pattern taraması, token kontrolü, checklist, direkt renk taraması | ❌ sıralı |
| 8 | Build + Deploy | **runtime-agent** | Build hatası varsa düzelt-deploy döngüsü | ❌ sıralı |
| — | **Opsiyonel:** Referans siteden esinlenme | **design-to-code** | Referans site yapısını analiz et, şablon çıkar | Aşama 4'te |

### Kim Ne Zaman Devreye Girer?

```
[Kullanıcı: "şu firma için site yap"]
  → agent-browser         (rakip/referans tara)
  → brainstorming         (spec çıkar, onay al)
  → design-system         (tokens.json yaz)    ─┐  paralel
  → type-artist           (font kararları)      ─┘
  → web-design-master     (layout + anti-pattern, data-reveal, Lenis+GSAP)
  → frontend-master       (kodu yaz + token migration varsa)
  → animation-master      (ScrollTrigger reveal + marquee GSAP + canvas + stagger)
  → web-design-master     (kalite kontrol — anti-pattern + direkt renk taraması)
  → runtime-agent         (build + deploy)
  → bana rapor ver
```

### Görev Çakışması Uyarısı

| Çakışma | Çözüm |
|---------|-------|
| SplitText: **animation-master** "ben yaparım" vs **type-artist** "ben yaparım" | **animation-master** yapar. type-artist font pairing + variable font kararlarında kalır, animasyon kodlamaz. SplitText bonus plugin gerektirir, yoksa GSAP fade-up yeterli. |
| gsap.from() vs gsap.to(): **animation-master** skill'inde `gsap.from()` örnekleri var | **web-design-master** kuralı üstün gelir: `gsap.to()` + CSS initial state kullan. animation-master örneklerindeki `.from()`'ları `.to()`'ya çevir. |
| Marquee: CSS `@keyframes` vs GSAP `to()` | **Her zaman GSAP** `to()` kullan. CSS marquee jank yapar, hover pause imkansız. |
| Ponytail "kısa yol" vs kalite: çelişki | Tasarım aşamalarında ponytail `lite` seviyesine düşürülür veya kapatılır. Sadece build/deploy'da tekrar full'e alınabilir. |

---

## BÖLÜM 4: OTONOM ÇALIŞMA

Bir komut yok. **Bana ne yapılacağını söyle, ben Bölüm 3'teki sırayı otomatik işletirim.**

Örnek diyalog akışı:

```
Sen: "N-Pak sitesini yeniden yap"
→ agent-browser yüklenir → referans siteler taranır → bana özet sunar
→ brainstorming yüklenir → sana sorular sorar (onay almadan kod yazmaz)
→ design-system + type-artist yüklenir → tokens.json yazılır
→ web-design-master yüklenir → layout + anti-pattern seçimi
→ frontend-master yüklenir → kod yazılır
→ animation-master yüklenir → animasyon eklenir
→ web-design-master (tekrar) → kalite kontrol
→ runtime-agent yüklenir → build + deploy
→ "Hazır, url: ..."
```

**Müdahale noktaları:**
- Her aşamada sana sorabilirim (onay almak için)
- "Devam et" dersen atlarım
- "Şu aşamayı atla" dersen geçerim
- "Şunu değiştir" dersen düzeltirim**
