# BRAND PROCESS — Her Marka İçin İzlenecek Yol

## Adım 1: Vibe Analizi
- [ ] Sektör nedir? (B2B/B2C, endüstriyel/yaratıcı/kurumsal)
- [ ] Marka kişiliği: (güçlü/güvenilir/teknik/yaratıcı/lüks/samimi)
- [ ] Hedef kitle kim? (mühendisler/C-level/tüketiciler)
- [ ] Rakiplerin sitesi nasıl? (eski/modern/ne renkler)
- [ ] "Bu marka bir insan olsa nasıl giyinir, nasıl konuşurdu?"

## Adım 2: Font Seçimi (type-artist skill)
- [ ] Başlık fontu: karakterli, sektörü yansıtan
- [ ] Gövde fontu: okunabilir, başlıkla kontrastlı
- [ ] Max 2 aile (1 başlık + 1 gövde)
- [ ] Variable font varsa animasyon kullan

### Font Pairing Rehberi
| Sektör | Başlık | Gövde | Neden |
|--------|--------|-------|-------|
| Endüstriyel/İmalat | Oswald | Inter | Güçlü, kondense, teknik |
| Diş Kliniği/Sağlık | Cinzel / DM Serif | DM Sans | Güven, otorite, temiz |
| Teknoloji/Yazılım | Space Grotesk | Geist | Modern, futuristik |
| Moda/Tasarım | Playfair Display | Inter | Zarif, premium |
| Hukuk/Danışmanlık | Lora | Source Sans | Klasik, güvenilir |
| Gıda/Samimi | Fraunces | Nunito | Sıcak, davetkar |

## Adım 3: Renk Paleti (design-system skill)
- [ ] 1 primary (marka rengi)
- [ ] 1 accent (vurgu, CTA)
- [ ] 2-3 nötr (arkaplan, yüzey, metin, border)
- [ ] Toplam 5 rengi geçme
- [ ] Kontrast kontrol: WCAG AA (4.5:1)

## Adım 4: Tasarım Sistemi Token'ları
- [ ] Renk token'ları (--color-*)
- [ ] Font token'ları (--font-*)
- [ ] Spacing scale (--spacing-*)
- [ ] Border radius (--radius-*)
- [ ] Shadow (--shadow-*)

## Adım 5: Uygulama
- [ ] globals.css'te @theme inline ile token'lar
- [ ] layout.tsx'te fontlar
- [ ] Sayfada komponentler token'larla
- [ ] Animasyon: GSAP (scroll) + Motion (interaktif)
- [ ] Build hatasız
- [ ] Deploy Vercel
