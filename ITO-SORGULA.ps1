@'
# İTO Ticaret Sicili Sorgulama Aracı
# Kullanım: .\ITO-SORGULA.ps1 -VergiNo 9750007009
# Alternatif: .\ITO-SORGULA.ps1 -SicilNo 850488

param(
    [string]$VergiNo,
    [string]$SicilNo,
    [switch]$ListFirms
)

# Vergi nosu bildiğimiz firmalar (İstanbul)
$firms = @(
    @{Name="Özden Ambalaj"; VergiNo="9750007009"; SicilNo="850488"},
    @{Name="Gizpak Ambalaj"; VergiNo="1560291120"; Mersis="3993453013000010"},
    @{Name="İhsaş Ambalaj"; VergiNo="4701515027"; Mersis="0470151502700001"},
    @{Name="İleri Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Elif Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Yılmaz Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Divan Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Acar Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Sarcina Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Demircan Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Haay Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="İmsas Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Akemir Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Güvenay Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Ecopack Ambalaj"; VergiNo=""; SicilNo=""},
    @{Name="Diyaroğlu"; VergiNo=""; SicilNo=""},
    @{Name="Efor Flexo"; VergiNo=""; SicilNo=""},
    @{Name="Ambalaj Fabrikası"; VergiNo=""; SicilNo=""}
)

if ($ListFirms) {
    Write-Host "=== İTO'DA SORGULANABİLECEK FİRMALAR ===" -ForegroundColor Cyan
    foreach ($f in $firms) {
        $status = if ($f.VergiNo) { "✅ Vergi:$($f.VergiNo)" } else { "❌ Vergi no yok" }
        Write-Host "  $($f.Name) — $status"
    }
    return
}

if (-not $VergiNo -and -not $SicilNo) {
    Write-Host @"
KULLANIM:
  .\ITO-SORGULA.ps1 -VergiNo 9750007009
  .\ITO-SORGULA.ps1 -SicilNo 850488
  .\ITO-SORGULA.ps1 -ListFirms        (firma listesini göster)
  
  Veya doğrudan sorgula:
  https://guncelle.ito.org.tr/ adresine git, 
  "Firma Bilgileri Arama" -> "Vergi Numarası ile Sorgulama"
"@ -ForegroundColor Yellow
    return
}

# Browser'da İTO sorgulama sayfasını aç
$itoUrl = if ($VergiNo) {
    "https://guncelle.ito.org.tr/"
} else {
    "https://guncelle.ito.org.tr/"
}

Write-Host "`n🔍 İTO sorgulama sayfası açılıyor..." -ForegroundColor Cyan
Write-Host "📋 Sorgu: " -NoNewline
if ($VergiNo) { Write-Host "Vergi No: $VergiNo" -ForegroundColor White }
if ($SicilNo) { Write-Host "Sicil No: $SicilNo" -ForegroundColor White }
Write-Host "`n⚠️  Güvenlik kodunu manuel girip sorgula, sonucu kaydet." -ForegroundColor Yellow

Start-Process $itoUrl
