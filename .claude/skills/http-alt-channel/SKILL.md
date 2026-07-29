---
name: http-alt-channel
description: agent-browser WAF/captcha/JS challenge nedeniyle bloklanınca veya başarısız olunca devreye girer. Doğrudan HTTP ile (Invoke-WebRequest, curl) karakter seti yönetimi, session/cookie yönetimi ve POST form sorgulama yaparak veri çeker. Özellikle TSO rehberleri, statik siteler ve API'ler için.
---

# HTTP Alternatif Kanal — Tarayıcısız Veri Çekme

agent-browser'ın erişemediği sitelerde doğrudan HTTP istekleri ile veri toplar.

---

## Ne Zaman Kullanılır

1. `agent-browser` 403/429/503 alırsa veya captcha'ya takılırsa
2. Hedef site statik HTML veya basit form sorgulama sunuyorsa (TSO rehberleri gibi)
3. API endpoint'i mevcut ve doğrudan JSON/XML dönüyorsa
4. agent-browser'a gerek yok, sayfa basit GET/POST ile çekilebiliyorsa (önce dene)

## Kullanım Talimatları

### 1. Hedefi Analiz Et
- Site statik mi? → Invoke-WebRequest ile GET
- Form mu var? → POST ile form data gönder
- API mi var? → JSON/XML endpoint'ini bul
- Login gerekiyor mu? → Session cookie'sini al

### 2. Encoding Yönetimi
Türkçe sitelerde sık karşılaşılan sorun:
```
# ISO-8859-9 (Windows-1254) için:
$response = Invoke-WebRequest -Uri $url
[System.Text.Encoding]::GetEncoding('iso-8859-9').GetString($response.Content)

# UTF-8 için:
[System.Text.Encoding]::UTF8.GetString($response.Content)

# Otomatik tespit:
$encoding = $response.Encoding
if ($encoding -eq 'iso-8859-9' -or $encoding -eq 'windows-1254') {
    $decoded = [System.Text.Encoding]::GetEncoding('iso-8859-9').GetString($response.Content)
}
```

### 3. POST/Form Sorgulama (TSO Rehberleri)
```powershell
# Çorlu TSO E-Rehber sorgulama
$body = @{
    'FirmaAdi' = $firmaAdi
    'SektorId' = $sektorId  # Ambalaj: 29
    'sayfa' = 1
} | ConvertTo-Json

$headers = @{
    'Content-Type' = 'application/json'
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    'Accept' = 'application/json, text/plain, */*'
    'Origin' = 'https://rehber.corlutso.org.tr'
    'Referer' = 'https://rehber.corlutso.org.tr/'
}

$response = Invoke-WebRequest -Uri "$baseUrl/api/firma/sorgula" `
    -Method POST `
    -Body ($body | ConvertTo-Json) `
    -Headers $headers `
    -ContentType 'application/json; charset=utf-8'
```

### 4. Session/Cookie Yönetimi
```powershell
# Session nesnesi kullan (cookie'leri otomatik saklar)
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$response = Invoke-WebRequest -Uri $url -WebSession $session
# Sonraki isteklerde aynı $session'ı kullan
```

### 5. Hata Yönetimi
```
Başarılı HTTP → veriyi işle
403/429 → header düzenle, proxy dene, delay ekle
SSL hatası → -SkipCertificateCheck (güvenilmez sertifikalar için)
Timeout → -TimeoutSec 30 ile bekleme süresini artır
Boş yanıt → encoding'i kontrol et, charset meta tag'ını bul
```

## scripts/
- `invoke-generic.ps1` — Genel amaçlı HTTP GET/POST çağrıcı
- `tso-sorgula.ps1` — Çorlu/Çerkezköy TSO rehber sorgulama (mevcut TSO-SORGULA.ps1 referans alınır)

## Çalışma Şekli
- agent-browser başarısız olursa veya hedef basit GET/POST ile çekilebiliyorsa devreye gir
- Önce sayfa yapısını analiz et (form var mı, API var mı, encoding nedir)
- Uygun yöntemle HTTP isteği yap
- Başarısız olursa fallback-strategy'yi tetikle
