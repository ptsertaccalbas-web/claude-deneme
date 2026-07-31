# LUMI AI — DURUM, SORUNLAR VE ÇÖZÜMLER

## 1. theHarvester SORUNU VE ÇÖZÜMÜ

### Sorun
theHarvester v4.11.1, .com.tr domain'lerde email/subdomain bulamıyor.

### Neden
- theHarvester varsayılan olarak public search engines (Google, Bing) kullanır
- .com.tr domainler için bu motorlar çok az sonuç döndürür
- Küçük/orta ölçekli firmaların email/subdomain'leri Google'da indekslenmemiş

### Çözümler (Öncelik Sırasına Göre)

| # | Çözüm | Zorluk | Açıklama |
|---|-------|--------|----------|
| 1 | **Hunter.io API** | Kolay | `-b hunter` ile API key gir → 25 sorgu/ay ücretsiz. .com.tr'de email bulma başarısı en yüksek |
| 2 | **Anubis** | Kolay | `-b anubis` — subdomain keşfi için en iyi ücretsiz kaynak |
| 3 | **Certspotter** | Kolay | `-b certspotter` — SSL sertifikalarından subdomain çıkarır |
| 4 | **DNSDumpster** | Kolay | `-b dnsdumpster` — DNS kayıtları |
| 5 | **Tomba.io** | Orta | Hunter alternatifi, 25 sorgu/ay ücretsiz |
| 6 | **Skymem** | Kolay | `-b skymem` — email toplama (ücretsiz, sınırlı) |

### Öneri
En etkili yöntem: **Hunter.io API + Anubis** kombinasyonu
```
theHarvester -d firma.com.tr -b hunter,anubis,certspotter,dnsdumpster -l 200
```

---

## 2. FİYATLANDIRMA REVİZYONU (EUR)

### Yeni Paket Yapısı

| Paket | İçerik | Eski TL | Yeni EUR |
|-------|--------|---------|----------|
| 🥇 **Dijital Varlık (Kurumsal)** | Web sitesi (10 sayfa) + SEO + SM yönetimi + E-ticaret entegrasyonu | 5.000 TL/ay | **€2.000/ay** |
| 🥈 **Dijital Dönüşüm** | SEO + hız + SM + içerik stratejisi | 4.000 TL/ay | **€1.500/ay** |
| 🥉 **Dijital Kimlik (Başlangıç)** | Web sitesi (5 sayfa) + GMB + temel SEO | 3.000 TL/ay | **€1.000/ay** |
| 💎 **Hasta Kazan (Dental)** | Site + randevu + IG + Google Ads dental | 5.000 TL/ay | **€1.800/ay** |

### Tekil Projeler

| Hizmet | EUR |
|--------|-----|
| Web sitesi tasarım + lansman | €3.000 - €6.000 |
| SEO audit + optimizasyon | €1.000 - €2.500 |
| Instagram 0'dan kurulum + 3 ay yönetim | €2.500 - €4.000 |
| İtibar yönetimi (3 ay) | €2.000 - €4.000 |
| E-ticaret kurulumu (B2B/B2C) | €4.000 - €8.000 |
| Online randevu sistemi (dental) | €1.500 - €3.000 |

---

## 3. HEDEF KİTLE: EUR/USD KAZANAN FİRMALAR

### Tier 1: Sanayi Devleri (>€50M ciro)
| Firma | Gelir | İhracat | Neden LUMI |
|-------|-------|---------|-----------|
| **Korozo Ambalaj** | €254.7M | 80+ ülke | 3.6⭐ itibar krizi — CEO outreach gereklidir |
| **Modern Ambalaj (Eren Holding)** | €100M+ | 23 ülke | IG'de 0 gönderi, video içerik yok — kurumsal satış |

### Tier 2: Büyük İhracatçılar ($10M-$50M)
| Firma | Gelir | İhracat | Yaklaşım |
|-------|-------|---------|----------|
| **Divan Ambalaj** | $10-25M | 42 ülke | Mahmut Divan direkt — en olgun, LinkedIn'i güçlendir, e-posta aç |
| **Amor'e Design** | €5-15M | 20+ ülke (Alman sermaye) | Birsen Mutlu (sales@amoredesign.de) — TR/EN/DE site güçlendirme |

### Tier 3: Orta Ölçek ($500K-$10M)
| Firma | Gelir | İhracat | Outreach |
|-------|-------|---------|----------|
| **Haay Ambalaj** | $1-3M | 6 dil | Niyazi Koluş — teslimat krizi, LUMI çözümüne açık |
| **Gizpak Ambalaj** | $3-8M | Almanya/Azerbaycan | Cengiz Bayraktar — IG/LinkedIn zayıf, dijitalde büyüme potansiyeli |
| **Sarcina Ambalaj** | $2-5M | İngiltere ofisi | Murat Kurt — en aktif LinkedIn, blog stratejisi |
| **Yılmaz Ambalaj** | $1-3M | İhracat yapıyor | Ramazan — placeholder metinler, SM zayıf |
| **Özden Ambalaj** | $500K-2M | İhracat | Arda Özden (26) — genç girişimci, dijitale açık |
| **Elif Ambalaj** | $5-10M | TR/EN site | Volkan Akpunar — LinkedIn pasif, sahte IG sorunu |

