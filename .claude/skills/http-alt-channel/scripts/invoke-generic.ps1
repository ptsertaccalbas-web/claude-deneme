param(
    [Parameter(Mandatory=$true)] [string] $Url,
    [Parameter(Mandatory=$false)] [string] $Method = "GET",
    [Parameter(Mandatory=$false)] [string] $Body,
    [Parameter(Mandatory=$false)] [string] $ContentType = "application/x-www-form-urlencoded; charset=utf-8",
    [Parameter(Mandatory=$false)] [hashtable] $Headers,
    [Parameter(Mandatory=$false)] [int] $TimeoutSec = 30,
    [Parameter(Mandatory=$false)] [switch] $SkipCertCheck,
    [Parameter(Mandatory=$false)] [string] $Encoding = "auto",
    [Parameter(Mandatory=$false)] [string] $OutputPath
)

function Invoke-HttpRequest {
    param([string]$Url, [string]$Method, [string]$Body, [string]$ContentType, [hashtable]$Headers, [int]$TimeoutSec, [bool]$SkipCertCheck)

    $params = @{
        Uri = $Url
        Method = $Method
        TimeoutSec = $TimeoutSec
        UseBasicParsing = $true
    }

    if (-not [string]::IsNullOrEmpty($Body)) {
        $params['Body'] = $Body
        $params['ContentType'] = $ContentType
    }

    if ($Headers -and $Headers.Count -gt 0) {
        $params['Headers'] = $Headers
    }

    if ($SkipCertCheck) {
        if (-not ([System.Net.ServicePointManager]::ServerCertificateValidationCallback)) {
            [System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
        }
    }

    try {
        $response = Invoke-WebRequest @params -ErrorAction Stop
        return $response
    }
    catch {
        $statusCode = 0
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
        }
        Write-Error "HTTP $statusCode : $($_.Exception.Message)"
        return $null
    }
}

function Decode-Content {
    param([byte[]]$Content, [string]$Encoding, [System.Net.HttpStatusCode]$StatusCode)

    if ($StatusCode -eq 204 -or $null -eq $Content -or $Content.Length -eq 0) {
        return ""
    }

    if ($Encoding -ne "auto") {
        try {
            return [System.Text.Encoding]::GetEncoding($Encoding).GetString($Content)
        }
        catch { }
    }

    # Auto-detect: try UTF-8 first, then iso-8859-9
    try { 
        $text = [System.Text.Encoding]::UTF8.GetString($Content)
        if ($text -match '[\x00-\x08\x0B\x0C\x0E-\x1F]') { throw } 
        return $text
    }
    catch {
        return [System.Text.Encoding]::GetEncoding('iso-8859-9').GetString($Content)
    }
}

$defaultHeaders = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    'Accept' = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    'Accept-Language' = 'tr-TR,tr;q=0.9,en;q=0.8'
    'Cache-Control' = 'no-cache'
}

if ($Headers) {
    foreach ($kv in $Headers.GetEnumerator()) {
        $defaultHeaders[$kv.Key] = $kv.Value
    }
}

$response = Invoke-HttpRequest -Url $Url -Method $Method -Body $Body -ContentType $ContentType -Headers $defaultHeaders -TimeoutSec $TimeoutSec -SkipCertCheck $SkipCertCheck

if ($null -eq $response) {
    Write-Output "FAIL|HTTP isteği başarısız"
    exit 1
}

Write-Information "Status: $([int]$response.StatusCode) $($response.StatusDescription)" -InformationAction Continue

$decoded = Decode-Content -Content $response.Content -Encoding $Encoding -StatusCode $response.StatusCode

if ($OutputPath) {
    $decoded | Set-Content -Path $OutputPath -Encoding UTF8
    Write-Output "OK|Kaydedildi: $OutputPath ($($decoded.Length) karakter)"
}
else {
    if ($decoded.Length -gt 2000) {
        Write-Output "OK|$($decoded.Substring(0, 2000))`n... [$($decoded.Length) karakter toplam]"
    }
    else {
        Write-Output "OK|$decoded"
    }
}
