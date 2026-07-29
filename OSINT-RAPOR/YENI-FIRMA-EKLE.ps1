param(
    [Parameter(Mandatory=$true)]
    [string]$FirmaAdi
)

$baseDir = "C:\Users\asus\Desktop\claude-deneme\OSINT-RAPOR"
$firmaKlasor = Join-Path $baseDir $FirmaAdi
$sablonDosya = Join-Path $baseDir "REKABET-SABLONU.md"
$tarih = Get-Date -Format 'dd MMMM yyyy'

Write-Output "========================================"
Write-Output " LUMI AI — Yeni Firma Ekleme Otomasyonu"
Write-Output " Firma: $FirmaAdi"
Write-Output " Tarih: $tarih"
Write-Output "========================================"

# --- ADIM 0: Klasor + OSINT + REKABET dosyalarini olustur ---
Write-Output "`n[ADIM 1/4] Klasor ve dosya yapisi olusturuluyor..."

if (-not (Test-Path $firmaKlasor)) {
    New-Item -ItemType Directory -Path $firmaKlasor -Force | Out-Null
    Write-Output "  OK: Klasor -> $FirmaAdi"
}

$osintDosya = Join-Path $firmaKlasor "$FirmaAdi.md"
if (-not (Test-Path $osintDosya)) {
    "# OSINT Raporu -- $FirmaAdi`r`n## LUMI AI -- Dijital Varlik Tehdit Analizi`r`n`r`n**Rapor Tarihi:** $tarih`r`n---" | Set-Content -Path $osintDosya -Encoding UTF8
    Write-Output "  OK: $FirmaAdi.md (OSINT bos sablon)"
}

$rekabetDosya = Join-Path $firmaKlasor "$FirmaAdi-REKABET.md"
if (-not (Test-Path $rekabetDosya)) {
    if (Test-Path $sablonDosya) {
        $icerik = Get-Content -Path $sablonDosya -Encoding UTF8 -Raw
        $icerik = $icerik -replace '\[FİRMA ADI\]', $FirmaAdi
        $icerik = $icerik -replace '\[TARİH\]', $tarih
        Set-Content -Path $rekabetDosya -Value $icerik -Encoding UTF8
        Write-Output "  OK: $FirmaAdi-REKABET.md (sablondan olusturuldu)"
    }
}

# --- ADIM 2: OSINT analizi icin uygulama notlari ---
Write-Output "`n[ADIM 2/4] OSINT analizi yapilacak:"
Write-Output "  1. Web sitesi kontrol (HTTP/HTTPS erisim)"
Write-Output "  2. SSL denetimi (sslyze)"
Write-Output "  3. Sosyal medya taramasi"
Write-Output "  4. Google Maps / yorum analizi"
Write-Output "  5. Rekabet web siteleri karsilastirmasi"
Write-Output "  6. Bulgulari $FirmaAdi.md dosyasina isle"

# --- ADIM 3: REKABET analizini doldur ---
Write-Output "`n[ADIM 3/4] REKABET analizi doldurulacak:"
Write-Output "  1. 5 rakip belirle (sektor bazli)"
Write-Output "  2. Her rakip icin web/puan/guclu-zayif karsilastir"
Write-Output "  3. Pazar konumu haritasi cikar"
Write-Output "  4. Acilis hook'lari belirle (en az 3)"
Write-Output "  5. LUMI cozum paketi + butce onerisi"
Write-Output "  6. Satis konusmasi taslagi hazirla"

# --- ADIM 4: Outreach materyali ---
$outreachDosya = Join-Path $firmaKlasor "$FirmaAdi-OUTREACH.md"
Write-Output "`n[ADIM 4/4] Outreach materyali hazirlanacak:"
Write-Output "  -> $FirmaAdi-OUTREACH.md"
Write-Output "  1. Hedef kisi bilgisi"
Write-Output "  2. E-posta taslagi (2 versiyon)"
Write-Output "  3. CRM karti (oncelik/butce/zafiyet/takip)"
Write-Output "  4. Telefon konusma taslagi"
if (-not (Test-Path $outreachDosya)) {
    "# $FirmaAdi -- Outreach Materyali`r`n`r`n**Hazirlanma:** $tarih`r`n---`r`n`r`n## 1. HEDEF`r`n`r`n| Alan | Deger |`r`n|---|---|`r`n| **Firma** | $FirmaAdi |`r`n`r`n---`r`n`r`n## 2. E-POSTA TASLAGI`r`n`r`n**Konu:** `r`n`r`n```" | Set-Content -Path $outreachDosya -Encoding UTF8
    Write-Output "  OK: $FirmaAdi-OUTREACH.md (bos sablon olusturuldu)"
}

Write-Output "`n========================================"
Write-Output " IS DONE: $FirmaAdi icin dosyalar hazir"
Write-Output " Sira: OSINT -> REKABET -> OUTREACH"
Write-Output "========================================"
Write-Output "`n=== DOSYA YAPISI ==="
Get-ChildItem -Path $firmaKlasor | ForEach-Object { Write-Output "  $($_.Name) ($(($_.Length/1KB).ToString('0.0')) KB)" }
