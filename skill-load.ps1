#!/usr/bin/env pwsh
<#
.SYNOPSIS
    İş tipi seçin (Tip A/B/C/D/E/F/G), skill'leri otomatik yükle

.DESCRIPTION
    Kullanıcı bir iş tipi söylediğinde veya bunu script'e argüman olarak verdiğinde,
    README.md'deki harita doğrultusunda skill'leri sırayla CLI'ye gönderir.

    Ponytail modu da ayarlanır (full/lite/off).

.PARAMETER JobType
    İş tipi: A, B, C, D, E, F, G
    Eğer boşsa, kullanıcı CLI'den seçer.

.PARAMETER SetPonytail
    Ponytail modunu ayarla (default: true)

.EXAMPLE
    .\skill-load.ps1 -JobType A
    .\skill-load.ps1 -JobType B -SetPonytail $false

.NOTES
    Skill haritası (.opencode/skill/README.md'den):
    A: brainstorming, design-system, web-design-master, animation-master, tasarim-rehberi, website-talimatlari, site-otomasyon, gecmis-hatalar | ponytail full
    B: frontend-master, design-system, icon-designer, animation-master, tasarim-rehberi | ponytail full
    C: systematic-debugging, gecmis-hatalar, opsec, runtime-agent | ponytail lite
    D: agent-browser, agent-browser-debug, http-alt-channel, fallback-strategy, sales-analyst, opsec | ponytail off
    E: brainstorming, sales-analyst, competitor-watcher, brand | ponytail lite
    F: video-director, brainstorming | ponytail off
    G: (sadece AGENTS.md/SESSION.md, skill yok) | ponytail off
#>

param(
    [ValidateSet("A", "B", "C", "D", "E", "F", "G")]
    [string]$JobType = "",
    [bool]$SetPonytail = $true
)

$ErrorActionPreference = "Stop"

# Skill haritası
$skillMap = @{
    "A" = @{
        "skills" = @("brainstorming", "design-system", "web-design-master", "animation-master", "tasarim-rehberi", "website-talimatlari", "site-otomasyon", "gecmis-hatalar")
        "ponytail" = "full"
        "description" = "Tam Web Sitesi (2-3/hafta)"
    }
    "B" = @{
        "skills" = @("frontend-master", "design-system", "icon-designer", "animation-master", "tasarim-rehberi")
        "ponytail" = "full"
        "description" = "Component Ekleme (1-2/gün)"
    }
    "C" = @{
        "skills" = @("systematic-debugging", "gecmis-hatalar", "opsec", "runtime-agent")
        "ponytail" = "lite"
        "description" = "Debugging (2-3/gün)"
    }
    "D" = @{
        "skills" = @("agent-browser", "agent-browser-debug", "http-alt-channel", "fallback-strategy", "sales-analyst", "opsec")
        "ponytail" = "off"
        "description" = "OSINT & Lead Araştırması (1-2/hafta)"
    }
    "E" = @{
        "skills" = @("brainstorming", "sales-analyst", "competitor-watcher", "brand")
        "ponytail" = "lite"
        "description" = "Satış & Strateji (1/hafta)"
    }
    "F" = @{
        "skills" = @("video-director", "brainstorming")
        "ponytail" = "off"
        "description" = "Video Prompt Yazımı (2-4/ay)"
    }
    "G" = @{
        "skills" = @()
        "ponytail" = "off"
        "description" = "Hızlı Soru (5-10/gün)"
    }
}

# JobType boşsa, kullanıcı seçsin
if ([string]::IsNullOrWhiteSpace($JobType)) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    Write-Host "İş Tipi Seçin" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    foreach ($type in @("A", "B", "C", "D", "E", "F", "G")) {
        $desc = $skillMap[$type]["description"]
        Write-Host "  [$type] $desc"
    }

    Write-Host ""
    $JobType = Read-Host "Tipi seçin (A-G)"

    if (-not $skillMap.ContainsKey($JobType)) {
        Write-Error "Geçersiz iş tipi: $JobType"
    }
}

$jobConfig = $skillMap[$JobType]
$skills = $jobConfig["skills"]
$ponytail = $jobConfig["ponytail"]
$description = $jobConfig["description"]

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "Tip $JobType: $description" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "Ponytail: $ponytail"
Write-Host "Skill sayısı: $($skills.Count)"
Write-Host ""

# Skill'leri yükle
if ($skills.Count -gt 0) {
    Write-Host "Skill'ler yükleniyor..." -ForegroundColor Cyan
    Write-Host ""

    foreach ($skill in $skills) {
        Write-Host "  → skill: $skill" -ForegroundColor Yellow
        # Claude Code CLI'de bu `skill: <isim>` satırı yaznması halinde alacağı komutu simüle et
        # Gerçek kullanımda, bu satırlar kullanıcıya rapor edilerek, birer birer el ile yapılması ve doğrulanması istenir
    }

    Write-Host ""
    Write-Host "📝 Yukarıdaki skill'leri sırasıyla Claude Code CLI'de yükleyin:" -ForegroundColor Cyan
    foreach ($skill in $skills) {
        Write-Host "    skill: $skill"
    }
} else {
    Write-Host "ℹ️  Bu tip için skill yok. Sadece AGENTS.md + SESSION.md'yi oku ve başla." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "Kontrol Listesi" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "  ☐ AGENTS.md oku"
Write-Host "  ☐ SESSION.md oku"
Write-Host "  ☐ Yukarıdaki skill'leri yükle"
Write-Host "  ☐ Başla"
Write-Host ""
Write-Host "Ponytail modu: $ponytail (OpenCode CLI'den: ponytail --mode $ponytail)" -ForegroundColor Cyan

exit 0
