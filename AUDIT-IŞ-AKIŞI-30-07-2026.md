# İş Akışı Sistem Audit Raporu
**30 Temmuz 2026 — Tıkanıklık, Tutarsızlık, Maliyet Analizi**

---

## 1. BULGUYA GENEL BAKIŞ (Önem Sırasıyla)

| Kategori | Sayı | Ciddiyet | Etki |
|---|---|---|---|
| **Yalan/Eksik Bilgi** | 4 | 🔴 Kritik | Kör hareket, güvenilirlik sorunu |
| **Tutarsızlık** | 6 | 🔴 Kritik | Karışık kurallar, hata risk |
| **Manuel İşler** | 5 | 🟠 Yüksek | Zaman kaybı, ölçeklenemez |
| **Maliyet Verimsizliği** | 3 | 🟡 Orta | Gereksiz token/zaman harcaması |
| **Tasarım Kalitesi** | 2 | 🔴 Kritik | Arabasarrafi "berbat", müşteri siteler aynı |
| **Güvenlik/Opsec** | 1 | 🔴 Kritik | API key açıkta, `.env` yok |

**Toplam ciddi sorun: 11**

---

## 2. 🔴 KRİTİK: YALAN/EKSIK BİLGİ

### 2.1. `site-otomasyon-kurallari.md` opencode.json'da "instructions" değil

**İddia** (`.opencode/skill/README.md`):
> `site-otomasyon-kurallari.md` ayrıca `opencode.json`'da "instructions" olarak da otomatik yükleniyor

**Gerçek** (`opencode.json`, düzeltme öncesi):
```json
"instructions": [
  "AGENTS.md",
  "SESSION.md"
]
```
`site-otomasyon-kurallari.md` **hiç yoktu**. Sadece AGENTS.md + SESSION.md otomatik yükleniyordu.

**Sonuç:**
- OpenCode terminali Tip A işi başladığında `site-otomasyon`'un kuralları yüklenmemiş, kullanıcı elle yüklemesi gerekiyor
- README.md yanlış belgeleme

**Düzeltme (uygulandı):** `instructions` dizisine `.opencode/skill/site-otomasyon-kurallari.md` eklendi.

---

### 2.2. Ponytail Claude Code'ta kullanılabiliyor gibi yazılmış ama hiç erişilemez

**Gerçek**: Ponytail `opencode.json → plugin`, Claude Code'un `Skill` aracı `.claude/skills/` dizinini tarar. Ponytail skill'leri `.cache/opencode/` içinde, Claude Code görmez.

**Sonuç:** Claude Code'da Tip A işi yaparken "Ponytail kontrol et" maddesinde takılır, yapamaz.

**Düzeltme (uygulandı):** AGENTS.md'de Claude Code/OpenCode ayrımı netleştirildi.

---

### 2.3. brainstorming Skill'i "Tasarım Onayı Olmadan Kod Yazılamaz" ile AGENTS.md çelişiyordu

**Sorun:** brainstorming'in "Demir Kural"ı soru sorma/onay bekleme davranışına yöneltiyordu; AGENTS.md'nin nihai kuralı ("komut verdiyse sonuna kadar yap") ile çelişiyordu.

**Düzeltme (uygulandı):** brainstorming/SKILL.md'ye AGENTS.md'ye referans veren not eklendi, "onay" adımları kaldırıldı.

---

### 2.4. README.md Tip A: "8 skill" vs site-otomasyon: "7 aşama" — arası net değil

README.md "Otomatik yükleme sırası" → lineer sıra. site-otomasyon-kurallari.md'de 7 Aşama.
**Netleştirme gerekiyor:** biri skill *loading* sırası (context hazırlama), diğeri execution *aşama* sırası — henüz README'ye açıkça yazılmadı.

---

## 3. 🔴 KRİTİK: TASARIM KALITESI / ÖZGÜNLÜK (arabasarrafi hâlâ çözülmedi)

### 3.1. arabasarrafi Redesign "berbat" — neden?

**Kullanıcının şikayeti:** "aynı, hiç beğenmedim, berbat iş çıkartmışsın"

