param(
    [Parameter(Mandatory=$false)] [int] $StatusCode,
    [Parameter(Mandatory=$false)] [string] $ResponseHeaders,
    [Parameter(Mandatory=$false)] [string] $DomSnippet,
    [Parameter(Mandatory=$false)] [string] $TargetUrl,
    [Parameter(Mandatory=$false)] [string] $ErrorMessage
)

function Analyze-Block {
    $findings = @()
    $recommendations = @()
    $strategy = "N/A"

    # 1. Status code analysis
    switch ($StatusCode) {
        403 { 
            $findings += "WAF/403: IP veya header tabanlı erişim engeli"
            $strategy = "header-optimize"
            $recommendations += "User-Agent değiştir, Accept header ekle, Referer ekle"
        }
        429 { 
            $findings += "Rate limiting: Çok fazla istek"
            $strategy = "rate-limit-bypass"
            $recommendations += "500-2000ms rastgele delay ekle, proxy dene"
        }
        503 { 
            $findings += "CDN/Cloudflare challenge"
            $strategy = "stealth-mode"
            $recommendations += "headless=false, --disable-blink-features=AutomationControlled"
        }
        502 { 
            $findings += "Gateway timeout / upstream hatası"
            $strategy = "retry-with-delay"
            $recommendations += "Bekle ve yeniden dene"
        }
        0 { 
            $findings += "Bağlantı hatası / timeout"
            $strategy = "connection-fix"
            $recommendations += "SSL/TLS ayarlarını kontrol et, proxy dene"
        }
        default { 
            $findings += "Status: $StatusCode — beklenmeyen durum"
            $strategy = "diagnose"
        }
    }

    # 2. DOM-based detection (if snippet provided)
    if ($DomSnippet) {
        $blockKeywords = @(
            @{Pattern = 'captcha|recaptcha|hcaptcha'; Type = 'captcha'},
            @{Pattern = 'cf-challenge|cloudflare'; Type = 'cloudflare'},
            @{Pattern = 'access.denied|blocked|forbidden'; Type = 'access-denied'},
            @{Pattern = 'bots|automated|automation'; Type = 'bot-detection'},
            @{Pattern = 'enable.javascript|js.challenge'; Type = 'js-challenge'},
            @{Pattern = 'rate.limit|too.many.requests'; Type = 'rate-limit'},
            @{Pattern = 'maintenance|temporary.unavailable'; Type = 'maintenance'}
        )

        foreach ($kw in $blockKeywords) {
            if ($DomSnippet -match $kw.Pattern) {
                $findings += "$($kw.Type): DOM'de $($kw.Pattern) tespit edildi"
                if ($kw.Type -eq 'captcha') { $strategy = 'captcha-bypass' }
                if ($kw.Type -eq 'cloudflare') { $strategy = 'stealth-mode' }
                if ($kw.Type -eq 'bot-detection') { $strategy = 'full-stealth' }
            }
        }
    }

    # 3. Header analysis
    if ($ResponseHeaders) {
        if ($ResponseHeaders -match 'server:\s*(cloudflare|akamai|incapsula|imperva)') { 
            $findings += "CDN/WAF: $($matches[1]) tespit edildi"
            if ($matches[1] -eq 'cloudflare') { $strategy = 'cloudflare-bypass' }
        }
        if ($ResponseHeaders -match 'cf-ray') { $findings += "Cloudflare Ray ID mevcut" }
        if ($ResponseHeaders -match 'set-cookie.*cf_clearance') { 
            $findings += "Cloudflare challenge cookie'si mevcut"
            $recommendations += "Önce challenge sayfasını çöz, cookie'yi al"
        }
    }

    # 4. Output
    $result = @{
        Findings = $findings
        Recommendations = $recommendations
        Strategy = $strategy
        StatusCode = $StatusCode
        TargetUrl = $TargetUrl
        ErrorMessage = $ErrorMessage
        Timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    }

    return $result
}

# Run and output
$result = Analyze-Block
$result | ConvertTo-Json -Depth 3
