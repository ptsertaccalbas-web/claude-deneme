# OPSEC Kontrol Listesi

## ───── GÜNLÜK BAŞLANGIÇ ─────

### Ağ Güvenliği
- [ ] VPN bağlı ve aktif
- [ ] IP sızdırma testi yapıldı (DNS/WebRTC/IPv6)
- [ ] Proxy çalışıyor (curl ifconfig.me ile doğrula)
- [ ] Gerçek IP log'larda görünmüyor

### Ortam
- [ ] Çalışma dizini temiz (önceki session kalıntısı yok)
- [ ] Browser cache/cookie temizlendi
- [ ] Geçici dosyalar silindi
- [ ] Session dosyaları temizlendi

## ───── OPERASYON ÖNCESİ ─────

### Hedef Analizi
- [ ] Hedef lead'in sitesi daha önce ziyaret edildi mi? (aynı IP ile)
- [ ] Hedef WAF kullanıyor mu? (403/429 geçmişi)
- [ ] Hedef Türkiye'de mi, yurtdışında mı? (lokasyon uyumu)
- [ ] Hedefin hosting sağlayıcısı ne? (Cloudflare? İTO?)

### Proxy/IP Seçimi
- [ ] Bu lead için hangi proxy/IP kullanılacak?
- [ ] Bu IP daha önce hangi lead'ler için kullanıldı?
- [ ] IP rotasyon sınırı aşıldı mı?
- [ ] Proxy yanıt süresi kabul edilebilir mi? (<5sn)

### Rate Limit
- [ ] Operasyon türüne uygun gecikme değerleri
- [ ] Toplam tahmini süre hesaplandı
- [ ] Acil durum planı (bloklanırsa ne yapılacak?)

### Session
- [ ] Yeni/izole session oluşturuldu
- [ ] Cookie jar temiz
- [ ] headers (UA, Accept-Language, vb.) ayarlandı

## ───── OPERASYON SIRASI ─────

### [ ] Her istek öncesi:
  - [ ] Rate limit beklemesi yapıldı
  - [ ] UA rotasyonu yapıldı
  - [ ] Proxy hala aktif mi kontrol edildi
  - [ ] Response code kontrol edildi (4xx/5xx → dur)

### [ ] Uyarı işaretlerini izle:
  - [ ] ❗ 403 → WAF, proxy değiştir
  - [ ] ❗ 429 → rate limit çok hızlı, bekleme artır
  - [ ] ❗ 503/502 → hedef yavaş, yedekle
  - [ ] ❗ Captcha → agent-browser-debug
  - [ ] ❗ Zaman aşımı → timeout artır veya proxy değiştir

## ───── OPERASYON SONRASI ─────

### [ ] Temizlik:
  - [ ] Geçici dosyalar silindi
  - [ ] Cookie/cache temizlendi
  - [ ] Session kapatıldı
  - [ ] Log'lardan IP/session bilgisi temizlendi

### [ ] Doğrulama:
  - [ ] Proxy testi: IP sızdırmıyor
  - [ ] Hedef sitede anormal aktivite yok
  - [ ] Hiçbir hesap uyarısı/ban yok

## ───── HAFTALIK BAKIM ─────

### [ ] Proxy durumu:
  - [ ] Kullanılan proxy'ler hala aktif mi?
  - [ ] Yeni proxy listesi gerekli mi?
  - [ ] Free proxy rotasyonu yapıldı mı?

### [ ] IP rotasyon takibi:
  - [ ] Hangi IP hangi lead'ler için kullanıldı
  - [ ] Herhangi bir lead'den geri dönüş/şikayet var mı?
  - [ ] IP karalisteye alındı mı?

### [ ] OPSEC log analizi:
  - [ ] Kaç bloklama oldu?
  - [ ] Hangi lead'lerde sorun yaşandı?
  - [ ] İyileştirme önerileri

## ───── KRİZ PROSEDÜRÜ ─────

### Bloklanırsa:
1. ⛔ Derhal tüm operasyonları durdur
2. 🔍 Blok türünü teşhis et (WAF/captcha/rate limit/ban)
3. 🔄 Proxy/IP değiştir
4. ⏱ 15-30 dk bekle
5. 🔄 Daha düşük rate limit ile tekrar dene
6. ❌ Hala blok varsa bu lead'i sonraya bırak

### Hesap tehlikedeyse:
1. ⛔ Hesabı derhal kullanmayı durdur
2. 🔑 Şifre değiştir (güvenli makineden)
3. 📧 2FA etkinleştir (değilse)
4. 📋 Aktivite loglarını kontrol et
5. 🔍 İhlal tespiti yap
