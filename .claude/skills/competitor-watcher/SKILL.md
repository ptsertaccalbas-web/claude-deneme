---
name: competitor-watcher
description: Haftada 2 kez agent-browser ile rakipleri ve web'i tarayarak sektördeki yeni araçları, yetenekleri ve trendleri raporlar.
---

# Competitor Watcher — Haftalık Rekabet İstihbaratı

## Misyon
AI tasarım/development araçları pazarındaki yeni çıkan, tutmuş veya değişiklik geçiren her şeyden haberdar olmak. Haftada 2 kez otomatik tarama + rapor.

## Taranacak Kaynaklar

### Doğrudan Rakipler (Haftalık)
| Platform | URL | İzlenecek Şey |
|----------|-----|---------------|
| Emergent | emergent.sh | Yeni ajan özellikleri, fiyat değişikliği, integrations |
| Lovable | lovable.dev | Visual Edits güncellemeleri, yeni model desteği |
| Bolt.new | bolt.new | WebContainer yenilikleri, yeni framework desteği |
| v0 | v0.dev | Yeni model tier'ları, Design Mode güncellemeleri |
| Replit | replit.com | Agent güncellemeleri, yeni paralel özellikler |
| Canva | canva.com | Code 2.0, AI 2.0, yeni MCP server'lar |

### Keşif Kaynakları
| Kaynak | Hedef |
|--------|-------|
| Product Hunt | Yeni çıkan AI tasarım/development araçları |
| GitHub Trending | AI + web-dev reposu, yeni open-source araçlar |
| Hacker News | Yeni teknolojiler, topluluk trendleri |
| TechCrunch/VentureBeat | Sektör haberleri, funding, satın almalar |
| arXiv | Yeni akademik yayınlar (AI + HCI) |
| npm trends | Yeni popüler kütüphaneler |

## Tarama Scripti

```powershell
# scripts/watch-competitors.ps1
param(
  [string]$ReportDir = "./competitor-reports",
  [switch]$GenerateReport
)

$targets = @(
  @{ Name = "Emergent"; Url = "https://emergent.sh"; CheckElements = @("pricing", "features", "blog") },
  @{ Name = "Lovable"; Url = "https://lovable.dev"; CheckElements = @("pricing", "changelog", "docs") },
  @{ Name = "Bolt"; Url = "https://bolt.new"; CheckElements = @("features", "pricing") },
  @{ Name = "v0"; Url = "https://v0.dev"; CheckElements = @("docs", "pricing") },
  @{ Name = "Replit"; Url = "https://replit.com"; CheckElements = @("blog", "changelog") },
  @{ Name = "Canva"; Url = "https://canva.com"; CheckElements = @("whats-new", "ai-features") }
)

$discoverySources = @(
  @{ Name = "Product Hunt - AI Tools"; Url = "https://www.producthunt.com/topics/artificial-intelligence" },
  @{ Name = "Product Hunt - Dev Tools"; Url = "https://www.producthunt.com/topics/developer-tools" },
  @{ Name = "GitHub Trending - TypeScript"; Url = "https://github.com/trending/typescript?since=weekly" },
  @{ Name = "GitHub Trending - Python"; Url = "https://github.com/trending/python?since=weekly" },
  @{ Name = "Hacker News - Front Page"; Url = "https://news.ycombinator.com" },
  @{ Name = "TechCrunch - AI"; Url = "https://techcrunch.com/category/artificial-intelligence/" }
)

$report = @{
  Date = Get-Date -Format "yyyy-MM-dd HH:mm"
  CompetitorChanges = @()
  NewTools = @()
  NewSkills = @()
}

# 1. Rakipleri tara
foreach ($target in $targets) {
  Write-Output "Scanning $($target.Name)..."
  
  try {
    $page = agent-browser navigate --url $target.Url --wait 3000
    $screenshot = agent-browser screenshot --path "$ReportDir\screenshots\$($target.Name).png"
    
    # Sayfa içeriğini analiz et
    $analysis = agent-browser evaluate --script @"
const body = document.body.innerText.toLowerCase()
const changes = {
  hasNewPricing: body.match(/pricing|price|\$/g)?.length || 0,
  hasNewFeatures: body.match(/new|launch|announce|introducing|beta/g)?.length || 0,
  hasNewIntegrations: body.match(/integration|connect|api|mcp|plugin/g)?.length || 0,
  keyPhrases: body.match(/(new|introducing|announce|launch|beta|update|now available)/gi) || [],
}
JSON.stringify(changes)
"@

    if ($analysis.hasNewFeatures -gt 3 -or $analysis.hasNewIntegrations -gt 5) {
      $report.CompetitorChanges += @{
        Name = $target.Name
        Url = $target.Url
        Analysis = $analysis
        Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
      }
    }
  }
  catch {
    Write-Output "  Error scanning $($target.Name): $_"
  }
}

# 2. Keşif kaynaklarını tara
foreach ($source in $discoverySources) {
  Write-Output "Exploring $($source.Name)..."
  
  try {
    $page = agent-browser navigate --url $source.Url --wait 5000
    $items = agent-browser evaluate --script "JSON.stringify(extractListings())"
    
    # Yeni araçları tespit et
    foreach ($item in $items) {
      if (IsNewTool($item)) {
        $report.NewTools += @{
          Name = $item.name
          Url = $item.url
          Source = $source.Name
          Description = $item.description
          Category = CategorizeTool($item)
        }
      }
    }
  }
  catch {
    Write-Output "  Error exploring $($source.Name): $_"
  }
}

# 3. Yeni yetenek/skill ihtiyaçlarını belirle
$report.NewSkills = Analyze-SkillGaps $report.NewTools $report.CompetitorChanges

# 4. Raporu kaydet
$reportPath = "$ReportDir\report-$(Get-Date -Format 'yyyy-MM-dd').json"
$report | ConvertTo-Json -Depth 5 | Out-File $reportPath -Encoding utf8

# 5. Özet çıktı
Write-Output "`n=== COMPETITOR WATCH REPORT ==="
Write-Output "Date: $($report.Date)"
Write-Output "Changes detected: $($report.CompetitorChanges.Count)"
Write-Output "New tools found: $($report.NewTools.Count)"
Write-Output "New skill candidates: $($report.NewSkills.Count)"
Write-Output "Report saved to: $reportPath"
```

## Özet Rapor Formatı

```markdown
# Competitor Watch — Haftalık Rapor
**Tarih**: 2026-07-26

