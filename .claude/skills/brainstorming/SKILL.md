---
name: brainstorming
description: Fikirleri uygulama (kodlama) aşamasına geçmeden önce tam olarak şekillendirilmiş tasarımlara ve teknik spesifikasyonlara dönüştürür. Yeni bir özellik, mimari değişiklik veya proje tasarımı yapılacağı zaman otomatik devreye girer.
---

# Brainstorming Ideas Into Designs (Beyin Fırtınası ve Tasarım)

Doğrudan kod yazmaya geçmek yerine, fikirleri doğal bir diyalogla netleştirip onaylanmış tasarım dökümanlarına (`specs`) dönüştüren süreçtir.

---

## Demir Kurallar

* **Tasarım Onayı Olmadan Kod Yazılamaz:** Ne kadar küçük veya "basit" görünürse görünsün, tasarım sunulup kullanıcıdan onay alınmadan kodlama veya scaffolding yapılamaz.
* **Tek Tek Soru Sorma:** Kullanıcıyı soru yağmuruna tutmayın. Tek seferde yalnızca 1 soru sorun (mümkünse çoktan seçmeli).
* **Alternatif Sunma:** Tek bir çözüme çakılmayın. Her zaman avantaj/dezavantajlarıyla birlikte 2-3 farklı yaklaşım önerin.

---

## Süreç Adımları (Adım Adım)

1. **Proje Bağlamını İnceleyin:** Mevcut dosyaları, son commit'leri ve dökümanları okuyarak başlayın.
2. **Netleştirici Sorular Sorun:** Kullanım amacını, kısıtlamaları ve başarı kriterlerini anlamak için sırayla sorular yöneltin.
3. **2-3 Yaklaşım Önerin:** Kendi önerinizi ve gerekçenizi öne çıkararak alternatif mimariler sunun.
4. **Tasarımı Bölüm Bölüm Sunun:** Mimari, bileşenler, veri akışı ve hata yönetimini küçük parçalar halinde sunup her adımda onay alın.
5. **Tasarım Dökümanını Yazın:** Onaylanan tasarımı `docs/superpowers/specs/YYYY-MM-DD-<konu>-design.md` konumuna kaydedin.
6. **Öz-İnceleme (Self-Review):** Dökümanda eksik kalmış "TODO", çelişki veya belirsizlik varsa düzeltin.
7. **Kullanıcı Onayı:** Dökümanı kullanıcıya inceletin.
8. **Planlamaya Geçiş:** İnceleme tamamlandığında doğrudan planlama aşamasına (`writing-plans` yeteneğine) geçin.

---

## İş Akış Diyagramı

`Proje Bağlamı` -> `Açıklayıcı Sorular` -> `2-3 Yaklaşım Önerisi` -> `Tasarım Sunumu` -> `Kullanıcı Onayı` -> `Spec Dökümanı Yazımı` -> `Planlama Yeteneği (writing-plans)`