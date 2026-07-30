# Skill Registry — LUMI AI Media (v2)

> Kaynak: `SKILL-ENVANTER.md` (30 Temmuz 2026, sayılar dosya sistemine karşı doğrulanmıştır).

## Sistem Mimarisi

~51 skill (mükerrerler hariç), 4 konumda:
- **Proje-local** (`.claude/skills/`, 34) — tasarım, web, ajan, strateji
- **Global** (`~/.claude/skills/`, 10 — 7'si 21st.dev, 3'ü proje-local ile mükerrer: frontend-master, sales-analyst, video-director)
- **Ponytail** (`~/.cache/opencode/packages/@dietrichgebert/ponytail@latest/`, 6) — over-engineering denetimi
- **Proje-özel** (`.opencode/skill/`, 4) — LUMI-spesifik talimatlar
- **Built-in**: `find-skills` ve `customize-opencode` — ikisi de doğrulandı (30 Temmuz)

**Claude Code uyumluluk notu (30 Temmuz 2026 dogfood testinde bulundu):**
Claude Code'un `Skill` aracı SADECE `.claude/skills/<isim>/SKILL.md` yapısını görür —
`.opencode/skill/*.md` klasörünü hiç indekslemez. Bu yüzden 4 proje-özel skill
(`tasarim-rehberi`, `website-talimatlari`, `site-otomasyon`, `gecmis-hatalar`)
Claude Code'da "Unknown skill" hatası veriyordu. Düzeltme: her biri `.claude/skills/`
altına da kopyalandı (`site-otomasyon-kurallari.md` → skill adı `site-otomasyon`).
**İki kopya var, tek kaynak `.opencode/skill/*.md`** — kaynak dosyalardan biri
güncellenince `sync-skills.ps1` (repo kökü) çalıştırılmalı; script frontmatter +
"Kaynak:" notunu koruyup gövdeyi kaynaktan `.claude/skills/<isim>/SKILL.md`'ye
kopyalar (30 Temmuz 2026'da eklendi, drift bulup düzelttiği doğrulandı).
`site-otomasyon-kurallari.md` ayrıca `opencode.json`'da "instructions" olarak da
otomatik yükleniyor — o bağımlılık için orijinal dosya `.opencode/skill/` içinde
kalmaya devam ediyor, silinmedi.

**Ponytail Claude Code'a hiç erişilemez (aynı testte doğrulandı):** Ponytail'in
6 skill'i (`ponytail`, `ponytail-audit`, `ponytail-debt`, `ponytail-gain`,
`ponytail-help`, `ponytail-review`) gerçekten var ama
`~/.cache/opencode/packages/@dietrichgebert/ponytail@latest/node_modules/@dietrichgebert/ponytail/skills/<isim>/SKILL.md`
yolunda duruyor — bu bir opencode paket-cache yolu, Claude Code'un Skill aracı
sadece proje-local/global `.claude/skills/` dizinlerini taradığı için burayı hiç
görmüyor. Ayrıca ponytail `opencode.json`'da bir **plugin** olarak tanımlı,
Claude Code'un skill sistemine hiç bağlı değil. Sonuç: AGENTS.md'deki "ponytail
full/lite/off mode" talimatları **Claude Code tarafında hiçbir etkisi olmayan
ölü talimatlar** — Claude Code modu göremez/değiştiremez, sadece opencode CLI
üzerinden çalışır.

**Önemli mimari not:** Ponytail bir "skill" değil, ayrı bir OpenCode **plugin/hook** sistemi
(`opencode.json` → `plugin: ["@dietrichgebert/ponytail"]`). Kendi alt-skill'leri
(`ponytail-review`, `ponytail-audit` vb.) `skill` aracıyla çağrılabilir ama ana
mod değişimi (`full`/`lite`/`off`) skill çağrısıyla değil, ponytail'in kendi
komut/config mekanizmasıyla olur (bkz. aşağıda "Ponytail Modları").

---

## Hızlı Tip Seçim & Skill Yükleme

