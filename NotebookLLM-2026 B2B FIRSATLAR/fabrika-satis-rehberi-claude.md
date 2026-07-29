# B2B AI Otomasyon Hizmetleri — Fabrika Sahiplerine Satış Rehberi
## İç Eğitim Dokümanı: "Patron Dili" Versiyonu

---

## 1. Temel Mantık ve Sanayi Analojileri (Sıfır Teknik Terim)

### Model 1: B2B Cold Outreach (Otonom Müşteri Adayı Kazanımı)

**Nedir / Ne İşe Yarar?**
Sizin yerinize, potansiyel müşterilerinizi 7/24 tarayıp, "tam şu anda size ihtiyacı olan" firmaları tespit eden ve onlara özel hazırlanmış bir teklif mektubu gönderen bir sistemdir. Soğuk arama yapan yüzlerce satış elemanı yerine, sadece "sıcak" olan kapıları çalar.

**Sanayi Analojisi:**
Bunu, fabrikanızın kapısında beklemek yerine, bölgedeki tüm rakip fabrikaları ve potansiyel müşterileri gezen, hangisinin yeni bir makine aldığını, hangisinin personel aradığını, hangisinin ihale kaybettiğini not eden ve size sadece "bugün şu firmayı arayın, çünkü şu ihtiyacı var" diyen bir saha istihbarat elemanı gibi düşünün. Ama bu eleman hiç yorulmaz, hiç izin kullanmaz ve aynı anda 500 firmayı takip edebilir.

**Çarklar Nasıl Dönüyor?**
| Girdi | İşlem | Çıktı |
|---|---|---|
| Hedef sektördeki firma listesi | Sistem, firmaların web sitesi, LinkedIn, ilan sitelerini sürekli tarar | "Bu 12 firma şu an alım yapmaya hazır" listesi |
| Tespit edilen fırsat sinyali | Her firmaya özel, o firmanın ismini ve durumunu bilen bir mektup/e-posta hazırlanır | Kişiselleştirilmiş teklif otomatik gönderilir |
| Gelen olumlu cevap | Sistem cevabı okur, "toplantı istiyor" diye işaretler | Satış müdürünüzün takvimine randevu düşer |

**Sözlük:**
- **Lead / Sinyal** = "Alım yapmaya hazır olduğu belli olan müşteri adayı"
- **Otomasyon** = "Elle yapılan işi makinenin yapması"
- **CRM** = "Müşteri takip defterinin dijital, hiç kaybolmayan hali"

---

### Model 2: Design-to-Code Frontend Abonelik Servisi

**Nedir / Ne İşe Yarar?**
Bir web sitesi veya kurumsal yazılım arayüzü tasarımını, insan eliyle haftalarca kod yazmadan, otomatik olarak çalışan bir ürüne dönüştüren sistemdir. Aylık abonelikle sürekli güncellenir.

**Sanayi Analojisi:**
Normalde bir kalıp tasarımından seri üretime geçmek haftalar sürer — önce numune, sonra kalıp düzeltme, sonra üretim. Bu sistem, tasarımı verdiğiniz anda kalıbı otomatik çıkaran ve üretim bandına direkt bağlayan bir CNC tezgahı gibidir: tasarım → ürün arasındaki insan işçiliğini ortadan kaldırır.

**Çarklar Nasıl Dönüyor?**
| Girdi | İşlem | Çıktı |
|---|---|---|
| Tasarımcının hazırladığı görsel taslak | Sistem taslağı okur ve otomatik kod üretir | Çalışan, canlıya alınmaya hazır web sayfası |
| Değişiklik talebi | Sistem farkı algılar, sadece o kısmı günceller | Güncellenmiş sayfa dakikalar içinde yayında |

**Sözlük:**
- **Frontend** = "Müşterinin gördüğü ekran/vitrin kısmı"
- **Abonelik modeli** = "Tek seferlik satış değil, aylık bakım/kira bedeli"
- **MCP** = "Farklı yazılımların birbirine, aynı üretim bandına bağlanır gibi bağlanmasını sağlayan ortak bağlantı standardı"

---

### Model 3: Akıllı Belge İşleme (IDP)

