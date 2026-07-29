---
name: fallback-strategy
description: agent-browser ve HTTP alternatif kanalı da başarısız olunca devreye girer. Hedef site/sayfa için alternatif kaynakları (web.archive, önbellek, yedek portallar, arama motoru önbelleği) tarar. En son çare olarak manuel talimat üretir.
---

# Fallback Stratejisi — Alternatif Veri Kaynakları

Birincil ve ikincil kanallar başarısız olduğunda kullanılacak alternatif kaynaklar ve stratejiler.

---

## Alternatif Kaynaklar (Öncelik Sırasına Göre)

### 1. Web Archive (Wayback Machine)
```
URL: https://web.archive.org/web/{tarih}/{hedef-url}
API: https://archive.org/wayback/available?url={hedef-url}
```
- En son snapshot'ı al
- API ile JSON sorgula, en yakın tarihli snapshot'ı bul
- `https://web.archive.org/web/YYYYMMDDhhmmss/{url}` ile direkt eriş

### 2. Google Önbellek (Cache)
```
URL: https://webcache.googleusercontent.com/search?q=cache:{hedef-url}
```
- Google'ın en son indekslediği sürüm
- Not: robots.txt engelli sitelerde çalışmaz

### 3. textise dot iitty (CSS/JS'siz ham HTML)
```
URL: https://r.jina.ai/http://{hedef-url}
```
- JavaScript'siz, temiz metin çıktısı
- WAF'lar genelde engellemez

### 4. textise dot iitty proxy
```
URL: https://r.jina.ai/http://{hedef-url}
```

### 5. Alternatif Rehber Siteleri
| Kaynak | URL | Kapsam |
|---|---|---|
| Çorlu TSO | rehber.corlutso.org.tr | Çorlu firmaları |
| Çerkezköy TSO | cerkezkoytso.org.tr/firmarehberi.html | Çerkezköy firmaları |
| İTO (manüel) | guncelle.ito.org.tr | İstanbul (captcha var) |
| Türk Ticaret Sicili | ticaret.gov.tr | Resmi sicil |
| Firma Bilgisi | firma bilgisi .com | Özel rehber |
| Türkiye Firma Rehberi | turkiye-firma-rehberi.com | Genel |
| Yellow Pages (Sarı Sayfalar) | sarisayfalar.com | Genel |
| Google Maps | maps.google.com | İletişim, yorum, puan |

### 6. Web Scraping Yaklaşımı Değiştir
- **CURL yerine wget** kullan
- **HTTP/2 yerine HTTP/1.1** dene
- **Farklı IP / Proxy** dene (varsa)
- **Mobil User-Agent** dene (Mozilla/5.0 iPhone...)
- **Mobil görünüm** — sitelerin mobil sürümü genelde daha az korumalıdır (`m.hedefsite.com`)

### 7. Sosyal Medya ve Diğer Kaynaklar
```
LinkedIn: linkedin.com/search/results/companies/?keywords={firma}
Instagram: instagram.com/{firma}/ (mevcutsa)
Google Maps: google.com/maps/search/{firma}
Facebook: facebook.com/search/top?q={firma}
```

---

## Strateji Akışı

```
Try 1: Web Archive snapshot
  ↓ bulunamazsa
Try 2: Google Cache
  ↓ bulunamazsa
Try 3: textise proxy
  ↓ bulunamazsa
Try 4: Farklı HTTP yöntemi (HTTP/1.1, mobil UA, farklı proxy)
  ↓ bulunamazsa
Try 5: Alternatif rehber siteleri (öncelik sıralı)
  ↓ bulunamazsa
Try 6: Sosyal medya kaynakları (LinkedIn, IG, Maps)
  ↓ bulunamazsa
Sonuç: "Veri bulunamadı — aşağıdaki manuel yöntemleri dene"
```

## Ne Zaman Devreye Girer
- agent-browser 3 denemede başarısız olduğunda
- http-alt-channel da başarısız olduğunda
- Aranılan bilgi hiçbir kaynakta bulunamadığında
- Site tamamen kapalı/çöktüğünde (404, domain satılık vb.)
