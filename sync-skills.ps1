<#
.SYNOPSIS
    Proje-ozel skill dosyalarini .opencode/skill/ -> .claude/skills/ senkron et.

.DESCRIPTION
    .opencode/skill/*.md dosyalarinin GOVDESINI .claude/skills/<isim>/SKILL.md'ye kopyalar.
    Frontmatter (name/description) kaynaktan ASLA cikarilmaz -- sabit tanimlidir, cunku
    kaynak dosyalar YAML frontmatter icermez, sadece "---" markdown bolum ayiraci kullanir.
    (31 Temmuz 2026: eski script "---" ayiracini frontmatter siniri sanip icerigi bozdu,
    bu yuzden frontmatter artik kaynaktan hic parse edilmiyor.)

.PARAMETER SourceDir
    Kaynak klasor (default: .opencode/skill)

.PARAMETER TargetDir
    Hedef klasor (default: .claude/skills)

.EXAMPLE
    .\sync-skills.ps1
#>

param(
    [string]$SourceDir = ".\.opencode\skill",
    [string]$TargetDir = ".\.claude\skills"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $SourceDir)) {
    Write-Error "Kaynak klasor bulunamadi: $SourceDir"
}

if (-not (Test-Path $TargetDir)) {
    Write-Error "Hedef klasor bulunamadi: $TargetDir"
}

# Sadece .opencode/skill/ altinda gercekten var olan 4 proje-ozel skill.
# (brainstorming/design-system/web-design-master/animation-master burada YOK --
# onlar farkli kaynakli, genel skill'ler, bu script'in kapsami disinda.)
$sourceFiles = @{
    "tasarim-rehberi"      = "tasarim-rehberi.md"
    "website-talimatlari"  = "website-talimatlari.md"
    "site-otomasyon"       = "site-otomasyon-kurallari.md"
    "gecmis-hatalar"       = "gecmis-hatalar.md"
}

$syncedCount = 0

foreach ($skillName in $sourceFiles.Keys) {
    $fileName = $sourceFiles[$skillName]
    $sourcePath = Join-Path $SourceDir $fileName

    if (-not (Test-Path $sourcePath)) {
        Write-Warning "Kaynak yok, atlaniyor: $skillName ($sourcePath)"
        continue
    }

    $targetSkillDir = Join-Path $TargetDir $skillName
    $targetPath = Join-Path $targetSkillDir "SKILL.md"

    if (-not (Test-Path $targetSkillDir)) {
        New-Item -ItemType Directory -Path $targetSkillDir -Force | Out-Null
    }

    $sourceContent = (Get-Content -Path $sourcePath -Raw).TrimEnd() -replace "`r`n", "`n"
    $sourceContent = $sourceContent -replace "`n", "`r`n"

    # Frontmatter sabit -- kaynaktan asla turetilmez (bkz. yukaridaki not).
    $frontmatter = "---`r`nname: $skillName`r`ndescription: LUMI AI Media proje-ozel talimat (kaynak: .opencode/skill/$fileName)`r`n---"
    $kaynakNotu = "> Kaynak: .opencode/skill/$fileName -- opencode ile senkron tutulur, biri guncellenince digeri de guncellenmeli."

    $targetContent = "$frontmatter`r`n`r`n$kaynakNotu`r`n`r`n$sourceContent`r`n"

    if (Test-Path $targetPath) {
        $existingContent = Get-Content -Path $targetPath -Raw
        if ($existingContent -eq $targetContent) {
            continue
        }
        Set-Content -Path $targetPath -Value $targetContent -Force -NoNewline
        Write-Host "Guncellendi: $skillName"
        $syncedCount++
    } else {
        Set-Content -Path $targetPath -Value $targetContent -NoNewline
        Write-Host "Olusturuldu: $skillName"
        $syncedCount++
    }
}

Write-Host ""
Write-Host "Sonuc: $syncedCount dosya senkron edildi"

exit 0
