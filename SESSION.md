# SESSION.md — Aktif Oturum Durumu (31 Temmuz 2026)

## 🚨 EN ÖNEMLİ NOT — 31 Temmuz 2026 git-filter-repo felaketi

OpenCode terminalinde `git filter-repo --path opencode.json --force` çalıştırıldı.
`--path` filter-repo'da "SADECE bunu TUT, gerisini SİL" demektir — bu komut 3 günlük
(28-31 Temmuz) hiç `origin`'e push edilmemiş TÜM local commit history'sini ve
çalışma dizinindeki dosyaları geri dönüşsüz sildi. `git fsck` ile dangling obje
arandı, reflog zaten expire olmuştu, hiçbir şey kurtarılamadı.

**Repo, `origin/main`'e (27 Temmuz 2026, commit `d6cf28f`) reset edilerek tekrar
sağlıklı hale getirildi** (kurtarma, kayıp değil — repo artık bozuk değil).

**Kaybolan ve Claude'un context'inden yeniden yazılan dosyalar (31 Temmuz):**
- ✅ CLAUDE.md, AGENTS.md, opencode.json, .gitignore — tam olarak yeniden yazıldı
- ✅ `.opencode/skill/*.md` (tasarim-rehberi, site-otomasyon-kurallari, gecmis-hatalar, website-talimatlari, README) — tam yeniden yazıldı
- ✅ `.claude/skills/{4 kopya}` — sync-skills.ps1 ile yeniden senkronlandı
- ✅ `.claude/skills/brainstorming/SKILL.md` — "onay" düzeltmesi yeniden uygulandı
- ✅ `sync-skills.ps1` — yeniden yazıldı
- ✅ `arabasarrafi/app/layout.tsx` + `globals.css` — tam yeniden yazıldı (Playfair font, koyu palet)
- ⚠️ **`arabasarrafi/app/page.tsx`, `package.json`, tüm diğer config dosyaları — KAYBOLDU,
  KURTARILAMADI.** Claude'un context'inde tam page.tsx içeriği yoktu (sadece yapılan
  değişiklikler/diff'ler vardı), Vercel API'den kaynak indirme denendi ama token
  yetkisi yetmedi (403). **arabasarrafi projesi sıfırdan (npm create next-app +
  tüm component'ler) yeniden kurulmalı.**
- ✅ **Hayatta kalanlar (fiziksel olarak silinmedi):** corlu-ilgi-dis/, n-pak-ambalaj/
  (tam), RAPOR-HAIKU-AUDIT-30-07-2026.md, diğer untracked dosyalar — .env de sağ salim.
- ❌ fitness-coach/ — arabasarrafi ile aynı kaderi paylaştı (app/, package.json gitti)

**Ders (AGENTS.md'ye işlendi, "PUSH DİSİPLİNİ"):** Local commit tek başına yedek
değildir. Bundan sonra anlamlı iş bloğu bitince `git push origin main` şart.

---

## Şu an aktif iş
**Öncelik sırası (31 Temmuz 2026'dan itibaren):**
1. 🔴 **ACİL:** Bu felaketten sonra repo'yu commit'le, hemen `git push origin main`
   at (bir daha aynı şey olmasın)
2. 🔴 **arabasarrafi'yi sıfırdan yeniden kur** — package.json, app/ klasörü, tüm
   component'ler gitti. Müşteri Sitesi Türetme Süreci'yle (tasarim-rehberi.md)
   YENİDEN yapılmalı — hem kayıp dosyalar hem de zaten "berbat" bulunan tasarım
   için iyi bir fırsat
3. 🟡 API Key git history temizliği (filter-repo'yu ÇOK dikkatli, `--dry-run` ile
   test ederek, veya BFG Repo-Cleaner gibi daha güvenli bir araçla dene)
4. 🟡 Geri kalan sistem audit işleri (bkz. `AUDIT-IŞ-AKIŞI-30-07-2026.md`)

---

## Önceki Oturumun Özeti (30 Temmuz 2026 — içerik yeniden yazıldı, tarihler doğru)

### 1. Soru Sorma Kuralı Düzeltme ✅ (yeniden yazıldı)
Kullanıcı 5 kez düzeltti: komut verildiğinde sonuna kadar yap, soru sorma, rapor ver.
Soru SADECE 2 durumda: yıkıcı işlem, gerçekten eksik/çelişkili bilgi.

### 2. Özgünlük Sorunu ✅ (yeniden yazıldı)
LUMI DNA (koyu+altın) tüm müşteri sitelerine kopyalanıyordu → arabasarrafi "berbat".
Çözüm: tasarim-rehberi.md'ye "Müşteri Sitesi İçin Türetme Süreci" eklendi — LUMI DNA
artık sadece `lumiai-website/` için, her müşteri sektöre göre kendi paletini türetir.

### 3. Sistem Audit ✅ (rapor yeniden yazıldı)
`AUDIT-IŞ-AKIŞI-30-07-2026.md` — 11 sorun (yalan bilgi, tutarsızlık, elle işler,
güvenlik, maliyet takip eksikliği).

### 4. Model Tavsiyesi (Paralel Aşamalar)
- AŞAMA 1 (Acil, DeepSeek Flash): config fix'ler — ✅ tamamlandı ama sonra felaket oldu
- AŞAMA 2a (Sonnet 5): arabasarrafi redesign — ✅ yapılmıştı ama kaynak kodu kayboldu, TEKRAR yapılmalı
- AŞAMA 3a (DeepSeek Pro): automation script'ler — henüz başlanmadı

---

## Kalan Adımlar (öncelik sırasıyla)
- [ ] **ACİL: şimdi commit + push at** (bir daha veri kaybı olmasın)
- [ ] arabasarrafi sıfırdan kurulum (package.json, app/, component'ler) + Müşteri Türetme Süreci
- [ ] fitness-coach durumu değerlendir (aynı kayıp, öncelik düşük)
- [ ] API key git history temizliği (dikkatli, `--dry-run` ile)
- [ ] Skill yükleme automation (PowerShell script)
- [ ] Pre-commit hook (sync-skills otomatik) + post-build hook (gate-check otomatik)
- [ ] Maliyet dashboard
- [ ] Müşteri Türetme rubrik sistemi (Sonnet 5)
- [ ] Bekleyen insan-aksiyonu işleri (Çorlu İlgi Diş arama, İbrahim Bey, vb.)

---

## Not
Bu dosya SADECE bu oturumun durumu içindir — genel kural/talimat BURAYA YAZMA,
onlar AGENTS.md ve skill dosyalarında. Kalıcı proje kararları için `/remember`
komutunu kullan. **31 Temmuz'dan itibaren: anlamlı iş bitince SADECE commit değil,
PUSH da at — local-only commit güvenli değil, bugün kanıtlandı.**
