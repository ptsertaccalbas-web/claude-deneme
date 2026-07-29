---
name: agent-browser-debug
description: agent-browser WAF/captcha/SSL/erişim bloklarını teşhis eder, header/fingerprint/viewport/UA ayarlarını otomatik optimize ederek yeniden dener. Sayfa yüklenemezse, boş dönerse, 403/429/503 alınırsa veya captcha çıkarsa devreye girer.
---

# Agent Browser Debug — WAF ve Erişim Bloku Teşhis Aracı

agent-browser ile bir siteye erişilemediğinde hatanın kaynağını bulup bypass stratejisi uygular.

---

## Teşhis Süreci

### 1. Hata Türünü Tespit Et
| Durum | Olası Sebep |
|---|---|
| 403 Forbidden | WAF kuralları, IP ban, header eksik |
| 429 Too Many Requests | Rate limiting / IP throttle |
| 503 / 502 | CDN (Cloudflare) challenge |
| Boş DOM (body yok) | Headless algılama + JS challenge |
| SSL hatası | TLS fingerprint, sertifika |
| Captcha sayfası | Bot koruması (reCAPTCHA, hCaptcha) |
| Sonsuz redirect | Cookie/JS challenge loop |
| Timeout | Ağ filtresi, port engeli |

### 2. Diagnostik Bilgileri Topla (scripts/analyze-block.ps1)
```powershell
# analyze-block.ps1 - Çağrı: Analyze-Block $response $targetUrl
# Yapacağı işlemler:
# - Status code + response header analizi
# - DOM içinde captcha/block anahtar kelime taraması
# - Sunucu başlıkları (server, x-powered-by, cf-*) incelemesi
# - Redirect zinciri takibi
# - SSL sertifika ve cipher suite kontrolü
```

### 3. Düzeltme Stratejisi Seç
Hata tespit edildikten sonra aşağıdaki parametreleri hedef siteye göre ayarla:

```
User-Agent: modern Chrome/Firefox (gerçek cihazdan kopyalanmış)
Viewport: 1920x1080 (gerçek ekran çözünürlüğü)
Accept-Language: tr-TR,tr;q=0.9,en;q=0.8
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Sec-CH-UA: modern Chromium sürümü
Referer: hedef site ana sayfası veya Google
```

### 4. Ortam Değişiklikleri (sırayla dene)
1. **Basit header düzeltme** — User-Agent, Accept, Accept-Language ekle
2. **Viewport/dimension değiştir** — 1366x768, 1920x1080, 1440x900 dene
3. **Cookie ön yükleme** — Önce ana sayfaya git, cookie'leri topla, sonra hedef sayfaya
4. **Humanize delay** — Her adımda 500-2000ms rastgele bekleme
5. **Referer zinciri** — Google → site ana sayfa → hedef sayfa sırasıyla git
6. **Stealth mode** — headless=false, ek chrome flags dene (`--disable-blink-features=AutomationControlled`)

### 5. Retry Mantığı
```
Deneme-1: varsayılan config → hata tespiti
           ↓ hata varsa
Deneme-2: optimize edilmiş config
           ↓ hata varsa
Deneme-3: full stealth + humanize
           ↓ hata varsa
Fallback tetikle → http-alt-channel veya fallback-strategy
```

## Çalışma Şekli
- Bu skill otomatik tetiklenmez; agent-browser başarısız olana kadar bekle
- Başarısızlık anında `scripts/analyze-block.ps1` ile analiz yap
- Analiz sonucuna göre parametreleri güncelle ve yeniden dene
- 3 denemede de başarısız olursa http-alt-channel veya fallback-strategy'yi tetikle
