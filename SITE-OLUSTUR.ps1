param(
  [string]$Firma,
  [string]$Sektor = "",
  [string]$Hedef = "satis"
)

$ErrorActionPreference = "Stop"
$RootDir = "C:\Users\asus\Desktop\claude-deneme"
$ProjectDir = "$RootDir\$Firma"

Write-Host "======= SITE OLUSTURMA SÜRECI BASLIYOR =======" -ForegroundColor Cyan
Write-Host "Firma: $Firma | Sektor: $Sektor`n" -ForegroundColor Gray

# ASAMA 1: proje kontrol
Write-Host "[1/5] Proje dizini kontrol..." -ForegroundColor Yellow
if (-not (Test-Path $ProjectDir)) {
  Write-Host "HATA: Dizin mevcut degil" -ForegroundColor Red
  exit 1
}
Write-Host "OK: Dizin mevcut" -ForegroundColor Green

# ASAMA 2: paket kontrol
Write-Host "[2/5] Paket kontrol..." -ForegroundColor Yellow
$packages = @("next", "react", "react-dom", "tailwindcss", "lenis", "gsap", "lucide-react")
$missing = @()
foreach ($pkg in $packages) {
  if (-not (Test-Path "$ProjectDir\node_modules\$pkg")) { $missing += $pkg }
}
if ($missing.Count -gt 0) {
  Write-Host "HATA: Eksik paketler $($missing -join ', ')" -ForegroundColor Red
  exit 1
}
Write-Host "OK: Tum paketler mevcut" -ForegroundColor Green

# ASAMA 3: build
Write-Host "[3/5] Build testi..." -ForegroundColor Yellow
Set-Location $ProjectDir
$buildOutput = & npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "OK: Build basarili" -ForegroundColor Green
}
else {
  Write-Host "HATA: Build!" -ForegroundColor Red
  Write-Host "$buildOutput" -ForegroundColor Red
  exit 1
}

# ASAMA 4: deploy
Write-Host "[4/5] Deploy..." -ForegroundColor Yellow
try {
  $deployOutput = & vercel --prod --yes 2>&1
  $url = ($deployOutput | Select-String -Pattern "https://[a-zA-Z0-9_-]+\.vercel\.app").Matches.Value | Select-Object -First 1
  if ($url) {
    Write-Host "OK: $url" -ForegroundColor Green
  }
  else {
    Write-Host "UYARI: URL bulunamadi" -ForegroundColor Yellow
  }
}
catch {
  Write-Host "HATA: $_" -ForegroundColor Red
  exit 1
}

# ASAMA 5: sonuc
Write-Host "`n======= SUREC TAMAMLANDI =======" -ForegroundColor Cyan
Write-Host "Firma: $Firma"
Write-Host "URL  : $url"
Write-Host "================================" -ForegroundColor Cyan
