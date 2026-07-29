# Çorlu TSO ve Çerkezköy TSO Firma Sorgulama Araçları
# Kullanım: PowerShell'de .\TSO-SORGULA.ps1

Write-Host "=== TSO FİRMA SORGULAMA ARACI ===" -ForegroundColor Cyan
Write-Host "1) Çorlu TSO - Ambalaj Sektörü (ID:29)" -ForegroundColor Yellow
Write-Host "2) Çorlu TSO - Firma Ara (POST)" -ForegroundColor Yellow
Write-Host "3) Çerkezköy TSO - Tüm Firmalar" -ForegroundColor Yellow
Write-Host "4) Çerkezköy TSO - Firma Ara" -ForegroundColor Yellow
Write-Host ""

$secim = Read-Host "Seçiminiz (1-4)"

switch ($secim) {
    "1" {
        Write-Host "`n=== Çorlu TSO - Ambalaj Sektörü (Sayfa 1) ===" -ForegroundColor Green
        $r = Invoke-WebRequest -Uri "https://rehber.corlutso.org.tr/main.asp?sayfa=firmalar&sektor_id=29" -UseBasicParsing
        Write-Host $r.Content
    }
    "2" {
        $firma = Read-Host "Aranacak firma adı"
        $body = @{str_firma=$firma; act="ara"} 
        $r = Invoke-WebRequest -Uri "https://rehber.corlutso.org.tr/main.asp?sayfa=firmalar" -Method POST -Body $body -UseBasicParsing
        Write-Host $r.Content
    }
    "3" {
        Write-Host "`n=== Çerkezköy TSO - Tüm Firmalar (Sayfa 1) ===" -ForegroundColor Green
        $r = Invoke-WebRequest -Uri "https://www.cerkezkoytso.org.tr/firmalar.html" -UseBasicParsing
        Write-Host $r.Content
    }
    "4" {
        $firma = Read-Host "Aranacak firma adı"
        $body = @{q=$firma}
        $r = Invoke-WebRequest -Uri "https://www.cerkezkoytso.org.tr/firmalar.html" -Method POST -Body $body -UseBasicParsing
        Write-Host $r.Content
    }
}

Write-Host "`n=== İşlem tamamlandı ===" -ForegroundColor Green