### Tier 4: Dental Turizm (Direkt EUR/USD)
| Firma | Potansiyel | Yaklaşım |
|-------|-----------|----------|
| **Trakyadent** | €500K-2M | 4 şube, 6.290 IG, yabancı hasta + Türk hasta dengesi |
| **Aqua Dental** | €300K-1.5M | Dental turizm, zincir marka, Corlu subesi |
| **İnci Diş** | €100K-500K | Resmi Sağlık Turizmi belgeli, Bulgar hastalar |
| **Fulya Diş** | €200K-1M | 5 dil, 525 yorum, zincir |

### Öncelikli Outreach Sırası (EUR)

| Sıra | Firma | Paket | Tahmini Bütçe |
|------|-------|-------|---------------|
| 1 | Divan Ambalaj | Dijital Varlık (€2.000/ay) | €24.000/yıl |
| 2 | Amor'e Design | Dijital Kimlik + SEO (€3.000) | €6.000 tek sefer |
| 3 | Gizpak Ambalaj | Dijital Dönüşüm (€1.500/ay) | €18.000/yıl |
| 4 | Sarcina Ambalaj | Dijital Dönüşüm (€1.500/ay) | €18.000/yıl |
| 5 | Haay Ambalaj | Operasyonel + CRM (€2.000 tek) | €2.000 tek sefer |
| 6 | Yılmaz Ambalaj | Dijital Kimlik (€1.000/ay) | €12.000/yıl |
| 7 | Elif Ambalaj | SM Yönetimi (€1.500/ay) | €18.000/yıl |
| 8 | Özden Ambalaj | E-ticaret (€2.000 tek) | €2.000 tek sefer |
| 9 | Trakyadent | Hasta Kazan (€1.800/ay) | €21.600/yıl |
| 10 | İnci Diş | Dijital Kimlik (€1.000/ay) | €12.000/yıl |

---

## 4. ENGEL/BLOKER ÇÖZÜMLERİ (ÖNCELİK SIRASI)

### 🔴 P1: İTO WAF + Captcha (guncelle.ito.org.tr)

| Adım | Çözüm | Süre |
|------|-------|------|
| 1 | **Scrapling StealthyFetcher** ile test — AsyncFetcher 200 OK döndü. StealthyFetcher dene (daha gelişmiş fingerprint) | 1 gün |
| 2 | **Tesseract OCR kurulumu** — PHP GD 4 haneli captcha görselini çöz. Powershell ile kurulabilir (winget install Tesseract) | 1 gün |
| 3 | **2Captcha/DeathByCaptcha** — captcha çözüm servisi (1000 çözüm ~$3). Manuel müdahale gerektirmez | 30 dk |
| 4 | **Alternatif: E-Fatura portali** — İTO üyelerinin e-fatura sorgulama paneli, daha az korumalı olabilir | Araştırma gerek |
| 5 | **Plan B: Fiziksel başvuru** — İTO binasına gidip firma sicil sorgulama (son çare) | 1 gün |

### 🟠 P2: MERSİS (mersis.ticaret.gov.tr)

| Adım | Çözüm | Süre |
|------|-------|------|
| 1 | **e-Devlet şifresi temini** — PTT'den alınır (kimlik + 2 TL). Otomasyon imkansız, manuel giriş gerekli | 1 gün |
| 2 | **MERSİS sorgulama** — Giris yapinca vergi no ile tum firma bilgileri görünür | 30 dk |
| 3 | **Otomasyon siniri** — e-Devlet TOS'a göre scraping yasak. Sadece manuel sorgulama yapilabilir | Sürekli |
| 4 | **Alternatif: Findeks/KolayBilgi** — Ücretli ticari sicil sorgulama platformlari (aylik ~500 TL) | 1 gün |

### 🟡 P3: Çorlu TSO / Çerkezköy TSO Encoding Sorunu

| Adım | Çözüm | Süre |
|------|-------|------|
| 1 | **GET sektör listeleme** — ÇÖZÜLDÜ. Session cookie + decode('iso-8859-9') ile çalışıyor | ✅ TAMAM |
| 2 | **POST arama** — ASP.NET viewstate + encoding combination dene. `encode('iso-8859-9')` ile POST body dene | 1-2 gün |
| 3 | **Alternatif: Oda yüz yüze başvuru** — Firma sahipleri odaya gidip sorgulama yapabilir sizin adiniza | Manuel |
| 4 | **Plan B: Ticaret Sicil Gazetesi** — turkiye.ticaretsicil.gov.tr'den ücretsiz sorgulama | 1 gün |

