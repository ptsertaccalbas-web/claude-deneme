# Ambalaj Fabrikası Deep Dive — BULGULAR

## 1. GERÇEK KİMLİK
| Bilgi | Değer |
|-------|-------|
| **Firma Adı** | Ambalaj Fabrikası |
| **Web** | ambalajfabrikasi.tr |
| **Telefon** | +90 536 556 17 13 / +90 534 491 29 27 |
| **E-posta** | gokkusagiambalaj@outlook.com |
| **Adres** | İkitelli OSB, Triko Center Sanayi Sitesi S3 Blok No:149 |
| **Google Puanı** | ❌ Yok (0 yorum, Maps'te yok) |
| **Çalışan** | 2-10 |
| **Kuruluş** | ~2024 (yeni) |
| **İlişkili Firma** | Gökkuşağı Ambalaj (e-posta adresinden) |

## 2. DİJİTAL AYAK İZİ
| Platform | Durum | Detay |
|----------|-------|-------|
| ambalajfabrikasi.tr | ⚠️ Yeni | Temel HTML, keyword stuffing, fake review schema |
| ambalajfabrikasi.com | ❌ Farklı firma | G-Soft e-ticaret, başka işletme |
| Google Maps | ❌ **Yok** | Hiç listing yok |
| Yandex Maps | ✅ Var | 0 yorum, 0 fotoğraf |
| Instagram | ❌ Terk | 4 takipçi, 0 gönderi |
| Facebook | ⚠️ Kısıtlı | Sayfa var, içerik gizli |
| LinkedIn | ⚠️ Zayıf | 81 takipçi, hiç içerik yok |
| WhatsApp | ✅ Var | Site üzerinden buton mevcut |

## 3. WEB SİTESİ ANALİZİ
Temel HTML/CSS, mobil uyumlu görünüyor. Çok ağır — her sayfada inline keyword stuffing. **Black-hat SEO**: Tüm ürünlerde sahte "Ali Yılmaz" yorumu, "4.5 puan, 10 yorum" kopyalanmış. Schema.org yanlış kullanımı Google cezası riski. `priceValidUntil: 2024-12-31` — geçmiş tarih. SSL + GTM + GA4 var.

## 4. KRİTİK BULGULAR
- **Black-hat SEO**: Fake review schema ile Google botlarını yanıltma — manual action riski
- **Gökkuşağı Ambalaj bağlantısı**: E-posta gokkusagiambalaj@outlook.com
- **Adres çelişkisi**: Web'de Triko Center, Yandex'de Mutfak Eşyacıları — farklı binalar
- **Yeni işletme** (~2024), henüz oturmamış
- MERSİS/ticaret sicil kaydı bulunamadı

## 5. ZAAFLAR
| # | Zaaf | Şiddet | LUMI Çözümü |
|---|------|--------|-------------|
| 1 | Google Maps listing yok — yerel görünürlük sıfır | 🔴 YÜKSEK | GMB profili oluşturma |
| 2 | Black-hat SEO — Google penalizes riski | 🔴 KRİTİK | Sahte schemaları kaldırma |
| 3 | Sosyal medya ölü | 🟠 ORTA | Sosyal medya yönetimi |
| 4 | Adres/telefon tutarsız | 🟠 ORTA | NAP standardizasyonu |
| 5 | E-ticaret yok, sadece WhatsApp | 🟠 ORTA | WhatsApp API entegrasyonu |

## 6. STRATEJİ
**Öncelik**: 🟢 DÜŞÜK — mikro işletme, düşük bütçe, düşük olgunluk
**Outreach**: "Siteniz Google cezası yiyebilir — sahte yorum schemaları kullanıyorsunuz. Bunu düzeltip sizi doğru şekilde Google'da görünür yapalım."
**Kime**: gokkusagiambalaj@outlook.com veya WhatsApp

---

## 6. SSL DURUMU (sslyze - 26.07.2026)
| Alan | Deger |
|---|---|
| Domain | ambalajfabrikasi.tr |
| SSL | Aktif |
| Bitis | 2026-10-21 (87 gun) |
| Heartbleed | Dayanikli |
| ROBOT | Dayanikli |
| HSTS | Yok |