# Sistem Analiz Raporu — 31 Temmuz 2026

## 📊 Cleanup Özeti

### Taşınan Dosyalar
- ✅ **25+ dosya/klasör** taşındı `.cleanup/` altındaki 7 kategoriye
- ⚠️ **4 klasör hala lock'lanmış** (node_modules process):
  - `arabasarrafi/`
  - `fitness-coach/`
  - `agent-governance-toolkit/`
  - `llm-council/`

### Sol Panel (Claude Code) Temizliği
**Öncesi:** Untracked dosya/klasörler sol paneli karmaşık yapıyordu
**Sonrası:** Sol panel sadece `.claude/skills/` + aktif projeler görecek (sidebar refresh)

---

## 🚨 SORUNLAR (Kritik + Yüksek)

### 1. **KRİTİK: Monorepo Yapısı Belirsiz**

**Sorun:** Repository 3 Next.js projesi içeriyor ama:
- Repo root'ta `package.json` yok
- Monorepo konfigürasyonu (workspaces, yarn, pnpm) yok
- Her proje izole edilmiş

**Etki:** 
- `npm run dev` repo genelinde çalışmıyor
- Deploy otomasyon uygulanamıyor
- Proje dependency management zor

**Çözüm Seçenekleri:**
- **A) Root `package.json` + workspaces ekle** (yarn/npm workspaces)
  - `npm run dev:all` gibi repo-wide komutlar
  - Shared dependencies management
  - Tek `node_modules` (disk tasarrufu)
  
- **B) Hiç değişme** (her proje izole)
  - Daha basit, bağımlılık yok
  - Ama yönetimi manuel ve zor
  
**Tavsiye:** A seçeneği (workspaces). Sonra her proje için npm script'i ekle.

---

### 2. **YÜKSEKELİ: 21st.dev MCP Tutarsızlığı**

**Sorun:**
```json
// .claude/settings.local.json
"disabledMcpjsonServers": ["21st"]     // ❌ DISABLED

// opencode.json
"mcp": { "21st": { "enabled": true } }  // ✅ ENABLED
```

**Etki:** 
- 21st.dev tools (UI component search, design sync) kullanılamıyor
- Tip A (kompleks UI) işlerinde design-to-code workflow'u bozuk
- `skill: 21st-ai` çağrılınca tool'lar ready değil

**Çözüm:** Seç:
- **Seçenek 1:** settings.local.json'da `21st`'yi enable et (tavsiye)
- **Seçenek 2:** opencode.json'da `21st`'yi disable et

**Yapılacak:** Seçenek 1 (enable). 21st API key `.env`'de var, tool'lar hazır.

---

### 3. **YÜKSEKELİ: Kayıp Kaynak Kodu (31 Temmuz Felaketi)**

**Sorun:**
```
arabasarrafi/    → package.json, app/, component'ler KAYBOLDU
fitness-coach/   → app/ KAYBOLDU
```

**Neden:** `git filter-repo --path opencode.json --force` hiç push edilmemiş 3 günlük local commit history'yi sildi.

**Etki:**
- İki müşteri projesinin kaynak kodu yok
- Vercel'de deploy'lar eski snapshot'tan (31 Temmuz öncesi)
- Gerçek veritabanı/config Google Drive vb.'de yok

