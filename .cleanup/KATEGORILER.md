# Cleanup Kategorileri — 31 Temmuz 2026

## 1. DEAD_CODE — Kayıp Kaynak Kodu (31 Temmuz git-filter-repo felaketinde silinmiş)
- arabasarrafi/ — package.json, app/, component'ler gitti, sıfırdan kurulması lazım
- fitness-coach/ — arabasarrafi ile aynı kaderi paylaştı (app/ gitti)
- arabasarrafi/.next/, arabasarrafi/.vercel/ — build artifacts

**Durum:** Kayıp. Kaynak GitHub'da yok. Sıfırdan kurulması gerekecek.
**Taşıma:** `.cleanup/DEAD_CODE/`

---

## 2. OLD_RESEARCH — Eski Araştırma & Raporlar
- opencode-deepsek/ (100+ firma Deep Dive analizi, 31 Temmuz sonra oluşturulmuş ama sorun alanı)
- NotebookLLM-2026 B2B FIRSATLAR/ (Eski AI market araştırması)
- OSINT-RAPOR/ (Eski lead generation script'leri + template'ler)

**Durum:** Arşiv. Kararlar buradan alınmıyor, aktif proje değil.
**Taşıma:** `.cleanup/OLD_RESEARCH/`

---

## 3. OLD_STRATEGY — Eski Strateji & Analiz Belgeleri
- model-secim-analizi-prompt.md (DeepSeek Flash analizi + 9 soru)
- AI-MEDIA-ECOSYSTEM-RESEARCH.md (Eski ekosistem analizi)
- PROJECT-DNA.md (Eski marka DNA tanımı)
- TURKIYE-AI-MEDYA-AGENTLIK-RAPORU.md (Pazar raporu, referans-bilgi)

**Durum:** Arşiv. Bilgilendirici ama aktif.
**Taşıma:** `.cleanup/OLD_STRATEGY/`

---

## 4. ORPHAN_SALES — Yetim Satış Dosyaları
- arabasarrafi-satis-sunumu.* (html, md)
- arabasarrafi-satis-teklifi.md
- arabasarrafi-telefon-scripti.md
- corlu-ilgi-dis/satis-sunumu.html

**Durum:** Projenin kayıp olması yüzünden yetim. Şablonları da değerli değil.
**Taşıma:** `.cleanup/ORPHAN_SALES/`

---

## 5. UNUSED_PROJECTS — Kullanılmayan Dış Projeler
- agent-governance-toolkit/ (External toolkit, entegre değil)
- llm-council/ (Başka proje, bu repoya ait değil)

**Durum:** Yabancı. Repo cleanup'ı için kaldırılabilir.
**Taşıma:** `.cleanup/UNUSED_PROJECTS/`

---

## 6. UNUSED_SCRIPTS — Kullanılmayan PowerShell Script'leri
- TSO-FIRMA-CEK.ps1 (Eski firma sorgusu)
- TSO-SORGULA.ps1 (Eski sorgu script'i)
- SITE-OLUSTUR.ps1 (Eski site kurulum)
- ITO-SORGULA.ps1 (Eski ITO sorgusu)
- TELEGRAM-RAPOR.ps1 (Telegram bildirimi, kullanılmıyor)
- telegram-bot.py (Python bot, dead)
- OSINT-RAPOR/GONDER.ps1, GONDER-IHSAS.ps1 vb. (Eski OSINT scriptleri)

**Durum:** Dead. Yeni automation sistem (sync-skills.ps1, gate-check.ps1, skill-load.ps1) kullanılıyor.
**Taşıma:** `.cleanup/UNUSED_SCRIPTS/`

---

## 7. MISC_TEMPLATES — Şablon & Reference Dosyaları
- SABLON-ENDUSTRIYEL.md (Sektör şablonu)
- SABLON-PREMIUM-BRAND.md (Marka şablonu)
- REFERANS-SITELER.md (Referans siteleri listesi)
- LUMI-AI-PAZAR-STRATEJI-ANALIZI.txt (Eski strateji, kısıtlı bilgi)

**Durum:** Reference. Az kullanılan.
**Taşıma:** `.cleanup/MISC_TEMPLATES/`

---

## 8. ACTIVE (Sakla) — Aktif Sistem Dosyaları

### Çekirdek Kurallar
- CLAUDE.md ✓
- AGENTS.md ✓
- SESSION.md ✓

### Konfigürasyon
- opencode.json ✓
- .claude/settings.local.json ✓
- .gitignore ✓

### Yeni Automation
- sync-skills.ps1 ✓
- gate-check.ps1 ✓
- skill-load.ps1 ✓

### Aktif Projeler (Kısmi)
- lumiai-website/ ✓
- n-pak-ambalaj/ ✓
- corlu-ilgi-dis/ ✓ (ama satis-sunumu.html cleanup'a)

### Skill Sistemleri
- .claude/skills/ ✓ (38 skill)
- .opencode/skill/ ✓ (4 proje-özel)

### Arşiv
- HISTORY.md ✓ (Oturum tarihi)
- NOTLAR.md (Review et — gerekli misin?)
- docs/ ✓ (Sistem dokumentasyonu)

---

## 9. SORUNLU — Kontrol Et

### Tutarsızlık 1: .claude/settings.local.json
```json
"disabledMcpjsonServers": ["21st"]  // 21st MCP disabled
```
ama
```json
// opencode.json'da
"mcp": { "21st": { "enabled": true } }  // enabled
```
**Çözüm:** settings.local.json'da 21st'yi enable et veya opencode.json'da disable et (seç).

### Tutarsızlık 2: Skill Dosyaları Çift Konum
- `.opencode/skill/*.md` (Kaynak — 4 proje-özel skill)
- `.claude/skills/*/SKILL.md` (Kopya — Claude Code uyumluluğu)

Sync-skills.ps1 bu ikisini senkronlu tutuyor ✓ (Iyi).

### Tutarsızlık 3: Endpoint Yok — Hiçbir Ana Entry Point
- `lumiai-website/`, `n-pak-ambalaj/`, `corlu-ilgi-dis/` — 3 Next.js projesi
- Repository root'ta `package.json` yok
- Hiçbir `npm run dev` vs. repo genelinde çalışmıyor

**Problem:** Repo bir "monorepo" gibi gözüküyor ama config yok. Her proje kendi izole.

---

## 10. SOL PANEL (Claude Code) Paneli Temizliği

### Sorun
- `.claude/skills/` — 38 skill (iyi)
- `.opencode/skill/` — 4 skill (iyi)
- Ama untracked folder'lar left sidebar'da gözüküyor:
  - agent-governance-toolkit/
  - arabasarrafi/
  - fitness-coach/
  - llm-council/
  - opencode-deepsek/
  - NotebookLLM-2026 B2B FIRSATLAR/
  - OSINT-RAPOR/
  - arabasarrafi-satis-*.* dosyaları

### Çözüm
- `.cleanup/` içine taşı
- `.gitignore`'a ekle (ama cleanup içine olan dosyalar commit edilecek)
- Sidebar automatic refresh

---

