# AGENTS.md — LUMI AI Media (Küçültülmüş — ~500 token)

## ZORUNLU CHECKLIST (her işte, sırayla)
- [ ] SESSION.md oku (aktif iş, kalan adım var mı?)
- [ ] Gerekirse kısa plan kur, sonra DOĞRUDAN uygula
- [ ] Uygula, HER adımda doğrula (dosya gerçekten yazıldı mı, build geçti mi)
- [ ] Aynı hata 2. kez olursa 3. denemeyi yapma — kullanıcıya strateji sor
- [ ] İşi yarıda bırakma: tamamla veya açıkça "iptal ediyorum" de
- [ ] İş bitince SESSION.md'yi güncelle (bir sonraki oturum için)

## SORU SORMA KURALI (30 Temmuz 2026 — kullanıcı 5 kez düzeltti, NİHAİ ve TEK kural)

**Kullanıcı bir şey söylediğinde (komut/istek/görev): sonuna kadar yap, tamamla,
sonra rapor ver.** Yürütme sırasında "yapayım mı?", "başlayayım mı?", "devam
edeyim mi?", "onaylıyor musun?" gibi hiçbir soru SORULMAZ. Karar vermen gereken
her nokta (renk, dosya adı, hangi bölüm, tasarım detayı, kapsamın nasıl
yorumlanacağı, sıradaki adım) kendi kararınla ilerler; raporda ne yaptığını ve
varsa varsayımlarını açıklarsın — durup onay beklemezsin. Bu kural AGENTS.md'ye
değil işi yaparken yüklenen HER skill'e de uygulanır (ör. `brainstorming`
skill'inin "tasarım onayı olmadan kod yazılamaz" kuralı da bu kapsamda — atla).

**Soru SADECE şu 2 durumda sorulur, başka hiçbir yerde:**
1. Geri dönüşü olmayan/yıkıcı bir işlem (canlı/satılmış bir siteyi silme veya
   üzerine yazma, force-push, gerçek parayı/üçüncü tarafı etkileyen işlem)
2. Gerçekten eksik/çelişkili bilgi (dosya yok, API key yok, firma bilgisi
   çelişkili) — bunu UYDURMA, sor; ama bu nadir olmalı

Kapsam belirsiz görünse bile sormak yerine en makul yorumla ilerle, işi bitir,
raporda hangi yorumu seçtiğini belirt.

## SERT KURALLAR (ihlal = işi durdur)
1. Kritik/yıkıcı işlem öncesi onay atlanamaz (yukarıdaki 2 durum)
2. Varsayımla hareket etme — dosya/API/firma bilgisini kontrol et, tahmin etme
3. İsim/import tahmin etme — önce ara/kontrol et, sonra yaz
4. "Zaten var" deme — önce gerçekten dosyayı aç, doğrula
5. **Geri dönüşü olmayan git komutları (filter-repo, reset --hard, push --force)
   ASLA "--force" ile denenmeden önce ne yaptığı tam anlaşılmadan çalıştırılmaz**
   (31 Temmuz 2026: `git filter-repo --path opencode.json --force` üç günlük
   local-only commit history'yi ve arabasarrafi/fitness-coach kaynak kodunu
   geri dönüşsüz sildi — `--path` filter-repo'da "SADECE bunu TUT, gerisini SİL"
   demektir, "bunu hariç tut" değil. Böyle komutlardan önce `--dry-run` dene
   veya en azından `git branch backup-$(date +%s)` ile yedek al.)

## İYİ GİDEN, KORU
- Over-engineering yapma (1 dosya yetiyorsa 10 yapma)
- Küçük kararları (dosya adı, renk tonu, paket seçimi) kendin al, sorma

## OTOMATİK ARŞİVLEME
`claude talimatlar/NN-*.md` (numaralı görev talimatı) tamamlanınca **sormadan**
`claude talimatlar/ARCHIVE/`'e taşı — 00/01/06/08'de uygulanan kalıp. İş
tamamlanmadıysa veya belirsizse taşıma, önce bitir.