**Nedir / Ne İşe Yarar?**
Faturaları, irsaliyeleri, sözleşmeleri elle bilgisayara girmek yerine, bu evrakları okuyup otomatik olarak muhasebe/ERP sisteminize işleyen dijital bir okuma-yazma elemanıdır.

**Sanayi Analojisi:**
Fabrikanızda her gün gelen yüzlerce irsaliyeyi, faturayı tek tek elle muhasebe programına giren bir personeliniz var. Bu sistem, o personelin yerine geçen ama hiç yorulmayan, hata yapmayan ve gece de çalışan bir "dijital evrak memuru"dur — evrağı tarar, okur, doğru yerlere işler.

**Çarklar Nasıl Dönüyor?**
| Girdi | İşlem | Çıktı |
|---|---|---|
| Taranmış/fotoğrafı çekilmiş fatura | Sistem yazıyı okur, hangi bilginin nereye gideceğini anlar | Muhasebe programına otomatik işlenmiş kayıt |
| Hatalı/eksik bilgi | Sistem şüpheli kaydı işaretler | İnsan personel sadece o kaydı kontrol eder |

**Sözlük:**
- **OCR** = "Kağıttaki yazıyı bilgisayarın okuyabilmesi"
- **ERP** = "Fabrikanın tüm kayıtlarının tutulduğu ana yazılım sistemi"
- **IDP** = "Dijital evrak okuma ve işleme elemanı"

---

### Model 4: OSINT-as-a-Service (Tehdit Analizi ve Rakip İstihbaratı)

**Nedir / Ne İşe Yarar?**
Rakip firmalarınızın ve kendi firmanızın dijital dünyada (internet sitesi güvenliği, sızmış bilgiler, teknoloji değişimleri) ne durumda olduğunu sürekli tarayıp size rapor eden bir istihbarat servisidir.

**Sanayi Analojisi:**
Bu, fabrikanıza 7/24 uyumayan bir güvenlik ve istihbarat elemanı koymak gibidir — hem kendi çitlerinizde (siteniz, sisteminiz) açık kapı var mı diye bakar, hem de rakip fabrikanın hangi yeni makineyi aldığını, hangi müşteriyi kaybettiğini fark eder.

**Çarklar Nasıl Dönüyor?**
| Girdi | İşlem | Çıktı |
|---|---|---|
| Firma adı/web sitesi | Sistem açık kaynaklardan (internet, sosyal medya, güvenlik veritabanları) tarama yapar | "Sizin sitenizde şu açık var" / "Rakibiniz şunu yapıyor" raporu |

**Sözlük:**
- **OSINT** = "Açık kaynaklardan (internet, sosyal medya) toplanan dijital istihbarat"
- **Zafiyet/Açık** = "Fabrikanın çitindeki delik — birinin izinsiz girebileceği nokta"
- **Sızıntı** = "Firma bilgilerinin izinsiz şekilde internette dolaşması"

---

### Model 5: Kurumsal MCP Ağ Geçidi ve Yapay Zeka Ajan Entegrasyonu

**Nedir / Ne İşe Yarar?**
Fabrikanızın tüm iç sistemlerini (stok, muhasebe, müşteri kayıtları) yapay zekanın güvenli şekilde "anlayıp" sorulara cevap verebileceği, rapor çıkarabileceği bir yapıya bağlamaktır. En büyük ve en kapsamlı projedir.

**Sanayi Analojisi:**
Fabrikanızda ayrı ayrı çalışan bantları (stok, üretim, muhasebe, sevkiyat) hayal edin. Bu proje, o bantları tek bir merkezi kontrol odasına bağlamak gibidir — patron artık "bu ayki en çok gecikme yaşanan sevkiyat hangisi" diye sorduğunda, tüm bantlardan anında cevap gelir. Sadece okuma yetkisi verilir, hiçbir bant bu sistem yüzünden durdurulamaz veya değiştirilemez.

