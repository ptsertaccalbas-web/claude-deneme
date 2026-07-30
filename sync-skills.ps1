# sync-skills.ps1 — .opencode/skill/*.md kaynaklarini .claude/skills/<isim>/SKILL.md kopyalarina senkronlar
# Neden: Claude Code'un Skill araci sadece .claude/skills/<isim>/SKILL.md yapisini gorur,
# .opencode/skill/*.md klasorunu hic indekslemez. Tek kaynak .opencode/skill/*.md'dir;
# bu script gövdeyi oraya kopyalar, .claude/skills tarafinin kendi frontmatter'ini korur.
# Not: UTF8 BOM'suz okuma/yazma kullanilir (Get-Content -Raw ile Turkce karakterler bozuluyordu).

$ErrorActionPreference = "Stop"
$repoRoot = $PSScriptRoot

$map = @{
    "tasarim-rehberi.md"           = "tasarim-rehberi"
    "website-talimatlari.md"       = "website-talimatlari"
    "site-otomasyon-kurallari.md"  = "site-otomasyon"
    "gecmis-hatalar.md"            = "gecmis-hatalar"
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($sourceFile in $map.Keys) {
    $skillName = $map[$sourceFile]
    $sourcePath = Join-Path $repoRoot ".opencode\skill\$sourceFile"
    $destDir = Join-Path $repoRoot ".claude\skills\$skillName"
    $destPath = Join-Path $destDir "SKILL.md"

    if (-not (Test-Path $sourcePath)) {
        Write-Warning "Kaynak yok, atlaniyor: $sourcePath"
        continue
    }

    $body = [System.IO.File]::ReadAllText($sourcePath, [System.Text.Encoding]::UTF8)

    # Var olan hedefte frontmatter varsa koru, yoksa minimal frontmatter uret
    $frontmatter = $null
    if (Test-Path $destPath) {
        $existing = [System.IO.File]::ReadAllText($destPath, [System.Text.Encoding]::UTF8)
        if ($existing -match "(?s)^(---.*?---)\r?\n") {
            $frontmatter = $matches[1]
        }
    }
    if (-not $frontmatter) {
        $frontmatter = "---`nname: $skillName`ndescription: LUMI AI Media proje-ozel talimat (kaynak: .opencode/skill/$sourceFile)`n---"
    }

    $note = "`n> Kaynak: .opencode/skill/$sourceFile -- opencode ile senkron tutulur, biri guncellenince digeri de guncellenmeli.`n"
    $final = "$frontmatter`n$note`n$body"

    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    [System.IO.File]::WriteAllText($destPath, $final, $utf8NoBom)
    Write-Host "Senkron: .opencode/skill/$sourceFile -> .claude/skills/$skillName/SKILL.md"
}

Write-Host "`nTamamlandi. site-otomasyon-kurallari.md opencode.json 'instructions' bagimliligi nedeniyle .opencode/skill/ icinde kaliyor (silinmedi)."