## DETAYLI KURALLAR NEREDE? (otomatik yüklenmez — gerektiğinde `skill` ile çağır)
- Website süreç detayı → `skill: site-otomasyon` (`.opencode/skill/site-otomasyon-kurallari.md`)
- Website yazım/ton kuralları → `skill: website-talimatlari`
- Tasarım DNA'sı / token'lar → `skill: tasarim-rehberi`
- Geçmiş hatalar (tekrarlama) → `skill: gecmis-hatalar` (`.opencode/skill/gecmis-hatalar.md`)

## MARKA ÖZETİ — SADECE LUMI'NİN KENDİ SİTESİ İÇİN (asgari, tam kimlik skill'de)
LUMI AI Media (`lumiai-website/`) — sinematik, az-ve-öz, güvenilir. Low-key ışık,
tek vurgu rengi, 21:9 oran, film grain. Floating orb / simetrik hero YASAK (bu
ikisi genel anti-pattern, her projede geçerli). **Oswald yasağı SADECE LUMI'nin
kendi sitesi içindir** — müşteri sitelerinde (arabasarrafi, corlu-ilgi-dis, n-pak
vb.) `tasarim-rehberi`'nin sektöre göre font tablosunu kullan, orada Oswald
Endüstriyel/İmalat sektörü için önerilir ve kullanılabilir.

**ÖNEMLİ (30 Temmuz 2026 — özgünlük düzeltmesi):** Bu marka kimliği (renk paleti,
imza efektleri: custom cursor/noise/marquee) MÜŞTERİ sitelerine KOPYALANMAZ —
her müşteri sitesi kendi rengini/efektini `tasarim-rehberi`'nin "Müşteri Sitesi
İçin Türetme Süreci" bölümüne göre türetir. Detay → `skill: tasarim-rehberi`.

## OTOMATİK SKİLL YÜKLEME CHECKER

**Tip A işi (Yeni İş Emri) geldiğinde hemen sonra bu checklist'i yap:**

