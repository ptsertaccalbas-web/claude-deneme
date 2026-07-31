$firma = "İhsaş Ambalaj"
$script = Join-Path $PSScriptRoot "send.js"
& "node" $script $firma "--yes"
