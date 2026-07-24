---
name: agent-browser
description: CDP protokolü üzerinden hızlı ve kalıcı tarayıcı otomasyonu sağlar. Sayfa gezintisi, öğe inceleme, veri kazıma (scraping) ve web etkileşimi gerektiğinde otomatik devreye girer.
---

# Agent Browser

AI ajanları (Claude Code vb.) için Chrome/Chromium üzerinde çalışan, erişilebilirlik ağacı (accessibility-tree) ve kısa `@eN` öğe referansları sunan yüksek hızlı tarayıcı otomasyon aracı.

---

## Kurulum ve Hazırlık
Komutları çalıştırmadan önce araç ve tarayıcı bağımlılıklarının kurulu olduğundan emin olun:

```bash
npm i -g agent-browser && agent-browser install