- [ ] İşin tipini tanı (Tip A/B/C/D/E/F/G) — `.opencode/skill/README.md` kullan
- [ ] README.md'den ilgili skill'leri bul
- [ ] Skill'leri **sırasıyla** `skill: <isim>` ile yükle
- [ ] Ponytail modunu kontrol et (Tip'e göre full/lite/off — bkz. README.md)
- [ ] Tüm skill'ler yüklendi, hiç error yok → başla

**İş Tiplerine Göre Hazır Listeler:**
- **Tip A:** brainstorming → design-system → web-design-master → animation-master → tasarim-rehberi → website-talimatlari → site-otomasyon → gecmis-hatalar
- **Tip B:** frontend-master → design-system → icon-designer → animation-master → tasarim-rehberi
- **Tip C:** systematic-debugging → gecmis-hatalar → opsec → runtime-agent
- **Tip D:** agent-browser → agent-browser-debug → http-alt-channel → fallback-strategy → sales-analyst → opsec
- **Tip E:** brainstorming → sales-analyst → competitor-watcher → brand
- **Tip F:** video-director → brainstorming
- **Tip G:** (skill yok, sadece başla)

**ÖNEMLİ:** Skill yüklenmeden görev başlama. "Başladım ama skill yok" hatasına izin verme.
Detaylı harita ve gerekçe → `.opencode/skill/README.md`.

## PONYTAIL & 21st.dev NOTLARI

### Ponytail
**Sadece OpenCode'da çalışır — Claude Code bu plugin'i hiç göremez** (30 Temmuz
2026 dogfood testinde doğrulandı: ponytail `opencode.json:plugin` olarak tanımlı,
Claude Code'un Skill/plugin sistemine bağlı değil). `skill: ponytail-help` /
`skill: ponytail-review` çağrıları **Claude Code'da hata verir veya hiçbir şey
yapmaz** — bu talimatlar sadece OpenCode terminali için geçerlidir.

- **OpenCode'da:** Ponytail kullan (bkz. `skill: ponytail-help` / `ponytail-review`).
- **Claude Code'da:** Ponytail yok (plugin OpenCode-only). Over-engineering
  kontrolünü AGENTS.md'nin "İYİ GİDEN, KORU" kuralına göre kendin yap.

### 21st.dev
- Ücretli: `21st_get_component`, `21st_generate`
- Ücretsiz: arama, listeleme
- Sadece Tip A (kompleks UI) / Tip B (komponent arama) için kullan
- Günlük limiti aşarsa → soruştur → API key sıfırla

### gate-check.ps1
- Her Tip A bitince çalıştır: `.\04-gate-check.ps1 -ExpectedFiles 14 -ComponentFolder .\src\components`
- Tip B: `-ExpectedFiles 1-3`, Tip C: `-ExpectedFiles 0` (sadece build check)
- Script'i ilgili alt-proje klasöründen çağır (repo kökünde `package.json` yok)
- **Tip B'de (dolu/mevcut klasöre ekleme) `-BeforeCount <ise başlamadan önceki dosya sayısı>` parametresini de ver.**
  `$ExpectedFiles` script için "bu işte EKLENMESİ gereken dosya sayısı"dır, klasördeki
  toplam değil — `-BeforeCount` verilmezse (varsayılan 0) script toplamla kıyaslar ve
  dolu bir klasörde her zaman yanlış pozitif "eksik/fazla dosya" uyarısı verir
  (30 Temmuz 2026 dogfood testinde bulundu, script'te düzeltildi).

## İKİ TERMİNAL PROTOKOLÜ (Claude Code + OpenCode)
Kullanıcı Claude Code'u (Pro/Max abonelik, Sonnet/Haiku ücretsiz) ve OpenCode'u
(Zen/Go, token bazlı) iki ayrı terminalde paralel kullanıyor. Kurallar:

- **Varsayılan:** Sonnet/Haiku gerektiren iş (Tip A/E strateji, Tip C debug) → Claude Code.
  Diğerleri (Tip B/D/F/G) → OpenCode (zaten Zen değil, Go/DeepSeek — ucuz).
- **Fallback:** Claude Code kullanım limitine takılırsan → OpenCode'daki `planner`/
  `debugger` ajanları (Zen üzerinden Sonnet/Haiku) devreye girer, ücretli ama kesintisiz.
  Bu ajanlar bilerek Zen'de bırakıldı, silme.
- **Devir-teslim kuralı (kod kaybı/çakışma riski için):** Bir terminalde anlamlı bir
  değişiklik bitince diğer terminale geçmeden önce `git commit` at. Commit atmadan
  diğer ajana dosya elletme — ikinci ajan neyin değiştiğini görmeden "kör" yazar.
- **Yeni proje = ilk commit erken:** Yeni bir kod projesi (Next.js/Python servis vb.)
  başlatılınca ilk anlamlı iş (ilk sayfa/ilk component) bitince hemen commit at,
  untracked biriktirme — iki terminal arasında geçiş yapılabilecek bir proje git'siz
  kalırsa devir-teslim kuralı uygulanamaz (30 Temmuz 2026'da fitness-coach/arabasarrafi
  hiç commit'lenmemiş halde bulundu, düzeltildi).
- **Aynı anda iki terminale komut basma** — sıralı çalış, paralel değil (race condition).
- **PUSH DİSİPLİNİ (31 Temmuz 2026, felaketten sonra eklendi — ZORUNLU):** Local
  commit'ler tek başına YEDEK değildir. Anlamlı bir iş bloğu bitince (ör. bir
  oturumun sonunda, veya büyük bir refactor sonrası) `git push origin main` at.
  **31 Temmuz 2026'da bir terminalde çalıştırılan `git filter-repo --path
  opencode.json --force` komutu 3 günlük hiç push edilmemiş local history'yi
  (AGENTS.md/SESSION.md/CLAUDE.md'nin ilk hali, tüm skill dosyaları, arabasarrafi
  ve fitness-coach kaynak kodu) geri dönüşsüz sildi** — çünkü hiçbiri origin'e
  push edilmemişti, sadece local'deydi. Push edilmiş bir commit, local repo ne
  kadar bozulursa bozulsun GitHub'da güvende kalır.

---
*Bu dosya her mesajda otomatik yüklenir — bu yüzden kısa tutuldu. Detaylar skill
dosyalarında; model onları sadece ilgili işte çeker, gereksiz context şişmez.*
