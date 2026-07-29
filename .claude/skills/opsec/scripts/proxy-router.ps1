param(
    [Parameter(Mandatory=$false)]
    [string]$Action = "test",
    
    [Parameter(Mandatory=$false)]
    [string]$TargetUrl = "https://ifconfig.me",
    
    [Parameter(Mandatory=$false)]
    [string[]]$ProxyList = @(),
    
    [Parameter(Mandatory=$false)]
    [int]$ProxyIndex = -1
)

$LogFile = "$env:TEMP\opencode\opsec-proxy.log"
if (-not (Test-Path "$env:TEMP\opencode")) {
    New-Item -ItemType Directory -Path "$env:TEMP\opencode" -Force | Out-Null
}

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp | $Message" | Out-File -FilePath $LogFile -Append
    Write-Host "[$timestamp] $Message"
}

function Get-FreeProxies {
    Write-Log "[*] Free proxy listesi çekiliyor..."
    try {
        $resp = Invoke-WebRequest -Uri "https://free-proxy-list.net/" -UseBasicParsing -TimeoutSec 10
        $html = $resp.Content
        
        # Basit regex ile proxy çekme
        $pattern = '(\d+\.\d+\.\d+\.\d+):(\d+)'
        $matches = [regex]::Matches($html, $pattern)
        
        $proxies = @()
        foreach ($m in $matches) {
            $proxies += "$($m.Groups[1].Value):$($m.Groups[2].Value)"
        }
        
        Write-Log "[+] $($proxies.Count) proxy bulundu"
        return $proxies[0..([Math]::Min($proxies.Count-1, 20))]
    } catch {
        Write-Log "[-] Free proxy listesi alınamadı: $_"
        return @()
    }
}

function Test-Proxy {
    param([string]$Proxy, [string]$Url = "https://ifconfig.me")
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Proxy "http://$Proxy" -TimeoutSec 10 -UseBasicParsing -Method Head
        $respTime = ($response.RawContentLength / 1kb).ToString("F2")
        Write-Log "[+] Proxy calisiyor: $Proxy (yanit: ${respTime}KB)"
        return $true
    } catch {
        Write-Log "[-] Proxy calismiyor: $Proxy ($_)"
        return $false
    }
}

function Get-CurrentIP {
    param([string]$Proxy = "")
    
    try {
        if ($Proxy) {
            $resp = Invoke-WebRequest -Uri "https://ifconfig.me" -Proxy "http://$Proxy" -TimeoutSec 10 -UseBasicParsing
        } else {
            $resp = Invoke-WebRequest -Uri "https://ifconfig.me" -TimeoutSec 10 -UseBasicParsing
        }
        return $resp.Content.Trim()
    } catch {
        return "UNKNOWN"
    }
}

function Test-IPLeak {
    param([string]$Proxy)
    
    Write-Log "[*] IP sızdırma testi yapılıyor..."
    
    $realIP = Get-CurrentIP
    $proxyIP = Get-CurrentIP -Proxy $Proxy
    
    if ($realIP -eq $proxyIP) {
        Write-Log "[-] UYARI: Proxy calismiyor! Gercek IP siziyor!"
        Write-Log "[-] Gercek IP: $realIP"
        return $false
    } else {
        Write-Log "[+] IP sızdırma yok"
        Write-Log "[+] Gercek IP: $realIP"
        Write-Log "[+] Proxy IP: $proxyIP"
        return $true
    }
}

switch ($Action.ToLower()) {
    "test" {
        $realIP = Get-CurrentIP
        Write-Log "[*] Gercek IP: $realIP"
        Write-Log "[*] Proxy kullanilmadan baglanti testi basarili"
        
        if ($ProxyList.Count -gt 0) {
            $idx = if ($ProxyIndex -ge 0 -and $ProxyIndex -lt $ProxyList.Count) { $ProxyIndex } else { 0 }
            Test-Proxy -Proxy $ProxyList[$idx]
        }
    }
    
    "find" {
        Write-Log "[*] Calisan proxy araniyor..."
        $freeProxies = Get-FreeProxies
        
        foreach ($proxy in $freeProxies) {
            if (Test-Proxy -Proxy $proxy) {
                Write-Log "[+] Kullanilabilir proxy bulundu: $proxy"
                return $proxy
            }
        }
        Write-Log "[-] Kullanilabilir proxy bulunamadi"
        return ""
    }
    
    "verify" {
        if ($ProxyList.Count -eq 0) {
            Write-Log "[-] Proxy listesi bos"
            return
        }
        
        $idx = if ($ProxyIndex -ge 0 -and $ProxyIndex -lt $ProxyList.Count) { $ProxyIndex } else { 0 }
        $proxy = $ProxyList[$idx]
        
        if (Test-Proxy -Proxy $proxy) {
            Test-IPLeak -Proxy $proxy
        }
    }
    
    "rotate" {
        if ($ProxyList.Count -eq 0) {
            Write-Log "[-] Proxy listesi bos, free proxy taranıyor..."
            $ProxyList = Get-FreeProxies
        }
        
        $workingProxies = @()
        foreach ($proxy in $ProxyList) {
            if (Test-Proxy -Proxy $proxy -Url "https://google.com") {
                $workingProxies += $proxy
            }
        }
        
        if ($workingProxies.Count -gt 0) {
            Write-Log "[+] $($workingProxies.Count) calisan proxy bulundu"
            Write-Log "[+] Onerilen proxy: $($workingProxies[0])"
            return $workingProxies
        } else {
            Write-Log "[-] Calisan proxy bulunamadi"
            return @()
        }
    }
    
    default {
        Write-Host @"
Kullanim:
  .\proxy-router.ps1 -Action test                    # Gercek IP'yi goster
  .\proxy-router.ps1 -Action find                    # Free proxy bul
  .\proxy-router.ps1 -Action verify -ProxyList @("ip:port")  # Proxy dogrula
  .\proxy-router.ps1 -Action rotate                  # Calisan proxy rotasyonu
"@
    }
}
