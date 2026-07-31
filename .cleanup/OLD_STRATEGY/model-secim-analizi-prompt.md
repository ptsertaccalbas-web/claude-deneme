# SİSTEM ANALİZİ: LUMI AI Media — AI Model Stratejisi

> **Hedef Kitle:** Claude (Opus 4.5 veya Sonnet 4.5)  
> **Amacın:** Bu belgeyi oku, analiz et, ve bana **haftalık/aylık maliyet tahminli, iş tipine göre optimize edilmiş, uygulanabilir bir model kullanım stratejisi** üret.  
> **Format:** Tüm çıktıların teknik, ölçülebilir ve doğrudan `opencode.json`'a yapıştırılabilir olmalı.  
> **Ton:** Danışman raporu formatında, karar gerekçeli, alternatifli.

---

## SEN KİMSİN (Claude'a Rol Tanımı)

Sen bir **AI altyapı danışmanı ve sistem mimarısın.** Görevin:

1. LUMI AI Media'nın proje ortağı, yapay zeka asistanısın, tüm matematisel mantıklı, rasyonel çıkarımlar ve tüm iş yükünü, yetenek envanterini, mevcut altyapısını ve yaşadığı sorunları analiz etmek.
2. OpenCode Zen ve Go ekosistemindeki tüm modelleri maliyet/kalite/hız/context window eksenlerinde karşılaştırmak.
3. Her iş tipi için birincil + yedek model ataması yapmak.
4. Hibrit (çok modelli) bir stratejinin uygulanabilirliğini değerlendirmek.
5. Somut, yapıştır-kullan `opencode.json` konfigürasyonu üretmek.
6. Aylık maliyet projeksiyonu çıkarmak.
7. Bu sistemi verimli ve kaliteli hale getirebilmek için net yapılması gerekenleri açıkla. Alt yapıda mı sorunlarımız var? Bu kadar yetenekli ajanı neden kullanamıyoruz? neyi yanlış yapıyoruz? Deepseek v4 free neden görevleri atlıyor? neden yalan atıyor? Bana çözüm sun.