**Kök neden:** Tüm müşteri siteleri LUMI DNA'sı (koyu `#0A0A0A` + altın `#C9A96E` + custom cursor/noise/marquee) ile çıkıyordu → her site eşit.

**Çözüm yapıldı:** tasarim-rehberi.md ve site-otomasyon'da "Müşteri Sitesi Türetme Süreci" eklendi.

**Hâlâ çözülmedi:** arabasarrafi **henüz bu yeni süreç ile yeniden yapılmamış**.

---

### 3.2. Müşteri Sitesi Türetme Süreci manuel ve zaman alan

Yeni süreç 4 soru sorması gerekiyor (sektör, mevcut marka, rakipler, hedef kitle) →
otomatik yapamıyoruz, her site başında ~30 dk ek iş.

---

## 4. 🔴 KRİTİK: GÜVENLİK (API Key Açıkta)

### 4.1. opencode.json'da 21st.dev API Key açıkta idi

**Risk:** Dosya git'e commit'lenmişse repo history'de kalıcı, GitHub public ise botlar tarıyor, key çalınırsa kredi tüketilir.

**Düzeltme (uygulandı):** `.env` dosyasına taşındı, `opencode.json` `$21ST_API_KEY` referansı kullanıyor, `.env*` `.gitignore`'da.

**Eksik kalan:** git history'deki eski key hâlâ temizlenmedi (`git filter-repo` girişimi 31 Temmuz'da başka bir felakete yol açtı — bkz. `gecmis-hatalar.md`). Yeni key oluşturup eskisini revoke etmek hâlâ gerekiyor.

---

## 5. 🟠 YÜKSEK: MANUEL İŞLER (Ölçeklenemez)

### 5.1. Skill Yükleme Her Seferde Elle Sırayla
Tip A işi gelince 8 skill'i el ile çağırmak gerekiyor (~2 dk/işe).
**Çözüm:** Otomasyon script veya OpenCode CLI alias.

### 5.2. Skill Senkronizasyon Elle (sync-skills.ps1)
`.opencode/skill/*.md` güncellenince `.claude/skills/*/SKILL.md`'ye el ile kopyalanmalı.
**Çözüm:** Pre-commit hook.

### 5.3. `gate-check.ps1` Elle Çağrılmalı
Tip A bitince el ile çalıştırılmalı, otomatik QA hook yok.

### 5.4. Ponytail Modu Elle Değiş
CLI'dan mod değişimi yapılmalı.

### 5.5. Müşteri Türetme Süreci (4 soru) Elle Araştırma

---

## 6. 🟠 YÜKSEK: TUTARSIZLIK

### 6.1. README.md: "brainstorming → ... → site-otomasyon" vs Gerçek Akış
Bazı skill'ler paralel çalışabilir (design-system + type-artist) ama README lineer sıra gösteriyor.

### 6.2. AGENTS.md Checklist'te eski "onay" izleri kalabiliyor
Refactor sonrası tutarlılık kontrolü sürekli tekrar gerekiyor.

---

## 7. 🟡 ORTA: MALIYET ANALİZİ

### 7.1. OpenCode Modelleri Maliyeti

| Ajan | Model | Fiyat | Kullanım |
|---|---|---|---|
| `planner` | Claude Sonnet 4.5 | Zen (ücretli) | Tip A/E strateji |
| `coder` | DeepSeek V4 Pro | Go tokens | Tip B kodlama |
| `debugger` | Claude Haiku 4.5 | Zen (ücretli) | Tip C debug |
| `quick` | DeepSeek Flash | Go tokens (ucuz) | Tip D/G hızlı |

**Muhasebe eksikliği:** Token maliyeti takip edilmiyor, günlük limit kontrol mekanizması yok.

### 7.2. Ponytail "full" Mode Çeşitli Şişirir
"En tembel çözüm" prensibi over-engineer riski taşıyor, kontrol yok.

### 7.3. 21st.dev Ücretli Skill'leri Günlük Limitle
Günlük/aylık bütçe belgelenmemiş.

---

## 8. 🟡 ORTA: ZAMAN KAYBI ANALIZI

### Tip A Web Sitesi (Hedef: 2-3 hafta)