**Çarklar Nasıl Dönüyor?**
| Girdi | İşlem | Çıktı |
|---|---|---|
| Fabrikanın mevcut yazılımları (ERP, CRM, stok sistemi) | Sistem bu yazılımları "salt okunur" şekilde birbirine ve YZ'ye bağlar | Patron veya yönetici doğal dilde soru sorar, anında cevap/rapor alır |

**Sözlük:**
- **MCP Ağ Geçidi** = "Farklı makinelerin/sistemlerin aynı kontrol odasına bağlanması"
- **Salt-okunur (read-only)** = "Sadece bakabilir, hiçbir şeyi değiştiremez veya bozamaz"
- **Ajan (AI Agent)** = "Kendi başına görev yapabilen dijital çalışan"

---

## 2. Fabrika Sahibi Açısından Avantaj, Dezavantaj & ROI

### Model 1: B2B Cold Outreach

| | Geleneksel Usül | Bu Sistem |
|---|---|---|
| Maliyet | 2-3 tam zamanlı satış elemanı maaşı (~aylık 3-4 kişi x maaş) | Sabit aylık retainer, değişken personel maliyeti yok |
| Hız | Haftada 20-30 firma araması | Günde yüzlerce firma taranır, sadece sıcak olanlar öne çıkar |
| Tutarlılık | Elemanın o günkü motivasyonuna bağlı | Her gün aynı disiplinde çalışır |

**Somut ROI:** Bir satış elemanının yıllık maliyetinin (maaş+SGK+araç) çoğunu, çok daha fazla firmayı tarayan bir sisteme aktarmış olursunuz; kapanan her randevu başına ek maliyet öder, boşa giden zaman için ödemezsiniz.

**En Büyük İtiraz ve Yanıt:**
> "Bizim işimiz ilişki işi, soğuk mektupla olmaz."
Yanıt: "Haklısınız, ilişkiyi kuracak yine sizsiniz ve satış müdürünüz. Bu sistem sadece kapıyı kimin şu an açık tutacağını size söylüyor — soğuk arama değil, 'şu an tam ihtiyacı olan' firmayı işaretliyor. Siz sadece o kapıyı çalıyorsunuz."

---

### Model 2: Design-to-Code

| | Geleneksel Usül | Bu Sistem |
|---|---|---|
| Süre | Web ajansıyla 6-8 hafta | Günler içinde ilk versiyon |
| Değişiklik maliyeti | Her revizyon ek fatura | Abonelik içinde sınırsız küçük güncelleme |

**Somut ROI:** Yeni bir kurumsal web sitesi/müşteri portalı projesinde ajans maliyetinin önemli kısmından tasarruf, çok daha hızlı canlıya alma.

**En Büyük İtiraz ve Yanıt:**
> "Sitemiz zaten var, ihtiyacımız yok."
Yanıt: "Sitenizin kendisi değil, güncelleme hızı değerli. Yeni bir ürün, kampanya veya şube açtığınızda haftalar değil günler içinde yayında olabilirsiniz."

---

### Model 3: IDP (Akıllı Belge İşleme)

| | Geleneksel Usül | Bu Sistem |
|---|---|---|
| Fatura başı maliyet | Personel saati + hata riski | Fatura başına çok düşük sabit maliyet |
| Hata oranı | İnsan yorgunluğuna bağlı hata | Sistematik, tutarlı doğruluk (yine de örnekleme kontrolü gerekir) |
| Ölçeklenme | Hacim artınca yeni personel gerekir | Hacim artışı ek personel gerektirmez |

**Somut ROI:** Muhasebe/evrak işleme personelinin zamanını, hata düzeltme ve istisna yönetimine kaydırarak daha stratejik işlere yönlendirme; yoğun dönemlerde (yıl sonu, KDV dönemi) ek personel almadan kapasite artışı.

**En Büyük İtiraz ve Yanıt:**
> "Muhasebecimiz zaten hallediyor, güvenilir mi bu sistem?"
Yanıt: "Muhasebecinizin yerine geçmiyor, ön hazırlık yükünü alıyor. Sistem her kaydı işler ama şüpheli olanları işaretler — son onay her zaman sizin muhasebecinizde kalır."

---

### Model 4: OSINT-as-a-Service

