#!/usr/bin/env pwsh
<#
.SYNOPSIS
    İş bittiğinde build doğru mu, dosya sayısı doğru mu kontrol et.

.DESCRIPTION
    Tip A/B/C işlerinin kapısında:
    - npm run build çalıştır, başarılı mı?
    - Komponent klasöründe (ComponentFolder) beklenen sayıda dosya var mı?
    - Tip B (dolu klasöre ekleme): başlangıç dosya sayısı (BeforeCount) ile kıyasla

.PARAMETER ExpectedFiles
    Bu işte eklenmesi gereken dosya sayısı (Tip A: 14, Tip B: 1-3, Tip C: 0)
    Tip B'de bu "eklenen dosya sayısı", ClassFolder'da toplam değil

.PARAMETER ComponentFolder
    Kontrol edilecek klasör (ör. .\src\components)

.PARAMETER BeforeCount
    Tip B için: başlangıçta kaç dosya vardı (-BeforeCount 8 ise, şimdi 8+ExpectedFiles olmalı)

.PARAMETER SkipBuild
    Build çalıştırmayı atla (default: false)

.EXAMPLE
    # Tip A: komponent klasöründe 14 dosya eklenmeli
    .\gate-check.ps1 -ExpectedFiles 14 -ComponentFolder .\src\components

    # Tip B: 8 dosyalı klasöre 2 dosya eklenmeli (8+2=10)
    .\gate-check.ps1 -ExpectedFiles 2 -ComponentFolder .\src\components -BeforeCount 8

    # Tip C: sadece build check (dosya sayısı kontrol yok)
    .\gate-check.ps1 -ExpectedFiles 0 -ComponentFolder .\src -SkipBuild
#>

param(
    [int]$ExpectedFiles = 0,
    [string]$ComponentFolder = ".\src\components",
    [int]$BeforeCount = -1,
    [switch]$SkipBuild = $false
)

$ErrorActionPreference = "Stop"
$warnings = @()
$errors = @()

# 1. Build kontrol
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "🔨 Build Kontrol" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if (-not $SkipBuild) {
    if (-not (Test-Path ".\package.json")) {
        $errors += "package.json bulunamadı (script'i proje kökünden çalıştır)"
    } else {
        Write-Host "npm run build çalıştırılıyor..."
        try {
            $buildOutput = npm run build 2>&1
            if ($LASTEXITCODE -ne 0) {
                $errors += "Build başarısız oldu (npm run build)"
                Write-Host $buildOutput -ForegroundColor Red
            } else {
                Write-Host "✓ Build başarılı" -ForegroundColor Green
            }
        } catch {
            $errors += "Build komutu çalıştırılamadı: $_"
        }
    }
} else {
    Write-Host "⊘ Build kontrol atlandı (-SkipBuild)"
}

# 2. Dosya sayısı kontrol
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "📁 Dosya Sayısı Kontrol" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if (Test-Path $ComponentFolder) {
    $files = @(Get-ChildItem -Path $ComponentFolder -File -Recurse -ErrorAction SilentlyContinue)
    $actualCount = $files.Count

    Write-Host "Klasör: $ComponentFolder"
    Write-Host "Dosya sayısı: $actualCount"

    if ($ExpectedFiles -eq 0) {
        Write-Host "⊘ Dosya sayısı kontrol atlandı (ExpectedFiles: 0)"
    } else {
        if ($BeforeCount -ge 0) {
            # Tip B: başlangıçta kaç dosya vardı?
            $expectedTotal = $BeforeCount + $ExpectedFiles
            Write-Host "Başlangıç dosya sayısı: $BeforeCount"
            Write-Host "Eklenmesi gereken: $ExpectedFiles"
            Write-Host "Beklenen toplam: $expectedTotal"

            if ($actualCount -eq $expectedTotal) {
                Write-Host "✓ Dosya sayısı doğru" -ForegroundColor Green
            } elseif ($actualCount -lt $expectedTotal) {
                $warnings += "Eksik dosya: $($expectedTotal - $actualCount) (bekleniyordu: $expectedTotal, gerçek: $actualCount)"
            } else {
                $warnings += "Fazla dosya: $($actualCount - $expectedTotal) (bekleniyordu: $expectedTotal, gerçek: $actualCount)"
            }
        } else {
            # Tip A/Tip C: toplam dosya sayısı
            Write-Host "Beklenen dosya sayısı: $ExpectedFiles"

            if ($actualCount -eq $ExpectedFiles) {
                Write-Host "✓ Dosya sayısı doğru" -ForegroundColor Green
            } elseif ($actualCount -lt $ExpectedFiles) {
                $warnings += "Eksik dosya: $($ExpectedFiles - $actualCount) (bekleniyordu: $ExpectedFiles, gerçek: $actualCount)"
            } else {
                $warnings += "Fazla dosya: $($actualCount - $ExpectedFiles) (bekleniyordu: $ExpectedFiles, gerçek: $actualCount)"
            }
        }
    }
} else {
    $errors += "Klasör bulunamadı: $ComponentFolder"
}

# 3. Sonuç
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "📋 Sonuç" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if ($errors.Count -gt 0) {
    Write-Host "❌ HATALAR:" -ForegroundColor Red
    foreach ($err in $errors) {
        Write-Host "  - $err" -ForegroundColor Red
    }
    Write-Host ""
}

if ($warnings.Count -gt 0) {
    Write-Host "⚠️  UYARILAR:" -ForegroundColor Yellow
    foreach ($warn in $warnings) {
        Write-Host "  - $warn" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✅ TÜM KONTROLLER GEÇTİ" -ForegroundColor Green
    exit 0
} elseif ($errors.Count -eq 0) {
    Write-Host "⚠️  UYARILAR VAR AMA HATA YOK — DEVAM ET" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "❌ HATA VAR — DÜZELT VE YENİDEN ÇALIŞTIR" -ForegroundColor Red
    exit 1
}
