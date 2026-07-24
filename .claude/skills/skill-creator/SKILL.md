---
name: skill-creator
description: Yapay zeka ajan yeteneklerini (skills) oluşturur, test eder, performansını ölçer (benchmark) ve geliştirir. Kullanıcı yeni bir yetenek yazmak, bir iş akışını yeteneğe dönüştürmek veya döküman tetikleyicilerini optimize etmek istediğinde otomatik devreye girer.
---

# Skill Creator (Yetenek Oluşturucu)

Yeni Claude Code yetenekleri tasarlamak, test etmek, performanslarını karşılaştırmak ve sürekli iyileştirmek için kullanılan meta-yetenektir.

---

## Yetenek Geliştirme Yaşam Döngüsü

1. **Niyeti ve Gereksinimleri Anlama:** Amacı, tetikleyici kelimeleri, çıktı formatını ve test stratejisini belirleyin.
2. **Taslak SKILL.md Oluşturma:** YAML frontmatter bilgileri ve kademeli dökümantasyon (progressive disclosure) ilkeleriyle ilk taslağı yazın.
3. **Test Senaryolarını Çalıştırma:** Test istemlerini hem yetenekli (`with_skill`) hem de yeteneksiz (`without_skill`) olarak eşzamanlı çalıştırın.
4. **Değerlendirme ve Benchmark:** Süre, token kullanımı ve başarı kriterlerini toplayıp `generate_review.py` ile görsel inceleme arayüzünü başlatın.
5. **Geri Bildirimle İyileştirme:** Kullanıcı yorumlarına göre talimatları güncelleyin, gerekirse yardımcı betikler (`scripts/`) ekleyin.
6. **Tetikleyici Açıklamayı Optimize Etme:** `scripts.run_loop` çalıştırarak frontmatter `description` alanının doğru zamanda tetiklenmesini sağlayın.
7. **Paketleme:** Tamamlanan yetenek klasörünü `.skill` dosyasına dönüştürün.

---

## Süreç ve Rehber Kurallar

### 1. Niyeti Yakalama ve Araştırma
* Kenar durumlar (edge cases), girdi/çıktı yapıları ve örnek dosyalar hakkında net sorular sorun.
* Çıktının **nesnel olarak doğrulanabilir** mi (otomatik test/assertion gerektirir) yoksa **öznel** mi (insan gözlemi gerektirir) olduğunu belirleyin.

### 2. SKILL.md Yazım Kuralları
* **Anatomi:**
  * `SKILL.md` (Zorunlu: YAML frontmatter + Markdown talimatları).
  * `scripts/` (Tekrarlayan işler için çalıştırılabilir kodlar).
  * `references/` (Gerektiğinde bağlama yüklenecek dökümanlar).
  * `assets/` (Şablonlar, görseller, dosyalar).
* **Kademeli Yükleme (Progressive Disclosure):**
  * `SKILL.md` dosyasını 500 satırın altında tutun. Büyüyen dökümanları (>300 satır) `references/` klasörüne taşıyın.
  * `description` alanına yeteneğin ne yaptığını **ve hangi durumlarda tetikleneceğini** net yazın. Tetiklenmeyi garanti etmek için açıklamayı bir tık yönlendirici (pushy) tutun.

### 3. Test ve Benchmark Çalıştırma
* Test senaryolarını `evals/evals.json` dosyasında saklayın.
* Testleri `<skill-name>-workspace/iteration-N/eval-X/` dizininde yürütün.
* Test çıktılarından süre (`duration_ms`) ve token (`total_tokens`) verilerini anında `timing.json` dosyasına kaydedin.
* İnceleme arayüzünü başlatın:
  ```bash
  python eval-viewer/generate_review.py <workspace>/iteration-N --skill-name "<name>" --benchmark <workspace>/iteration-N/benchmark.json