# SİTE OLUŞTURMA OTOMASYON KURALLARI

> Bu dosya opencode.json'da instructions olarak tanımlıdır.
> Her oturumda otomatik yüklenir. Değiştirme: sadece kullanıcı onayıyla.

---

## TETİKLEYİCİ KOMUTLAR

Şu kalıplardan biri geldiğinde **otomatik olarak site oluşturma süreci başlatılır**:

| Kalıp | Örnek |
|-------|-------|
| "[firma] sitesi yap" | "N-Pak sitesi yap" |
| "[firma] için site" | "Çorlu İlgi Diş için site" |
| "[firmaya] web sitesi" | "şu firmaya web sitesi" |
| "/site [firma]" | "/site n-pak" |
| "sıradaki site" | (bir sonraki lead) |

**Tetikleyici alındığında yapılacaklar:**
1. Kullanıcıya sormadan süreci başlat
2. Sadece aşağıdaki durumlarda soru sor:
   - Sektör/firma bilgisi eksikse ("Bu firma hangi sektörde?")
   - Stratejik karar gerekiyorsa ("Tek sayfa mı çok sayfa mı?")
   - Referans sitesi isteniyorsa ("Şu site gibi olsun istiyor musun?")
   - Hata 3 denemede çözülmezse
3. Soru dışındaki tüm adımları bildirim yapmadan otomatik yürüt

---

## SÜREÇ AKIŞI (Sıralı — Task ile paralel çalıştır)

### Aşama 0: Ön Araştırma
- **agent-browser** veya **browser-use** yüklenir
- Sektördeki en iyi 3 site taranır
- Firma mevcut web varlığı varsa incelenir
- Çıktı: referans siteleri + sektör notları

### Aşama 1: Strateji Belirleme
- **brainstorming** yüklenir
- Eksik bilgi varsa: "Bu firmanın sektörü ne, kaç sayfa, hedef ne?"
- Çıktı: spec notları

### Aşama 2: Brand Tokens
- **design-system** + **type-artist** (paralel yüklenir)
- tokens.json yazılır
- Font pairing seçilir

### Aşama 3: Layout & Kod
- **web-design-master** yüklenir → layout kararları
- **frontend-master** yüklenir → kod yazılır

### Aşama 4: Animasyon
- **animation-master** yüklenir
- Önce Lenis + GSAP ScrollTrigger senkronizasyonu kurulur (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add()`)
- **ZORUNLU PATERNLER:**
  - Scroll-tetikli section reveal: her section `data-reveal` wrapper + CSS initial state (`opacity-0 translate-y-6`) + GSAP `to()` scrollTrigger
  - Canvas partikülleri (hero varsa): değişken boyut (0.5-3px), ±0.5 hız, bağlantı çizgileri (~120px mesafe), mobilde daha az partikül
  - Marquee: GSAP `to()` continuous loop (CSS `@keyframes` DEĞİL), hover'da pause, `scrollWidth/4` ile seamless loop
  - SplitText: sadece varsa (Club GSAP bonus), yoksa GSAP fade-up yeterli
- `gsap.to()` + CSS initial state (`gsap.from()` DEĞİL)
- Mobilde ağır animasyonları kısıtla (canvas partikül sayısı, ScrollTrigger `matchMedia`)

### Aşama 5: Design Token Migration (varsa)
- **Önceki token'ları kontrol et:** Herhangi bir component'te direkt renk class'ı kalmış mı? (`text-white`, `bg-[#E5C158]`, `border-white/[0.08]`)
- Kalmışsa: `text-foreground`, `bg-accent`, `border-border` ile değiştir
- CSS variable uyumsuzluğu var mı kontrol et (studio layout gibi farklı `--font-sans` vs `--font-sans-custom`)
- Varsa: tutarlı hale getir

### Aşama 6: Kalite Kontrol
- **web-design-master** → anti-pattern taraması
- WEBSITE-TASARIM-REHBERI.md Bölüm 1 Aşama 7 checklist'i uygulanır
- Hata bulunursa düzeltilir, kullanıcıya sadece "Şu hata düzeltildi" denir

### Aşama 7: Build & Deploy
- **runtime-agent** yüklenir
- `npm run build` → hata varsa düzelt → Vercel deploy

### Bitiş
- Kullanıcıya tek satır: "✅ [Firma] sitesi hazır. URL: [url]"
- Eğer herhangi bir hata 3 denemede çözülmezse not edilir ve bitişte bildirilir

---

## MÜDAHALE KURALLARI

- **Kullanıcı araya girerse:** Mevcut aşamayı bitir, kullanıcının dediğini yap, sonra kaldığın yerden devam et
- **"Atla" derse:** O aşamayı geç
- **"Şunu değiştir" derse:** Değişikliği yap, önceki adımlarda değişmesi gereken varsa geri dön
- **"Dur" derse:** Bekle, yeni talimat gelene kadar bekle
- **"Devam et" derse:** Kaldığın yerden devam et

---

## REFERANSLAR

- Süreç detayı: `WEBSITE-TASARIM-REHBERI.md`
- Tipografi kuralları: `WEBSITE-TASARIM-REHBERI.md` Bölüm 2
- Skill görev dağılımı: `WEBSITE-TASARIM-REHBERI.md` Bölüm 3
- Marka tokens: `brands/[firma]/tokens.json`
- Önceki siteler:
  - Çorlu İlgi Diş: `corlu-ilgi-dis/`
  - N-Pak: `n-pak-ambalaj/`
