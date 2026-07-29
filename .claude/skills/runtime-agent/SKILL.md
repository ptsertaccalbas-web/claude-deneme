---
name: runtime-agent
description: Bolt.new benzeri: kodu yaz → npm install → çalıştır → hata → düzelt döngüsü. WebContainer'lar olmadan terminal + browser entegrasyonu ile.
---

# Runtime Agent — Code Execution & Auto-Healing Loop

## Misyon
Yazılan kodu gerçek bir runtime'da çalıştırıp, hataları otomatik yakalayıp düzelten geri besleme döngüsü kurmak.

## Mimari
```
Kod Üret → Dosyaya Yaz → npm/pnpm install → Dev Server Başlat
  → Port'u Aç → Browser Preview Göster
  → Stderr/Stdout İzle → Hata Yakala
  → Hatayı LLM'e Gönder → Düzeltilmiş Kod Al
  → Loop
```

## Çalışma Akışı

### Phase 1: Proje İskeleti
```bash
# Varsayılan: Next.js + Tailwind + TypeScript
npx create-next-app@latest ./temp-project --typescript --tailwind --eslint --app --src-dir
cd temp-project
npm install lucide-react
```

### Phase 2: Kod Yaz + Dosyala
```typescript
// Agent: component kodunu üret → dosyaya yaz
const fs = await writeFile(
  'src/app/page.tsx',
  generatedCode
)
```

### Phase 3: Run + Preview
```bash
# Dev server'ı başlat
npx next dev -p 3456 &
# Port açıldı mı kontrol et
wait-for-port 3456 --timeout=30000
# Preview URL'sini göster (agent-browser ile)
agent-browser navigate --url http://localhost:3456
```

### Phase 4: Hata Yakalama
```powershell
# Terminal çıktısını yakala
$logPath = ".\build-errors.log"
$process = Start-Process -FilePath "npx" -ArgumentList "next dev -p 3456" -NoNewWindow -RedirectStandardError $logPath -PassThru

# Hata kontrolü
Start-Sleep -Seconds 10
$errors = Get-Content $logPath | Where-Object { $_ -match "Error|error|ERROR|Failed|failed" }

if ($errors) {
  # Hatayı LLM'e gönder
  $fix = Invoke-LLM -Prompt "Fix this Next.js build error: $errors"
  # Düzeltmeyi uygula
  $fix | ForEach-Object { Apply-Fix $_ }
  # Yeniden başlat
  Restart-Process $process
}
```

## PowerShell Runtime Script

```powershell
# scripts/run-loop.ps1
param(
  [string]$ProjectDir,
  [string]$Port = "3456"
)

$ErrorActionPreference = "Stop"
$logFile = "$ProjectDir\runtime.log"
$maxRetries = 3

function Start-DevServer {
  $job = Start-Job -ScriptBlock {
    param($dir, $port, $log)
    Set-Location $dir
    npx next dev -p $port 2>&1 | Out-File -FilePath $log -Encoding utf8
  } -ArgumentList $ProjectDir, $Port, $logFile

  Start-Sleep -Seconds 15
  return $job
}

function Check-ForErrors {
  $log = Get-Content $logFile -Raw
  $errorPatterns = @(
    "Module not found|Cannot find module|Failed to compile",
    "SyntaxError|TypeError|ReferenceError",
    "unexpected token|Unexpected token",
    "ERR_PACKAGE_PATH_NOT_EXPORTED",
    "export .* was not found in"
  )

  foreach ($pattern in $errorPatterns) {
    if ($log -match $pattern) {
      return $matches[0]
    }
  }
  return $null
}

function Apply-Fix($error) {
  $fixPrompt = @"
The following error occurred during a Next.js build:

ERROR: $error

Generate the minimal fix code. Return ONLY the file path and the corrected code.
"@

  # LLM çağrısı simülasyonu - agent burada devreye girer
  $fix = agent-browser evaluate --prompt $fixPrompt
  return $fix
}

# Ana döngü
$retryCount = 0
while ($retryCount -lt $maxRetries) {
  $job = Start-DevServer
  Start-Sleep -Seconds 5

  $error = Check-ForErrors
  if (-not $error) {
    Write-Output "Server started on http://localhost:$Port"
    break
  }

  Write-Output "Error detected: $error"
  $fix = Apply-Fix $error
  
  if ($fix) {
    Write-Output "Applying fix..."
    # Düzeltmeyi uygula
    Stop-Job $job
    $retryCount++
  }
}
```

## agent-browser Preview Entegrasyonu

```typescript
// AI agent'in browser kontrolü
async function verifyPreview(url: string): Promise<PreviewResult> {
  const page = await agentBrowser.navigate(url)
  
  // Sayfa render oldu mu?
  const bodyContent = await page.evaluate(() => document.body.innerHTML.length)
  const hasErrors = await page.evaluate(() => 
    document.querySelector('[data-nextjs-toast]') !== null
  )
  
  // Console hataları
  const consoleErrors = page.consoleLogs.filter(l => l.type === 'error')
  
  return {
    rendered: bodyContent > 0,
    hasRuntimeErrors: hasErrors,
    consoleErrors,
    screenshot: await page.screenshot(),
  }
}
```

## Desteklenen Stack'ler
| Framework | Komut | Port |
|-----------|-------|------|
| Next.js | `npx next dev` | 3456 |
| Vite React | `npx vite` | 5173 |
| Node.js Express | `node server.js` | 3001 |
| Python FastAPI | `uvicorn main:app` | 8000 |

## Kalite Standartları
- Hata loop'u max 3 tekrar (sonsuz döngüyü önler)
- Her düzeltme sonrası `git diff` ile değişiklikleri göster
- Preview screenshot'ı referansla karşılaştır
- Runtime > 30 saniye ise timeout

## Referanslar
- Bolt.new: WebContainer'larla browser içi Node.js runtime
- Replit Agent: Nix sandbox + checkpoint engine
- Lovable Agent Mode: autonomous debugging + web search