| Tip | İş | Ponytail | Kritik Skill Sayısı | Detay |
|---|---|---|---|---|
| **A** | Tam Web Sitesi (2-3/hafta) | **full** | 8 | [Bkz. Tip A](#tip-a-tam-web-sitesi) |
| **B** | Component Ekleme (1-2/gün) | **full** | 5 | [Bkz. Tip B](#tip-b-component-ekleme) |
| **C** | Debugging (2-3/gün) | lite | 4 | [Bkz. Tip C](#tip-c-debugging) |
| **D** | OSINT & Lead (1-2/hafta) | off | 6 | [Bkz. Tip D](#tip-d-osint--lead-araştırması) |
| **E** | Satış & Strateji (1/hafta) | lite | 4 | [Bkz. Tip E](#tip-e-satış--strateji) |
| **F** | Video Prompt (2-4/ay) | off | 2 | [Bkz. Tip F](#tip-f-video-prompt-yazımı) |
| **G** | Hızlı Soru (5-10/gün) | off | 0 | [Bkz. Tip G](#tip-g-hızlı-soru) |

**Kullanım:** İş geldikten sonra Tip'i seç → tablodaki skill'leri sırayla `skill: <isim>` ile yükle → başla.

---

## İş Tipi → Skill Haritası

### Tip A: Tam Web Sitesi (2-3/hafta)
Gereksinim: Uzun context, çok adım, paralel tool, tasarım + kod + anim

**Otomatik yükleme sırası (sırayla `skill: <isim>` ile çağır):**
1. `skill: brainstorming` — fikir → spec
2. `skill: design-system` — token havuzu
3. `skill: web-design-master` — Next.js + Tailwind + GSAP + Lenis
4. `skill: animation-master` — scroll anim, timeline
5. `skill: tasarim-rehberi` — LUMI DNA
6. `skill: website-talimatlari` — girdi/yapı/mobil checklist
7. `skill: site-otomasyon` — 7-aşamalı otomatik flow
8. `skill: gecmis-hatalar` — hata referans

**Opsiyonel (kompleks siteler için):**
- `skill: 21st-ui-build` — 21st.dev komponent arayüzü
- `skill: frontend-master` — UI/UX denetimi
- `skill: webgl-artist` — 3D scroll sync gerekirse

**Ponytail:** full mode ("en tembel çözüm" prensibiyle)
**Sonra:** `skill: runtime-agent` (npm → build → deploy)

---

### Tip B: Component Ekleme (1-2/gün)
Gereksinim: Orta context, tasarım + kod

**Otomatik yükleme:**
1. `skill: frontend-master` — UI/UX framework
2. `skill: design-system` — token uyumluluğu
3. `skill: icon-designer` — ikon sistemine fit ekleme
4. `skill: animation-master` — component animasyonu
5. `skill: tasarim-rehberi` — brand fit

**Opsiyonel:**
- `skill: 21st-ai` — sketch → komponent varsa

**Ponytail:** full mode
**Sonra:** `skill: runtime-agent` (test → build)

---

### Tip C: Debugging (2-3/gün)
Gereksinim: Kesin hata analizi

**Otomatik yükleme:**
1. `skill: systematic-debugging` — kök neden zorunlu
2. `skill: gecmis-hatalar` — bilinen sorun referans
3. `skill: opsec` — network/security taşkınlığı varsa
4. `skill: runtime-agent` — log → test → düzelt

**Ponytail:** lite mode (minimal over-engineering)

---

### Tip D: OSINT & Lead Araştırması (1-2/hafta)
Gereksinim: Çok sayıda tool call, fallback stratejisi

**Otomatik yükleme:**
1. `skill: agent-browser` — tarayıcı otomasyonu
2. `skill: agent-browser-debug` — WAF/captcha teşhis
3. `skill: http-alt-channel` — fallback: curl/PowerShell
4. `skill: fallback-strategy` — web.archive, önbellek
5. `skill: sales-analyst` — lead puanlama
6. `skill: opsec` — proxy, rate-limiting

**Ponytail:** off (verimli, optimize edilmiş)

---

### Tip E: Satış & Strateji (1/hafta)
Gereksinim: Derin analiz, Türkçe

**Otomatik yükleme:**
1. `skill: brainstorming` — strateji fikri
2. `skill: sales-analyst` — puanlama, CAC/LTV
3. `skill: competitor-watcher` — pazar analizi
4. `skill: brand` — marka sesi, positioning

**Ponytail:** lite mode

---

### Tip F: Video Prompt Yazımı (2-4/ay)
Gereksinim: Kreatif yazım

**Otomatik yükleme:**
1. `skill: video-director` — 250+ sinematografi terim
2. `skill: brainstorming` — storyboard idea

**Ponytail:** off

---

### Tip G: Hızlı Soru (5-10/gün)
Gereksinim: Düşük context, hızlı

**Otomatik yükleme:** Sadece AGENTS.md + SESSION.md (skill yok)

**Ponytail:** off

---

**Redundans notu (kasıtlı, hata değil):** `tasarim-rehberi` (A, B), `gecmis-hatalar`
(A, C), `brainstorming` (A, E, F), `sales-analyst` (D, E), `opsec` (C, D),
`animation-master`/`design-system` (A, B) birden fazla Tip'te geçiyor —
bunlar cross-cutting temel yapı taşları, tekrar değil.

## Ponytail Modları
- **full**: Kod üretimi "en tembel çözüm" — Tip A/B (tasarım/kod)
- **lite**: Minimal over-engineering — Tip C/E (debug/strateji)
- **off**: Devre dışı — Tip D/F/G (OSINT/video/hızlı)
- Şu an aktif mod: **full** (ponytail'in kendi varsayılanı; bu repoda ne
  `PONYTAIL_DEFAULT_MODE` env var'ı ne de `%APPDATA%\ponytail\config.json`
  tanımlı — override yoksa ponytail zaten full ile başlıyor)
- Mod değiştirme ponytail'in kendi arayüzünden yapılır (bkz. `skill: ponytail-help`)

## 21st.dev Skill'leri
**Ücretli:** `21st_get_component`, `21st_generate` (günlük limit)
**Ücretsiz:** arama, listeleme
**API key:** `opencode.json` → `mcp.21st.headers.x-api-key` (`.env`'deki `$21ST_API_KEY`'e referans verir)
→ Kullan iff: Tip A (kompleks UI), B (komponent arama)

## Gereklilik Düzeyi

| Tip | Kritik Skill | Optional Skill | Ponytail |
|---|---|---|---|
| A | brainstorming, design-system, web-design-master, animation-master, tasarim-rehberi, website-talimatlari, site-otomasyon, gecmis-hatalar | 21st-ui-build, frontend-master, webgl-artist | full |
| B | frontend-master, design-system, icon-designer, animation-master, tasarim-rehberi | 21st-ai | full |
| C | systematic-debugging, gecmis-hatalar, opsec, runtime-agent | — | lite |
| D | agent-browser, agent-browser-debug, http-alt-channel, fallback-strategy, sales-analyst, opsec | — | off |
| E | brainstorming, sales-analyst, competitor-watcher, brand | — | lite |
| F | video-director, brainstorming | — | off |
| G | — (sadece AGENTS.md) | — | off |

---

## Kullanım Kuralı

```
İş geldi: "web sitesi tasarla" (Tip A)
    ↓
README.md'de "Tip A" seç
    ↓
Skill'leri sırayla yükle (skill: brainstorming → skill: design-system → ...)
    ↓
Ponytail full mode olduğunu doğrula
    ↓
Başla
```

**İş akışında manuel engel:**
- Skill yüklenmese bile görev başlamadı
- Bir skill başarısız oldu → durdu, rapor ver

---

## Notlar
- Skill yükleme sırası **önemli** (brainstorming → spec → tasarım → kod)
- Proje-özel skill'ler (`.opencode/skill/`) **otomatik yüklenmez**, manuel çağrılır
  (bkz. `SKILL-ENVANTER.md` → "NASIL ÇALIŞIR")
- Ponytail `full` mode Tip A/B'de, `lite` Tip C/E'de, `off` diğerlerinde
- 21st.dev günlük limitini aş, ücret önceden soru
- Bu dosyadaki sayılar 30 Temmuz 2026'da dosya sistemine karşı doğrulanmıştır;
  yeni skill eklenirse/silinirse bu dosya ve `SKILL-ENVANTER.md` güncellenmeli
