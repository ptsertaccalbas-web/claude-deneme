# OSINT Demo Raporu — İhsaş Ambalaj
## LUMI AI — Dijital Varlık Tehdit Analizi ve Rekabet İstihbaratı

**Rapor Tarihi:** 26 Temmuz 2026
**Hedef:** ihsasambalaj.com
**Rapor Türü:** Basic Threat Guard (Demo)
**Süre:** Tek seferlik ön tarama

---

## Yönetici Özeti

İhsaş Ambalaj'ın kurumsal web sitesi (ihsasambalaj.com) **şu an tamamen erişilemez durumda.** Hem HTTP (80) hem HTTPS (443) portları yanıt vermiyor. Bu, potansiyel müşterilerin siteye ulaşamadığı anlamına gelir — aktif bir işletme için kritik bir dijital varlık sorunudur.

| Metrik | Değer | Durum |
|---|---|---|
| Web Sitesi Erişilebilirliği | HTTP/HTTPS timeout | 🔴 KRİTİK |
| SSL Sertifikası | Bağlantı kurulamadı | 🔴 KRİTİK |
| E-posta Altyapısı | Office 365 (Microsoft) | 🟢 AKTİF |
| Google Maps Puanı | 5.0 ⭐ (21 yorum) | 🟡 RİSKSİZ |
| Sosyal Medya Varlığı | Tespit edilemedi | 🔴 ZAYIF |
| Veri Sızıntısı | Tespit edilmedi | 🟢 TEMİZ |

---

## 1. Domain ve Hosting Analizi

| Alan | Değer |
|---|---|
| **Domain** | ihsasambalaj.com |
| **DNS** | 185.149.100.146 |
| **Hosting** | Veridyen (luna.veridyen.com) |
| **SSL** | ❌ Bağlantı kurulamadı |

### Bulgu #1: Web Sitesi Erişilemez (KRİTİK)

Hem HTTP (80) hem HTTPS (443) portları 30 saniyelik timeout sonunda yanıt vermedi. Bu şu anlamlara gelebilir:
- Sunucu çökmüş veya kapatılmış
- SSL sertifikası süresi dolmuş ve yenilenmemiş
- Hosting hesabı askıya alınmış
- Güvenlik duvarı tüm trafiği engelliyor

**Etki:**
- Potansiyel müşteriler siteye ulaşamıyor
- Google sıralaması düşer
- Marka güvenilirliği zedelenir

---

## 2. E-posta ve Kimlik Avı Analizi

| Alan | Değer |
|---|---|
| **E-posta** | info@ihsasambalaj.com |
| **E-posta Sağlayıcı** | Office 365 (Microsoft) ✅ Doğrulandı |
| **Sızıntı Durumu** | Temiz — bilinen veri ihlallerinde bulunamadı |

### Bulgu #2: Office 365 Kullanımı (BİLGİ)

E-posta altyapısı Microsoft 365 üzerinden yönetiliyor. Bu:
- Kurumsal bir e-posta sistemine sahip olduklarını gösterir (POP3/barındırma değil)
- Ortak çalışma araçlarını (Teams, SharePoint) kullanma ihtimalleri yüksek
- Spam/güvenlik filtrelemesi Microsoft Defender ile yapılıyor

---

## 3. Sosyal Medya ve Dijital Ayak İzi

| Platform | Durum |
|---|---|
| **Google Maps** | 5.0 ⭐ (21 yorum) |
| **TikTok** | @ihsasambalaj — doğrulanmamış |
| **LinkedIn** | Tespit edilemedi |
| **Instagram** | Tespit edilemedi |

### Bulgu #3: Sosyal Kanıt Eksikliği (ORTA)

21 Google yorumu ve 5.0 puan mükemmel bir referans. Ancak:
- Bu memnuniyet hiçbir sosyal medya kanalında paylaşılmıyor
- LinkedIn kurumsal sayfası yok (B2B müşteriler için kritik)
- Müşteri başarı hikayeleri gösterilmiyor

---

## 4. Zafiyet ve Güvenlik Taraması

| Test | Sonuç |
|---|---|
| **Nuclei (6,779 template)** | Site erişilemez olduğu için çalıştırılamadı |
| **SSL Zafiyet** | Site erişilemez olduğu için test edilemedi |
| **Açık Port** | 80 ve 443 — kapalı/timeout |
| **Web Arşivi** | Archive.org'da kayıt bulunamadı |

---

## 5. Stratejik Öneriler

### Acil (0-7 gün)
1. **Hosting sağlayıcısıyla iletişime geçin** — Veridyen destek üzerinden sunucu durumunu sorgulayın
2. **SSL sertifikasını yenileyin** — Let's Encrypt ile ücretsiz, 5 dakikada kurulur
3. **Web sitesini yedekten geri yükleyin** veya geçici bir bakım sayfası yayına alın

### Kısa Vade (1-4 hafta)
4. **Web sitesi modernizasyonu** — Mevcut site zaten güncel değilse, Next.js + Tailwind ile yeniden yazılabilir
5. **LinkedIn Kurumsal Sayfa** açın — B2B ambalaj sektöründe kurumsal müşteriler için olmazsa olmaz
6. **Google My Business** optimizasyonu — 21 yorumun görünürlüğünü artırın

### Orta Vade (1-3 ay)
7. **Düzenli OSINT taraması** — Aylık SSL/sızıntı/rakip takibi (Basic Threat Guard: $1,200/ay)
8. **Rakip istihbaratı** — Benzer ambalaj firmalarının teknoloji/pazarlama hamlelerinin takibi

---

## 6. Teknik Ek (Ham Veriler)

```
DNS: 185.149.100.146
Reverse DNS: luna.veridyen.com
Port 80:  TIMEOUT (30s)
Port 443: TIMEOUT (30s)
E-posta: info@ihsasambalaj.com → Office 365
Sherlock: ihsasambalaj → TikTok, Trakt, Velomania (doğrulanmamış)
Nuclei v3.11.0: Çalıştırılamadı (hedef yanıtsız)
```

---

*Bu rapor LUMI AI tarafından otomatik OSINT araçları kullanılarak hazırlanmıştır. Rapor yalnızca açık kaynak istihbaratına (OSINT) dayanır ve yetkisiz erişim içermez.*
