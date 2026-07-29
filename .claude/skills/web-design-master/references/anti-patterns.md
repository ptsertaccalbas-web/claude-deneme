# Anti-Patterns: Kaçınılması Gereken AI Desenleri

## Simetri (En Büyük AI Belirtisi)
- ❌ Her şeyi ortalamak (başlık, metin, buton)
- ✅ Asimetrik kompozisyon kullanmak

## Tekdüze Section Yapısı
- ❌ Tüm sectionlar aynı max-w, aynı py, aynı layout
- ✅ Her section farklı genişlik, farklı boşluk

## Aşırı Gradyan ve Cam Efektleri
- ❌ glassmorphism, parlak gradientler, glow efektleri
- ✅ Düz renkler, çok hafif noise texture

## Büyük Harf Etiketler
- ❌ "HİZMETLERİMİZ", "İLETİŞİM" gibi all-caps
- ✅ Hiç etiket kullanmamak veya küçük harf "hizmetler"

## Jenerik İçerik
- ❌ Stock fotoğraf, placeholder ikonlar
- ✅ Gerçek proje görselleri, özgün veri

## Aşırı Animasyon
- ❌ Otomatik oynayan carousel, marquee, typing cursor
- ✅ Sadece kullanıcı etkileşiminde animasyon

## Aynı Boyutta Kartlar
- ❌ Tüm kartlar eşit genişlik, eşit yükseklik
- ✅ Bazı kartlar geniş, bazıları dar

## Sıralı Section'lar
- ❌ Hero → Hizmetler → Hakkımızda → İletişim (tahmin edilebilir)
- ✅ Farklı hikaye akışı, sürpriz yapı

## Düz CSS Scroll
- ❌ scroll-behavior: smooth (janky)
- ✅ Lenis ile smooth scroll
