---
name: site-otomasyon
description: LUMI AI Media proje-ozel talimat (kaynak: .opencode/skill/site-otomasyon-kurallari.md)
---

> Kaynak: .opencode/skill/site-otomasyon-kurallari.md -- opencode ile senkron tutulur, biri guncellenince digeri de guncellenmeli.

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

**Tetikleyici alındığında yapılacaklar (bkz. AGENTS.md "SORU SORMA KURALI" — nihai kural):**
1. Kullanıcıya sormadan süreci başlat, sonuna kadar tamamla, sonra rapor ver
2. Soru SADECE AGENTS.md'deki 2 durumda sorulur:
   - Firma bilgisi gerçekten eksikse (ör. sektör hiç belirtilmemiş, tahmin edilemiyor)
   - Yıkıcı/geri dönüşü olmayan bir işlem söz konusuysa
3. "Tek sayfa mı çok sayfa mı", "referans site" gibi kararlar ARTIK SORULMAZ —
   sektöre/firma büyüklüğüne göre kendi kararını ver, raporda belirt
4. Hata 3 denemede çözülmezse dur, kullanıcıya bildir (bu bir soru değil, bir durdurma bildirimidir)
5. Yukarıdakiler dışındaki tüm adımları bildirim yapmadan otomatik yürüt

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
- **ÖNCE:** `tasarim-rehberi.md` → "Müşteri Sitesi İçin Türetme Süreci" — 4 soruyu
  cevapla (sektör, mevcut marka, rakipler, hedef kitle), palet SIFIRDAN türet.
  LUMI'nin kendi paletini (#0A0A0A + #E5C158) KOPYALAMA — bu sadece LUMI'nin
  kendi sitesi içindir.
- tokens.json yazılır (bu projeye özel renk seti)
- Font pairing seçilir (sektöre göre, tasarim-rehberi tablosundan)

### Aşama 3: Layout & Kod
- **web-design-master** yüklenir → layout kararları
  - `tasarim-rehberi.md` "Proje Tipi → Pattern Eşleştirme" tablosuna bak — bu
    projenin tipine uyan sırayı al, tek bir sabit şablonu kopyalama
  - Sektöre uygun referans site pattern'ini seç (Hubtown/IVRESS/Linear vs.)
- **frontend-master** yüklenir → kod yazılır

### Aşama 4: Animasyon
- **animation-master** yüklenir
- Önce Lenis + GSAP ScrollTrigger senkronizasyonu kurulur (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add()`)
- **Temel teknik (bunlar sabit — nasıl yapıldığı, ne kullanıldığı değil):**
  - Scroll-tetikli section reveal: her section `data-reveal` wrapper + CSS initial state (`opacity-0 translate-y-6`) + GSAP `to()` scrollTrigger
  - Marquee kullanılacaksa: GSAP `to()` continuous loop (CSS `@keyframes` DEĞİL), hover'da pause
  - `gsap.to()` + CSS initial state (`gsap.from()` DEĞİL)
- **Efekt SEÇİMİ (zorunlu değil — `tasarim-rehberi.md` "İmza Efekti Seçimi" bölümüne göre karar ver):**
  Noise overlay, custom cursor, ambient glow, canvas partikülleri, kinetik tipografi
  (SplitText) — bunların HİÇBİRİ her sitede otomatik kullanılmaz. Projenin sektörü/
  hedef kitlesi için anlamlı olanı seç, gerekçesini kısaca not et. "LUMI AI imza
  efektleri" diye hepsini birden uygulama — bu, farklı müşterilerin siteleri aynı
  görünsün diye yapılan eski bir hataydı (30 Temmuz 2026'da düzeltildi).
- Mobilde ağır animasyonları kısıtla (canvas partikül sayısı, ScrollTrigger `matchMedia`, custom cursor devre dışı)

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
- Tasarım vizyonu + referans kütüphanesi: `WEBSITE-TASARIM-REHBERI.md` Bölüm 5-6
- Marka tokens: `brands/[firma]/tokens.json`
- Önceki siteler:
  - Çorlu İlgi Diş: `corlu-ilgi-dis/`
  - N-Pak: `n-pak-ambalaj/`