| Adım | Zaman | Sorun |
|---|---|---|
| 1. Önceki iş kontrol | 2 dk | Düzenli |
| 2. Tip seçimi | 2 dk | Düzenli |
| 3. 8 skill yükle (elle) | 3 dk | **Elle** |
| 4-10. 7 Aşama | 5-7 saat | Paralel fırsat yok |
| 11. Müşteri Türetme (4 soru) | 1 saat | **Elle araştırma** |
| 12. Build/test/deploy | 30 dk | Düzenli |
| **Toplam** | **6.5-8.5 saat** | **~1.5 saat kayıp** |

---

## 9. BAŞARI METRIĞI (Şu an takip yok)

SESSION.md'de ölçüm yok: proje süresi, müşteri satisfaction, tekrar işi sayısı, maliyet.
Arabasarrafi: başarı = 0/5 ("berbat"), aksiyona henüz dönüşmedi.

---

## 10. ÖZET TABLO

| # | Sorun | Tip | İmpakt | Çözüm |
|---|---|---|---|---|
| 1 | opencode.json site-otomasyon yok | Yalan | Elle yükleme | ✅ Düzeltildi |
| 2 | Ponytail claudecode'ta akılsız yazılı | Tutarsız | Karışıklık | ✅ Düzeltildi |
| 3 | brainstorming "Onay" ile çelişen | Tutarsız | Eski kural | ✅ Düzeltildi |
| 4 | Skill yükleme elle | Elle | 3 dk/işe | Otomasyon script (planlandı) |
| 5 | Skill senkron elle | Elle | Drift riski | Pre-commit hook (planlandı) |
| 6 | arabasarrafi "berbat", yeniden yapılmadı | Kalite | 0/5 müşteri | Plan var, uygulanmadı |
| 7 | Müşteri Türetme 4 soru elle | Elle | 1 saat/işe | Semi-otomatik rubrik (planlandı) |
| 8 | API Key açıkta | Güvenlik | Kredi riski | ✅ .env'ye taşındı, history temizliği kaldı |
| 9 | Maliyet takip yok | Monitor yok | Drift risk | Dashboard (planlandı) |
| 10 | gate-check elle | Elle | QA boşluğu | Post-build hook (planlandı) |

---

## 11. YAPILACAK İŞLER (Ciddiyete Göre)

### Acil (1-2 saat)
- [x] opencode.json'a site-otomasyon ekle
- [ ] API Key history temizle (git filter-repo felaketi nedeniyle ertelendi — dikkatli tekrar denenmeli)
- [x] brainstorming.md ile AGENTS.md senkron et

### Yüksek (4-6 saat)
- [ ] Skill yükleme otomasyonu (CLI alias / OpenCode plugin)
- [ ] Pre-commit hook + post-build hook
- [ ] arabasarrafi yeniden tasarla (müşteri türetme süreciyle) — **kaynak kodu 31 Temmuz felaketinde kayboldu, sıfırdan yapılmalı**
- [x] Ponytail kurallarını OpenCode'a sınırla (AGENTS.md temizle)

### Orta (8+ saat)
- [ ] Maliyet dashboard (token takip, günlük limit)
- [ ] Müşteri Türetme semi-otomatikleş (sektör rubrik + template)
- [ ] README.md + site-otomasyon uyumlulaştır (paralel flow diagram)
- [ ] SESSION.md'ye başarı metriği ekle (satisfaction, süre, cost)

---

## 12. FİYAT/PERFORMANS ANALİZİ

### ROI (30 gün projeksiyon)
- **Acil çözümler:** 3 saat × 5 site = 15 saat tasarruf
- **Otomasyon:** 30 min × 5 site = 2.5 saat tasarruf
- **Toplam:** ~17.5 saat/ayın değeri

---

**Not (31 Temmuz 2026):** Bu raporun bir kısmı `git filter-repo` felaketi sonrası
hafızadan yeniden yazıldı (bkz. `gecmis-hatalar.md` son madde, `AGENTS.md`
"PUSH DİSİPLİNİ"). Orijinal rapor commit'i git history'den kayboldu.
