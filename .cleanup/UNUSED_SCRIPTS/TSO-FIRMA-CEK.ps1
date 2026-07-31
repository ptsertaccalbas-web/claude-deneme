param(
  [string]$Tso = "corlu",
  [int]$SektorId = 29,
  [string]$OutputFile = ""
)

$enc = [System.Text.Encoding]::GetEncoding("iso-8859-9")
$wc = New-Object System.Net.WebClient

if (-not $OutputFile) { $OutputFile = "tso-$Tso-firmalar.json" }

switch ($Tso) {
  "corlu" {
    $baseUrl = "https://rehber.corlutso.org.tr/main.asp?sayfa=firmalar&sektor_id=$SektorId"
    $page = 1; $allFirms = @()
    do {
      $url = "$baseUrl&page=$page"
      $bytes = $wc.DownloadData($url)
      $html = $enc.GetString($bytes)
      $matches = [regex]::Matches($html, '(?si)<div class="firmalar_Box[^>]*>.*?<a href="main\.asp\?sayfa=firmadetay&firma_id=(\d+)[^>]*>([^<]+)</a>')
      if ($matches.Count -eq 0) { break }
      foreach ($m in $matches) {
        $allFirms += @{ id = [int]$m.Groups[1].Value; name = $m.Groups[2].Value.Trim() }
      }
      Write-Host "Sayfa $page : $($matches.Count) firma"
      $page++
    } while ($matches.Count -gt 0)
    $allFirms | ConvertTo-Json | Set-Content -Path $OutputFile -Encoding UTF8
    Write-Host "Toplam $($allFirms.Count) firma -> $OutputFile"
  }
  "cerkezkoy" {
    $bytes = $wc.DownloadData("https://www.cerkezkoytso.org.tr/firmalar.html")
    $html = $enc.GetString($bytes)
    $matches = [regex]::Matches($html, '(?si)<a[^>]*href="(firma[^"]+)"[^>]*>([^<]+)</a>')
    $firms = @()
    foreach ($m in $matches) {
      $firms += @{ url = $m.Groups[1].Value; name = $m.Groups[2].Value.Trim() }
    }
    $firms | ConvertTo-Json | Set-Content -Path $OutputFile -Encoding UTF8
    Write-Host "Toplam $($firms.Count) firma -> $OutputFile"
  }
}