| | Geleneksel Usül | Bu Sistem |
|---|---|---|
| Rakip takibi | Fuar/duyum bazlı, tesadüfi | Sistematik, sürekli tarama |
| Güvenlik açığı tespiti | Genelde bir olay olduktan sonra fark edilir | Önceden tespit, önleyici |

**Somut ROI:** Bir veri sızıntısı veya siber saldırının maliyetinin (itibar kaybı, müşteri kaybı, olası yasal yaptırım) çok küçük bir kesri kadar aylık bedelle önleyici koruma; rakip hareketlerini önceden görerek fiyat/teklif stratejisinde avantaj.

**En Büyük İtiraz ve Yanıt:**
> "Bize kim saldırsın ki, biz küçük bir fabrikayız."
Yanıt: "Saldırganlar tam da 'bize kimse dokunmaz' diyen küçük-orta firmaları hedefliyor çünkü savunmasız. Ayrıca bu hizmet sadece güvenlik değil, rakibinizin ne yaptığını da size gösteriyor — tek taraflı değil çift yönlü bir yatırım."

---

### Model 5: Kurumsal MCP Ağ Geçidi

| | Geleneksel Usül | Bu Sistem |
|---|---|---|
| Rapor alma süreci | Muhasebeci/IT'den Excel isteme, günler sürer | Anlık soru-cevap |
| Karar hızı | Verinin toplanmasını beklemek | Gerçek zamanlı görünürlük |

**Somut ROI:** Yönetimsel karar alma hızında ciddi artış; büyük veri talebi projelerinde harcanan zamandan tasarruf.

**En Büyük İtiraz ve Yanıt:**
> "Sistemlerimize dışarıdan biri mi girecek, güvenli mi?"
Yanıt: "Erişim tamamen salt-okunur — hiçbir veri değiştirilemez, silinemez. Tıpkı bir muhasebeciye rapor gösterip 'sadece bak, değiştirme' demeniz gibi düşünün, üstelik bunun için sertifikasyon ve denetim raporlarımızı da paylaşırız."

---

## 3. "Truva Atı" Açılış Cümleleri (Hooks)

### Fabrika sahibiyle 30 saniyelik açılış cümleleri:

1. *"[Firma adı] gibi yılda birkaç milyon Euro ciro yapan firmaların çoğu, her ay ortalama X gün sadece evrak/rapor beklemekle geçiyor — biz bu süreyi saatlere indiriyoruz."*

2. *"Sektörünüzdeki üç rakibinizin son 60 günde yaptığı personel alımlarını ve yeni yatırım sinyallerini biliyor musunuz? Biz bunu her hafta otomatik takip ediyoruz."*

3. *"Web sitenizin güvenlik açığını, bir saldırgan bulmadan biz bulmayı teklif ediyoruz — ücretsiz bir ön taramayla başlayalım mı?"*

4. *"Muhasebe ekibinizin ayda kaç saatini fatura girişine harcadığını sorsam, cevap muhtemelen sizi şaşırtır."*

### Satış Müdürüne "Sinyal + OSINT" temalı senaryo (e-posta/telefon):

> **Konu:** [Rakip Firma X] geçen ay [somut sinyal — örn. yeni ihale kazandı / yönetici değişikliği yaşadı] — siz bundan haberdar mıydınız?
>
> "Merhaba [İsim], geçtiğimiz hafta yaptığımız sektör taramasında [Rakip Firma]'nın [somut gelişme] yaşadığını tespit ettik. Bu, [sizin sektörünüzdeki müşteri/tedarik fırsatı] anlamına gelebilir. Ayrıca sizin kurumsal web sitenizde küçük bir güvenlik notumuz var, isterseniz 10 dakikalık bir görüşmede hem bu fırsatı hem de notu paylaşabilirim."

Bu senaryo hem değer (rakip istihbaratı) hem de hafif bir "kanca" (güvenlik notu — meraklandırır ama tehdit etmez) sunar.

---

## 4. Adım Adım B2B Stratejik Yol Haritası

> Not: Bu yol haritası, önceki analizde vurgulanan **paralel satış döngüsü**, **IDP → MCP Gateway hunisi** ve **tek-adam darboğazından kaçınma** ilkeleri üzerine kurulmuştur — sıralı değil, portföy mantığıyla ilerler.

