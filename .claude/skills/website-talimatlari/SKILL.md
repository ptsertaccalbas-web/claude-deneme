---
name: website-talimatlari
description: LUMI AI Media proje-ozel talimat (kaynak: .opencode/skill/website-talimatlari.md)
---

> Kaynak: .opencode/skill/website-talimatlari.md -- opencode ile senkron tutulur, biri guncellenince digeri de guncellenmeli.

# Web Sitesi Talimatları

Her website işine başlamadan ÖNCE bu dosyayı oku. Her maddeyi tek tek kontrol et.

## 1. Girdiler
- [ ] 3 referans sitesi istendi mi? (vibe yakalamak için)
- [ ] Sektör + sayfa listesi alındı mı? (kaç sayfa, hangileri)
- [ ] Hedef net mi? (satış / başvuru / bilgilendirme / portfolyo)

## 2. Önceki Çalışmalar
- [ ] `/studio` sayfasındaki mevcut component'lere bak (marquee, canvas, form, vb.)
- [ ] `SESSION.md`'de daha önce yapılmış tasarımları oku
- [ ] `REFERANS-SITELER.md`'deki pattern kütüphanesine bak, proje tipine uygun referans seç
- [ ] Yeniden kullanılacak bir component varsa kopyala, sıfırdan yazma

## 3. Sayfa Yapısı
- [ ] Header: logo + navigasyon + dil butonu (TR/EN)
- [ ] Hero: başlık + alt başlık + CTA
- [ ] Feature/stats section (varsa)
- [ ] Marquee (yatay kayan metin) — `/studio`'daki gibi
- [ ] Pricing (varsa)
- [ ] Contact form / CTA
- [ ] Footer
- [ ] Çok sayfalı ise router yapısı kuruldu mu?

## 4. Görseller
- [ ] Fotoğraf kullanılacaksa kaynak belirtildi mi? (Unspash/Pexels CDN linki)
- [ ] Fotoğraf yoksa renk + gradient + pattern ile geçici doldur
- [ ] Görsellerle renk paleti uyumu kontrol edildi mi?

## 5. Butonlar & Yönlendirmeler
- [ ] Her buton bir yere yönlendiriyor mu? (sayfa içi #id scroll / /sayfa route)
- [ ] "Boş dönen" buton var mı? (varsa tasarımı durdurma, bana belirt — "X butonu henüz bir sayfaya bağlı değil, sonra hallederiz")

## 6. Teknik
- [ ] Next.js App Router
- [ ] Tailwind CSS v4
- [ ] Lenis (smooth scroll) + GSAP ScrollTrigger sync
- [ ] GSAP (animasyonlar) — `gsap.to()` + CSS initial state, `gsap.from()` DEĞİL
- [ ] Custom cursor (nokta+halka)
- [ ] Noise/grain overlay (shaders.ts ile)
- [ ] Ambient glow (CSS gradient, asla floating orb değil)
- [ ] Z-ekseni scroll camera (Three.js + shared/scroll-camera)
- [ ] Design token'lar (direkt renk class'ı yok: `text-white`, `bg-[#xxx]`)
- [ ] ALL CAPS tracking (+0.04em ila +0.08em)
- [ ] Dil desteği: TR/EN dictionary
- [ ] Build testi: `npm run build` hatasız mı?

## 7. Hata Tespit ve Giderme
- [ ] Hata oluşursa: 3 kez düzeltmeyi dene
- [ ] 3 denemede çözülmezse: döngüye girme, hatayı not al, işe devam et
- [ ] İş bitince çözülemeyen hataları bana bildir (nerede, ne hata, ne denendi)

## 8. Mobil
- [ ] Mobil görünüm kontrol edildi mi?
- [ ] Menu hamburger çalışıyor mu?
- [ ] Butonlar full-width mi? (mobilde)
- [ ] Yazılar taşmıyor mu?
