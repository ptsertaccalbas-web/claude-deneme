---
name: browser-use
description: CDP (Chrome DevTools Protocol) üzerinden doğrudan tarayıcı kontrolü, sayfa navigasyonu, veri çekme, form doldurma ve otomasyon sağlar. Web tarayıcısı ile işlem yapılması, sayfa incelenmesi veya bulut tarayıcı çalıştırılması gerektiğinde otomatik devreye girer.
---

# Browser Use

Chrome/Chromium üzerinde CDP (Chrome DevTools Protocol) kullanarak yüksek hızlı otomasyon, sayfa inceleme ve veri kazıma sağlayan yetenek modülüdür.

---

## Temel Kullanım Mantığı

Komutlar `browser-use` CLI aracı üzerinden Python betikleri (heredoc) şeklinde çalıştırılır:

```bash
browser-use <<'PY'
print(page_info())
PY