$baseDir = $PSScriptRoot

Write-Output "========================================="
Write-Output " LUMI AI — Toplu Outreach Gonderimi"
Write-Output "========================================="
Write-Output ""

$firmalar = @(
    @{ Adi = "Çorlu İlgi Diş"; Gun = 1 },
    @{ Adi = "Sevgi Diş"; Gun = 3 },
    @{ Adi = "Haay Ambalaj"; Gun = 5 },
    @{ Adi = "Beyaz Diş"; Gun = 7 },
    @{ Adi = "Çorlu Dent"; Gun = 9 },
    @{ Adi = "İhsaş Ambalaj"; Gun = 11 }
)

Write-Output "Planlanan gonderim sirasi:"
Write-Output "--------------------------"
$firmalar | ForEach-Object {
    $tarih = (Get-Date).AddDays($_.Gun - 1).ToString("dd MMMM yyyy")
    Write-Output "Gun $($_.Gun) ($tarih): $($_.Adi)"
}

Write-Output ""
Write-Output "Kullanım:"
Write-Output "  Tekil:  .\GONDER.ps1 -FirmaAdi 'Firma Adı'"
Write-Output "  Test:   .\GONDER.ps1 -FirmaAdi 'Firma Adı' -Test"
Write-Output "  Liste:  .\GONDER.ps1 -List"
Write-Output ""
Write-Output "Her gonderim GONDERIM-GECMISI.csv'ye kaydedilir."
