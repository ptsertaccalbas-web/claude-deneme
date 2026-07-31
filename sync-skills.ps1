#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Proje-özel skill dosyalarını .opencode/skill/ → .claude/skills/ senkron et
    Frontmatter ve "Kaynak:" notunu koruyarak güncelle.

.DESCRIPTION
    .opencode/skill/*.md dosyalarını .claude/skills/<isim>/SKILL.md'ye kopyalar.
    - Frontmatter (---.../---) mevcutsa korur; yoksa oluşturur
    - "Kaynak:" satırını gövdeye ekler (yedek güvenliği)
    - Hiç dosya yok → hata; hiç değişiklik → çıkış

.PARAMETER SourceDir
    Kaynak klasör (default: .opencode/skill)

.PARAMETER TargetDir
    Hedef klasör (default: .claude/skills)

.EXAMPLE
    .\sync-skills.ps1
    .\sync-skills.ps1 -SourceDir C:\repo\.opencode\skill -TargetDir C:\repo\.claude\skills
#>

param(
    [string]$SourceDir = ".\.opencode\skill",
    [string]$TargetDir = ".\.claude\skills"
)

$ErrorActionPreference = "Stop"

# Kontrol: kaynak klasör var mı?
if (-not (Test-Path $SourceDir)) {
    Write-Error "Kaynak klasör bulunamadı: $SourceDir"
}

if (-not (Test-Path $TargetDir)) {
    Write-Error "Hedef klasör bulunamadı: $TargetDir"
}

$sourceFiles = @{
    "brainstorming" = "brainstorming.md"
    "design-system" = "design-system.md"
    "web-design-master" = "web-design-master.md"
    "animation-master" = "animation-master.md"
    "tasarim-rehberi" = "tasarim-rehberi.md"
    "website-talimatlari" = "website-talimatlari.md"
    "site-otomasyon" = "site-otomasyon-kurallari.md"
    "gecmis-hatalar" = "gecmis-hatalar.md"
}

$syncedCount = 0

foreach ($skillName in $sourceFiles.Keys) {
    $fileName = $sourceFiles[$skillName]
    $sourcePath = Join-Path $SourceDir $fileName

    if (-not (Test-Path $sourcePath)) {
        Write-Warning "Atlanıyor: $skillName"
        continue
    }

    $targetSkillDir = Join-Path $TargetDir $skillName
    $targetPath = Join-Path $targetSkillDir "SKILL.md"

    # Hedef dizin oluştur
    if (-not (Test-Path $targetSkillDir)) {
        New-Item -ItemType Directory -Path $targetSkillDir -Force | Out-Null
    }

    # Kaynak dosyasını oku
    $sourceContent = Get-Content -Path $sourcePath -Raw

    # Frontmatter çıkart
    $lines = $sourceContent -split "`n"
    $frontmatterLines = @()
    $bodyLines = @()
    $inFrontmatter = $false
    $frontmatterCount = 0

    foreach ($line in $lines) {
        if ($line -match "^---\s*$") {
            if ($inFrontmatter) {
                $inFrontmatter = $false
                $frontmatterCount++
                continue
            } else {
                $inFrontmatter = $true
                continue
            }
        }

        if ($inFrontmatter) {
            $frontmatterLines += $line
        } elseif ($frontmatterCount -gt 0 -or -not $inFrontmatter) {
            $bodyLines += $line
        }
    }

    # Frontmatter yoksa oluştur
    if ($frontmatterLines.Count -eq 0) {
        $frontmatterLines = @(
            "name: $skillName",
            "description: $skillName skill",
            "metadata:",
            "  type: skill"
        )
    }

    # Kaynak notu kontrol et, yoksa ekle
    $bodyContent = ($bodyLines -join "`n").Trim()
    if ($bodyContent -notmatch "Kaynak:") {
        $bodyContent = "> **Kaynak:** ``.opencode/skill/$fileName``$([Environment]::NewLine)$([Environment]::NewLine)" + $bodyContent
    }

    # Yeni dosya oluştur
    $targetContent = "---$([Environment]::NewLine)" + ($frontmatterLines -join "`n") + "$([Environment]::NewLine)---$([Environment]::NewLine)$([Environment]::NewLine)" + $bodyContent

    # Dosya yazıp değişikliği kontrol et
    if (Test-Path $targetPath) {
        $existingContent = Get-Content -Path $targetPath -Raw
        if ($existingContent -ne $targetContent) {
            Set-Content -Path $targetPath -Value $targetContent -Force
            Write-Host "✓ Güncellendi: $skillName"
            $syncedCount++
        }
    } else {
        Set-Content -Path $targetPath -Value $targetContent
        Write-Host "✓ Oluşturuldu: $skillName"
        $syncedCount++
    }
}

Write-Host ""
Write-Host "Sonuç: $syncedCount dosya senkron edildi"

exit 0