### 🟢 P4: Whonix/Gateway Proxy Koruması

| Adım | Çözüm | Süre |
|------|-------|------|
| 1 | **Free proxy yeterli** — Scout + theHarvester + Holehe icin mevcut yöntem yeterli | ✅ TAMAM |
| 2 | **Rate limiting** — Komutlara `Start-Sleep -Seconds 3-5` ekleyerek IP ban riskini azalt | 1 gün |
| 3 | **Proxy rotasyonu** — Gerektiğinde `proxies.yaml` kullan (theHarvester destekliyor) | 30 dk |
| 4 | **Whonix kurulumu** — Sadece çok hassas operasyonlarda gerekli. Şimdilik ertele | Planlanmadı |

### ⚪ P5: Vergi Numarası Eksikliği

| Adım | Çözüm | Süre |
|------|-------|------|
| 1 | **e-Devlet + MERSİS** — Şifre temin edilince tüm firmaların vergi nosu görünür | 1 gün |
| 2 | **GİB (Gelir İdaresi)** — vergilevokta.gib.gov.tr'den vergi no sorgulama (kurumsal firma adiyla) | 1 gün |
| 3 | **KolayBilgi/Findeks** — Ücretli sorgulama (~500 TL/ay), toplu sorgu imkanı | 1 gün |

---

## 5. EYLEM PLANI (NE YAPMALIYIZ)

### Hafta 1: Engelleri Çöz
| Gün | İş |
|-----|----|
| 1 | **theHarvester** — Hunter.io ücretsiz API al (`-b hunter`), Anubis ile test et |
| 1 | **Tesseract OCR** kurulumu (winget install TesseractOCR) |
| 2 | **Scrapling StealthyFetcher** ile İTO captcha bypass test |
| 3 | **e-Devlet şifresi** almak için PTT'ye git |
| 4 | **Çorlu TSO POST arama** encoding fix dene |
| 5 | **Hunter.io + Anubis** ile toplu email/subdomain taraması (40 domain) |

### Hafta 2: EUR/Outreach Başlangıcı
| Gün | İş |
|-----|----|
| 1 | **Divan Ambalaj** — Mahmut Divan'a özel EUR-teklif e-postası (€2.000/ay paket) |
| 2 | **Amor'e Design** — Birsen Mutlu'ya sales@amoredesign.de üzerinden LinkedIn + e-posta |
| 3 | **Gizpak Ambalaj** — Cengiz Bayraktar'a kişiselleştirilmiş EUR teklif |
| 4 | **Sarcina Ambalaj** — Murat Kurt'a export@sarcina.com.tr üzerinden |
| 5 | **Haay Ambalaj** — Niyazi Koluş'a teslimat krizi çözümü + yeni web paketi |

### Hafta 3-4: Zone-1A Tamamlama
| Gün | İş |
|-----|----|
| 1-2 | Kalan EUR hedefli firmalar (Yılmaz, Elif, Özden, Trakyadent, İnci Diş) |
| 3-4 | Zone-1A TL hedefli firmalar (Sevgi Diş, Çorlu İlgi, Beyaz Diş vb.) |
| 5 | İlk haftanın takipleri (telefon + LinkedIn) |

### Hafta 5: WHOIS Domainlooker
| Gün | İş |
|-----|----|
| 1 | Domainlooker kurulumu veya whois.py scripti ile 40+ domain sorgulama |
| 2 | Domain kayıt bilgileri raporu (kayıt/bitiş/whois gizlilik/kayıt şirketi) |
| 3 | SSL bitiş tarihleri yaklaşan domainleri uyar (erdeambalaj.com.tr 25 Ağustos) |

---

## 6. ÖZET: ŞU ANKİ DURUM

| Başlık | Durum |
|--------|-------|
| 47 firma deep dive | ✅ %100 |
| SSL taraması | ✅ 38/40 aktif |
| Sherlock OSINT | ✅ 10 username |
| Holehe email | ✅ 12 email |
| Scout IG taraması | ✅ 29 handle |
| Nuclei zafiyet taraması | ✅ 1 CVE bulundu |
| theHarvester | ❌ Hunter.io API gerekli |
| WHOIS/Domainlooker | ❌ Henüz yapılmadı |
| İTO WAF bypass | 🔄 StealthyFetcher denenecek |
| MERSİS erişim | ❌ e-Devlet şifresi gerekli |
| VS Code Tunnel (telefon erişimi) | ✅ Aktif, servis kayıtlı |
| LUMI Outreach stratejisi | ✅ Zone-1A/1B/2A/2B/2C + kişiselleştirilmiş metinler |
| EUR fiyatlandırma | ✅ Yeni paketler (€1.000-€2.000/ay) |
| EUR hedef firma listesi | ✅ 10 firma belirlendi |
