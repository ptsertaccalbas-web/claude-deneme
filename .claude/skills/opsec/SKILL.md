# OPSEC — Operasyonel Güvenlik Katmanı

Tüm HTTP/HTTPS tarama, web scraping, OSINT sorgulama ve lead analizi operasyonlarında **iz bırakmamak** ve **tespit edilmemek** için kullanılan güvenlik katmanıdır.

## Ne zaman devreye girer?
- Bir hedef siteye/servise HTTP isteği gönderileceği zaman
- agent-browser veya browser-use ile site gezileceği zaman
- Scout, theHarvester, holehe, Sherlock vb. OSINT araçları çalıştırılacağı zaman
- testssl.sh, Nuclei vb. güvenlik taraması yapılacağı zaman
- Aynı IP'den birden fazla lead taranacağı zaman

---

## Zorunlu Protokoller

### 1. Trafik Yönlendirme (Proxy)

Tüm operasyonel trafik bir proxy üzerinden yönlendirilmelidir:

```
Python:     proxies={"http":"http://proxy:port", "https":"http://proxy:port"}
PowerShell: -Proxy "http://proxy:port"
```

**Proxy türleri (artan güvenlik sırasıyla):**
- **Seviye 1** — Free proxy (`free-proxy` kütüphanesi, düşük güvenilirlik)
- **Seviye 2** — Özel proxy/VPN (kurumsal veya kiralık, önerilen)
- **Seviye 3** — Residential proxy pool (BrightData, Oxylabs vb., en güvenli)

### 2. Rate Limiting (Hız Sınırlama)

Hedef sunucuda WAF/IDS tetiklememek için istekler arasında **rastgele gecikme** zorunludur:

| Operasyon Türü | Min Gecikme | Max Gecikme |
|---------------|:-----------:|:-----------:|
| Tek sayfa HTTP isteği | 1 sn | 3 sn |
| TSO rehberi sorgulama | 2 sn | 5 sn |
| agent-browser gezintisi | 3 sn | 7 sn |
| Zafiyet taraması (Nuclei) | 5 sn | 10 sn |
| Sosyal medya scraping | 8 sn | 15 sn |

### 3. User-Agent Rotasyonu

Her istekte farklı ve güncel bir User-Agent kullan. `fake-useragent` kütüphanesi hazır:

```python
from fake_useragent import UserAgent
ua = UserAgent()
headers = {"User-Agent": ua.random}
```

### 4. IP Rotasyonu

Aynı IP'den bir lead'e maksimum istek sayısı:

| Lead Türü | Maks İstek/IP |
|-----------|:------------:|
| Web sitesi gezintisi | 50 |
| TSO rehber sorgusu | 20 |
| Sosyal medya scraping | 30 |
| Zafiyet taraması | 100 |

Limit aşılınca proxy/IP değiştir.

### 5. Session İzolasyonu

Her lead için ayrı HTTP session/cookie container kullan. Çapraz bulaşmayı önle:

```python
import httpx
# Her lead için YENI session
async with httpx.AsyncClient(proxies=proxy, headers=headers) as client:
    ...
```

### 6. Browser Fingerprint Koruma

agent-browser kullanırken headless algılanmayı önlemek için:

```
- viewport: 1920x1080 (gerçek ekran boyutu)
- userAgent: güncel Chrome/Firefox UA
- locale: tr-TR, tr (hedef kitleye uygun)
- timezone: Europe/Istanbul
- WebDriver flag: false
- proxy: zorunlu
```

---

## Operasyon Öncesi Kontrol Listesi

- [ ] Proxy/VPN bağlantısı test edildi mi? (IP doğrulama: `curl ifconfig.me`)
- [ ] Rate limit değerleri operasyon türüne uygun mu?
- [ ] User-Agent rotasyonu ayarlandı mı?
- [ ] Hedef lead için yeni/saf bir session oluşturuldu mu?
- [ ] Agent-browser fingerprint ayarları yapıldı mı?
- [ ] `opsec-uyari.log` dosyasına operasyon kaydı düşüldü mü?
- [ ] Gerçek IP'miz hiçbir request'te sızmıyor değil mi?

## Operasyon Sonrası Kontrol Listesi

- [ ] Geçici session/cookie dosyaları temizlendi mi?
- [ ] Browser cache (varsa) temizlendi mi?
- [ ] Log dosyalarından IP/session bilgileri temizlendi mi?
- [ ] Hedef sitede anormal erişim/log kaydı bırakılmadığı doğrulandı mı?
- [ ] Proxy testi ile IP sızdırmadığımız teyit edildi mi?

---

## Kullanım Şablonu

Tüm araç çağrıları bu deseni izlemelidir:

```python
async def opsec_safe_request(url, proxy=None, delay_range=(1,3)):
    """OPSEC katmanı ile güvenli HTTP isteği."""
    import asyncio, httpx, random
    from fake_useragent import UserAgent
    
    ua = UserAgent()
    headers = {"User-Agent": ua.random}
    proxies = proxy or "http://your-proxy:port"
    
    # Rate limit
    delay = random.uniform(*delay_range)
    await asyncio.sleep(delay)
    
    async with httpx.AsyncClient(proxies=proxies, headers=headers) as client:
        resp = await client.get(url, timeout=30)
        return resp
```

## Akış Şeması

```
Operasyon Talebi
    │
    ▼
OPSEC Katmanı
    │
    ├─ Proxy/IP seç (lead segmentine göre)
    ├─ Rate limit hesapla (operasyon türüne göre)
    ├─ User-Agent belirle
    ├─ Session oluştur (yeni/izole)
    │
    ▼
Araç Çalıştır
    │
    ▼
Temizlik (cache, cookie, log)
    │
    ▼
Raporla (iz bırakmadan)
```

---

## Uyarı İşaretleri (Ne zaman durmalıyız?)

- ❗ HTTP 403/429/503 → WAF blokladı, proxy değiştir, bekle
- ❗ Captcha çıktı → agent-browser-debug devreye girsin
- ❗ Hedef site anormal yavaş → rate limit çok agresif, bekle
- ❗ Hesap ban/limit uyarısı → derhal dur, proxy/IP değiştir
- 🚫 **Asla** aynı IP'den 2 farklı lead'i aynı anda tarama
- 🚫 **Asla** gerçek kimlik/hesap bilgilerini kullanma

---

## Dosyalar

- `scripts/proxy-router.ps1` — Proxy yönetim scripti
- `references/opsec-checklist.md` — Kontrol listesi