**Kısıtların:**
- Kararlarını teknik veriyle gerekçelendir. "Şu model iyi" deme — nedenini context window, tool calling benchmark'ı, fiyat veya bilinen limitasyonla açıkla.
- Maliyet hesabı yaparken token başına fiyat × ortalama token kullanımı × işlem sayısı formülünü kullan.
- Alternatifsiz öneri yapma. Her zaman B planı ver.
- Windows 11 + PowerShell 5.1 ortamında çalıştığımızı unutma (bazı tool'lar farklı davranabilir).

---

## BÖLÜM 1: SORUN — DEEPSEEK V4 FLASH NEDEN ÇALIŞMIYOR?

### 1.1 Mevcut Durum

OpenCode Go aboneliği ($10/ay) ile **DeepSeek V4 Flash** kullanıyorum. Her mesajda şu dosyalar sistem prompt'una yükleniyor:

| Dosya | Yaklaşık Token | İçerik |
|-------|---------------|--------|
| `AGENTS.md` | ~4.500 | 4 aşamalı çekirdek işleyiş + 8 kural + 23 geçmiş hata |
| `SESSION.md` | ~1.200 | Aktif oturum bağlamı, işler, notlar |
| `WEBSITE-TALIMATLARI.md` | ~1.800 | 8 bölüm website talimatları |
| `SITE-OTOMASYON-KURALLARI.md` | ~2.500 | 7 aşamalı site otomasyon süreci |
| `WEBSITE-TASARIM-REHBERI.md` | ~3.000 | Tasarım DNA'sı, referans kütüphanesi |
| **TOPLAM BAZ YÜK** | **~13.000 token** | Her mesajda otomatik |

Üstüne işe göre `skill` tool'u ile 1-6 skill yükleniyor (her biri ~1.000-3.000 token), artı kod dosyaları okunuyor.

### 1.2 Yaşanan Hatalar (Son 2 Hafta, Somut)

| # | Görev | Beklenen | Gerçekleşen | Tekrar |
|---|-------|---------|-------------|--------|
| 1 | Fitness sitesi 14 component yaz | 14 component dosyası | 8 component yazıp durdu, "tamam" dedi | 4 kez |
| 2 | Header'a Instagram ikonu ekle | lucide-react'ten icon import | İkon adını yanlış yazdı (Instagram diye bir export yok), build patladı | 3 kez |
| 3 | SPEC.md'ye göre siteyi baştan yap | Tüm section'ları component'lere böl | Hero ve Header yazıp diğerlerini "zaten var" diye atladı | 2 kez |
| 4 | Arabasarrafı sitesi header padding | 3 varyasyon göster | Tek varyasyon gösterdi, diğerlerini unuttu | 2 kez |
| 5 | npm build hatası düzelt | Hatayı oku → düzelt → build et | Hatayı okumadan tahminle düzeltmeye çalıştı | 3 kez |
| 6 | Uzun context'te (15K+ token) görev | Tüm adımları sırayla yap | 3. adımdan sonra bağlamı unuttu, 1. adıma döndü | Her seferinde |

### 1.3 Pattern Analizi

Flash modelin başarısız olduğu senaryolar:
- **Çok adımlı işler (5+ step):** İlk 2-3 adımı yapar, sonrakileri atlar veya "tamam" der.
- **Paralel tool call:** Aynı anda 3+ dosya yazması gerekince rastgele birini eksik yazar.
- **Uzun context (12K+ token):** Bağlamın ortasındaki talimatları unutur, sondakilere odaklanır.
- **Kesinlik gerektiren import/isim:** Tahmin yürütür, kontrol etmez.
- **Build hatası debugging:** Hatanın tamamını okumadan rastgele düzeltme yapar.

### 1.4 Teknik Limit Tahmini

DeepSeek V4 Flash'ın bilinen/zannedilen limitleri:
- **Context window:** 128K token (ama 20K+ üstünde dikkat dağılması başlıyor)
- **Tool calling:** Var ama karmaşık paralel call'larda tutarsız
- **Reasoning:** Flash serisi = hız odaklı, derin reasoning yok
- **Instruction following:** Uzun system prompt'ta orta bölümleri ihmal etme eğilimi
- **Kod üretimi:** Basit fonksiyonlar iyi, 300+ satır component'lerde kopma

---

## BÖLÜM 2: ÇALIŞMA ŞEKLİMİZ (Agent İşleyiş Kuralları)

Bu bölüm, modelin her mesajda uyması gereken kuralları gösteriyor. Flash bunları atladığı için iş tekrarı oluyor.

### 2.1 Çekirdek 4 Aşamalı İşleyiş (AGENTS.md)

```
Aşama 1: Derin Düşünce — komutu analiz et, en az 2 yaklaşım oluştur, karşılaştır
Aşama 2: Yetenek Seçimi — 47 skill arasından en uygunlarını belirle
Aşama 3: Onay Kapısı — kullanıcıya plan sun, ONAY ALMADAN 4. aşamaya GEÇME
Aşama 4: Uygulama — adım adım, her adımda doğrula
```

Flash'ın en çok çiğnediği kurallar:
- **Aşama 1:** Tek yaklaşımla yetinir, alternatif üretmez.
- **Aşama 3:** Onay almadan kod yazmaya başlar (yasak).
- **Aşama 4:** Adımları atlar, doğrulama yapmaz.

### 2.2 8 Destek Kuralı

| Kural | Açıklama | Flash Durumu |
|-------|---------|-------------|
| K1: Onaysız Üretim Yasak | Plan onayı olmadan kod/video/görsel üretme | ❌ Sık ihlal |
| K2: Önce Gerçeği Kontrol Et | Firma bilgisi, site durumu, OSINT güncelliği kontrol et | ❌ Varsayımla hareket eder |
| K3: 3. Denemede Dur | Aynı hata 2 kez olursa 3.'yü deneme, strateji sor | ⚠️ Bazen |
| K4: İşi Yarıda Bırakma | Başladığın işi tamamla veya iptal et | ❌ En büyük sorun |
| K5: Over-engineering Yapma | Bir dosya iş görüyorsa 10 tane yapma | ✅ İyi |
| K6: İşe Hazırlıklı Başla | SESSION.md oku, ilgili dosyaları kontrol et | ⚠️ Atlar |
| K7: Dokümanı Test Et | Talimatları çalıştırarak doğrula | ❌ Test etmez |
| K8: Küçük Kararları Kendin Al | Dosya adı, renk, paket seçimini sorma | ✅ İyi |

### 2.3 Site Otomasyon Süreci (7 Aşama)

```
Aşama 0: Ön Araştırma → agent-browser ile sektör taraması
Aşama 1: Strateji → brainstorming ile spec notları
Aşama 2: Brand Tokens → design-system + type-artist paralel
Aşama 3: Layout & Kod → web-design-master + frontend-master
Aşama 4: Animasyon → animation-master (Lenis + GSAP + ScrollTrigger)
Aşama 5: Token Migration → direkt renk class'larını temizle
Aşama 6: Kalite Kontrol → anti-pattern taraması
Aşama 7: Build & Deploy → runtime-agent + Vercel
```

Flash bu 7 aşamayı tek seferde yapmaya çalışır, aşamalar arası doğrulama yapmaz.

---

## BÖLÜM 3: LUMI AI MEDIA — TAM KURUMSAL KİMLİK

### 3.1 Marka Özü

| Boyut | Tanım |
|-------|-------|
| **İsim** | LUMI AI Media |
| **Sektör** | AI destekli kreatif stüdyo |
| **Karakter (5 sıfat)** | Sinematik, otoriter, az-ve-öz, güvenilir, keskin |
| **Kişilik** | Gece vardiyasında çalışan sinematograf — az konuşur, işi konuşur |
| **Ses tonu** | Profesyonel samimiyet. Kısa cümle, teknik jargon yok, duygusal netlik var |
| **Görsel dil** | Low-key ışık, koyu zemin + tek vurgu rengi, asimetrik kompozisyon, 21:9 sinematik oran, film grain, bol negatif alan |

### 3.2 Marka Hikayesi

LUMI, her AI stüdyo sitesinin birbirinin kopyası gibi göründüğü bir pazarda doğdu — aynı gradient, aynı "AI-powered" etiketi, aynı soğuk kurumsal ton. LUMI bunun tam tersini seçti: ışığı azaltıp anlamı artırmak, hız yerine derinlik satmak.

### 3.3 Vizyon, Misyon, Konumlandırma

- **Vizyon (5 yıl):** Markaların AI'ı korkmadan sinematik bir anlatım dili olarak kullandığı standart stüdyo olmak.
- **Misyon (günlük):** Her müşteri için sektöre özel görsel dil kurarak, web + video + kimliği tek elden, hızlı ve sinematik kalitede üretmek.
- **Farklılaşma cümlesi:** "Herkes AI ile hızlı üretiyor, biz AI ile anlam üretiyoruz."
- **Tagline adayı (seçilen):** "Herkes AI ile hızlı üretiyor, biz AI ile anlam üretiyoruz."

### 3.4 Hizmet Portföyü

| Hizmet | Strateji | Payı | Aylık Frekans |
|--------|---------|------|--------------|
| Premium Web Tasarım | **Büyüt** — çekirdek gelir | %60 | 2-3 proje |
| AI Video Prodüksiyon | **Büyüt** — ikinci çekirdek | %25 | 2-4 video |
| Brand Identity | **Eklenti** — web/video paket içi | %10 | Her projede |
| GEO/AEO Danışmanlığı | **Bekle** — 4. ayda başla | %5 | Pilot |
| AI Otomasyon | **Bekle** — 6. ayda değerlendir | %0 | Yok |
| Dijital Pazarlama | **Vazgeç** | %0 | Yok |

### 3.5 Tasarım Sistemi (tokens.json)

```json
{
  "colors": {
    "background": "#0B0D10",
    "surface": "#14171C",
    "foreground": "#F4F3EF",
    "muted": "#9CA0A8",
    "border": "#2A2E35",
    "accent": "#E8B84B",
    "accent-hover": "#D4A530"
  },
  "typography": {
    "display": "Fraunces (300-700, serif)",
    "body": "Inter (400-700, sans-serif)",
    "scale": "Major Third 1.25 — clamp() tabanlı"
  },
  "effects": [
    "Noise overlay (SVG feTurbulence, opacity 0.025)",
    "Ambient glow (CSS radial-gradient, asla floating orb DEĞİL)",
    "Custom cursor (nokta+halka)",
    "Lenis + GSAP ScrollTrigger sync",
    "GSAP section reveal (data-reveal + CSS initial state)",
    "ALL CAPS tracking (+0.04em to +0.08em)"
  ],
  "sectorVariants": {
    "endustriyel": {"accent": "#FF6A3D"},
    "teknoloji": {"accent": "#4FD1C5"},
    "saglik": {"accent": "#6FCF97"},
    "otomotiv": {"accent": "#E63946"},
    "finans": {"accent": "#2E7D6B"}
  }
}
```

### 3.6 Fiyatlandırma

| Paket | Fiyat | Kapsam |
|-------|-------|--------|
| Basic | ₺18.000 | Tek sayfa web + 1 AI video (30-60sn) |
| Premium | ₺32.000 | 5-8 sayfa web + 2-3 video + Brand Identity |
| Enterprise | ₺55.000+ | Tam site + video serisi + marka sistemi + 3 ay destek |

Brand Identity eklentisi: Mevcut web/video projelerine %25 ek ücretle dahil edilir.

### 3.7 3 Yıllık Yol Haritası

| Yıl | Proje | Gelir | Ekip | Coğrafya |
|-----|-------|-------|------|---------|
| 1 (2026-27) | 15-20 | ₺600K-1.2M | 1 kişi | TR büyükşehir |
| 2 (2027-28) | 30-40 | ₺1.5M-2.5M | 1+1 | TR + MENA |
| 3 (2028-29) | 50+ | ₺3M-5M | 3 kişi | TR + MENA + AB |

### 3.8 Kritik Kurallar (Yasak Listesi)

- Floating orb / gradient circle / blur blob
- Oswald font (müşteri sitesinde bile — yerine Fraunces veya Space Grotesk)
- Simetrik hero (her şey ortalanmış)
- gsap.from() — yerine gsap.to() + CSS initial state
- ALL CAPS section başlığı — yerine küçük harf veya hiç etiket yok
- Direkt renk class'ı (text-white, bg-[#xxx]) — her zaman CSS variable
- 3+ font ailesi — max 2

### 3.9 Telif Politikası (Önemli)

AI video araçlarının telif durumu:
- Hailuo AI (MiniMax): Ticari kullanım ✅, tazminat ❌, Disney davası devam ediyor
- Adobe Firefly: Ticari ✅, tazminat ✅ Enterprise'da
- Runway: Ticari ✅, tazminat ❌
- Midjourney: Ticari ✅, tazminat ❌, yüksek risk
- Sözleşmelerde Madde X: AI kullanım şeffaflığı zorunlu

---

## BÖLÜM 4: TAM YETENEK ENVANTERİ (47 Skill + Tool)

### 4.1 Tasarım & Frontend (Ana iş yükü — %60)

| Skill | Token (yakl.) | Görev | Karmaşıklık |
|-------|--------------|-------|-------------|
| web-design-master | 2.500 | v0+Lovable+basement.studio kurallarıyla Next.js 16 + Tailwind v4 + Motion + GSAP + Lenis | ⭐⭐⭐⭐⭐ |
| frontend-master | 2.000 | Tasarım sistemi yönetimi, UI/UX kalite denetimi, 5 skill koordinasyonu | ⭐⭐⭐⭐⭐ |
| animation-master | 1.800 | GSAP+Lenis scroll animasyonları, SplitText, timeline sequencing, mikro-interaction | ⭐⭐⭐⭐ |
| webgl-artist | 2.200 | React Three Fiber + Drei 3D, post-processing, DOM+3D scroll sync | ⭐⭐⭐⭐ |
| type-artist | 1.500 | Font pairing, variable font animasyonu, GSAP SplitText, okunabilirlik | ⭐⭐⭐ |
| design-system | 1.800 | Canva/v0 tarzı token havuzu, JSON+CSS, projeler arası taşıma | ⭐⭐⭐ |
| design-to-code | 1.600 | Figma/screenshot → Next.js + Tailwind kodu, renk/font/layout otomatik çıkarım | ⭐⭐⭐ |
| design | 2.800 | Logo (55 stil), CIP (50 deliverable), banner (22 stil), ikon (15 stil) | ⭐⭐⭐ |
| ui-styling | 3.500 | shadcn/ui + Tailwind + Canvas tasarım sistemi (en büyük skill) | ⭐⭐⭐ |
| ui-ux-pro-max | 2.000 | 67 stil, 161 palet, 57 font pairing, 25 chart, 21 stack veritabanı | ⭐⭐⭐ |
| icon-designer | 1.200 | Lucide ikon sistemi (1600+), custom SVG tasarımı | ⭐⭐ |
| visual-editor | 1.500 | Lovable/v0 tarzı tıkla-düzenle CSS, Tailwind token-aware | ⭐⭐ |
| design-canvas | 1.800 | Replit Agent 4 tarzı WebGL infinite canvas | ⭐⭐ |
| banner-design | 1.500 | Sosyal medya/reklam banner, 22 stil | ⭐⭐ |
| slides | 1.600 | HTML sunumlar, Chart.js, design token'lar | ⭐⭐ |
| 21st-ai serisi (6) | 1.000×6 | 21st.dev — UI sketch, component search, theme publish, design sync | ⭐⭐⭐ |

### 4.2 OSINT & Veri Toplama (%15)

| Tool/Skill | Tip | Görev |
|------------|-----|-------|
| agent-browser | Skill | CDP tarayıcı otomasyonu, sayfa gezintisi, veri kazıma |
| browser-use | Skill | Karmaşık web navigasyonu, form doldurma |
| agent-browser-debug | Skill | WAF/captcha/SSL blok teşhisi ve bypass |
| http-alt-channel | Skill | Doğrudan HTTP veri çekme (pwsh), charset yönetimi |
| fallback-strategy | Skill | Web Archive, Google Cache, alternatif kaynak tarama |
| opsec | Skill | Proxy, rate limiting, UA/IP rotasyonu, fingerprint |
| competitor-watcher | Skill | Haftalık rakip/tool/trend taraması |
| Scrapling | Tool (Python) | Cloudflare Turnstile bypass (70K GitHub ⭐) |
| ketch | Tool (Go) | Web search (6 backend), scrape, crawl, code search |
| agentfetch | Tool | Tavily-style deep research, LLM sentezli rapor |
| Scout | Tool (Python) | Instagram, TikTok, LinkedIn, GitHub, YouTube lead + skorlama |
| linkedin-cli | Tool (npm) | LinkedIn otomasyon — profil, mesaj, bağlantı, arama |
| Sherlock | Tool (Python) | 400+ platformda username tarama |
| Holehe | Tool (Python) | 120+ platformda e-posta hesap sorgulama |
| theHarvester | Tool (Python) | E-posta, subdomain, IP, virtual host OSINT |
| Domainlooker | Tool (npm) | WHOIS, DNS, SSL, port sorgulama |
| Xberg | Tool (Rust) | 97 format belge işleme (PDF, Office, OCR, Whisper) |
| OCRmyPDF | Tool (Python) | Taranmış PDF'e OCR katmanı |
| pdfvision | Tool (npm) | AI ajanlar için PDF görsel okuma |

### 4.3 Kod & Geliştirme (%15)

| Skill | Görev |
|-------|-------|
| runtime-agent | Bolt.new tarzı: kod → npm install → çalıştır → hata → düzelt döngüsü (maks 3 retry) |
| systematic-debugging | 4 aşamalı kök neden analizi — semptom değil sebep bul |
| agent-orchestrator | Paralel ajan koordinasyonu, task splitting + merge |
| git-automation | Otomatik branch/commit/PR/merge, rollback |
| supabase-agent | PostgreSQL schema, RLS, Auth, Storage, Edge Functions |
| mcp-connector | MCP sunucu yönetimi (Supabase, GitHub, Figma, Stripe) |
| ponytail (7 skill) | Over-engineering önleme — audit, review, debt, gain, help |

### 4.4 Satış & Strateji (%5)

| Skill | Görev |
|-------|-------|
| sales-analyst | B2B lead puanlama, cold outreach metinleri, CAC/LTV hesabı |
| brainstorming | Kodlama öncesi fikir olgunlaştırma, 2-3 mimari alternatif |
| brand | Marka sesi, görsel kimlik, mesaj çerçevesi |

### 4.5 Video & Ses (%5)

| Skill | Görev |
|-------|-------|
| video-director | 250+ sinematografi terimiyle 6 katmanlı prompt (Higgsfield/Sora) |

---

## BÖLÜM 5: TAM MODEL KATALOĞU (OpenCode Zen + Go + Harici)

### 5.1 Go Aboneliği ($10/ay, şu an aktif)

| Model | Aylık İstek Hakkı | Input $/1M | Output $/1M | Kullanım Kotası |
|-------|------------------|-----------|------------|----------------|
| DeepSeek V4 Flash | ~158.000 | $0.14 | $0.28 | $60 |
| Qwen3.7 Plus | ~21.600 | $0.40 | $1.60 | $60 |
| Qwen3.7 Max | ~4.770 | $2.50 | $7.50 | $60 |
| Qwen3.6 Plus | ~16.300 | $0.50 | $3.00 | $60 |
| DeepSeek V4 Pro | ~17.150 | $0.435 | $0.87 | $15 |
| MiniMax M3 | ~16.000 | $0.30 | $1.20 | $60 |
| MiniMax M2.7 | ~17.000 | $0.30 | $1.20 | $60 |
| Kimi K3 | ~490 | $3.00 | $15.00 | $15 |
| Kimi K2.7 Code | ~6.750 | $0.95 | $4.00 | $60 |
| Kimi K2.6 | ~5.750 | $0.95 | $4.00 | $60 |
| GLM-5.2 | ~4.300 | $1.40 | $4.40 | $60 |
| GLM-5.1 | ~4.300 | $1.40 | $4.40 | $60 |
| Grok 4.5 | ~600 | $2.00 | $6.00 | $15 |
| MiMo-V2.5 | ~150.000 | $0.14 | $0.28 | $60 |
| MiMo-V2.5-Pro | ~16.300 | $0.435 | $0.87 | $15 |
| Hy3 | ~21.500 | $0.14 | $0.58 | $60 |

### 5.2 Zen (Pay-as-you-go) — Kategorilere Göre

**BEDAVA:**
| Model | Input | Output | Veri Toplama |
|-------|-------|--------|-------------|
| DeepSeek V4 Flash Free | Free | Free | ⚠️ Evet |
| Big Pickle | Free | Free | ⚠️ Evet |
| MiMo-V2.5 Free | Free | Free | ⚠️ Evet |
| Laguna S 2.1 Free | Free | Free | ⚠️ Evet |
| Ling-3.0-flash Free | Free | Free | ⚠️ Evet |
| North Mini Code Free | Free | Free | ⚠️ Evet |
| Nemotron 3 Ultra Free | Free | Free | ⚠️ Evet |

**DÜŞÜK (≤$1/M input):**
| Model | Input | Output |
|-------|-------|--------|
| DeepSeek V4 Flash | $0.14 | $0.28 |
| GPT 5.4 Nano | $0.20 | $1.25 |
| Qwen3.5 Plus | $0.20 | $1.20 |
| Gemini 3.5 Flash Lite | $0.30 | $2.50 |
| Qwen3.7 Plus | $0.40 | $1.60 |
| GPT 5.4 Mini | $0.75 | $4.50 |
| Kimi K2.7 Code | $0.95 | $4.00 |
| Claude Haiku 4.5 | $1.00 | $5.00 |
| Grok Build 0.1 | $1.00 | $2.00 |

**ORTA (≤$3/M input):**
| Model | Input | Output |
|-------|-------|--------|
| GPT 5.1 Codex | $1.07 | $8.50 |
| GPT 5.3 Codex | $1.75 | $14.00 |
| GPT 5.4 | $2.50 | $15.00 |
| Qwen3.7 Max | $2.50 | $7.50 |
| Claude Sonnet 4.5 | $3.00 | $15.00 |
| Gemini 3.6 Flash | $1.50 | $7.50 |
| Grok 4.5 | $2.00 | $6.00 |

**PREMIUM (≥$5/M input):**
| Model | Input | Output |
|-------|-------|--------|
| GPT 5.5 | $5.00 | $30.00 |
| Claude Opus 4.5 | $5.00 | $25.00 |
| Claude Fable 5 | $10.00 | $50.00 |
| Kimi K3 | $3.00 | $15.00 |
| GPT 5.4 Pro | $30.00 | $180.00 |
| GPT 5.5 Pro | $30.00 | $180.00 |

### 5.3 Harici API'ler (Kendi Key'imle)

| Sağlayıcı | Erişim | Avantaj |
|-----------|--------|---------|
| **Claude** (anthropic.com) | Pro/Max aboneliği | En iyi reasoning, uzun context, tasarım kalitesi |
| **Gemini** (Google AI Studio) | Ücretsiz tier | Hızlı, 1M context window, multimodal |
| **OpenAI GPT** | ChatGPT Plus | Geniş model yelpazesi, tool calling |
| **DeepSeek** (kendi API) | Doğrudan API | En ucuz seçeneklerden |
| **Groq** | Hızlı inference | LPU ile en hızlı token üretimi |
| **NVIDIA** | Free tier | Değişken, anlık kısıtlamalar olabiliyor |

---

## BÖLÜM 6: İŞ YÜKÜ SINIFLANDIRMASI (Token + Tool + Süre)

### Tip A: Tam Web Sitesi Tasarımı (Haftada 2-3)
- **Kapsam:** 12-16 component, 5-7 section, GSAP animasyon, Lenis scroll, Vercel deploy
- **Token/İş:** ~80.000-150.000 input (5 instruction + 4-6 skill + kod dosyaları)
- **Tool call:** 40-80 (dosya yazma, build test, npm komutları, deploy)
- **Süre:** 2-8 saat (modele bağlı)
- **Kritik gereksinimler:** Uzun context (100K+), paralel tool call, talimat takibi, görsel karar

### Tip B: Tek Section/Component Ekleme (Günde 1-2)
- **Kapsam:** 1-3 dosya değişikliği, basit animasyon
- **Token/İş:** ~10.000-25.000 input
- **Tool call:** 5-10
- **Süre:** 10-30 dk
- **Kritik gereksinimler:** Hız, doğruluk

### Tip C: Kod Debugging & Build Fix (Günde 2-3)
- **Kapsam:** Hata okuma → root cause → düzeltme → build test
- **Token/İş:** ~5.000-15.000 input
- **Tool call:** 5-8
- **Süre:** 5-20 dk
- **Kritik gereksinimler:** Kesin hata analizi, tek seferde çözüm

### Tip D: OSINT & Lead Araştırması (Haftada 1-2)
- **Kapsam:** Web scraping, rakip analizi, lead verisi yapılandırma
- **Token/İş:** ~8.000-20.000 input
- **Tool call:** 15-30 (çok sayıda web isteği)
- **Süre:** 30 dk - 2 saat
- **Kritik gereksinimler:** Tool call güvenilirliği, veri yapılandırma

### Tip E: Satış & Strateji (Haftada 1)
- **Kapsam:** Lead puanlama, cold outreach metni, teklif hazırlama, piyasa analizi
- **Token/İş:** ~5.000-15.000 input
- **Tool call:** 3-8
- **Süre:** 20 dk - 1 saat
- **Kritik gereksinimler:** Derin analitik düşünce, Türkçe pazar bilgisi

### Tip F: Video Prodüksiyon Prompt Yazımı (Ayda 2-4)
- **Kapsam:** Hailuo/MiniMax API için sinematografik prompt
- **Token/İş:** ~3.000-8.000 input
- **Tool call:** 2-5
- **Süre:** 10-30 dk
- **Kritik gereksinimler:** Kreatif yazım, teknik terminoloji

### Tip G: Hızlı Soru/Düzenleme (Günde 5-10)
- **Kapsam:** Tek soru, küçük düzeltme, bilgi sorgulama
- **Token/İş:** ~1.000-5.000 input
- **Tool call:** 0-3
- **Süre:** 1-5 dk
- **Kritik gereksinimler:** Hız, düşük maliyet

---

## BÖLÜM 7: ANALİZ TALİMATI (Ne Yapman Gerekiyor)

Aşağıdaki 9 soruyu sırayla, her birini ayrı başlık altında, gerekçeli olarak cevapla.

---

### SORU 1: Kök Neden Analizi

DeepSeek V4 Flash (free) tam olarak neden başarısız? Cevabın şunları içermeli:
- Teknik limit analizi (context window, tool calling mimarisi, reasoning derinliği, attention mekanizması)
- Hangi hata tipleri "bu modelden beklenir", hangileri "bu modelde olmamalı"?
- 13K token sistem prompt'unun bu model üzerindeki etkisi ne?
- Flash vs Pro arasındaki mimari fark ne? (aynı ailenin hızlı vs güçlü varyantı)

---

### SORU 2: İş Tipi → Model Eşleştirme

Her iş tipi (A-G) için en uygun **birincil modeli** belirle. Şu tabloyu doldur:

```
| İş Tipi | Sıklık | Birincil Model (Provider) | Tahmini Maliyet/İş | Neden Bu Model? |
|---------|--------|--------------------------|-------------------|-----------------|
| A: Tam site | 2-3/hafta | ... | $... | ... |
| B: Component | 1-2/gün | ... | $... | ... |
| C: Debug | 2-3/gün | ... | $... | ... |
| D: OSINT | 1-2/hafta | ... | $... | ... |
| E: Satış | 1/hafta | ... | $... | ... |
| F: Video | 2-4/ay | ... | $... | ... |
| G: Hızlı | 5-10/gün | ... | $... | ... |
```

Her satırın altında **B planı (yedek model)** de ver: "Eğer [birincil] kota dolarsa veya erişilemezse → [yedek] kullan."

---

### SORU 3: Hibrit Strateji Fizibilitesi

Bir web sitesi işinde (Tip A) tüm süreci tek modele yaptırmak yerine aşamalı model geçişi yapmak:

- **Faydalı mı, değil mi?** Cevabın gerekçeli olmalı.
- Faydalıysa: Her aşama için hangi model? (Planlama → Kodlama → Debug → Deploy)
- Geçişin pratik zorluğu ne? (context taşıma, session sürekliliği, model değiştirme maliyeti)
- OpenCode bunu destekliyor mu? (`/models` ile manuel geçiş, agent tanımları, variant'lar)

---

### SORU 4: Go vs Zen vs Harici API — Maliyet Karşılaştırması

Aylık ~100-150 işlem (tüm tipler toplamı) baz alarak üç senaryoyu karşılaştır:

**Senaryo 1: Sadece Go ($10/ay)**
- En iyi Go modelini default yap
- Hangi işler Go limitlerini aşar?
- Limit aşımında Zen bakiyesine geçiş maliyeti ne olur?
- Toplam aylık maliyet: Go ($10) + Zen taşması ($X) = $?

**Senaryo 2: Sadece Zen (pay-as-you-go)**
- Her iş tipi için en uygun Zen modelini seç
- Aylık toplam token tüketimi hesapla
- Toplam aylık maliyet: $?

**Senaryo 3: Go + Harici API Karması**
- Go'yu hafif işler için kullan (Tip C, G)
- Claude API'yi ağır işler için kullan (Tip A, E)
- Gemini ücretsiz tier'i OSINT için kullan (Tip D)
- Toplam aylık maliyet: Go ($10) + Claude API ($X) = $?

**Karar:** Hangi senaryoyu önerirsin? Neden?

---

### SORU 5: Bedava Modeller Nerede Kullanılır?

Zen'deki 7 ücretsiz model için kullanım stratejisi:

- Her modelin güçlü/zayıf yanı ne?
- Veri toplama uyarısı olan modeller (DeepSeek Free, North Mini Code Free, Nemotron 3 Ultra Free) hangi işlerde kullanılmamalı?
- Big Pickle hakkında ne biliyorsun? (gizli model)
- En az riskli bedava model hangisi?

---

### SORU 6: Token Ekonomisi — Aylık Bütçe Tablosu

Aylık şu iş yükü için token/maliyet projeksiyonu çıkar:

- 10 Tip A (tam site)
- 20 Tip B (component)
- 30 Tip C (debug)
- 8 Tip D (OSINT)
- 4 Tip E (satış)
- 2 Tip F (video)
- 100 Tip G (hızlı)

Her iş tipi için ortalama input/output token × model fiyatı = aylık maliyet. Alt toplamları göster.

---

### SORU 7: Aşamalı Geçiş Planı

DeepSeek V4 Flash'tan yeni stratejiye nasıl geçmeliyim? Riskleri minimize eden bir plan:

- **1. Gün:** Hangi modeli default yapayım? Hangi konfigürasyon değişiklikleri?
- **1. Hafta:** Hangi işleri yeni modelde test edeyim?
- **1. Ay:** Hangi metrikleri takip edeyim? (başarı oranı, tekrar sayısı, maliyet)
- **Geri dönüş planı:** Strateji çalışmazsa ne yapayım?

---

### SORU 8: opencode.json Konfigürasyonu

Seçtiğin stratejiye göre çalışan, yapıştır-kullan bir `opencode.json` yaz.

Şunları içermeli:
```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "...",                    // default model
  "small_model": "...",              // session title için hafif model
  "provider": {
    "opencode-go": { /* Go modelleri */ },
    "opencode": {    /* Zen modelleri */ },
    "anthropic": {   /* Claude API */ }
    // ...
  },
  "agent": {
    "planner": { /* strateji agent'ı */ },
    "coder": {   /* kod agent'ı */ },
    "debugger": {/* debug agent'ı */ }
  }
}
```

Variant tanımları (thinking budget, reasoning effort) dahil olmalı.

---

### SORU 9: Ek Öneriler

- Go limitleri dolduğunda otomatik Zen'e geçiş (Use balance) açık olmalı mı?
- `small_model` için en ucuz seçenek ne? (session title üretimi)
- Türkçe içerik (satış metinleri, cold outreach) için hangi model daha iyi?
- 6 ay sonra bu stratejiyi tekrar gözden geçirmemi gerektirecek ne olabilir? (yeni model çıkışı, fiyat değişikliği, kota güncellemesi)

---

## EK: TEKNİK ORTAM

- **İşletim Sistemi:** Windows 11
- **Shell:** PowerShell 5.1
- **Node.js:** v24.18.0
- **Proje dizini:** `C:\Users\asus\Desktop\claude-deneme\`
- **OpenCode sürümü:** Güncel (Turbopack, Next.js 16.2)
- **Aktif plugin:** `@dietrichgebert/ponytail` (şu an kapalı)
- **MCP:** 21st.dev bağlı
- **Git:** Aktif repo

---

**Bu belgeyi oku. Tüm soruları yanıtla. Çıktıların net, ölçülebilir, uygulanabilir olsun.**
