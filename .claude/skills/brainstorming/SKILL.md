---
name: brainstorming
description: Fikirleri uygulama (kodlama) aşamasına geçmeden önce tam olarak şekillendirilmiş tasarımlara ve teknik spesifikasyonlara dönüştürür. Yeni bir özellik, mimari değişiklik veya proje tasarımı yapılacağı zaman otomatik devreye girer.
---

# Brainstorming Ideas Into Designs (Beyin Fırtınası ve Tasarım)

Doğrudan kod yazmaya geçmek yerine, fikirleri doğal bir diyalogla netleştirip onaylanmış tasarım dökümanlarına (`specs`) dönüştüren süreçtir.

---

## Demir Kurallar

> **Not (AGENTS.md ile çakışma önleme — bkz. AGENTS.md "SORU SORMA KURALI"):**
> Kullanıcı bir şey söylediğinde aşağıdaki onay/soru adımları (2, 4, 7) ATLANIR —
> kendi kararınla tasarımı belirle, tek satır bilgilendirme yap, doğrudan kodla,
> sonuna kadar tamamla, sonra rapor ver. Soru SADECE AGENTS.md'deki 2 durumda
> sorulur (yıkıcı/geri dönüşü olmayan işlem, ya da gerçekten eksik/çelişkili bilgi).

* **Tasarım kararını kendin ver, bilgilendir:** Ne kadar küçük veya "basit" görünürse görünsün, tasarımı sen belirle, tek satırla bildir, kodla — onay beklemeden.
* **Soru sorma (yukarıdaki 2 istisna hariç):** Kullanıcıyı soru yağmuruna tutma. AGENTS.md'deki 2 durumdan biri geçerli değilse hiç soru sorma.
* **Alternatif Sunma:** Tek bir çözüme çakılmayın. Avantaj/dezavantajlarıyla birlikte 2-3 farklı yaklaşımı bilgilendirme olarak (soru değil) sunun, kendi tercihini gerekçeyle belirt, devam et.

---

## Süreç Adımları (Adım Adım)

1. **Proje Bağlamını İnceleyin:** Mevcut dosyaları, son commit'leri ve dökümanları okuyarak başlayın.
2. **Yaklaşımı Belirleyin:** Soru sormadan, kendi kararınla en uygun yaklaşımı seçin.
3. **2-3 Yaklaşım Özetleyin:** Kendi önerinizi ve gerekçenizi öne çıkararak alternatif mimarileri bilgilendirme olarak sunun (soru değil).
4. **Tasarımı Uygulayın:** Mimari, bileşenler, veri akışı ve hata yönetimini kendi kararınızla belirleyip doğrudan uygulayın.
5. **Tasarım Dökümanını Yazın:** Tasarımı `docs/superpowers/specs/YYYY-MM-DD-<konu>-design.md` konumuna kaydedin.
6. **Öz-İnceleme (Self-Review):** Dökümanda eksik kalmış "TODO", çelişki veya belirsizlik varsa düzeltin.
7. **Planlamaya Geçiş:** Doğrudan planlama aşamasına (`writing-plans` yeteneğine) geçin, sonunda tek seferde rapor verin.

---

## İş Akış Diyagramı

`Proje Bağlamı` -> `Yaklaşım Belirleme` -> `2-3 Yaklaşım Özeti` -> `Tasarımı Uygulama` -> `Spec Dökümanı Yazımı` -> `Planlama Yeteneği (writing-plans)` -> `Rapor`