### 0 – 15. Gün: Hazırlık ve Altyapı

- [ ] OSINT ve Outreach için gerekli teknik altyapı kurulumu (tarama araçları, e-posta domain ısıtma süreci başlatılır — bu süreç kendi başına birkaç hafta sürebileceğinden hemen başlatılmalı)
- [ ] Fabrika sektörüne özel 3 "Truva Atı" teklif şablonu hazırlanır: (1) Outreach açılış e-postası, (2) OSINT ücretsiz ön-tarama teklifi, (3) IDP için "1 haftalık pilot" teklifi
- [ ] Hedef fabrika/firma listesi segmentlere ayrılır (ciro, sektör, bölge bazlı)
- [ ] IDP ve MCP Gateway için **teknik keşif görüşmesi** sunum materyali hazırlanır (bunlar 16. günden itibaren paralel başlayacak, hazırlığı şimdiden bitmeli)
- [ ] Referans/vaka çalışması eksikse, ilk 1-2 müşteriye özel indirimli "referans fiyatı" ile pilot anlaşma stratejisi belirlenir (güven inşası için)

### 16 – 45. Gün: Paralel Saha Başlangıcı

**Sahada (nakit üretimi):**
- [ ] OSINT ücretsiz ön-tarama teklifleri toplu gönderilir (düşük maliyet, hızlı dönüşüm)
- [ ] Outreach kampanyası devreye alınır, gelen randevular takvime düşer

**Arka planda, PARALEL (gelecek nakit için):**
- [ ] IDP ve MCP Gateway için teknik keşif görüşmeleri **aynı anda** planlanmaya başlanır — bunlar satış döngüsü uzun olduğu için 90. güne bırakılmaz, bugünden pipeline'a girer
- [ ] Bu görüşmeler için ayrı zaman bloğu ayrılır (aşağıdaki kapasite bölümüne bakın) — sahadaki operasyonel kişi ile keşif görüşmesi yapan kişi mümkünse farklı kişiler olmalı

### 46 – 90. Gün: Kapanışlar ve Yukarı Satış (Upsell)

- [ ] İlk OSINT/Outreach nakit akışı stabilize olur
- [ ] IDP pilot projeleri teslim edilmeye başlanır — **bu noktada IDP müşterisine MCP Gateway teklifi bilinçli olarak hazırlanır:** "Zaten faturalarınızı/verinizi yapılandırdık, şimdi bu veriyi yöneticilerinizin anlık sorgulayabileceği bir sisteme bağlayalım" cümlesiyle üst satış konuşması başlatılır
- [ ] MCP Gateway/Enterprise anlaşmaları için kapanış görüşmeleri yürütülür (bu noktada zaten 30-45 gündür pipeline'daydılar, hazır olmalılar)
- [ ] İlk referans/vaka çalışmaları yazılı hale getirilir, sonraki satışlarda kullanılmak üzere arşivlenir

### Kapasite ve Risk Yönetimi (Tek Adam Darboğazı Önleme)

- [ ] **Roller net ayrılır:** (1) Saha operasyonu/teslimat sorumlusu, (2) kurumsal satış/keşif görüşmesi sorumlusu — aynı kişi ikisini birden uzun süre yürütemez
- [ ] Yüksek biletli (IDP, MCP Gateway) projelerde teknik keşif görüşmeleri haftanın belirli günlerine sabitlenir, operasyonel teslimat işleriyle çakıştırılmaz
- [ ] Platform riskine karşı (LinkedIn/e-posta hesap kısıtlamaları) yedek kanal ve hesap rotasyonu planı önceden hazırlanır — Outreach tek kanala bağımlı kalmamalı
- [ ] Her modelin en az bir "yedek" süreç dokümantasyonu çıkarılır (biri hastalanır/ayrılırsa iş durmasın diye)
- [ ] Aylık kapasite gözden geçirmesi: hangi model fazla efor yiyor, hangi model kar getiriyor — gerekirse düşük marjlı/yüksek efor gerektiren model geçici olarak durdurulur
