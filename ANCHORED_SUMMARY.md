# ANCHORED SUMMARY — LUMI AI Lead Analizi

> **Oturum Kapatma Kuralı**: Oturum sonunda user "oturumu kapat" derse (veya ben hatırlatırsam), ANCHORED_SUMMARY.md'deki eski durumu HISTORY.md'ye taşı, ANCHORED_SUMMARY.md'yi yeni duruma göre temizle. Unutma.
> **Tarih Formatı**: Tüm tarihler `Gün Ay Yıl` formatında yazılır (örn. `27 Temmuz 2026`). Asla yılsız yazma.
> **Not Hatırlatma**: Her oturum basında NOTLAR.md'yi oku, içindeki notları kullanıcıya hatırlat.

## Objective
- LEADS_.txt'teki 47 firmanın dijital kimlik profillerini çıkarmak, zafiyetlerini belirlemek ve her birine özel LUMI AI outreach stratejisi geliştirmek

## Important Details
- LUMI AI web sitesi: Next.js 16 + Tailwind CSS v4, koyu tema + altın amber paleti, Playfair Display + Inter (400-700), çift dilli (TR/EN), Vercel'de deploylu
- Domain: https://www.lumiaimedia.com (Namecheap → Cloudflare DNS → Vercel)
- **Tam design token migration:** 16 component'te 100+ direkt renk ihlali temizlendi
- **Animasyon katmanı aktif:** Lenis + GSAP ScrollTrigger sync, section reveal (data-reveal), canvas partiküller (bağlantı çizgili), marquee GSAP loop, stagger
- **GSAP cleanup fix:** `gsap.ticker.remove()` eklendi
- **Glassmorphism temizlendi:** `backdrop-blur-sm` kaldırıldı
- Waitlist formu: POST /api/waitlist (Google Sheets webhook, fallback Resend)
- Google Apps Script webhook: `lumiai-website/GOOGLE-SHEETS-APPS-SCRIPT.js`
- Altyapı: `.env.local` → `GOOGLE_SHEETS_WEBHOOK`, `RESEND_API_KEY`, `TO_EMAIL`
- İhsaş Ambalaj e-postası gönderildi, 28 Temmuz 08:30'da tekrar gönderilecek
- `opencode-deepsek/` → 48 deep dive + 15 profil + rehber + DURUM.md
- Karakter seti sorunu: Çorlu TSO GET çözüldü (iso-8859-9), POST bozuk
- İTO: Scrapling AsyncFetcher ile 200 OK, captcha çözümü için Tesseract OCR gerekli
- Toplam skill: 27 (.claude/skills/ altında 28 klasör)
- Frontman: AI provider hatası, beklemede
- Hata kuralı: 3 denemede çözülmezse not al, devam et, iş bitince bildir

## Work State
### Active
- Sıradaki outreach: Çorlu İlgi Diş (e-postası yok, telefonla aranmalı)
- İhsaş Ambalaj takip: 28 Temmuz 08:30 2. e-posta

### Completed (Son Oturum)
- Design token migration: 16 component, 100+ direkt renk ihlali
- Font düzeltmeleri: weight'ler eklendi, studio CSS variable fix
- TR-EN butonları yenilendi
- Lenis + GSAP ScrollTrigger sync + cleanup bug fix
- Canvas partiküller iyileştirildi (bağlantı çizgileri)
- Marquee CSS → GSAP (her iki marquee)
- Section reveal animasyonları (data-reveal + ScrollTrigger)
- Glassmorphism kaldırıldı
- N-Pak sitesi yeniden yapıldı + deploy (https://n-pak-ambalaj.vercel.app)
- SITE-OTOMASYON-KURALLARI.md + WEBSITE-TASARIM-REHBERI.md güncellendi

### Blocked
- İTO → WAF/captcha, StealthyFetcher denenmedi
- MERSİS → e-Devlet şifresi gerekli
- Çorlu/Çerkezköy TSO → karakter seti sorunu
- Whonix/Gateway proxy koruması kurulmadı

## Otonom Site Oluşturma Sistemi ✅
- `SITE-OTOMASYON-KURALLARI.md` + `WEBSITE-TASARIM-REHBERI.md` → opencode.json instructions
- **Tetikleyici:** "[firma] sitesi yap" veya "/site [firma]"
- **Süreç:** agent-browser → brainstorming → design-system+type-artist → web-design-master → frontend-master → animation-master → kalite kontrol → runtime-agent → deploy
- PowerShell orkestratör: `SITE-OLUSTUR.ps1 -Firma "x" -Sektor "y"`
- **Yeni paternler:** Lenis+GSAP sync, data-reveal, canvas bağlantı, marquee GSAP loop, token migration

## Talimat/Sonraki Oturumda Hatırlat
1. Google Sheets kurulumu — SHEET_ID doldur + web app deploy + .env.local
2. Nike-deneme iyileştirmeleri — görseller, tipografi, spacing, mobil
3. Frontman/AI provider — Anthropic/OpenAI API key ekle
4. 0'dan website tasarlama testi — WEBSITE-TALIMATLARI.md'yi oku

## Relevant Files
- `LEADS_.txt`: 47 firma lead listesi
- `opencode-deepsek/`: 48 deep dive + 15 profil + DURUM.md
- `ANCHORED_SUMMARY.md`: Bu dosya
- `HISTORY.md`: Geçmiş oturum kayıtları
- `WEBSITE-TALIMATLARI.md`: Website tasarım kontrol listesi
- `WEBSITE-TASARIM-REHBERI.md`: Tasarım sistemi rehberi
- `SITE-OTOMASYON-KURALLARI.md`: Otonom site kuralları
- `SITE-OLUSTUR.ps1`: Build + deploy orkestratörü
- `opencode.json`: opencode yapılandırması
- `lumiai-website/`: Next.js 16 site kaynağı
- `n-pak-ambalaj/`: N-Pak sitesi
- `brands/`: Firma token'ları
- `corlu-ilgi-dis/`: Çorlu İlgi Diş sitesi
- `.claude/skills/`: 27 skill
- `Ajan Yetenekler.txt`: Skill + tool kategorizasyonu
- `ITO-SORGULA.ps1` / `TSO-SORGULA.ps1`: Oda sorgulama betikleri
- `FOLLOWUP.md`: İhsaş takip planı