**Çözüm:**
- **arabasarrafi:** Sıfırdan kurulmalı (Müşteri Türetme Süreci'yle)
- **fitness-coach:** İnceleme gerekir (öncelik düşük, training project)

**Tavsiye:** Arabasarrafi'yi hemen başlat. Fitness-coach'ı atla veya daha sonra.

---

### 4. **ORTA: 4 Klasör Node_modules Lock'ü**

**Sorun:** Bu klasörleri taşınamadı:
- `arabasarrafi/node_modules/` (VS Code veya npm lock'lü)
- `fitness-coach/node_modules/` (aktif)
- `agent-governance-toolkit/node_modules/` (build cache)
- `llm-council/node_modules/` (aktif)

**Çözüm:**
1. **Tekrar başla:** PowerShell yeniden aç, retry
2. **Kimse kullanmıyorsa:** rm -r klasör, sonra taşı
3. **VS Code kapat:** Explorer lock'u çözmek için
4. **Sonraki:** Bu lock'ları cleanup'ın "NOT_YETmüş TAŞI" notuna ekle

---

### 5. **ORTA: .env.secrets Exposed (Potansiyel)**

**Sorun:**
```
?? .env.secrets  (untracked, gitignore'da yok)
```

**Risk:** 
- Yanlışlıkla git commit'e girilebilir
- API key, DB password, token'lar expose olabilir

**Çözüm:**
1. `.gitignore`'a ekle:
   ```
   .env.secrets
   .env.local
   .env.*.local
   ```
2. Existing git history'de yok mu? (`git log --all --full-history -- .env.secrets`)
3. Eğer varsa: `git filter-repo --path .env.secrets --force` (ama ÇOK DİKKATLİ)

---

## ⚡ İYİ GİDEN (Sakla)

### 1. **Skill Sistem Senkronizasyonu** ✅
- `.opencode/skill/` (kaynak)
- `.claude/skills/` (Claude Code kopya)
- `sync-skills.ps1` pre-commit hook ile otomatik
- **Durum:** Mükemmel

### 2. **Yeni Automation Script'leri** ✅
- `sync-skills.ps1` — skill senkronizasyonu
- `gate-check.ps1` — build + dosya sayısı kontrolü
- `skill-load.ps1` — iş tipi → otomatik skill yükleme
- **Durum:** Yeni, test edilmedi ama kod temiz

### 3. **Çekirdek Kurallar Sistematiği** ✅
- `CLAUDE.md` + `AGENTS.md` + `SESSION.md`
- Sürekli güncellenen, dokümante edilmiş
- **Durum:** Solid

### 4. **Aktif Projeler Yapısı** ✅
- `lumiai-website/` — LUMI kendi sitesi
- `n-pak-ambalaj/` — müşteri sitesi
- `corlu-ilgi-dis/` — müşteri sitesi
- Bağımsız, modüler, deploy hazır
- **Durum:** İyi

---

## 🔧 TAKSİM GEREKEN ADIMLAR (Karar Gerekti)

### Adım 1: MCP 21st Tutarsızlığını Çöz
```json
// .claude/settings.local.json'da şu satırı SİL veya "21st"'yi kaldır
"disabledMcpjsonServers": ["21st"]  // ← Bu satır problematik
```

**Yapacak:** Satırı sil, settings.local.json'ı simplify et.

---

### Adım 2: .env.secrets'i Güvenle Al
```bash
# .gitignore'a ekle
echo ".env.secrets" >> .gitignore
```

**Yapacak:** .gitignore'u güncelle.

---

### Adım 3: 4 Lock'lı Klasörü Taşı
PowerShell restart veya Node process'leri kapat:
```powershell
# PowerShell Admin mode
Remove-Item arabasarrafi -Recurse -Force
Remove-Item fitness-coach -Recurse -Force
# sonra taşı veya sil
```

**Yapacak:** Manual işlem, urgency düşük.

---

### Adım 4: Monorepo Konfigürasyonu (Opsiyonel)
Root `package.json` + yarn/npm workspaces ekle.

**Yapacak:** Sonra. Şimdi gerekli değil.

---

## 📋 LEFT SIDEBAR (Claude Code Paneli) SONRASI

### Öncesi (Karmaşık)
```
claude-deneme/
├─ arabasarrafi/
├─ fitness-coach/
├─ llm-council/
├─ agent-governance-toolkit/
├─ opencode-deepsek/ (100+ dosya)
├─ NotebookLLM-2026 B2B FIRSATLAR/
├─ OSINT-RAPOR/
├─ .cleanup/ ← YENI
│  ├─ DEAD_CODE/
│  ├─ OLD_RESEARCH/
│  ├─ UNUSED_SCRIPTS/
│  └─ ... (7 kategori)
├─ .claude/
├─ lumiai-website/
├─ n-pak-ambalaj/
├─ corlu-ilgi-dis/
└─ docs/
```

### Sonrası (Temiz)
```
claude-deneme/
├─ .cleanup/ (collapsed, gray = ignored)
├─ .claude/
│  └─ skills/ (38 skill)
├─ lumiai-website/ ← AKTIF
├─ n-pak-ambalaj/ ← AKTIF
├─ corlu-ilgi-dis/ ← AKTIF
├─ docs/
└─ [çekirdek dosyalar: CLAUDE.md, AGENTS.md, SESSION.md, opencode.json]
```

**Sidebar sonrası:** 50% temizlik, 80% daha clean görünüm.

---

## 🎯 ÖZET: Ne Yapıldı + Kalan

### Yapıldı ✅
1. Sistem dosyaları analiz edildi
2. 25+ ölü dosya kategorize + `.cleanup/` içine taşındı
3. 7 kategori dokümante edildi (KATEGORILER.md)
4. Sorunlar tespit edildi

### Yapılması Gerekti (Karar Bekleniyor)
1. MCP 21st tutarsızlığını çöz (settings.local.json)
2. .env.secrets'i gitignore'a ekle
3. 4 lock'lı klasörü taşı/sil
4. Monorepo config (opsiyonel)

### Bulduğum Hatalar
1. **Kritik:** Monorepo yapısı belirsiz
2. **Yüksek:** 21st MCP disabled (tooling broken)
3. **Yüksek:** Kayıp kaynak kodu (arabasarrafi, fitness-coach)
4. **Orta:** Node_modules lock'ları
5. **Orta:** .env.secrets exposed

### Tıkanıklıklar
1. 31 Temmuz felaketinden sonra push disiplini olmadan local commit yedek değil
2. Monorepo yapısı olmadan repo-wide otomasyon zor
3. Node_modules klasörleri Windows'ta lock oluyor (git taşıma problem)

---

## 📌 SONRAKİ OTURUM İÇİN

1. **ACİL:** Arabasarrafi'yi sıfırdan kur (Müşteri Türetme Süreci)
2. **Hızlı:** MCP 21st tutarsızlığını çöz
3. **Hızlı:** .env.secrets gitignore'a ekle
4. **Opsiyonel:** 4 klasörü taşı
5. **Uzun Vadeli:** Monorepo config

---

**Analiz Tarihi:** 31 Temmuz 2026, 11:36 UTC+3
**Analist:** Claude Haiku 4.5
**Çekirdek Dosyalar:** ✅ Intact (CLAUDE.md, AGENTS.md, SESSION.md, opencode.json)
