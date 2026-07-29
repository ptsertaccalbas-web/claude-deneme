param(
    [Parameter(Mandatory=$true)] [string] $FirmaAdi,
    [Parameter(Mandatory=$false)] [string] $Oda = "corlu",
    [Parameter(Mandatory=$false)] [int] $SektorId = 29,
    [Parameter(Mandatory=$false)] [int] $Sayfa = 1,
    [Parameter(Mandatory=$false)] [switch] $SektorListele
)

function Search-CorluTSO {
    param([string]$FirmaAdi, [int]$SektorId, [int]$Sayfa, [bool]$SektorListele)

    $baseUrl = "https://rehber.corlutso.org.tr"
    
    if ($SektorListele) {
        $url = "$baseUrl/api/firma/sektor/$SektorId`?sayfa=$Sayfa"
        $method = "GET"
        $body = $null
    }
    else {
        $url = "$baseUrl/api/firma/sorgula"
        $method = "POST"
        $body = @{
            FirmaAdi = $FirmaAdi
            SektorId = $SektorId
            sayfa = $Sayfa
        } | ConvertTo-Json
    }

    $headers = @{
        'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        'Accept' = 'application/json, text/plain, */*'
        'Origin' = $baseUrl
        'Referer' = "$baseUrl/"
        'Content-Type' = 'application/json; charset=utf-8'
    }

    try {
        $params = @{
            Uri = $url
            Method = $method
            Headers = $headers
            UseBasicParsing = $true
            TimeoutSec = 30
        }
        if ($body) { $params['Body'] = $body }
        
        $response = Invoke-WebRequest @params -ErrorAction Stop

        $text = [System.Text.Encoding]::UTF8.GetString($response.Content)
        $data = $text | ConvertFrom-Json

        return @{
            Status = "OK"
            Data = $data
            RawStatus = [int]$response.StatusCode
        }
    }
    catch {
        $statusCode = 0
        if ($_.Exception.Response) { $statusCode = [int]$_.Exception.Response.StatusCode }
        return @{
            Status = "FAIL"
            Error = $_.Exception.Message
            StatusCode = $statusCode
        }
    }
}

function Search-CerkezkoyTSO {
    param([string]$FirmaAdi, [int]$Sayfa)

    $baseUrl = "https://www.cerkezkoytso.org.tr"
    $url = "$baseUrl/firmarehberi.html"

    $postData = @{
        'Firma_Adi' = $FirmaAdi
        'sayfa' = $Sayfa
        'islem' = 'ARA'
    }

    $headers = @{
        'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        'Content-Type' = 'application/x-www-form-urlencoded; charset=iso-8859-9'
        'Origin' = $baseUrl
        'Referer' = $url
    }

    try {
        $response = Invoke-WebRequest -Uri $url -Method POST -Body $postData -Headers $headers -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop

        $rawBytes = $response.Content
        $decoded = [System.Text.Encoding]::GetEncoding('iso-8859-9').GetString($rawBytes)

        return @{
            Status = "OK"
            RawHtml = $decoded
            RawStatus = [int]$response.StatusCode
        }
    }
    catch {
        return @{
            Status = "FAIL"
            Error = $_.Exception.Message
        }
    }
}

switch ($Oda.ToLower()) {
    "corlu" {
        $result = Search-CorluTSO -FirmaAdi $FirmaAdi -SektorId $SektorId -Sayfa $Sayfa -SektorListele $SektorListele
    }
    "cerkezkoy" {
        $result = Search-CerkezkoyTSO -FirmaAdi $FirmaAdi -Sayfa $Sayfa
    }
    default {
        Write-Error "Bilinmeyen oda: $Oda (corlu veya cerkezkoy)"
        exit 1
    }
}

$result | ConvertTo-Json -Depth 5