## 🚀 Öne Çıkan Değişiklikler
- **Lovable**: Yeni subagent özelliği eklendi (paralel build)
- **v0**: Design Mode güncellendi (token-aware editing artık ücretsiz)
- **Emergent**: E3 autonomous builder beta'ya çıktı

## 🆕 Yeni Araçlar
- **Tool X** — Product Hunt'te 1. çıktı. Yaptığı iş: AI ile form oluşturma
- **Tool Y** — GitHub'da 5K ⭐. Frontend test otomasyonu

## 💡 Skill Önerileri
- *form-agent*: Tool X'teki form oluşturma yeteneği kopyalanmalı
- *test-automation*: Tool Y'deki test pattern'i incelenmeli

## 📊 Trend Analizi
- Bu hafta öne çıkan trend: MCP server ekosistemi büyüyor
- 3 rakip MCP desteği eklemiş (Canva, Lovable, Emergent)
```

## Otomatik Zamanlama

```powershell
# Windows Task Scheduler ile haftalık çalıştırma
$taskAction = New-ScheduledTaskAction -Execute "powershell.exe" `
  -Argument "-File `"$PSScriptRoot\scripts\watch-competitors.ps1`" -GenerateReport"

$taskTrigger = @(
  New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday, Thursday -At "09:00AM"
)

Register-ScheduledTask -TaskName "CompetitorWatch" `
  -Action $taskAction -Trigger $taskTrigger `
  -Description "Haftalık rakip ve trend taraması"
```

## Kalite Standartları
- Tarama max 5 dakika (timeout koruması)
- Her tarama sonucu JSON + Markdown formatında kaydedilir
- Sadece DEĞİŞİKLİK tespit edilince rapora eklenir (gürültü azaltma)
- Yeni araç tespitinde minimum kriter: 100+ Product Hunt upvote veya 500+ GitHub star
- Skill önerileri her hafta `ANCHORED_SUMMARY.md`'ye eklenir

## Referanslar
- agent-browser: sayfa içeriği analizi ve screenshot
- Product Hunt API: yeni araç keşfi
- GitHub Trending: popüler repo'lar
