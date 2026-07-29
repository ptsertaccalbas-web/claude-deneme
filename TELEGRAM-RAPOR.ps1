param([Parameter(Position=0)][string]$Mesaj)

$env = Get-Content "C:\Users\asus\Desktop\claude-deneme\lumiai-website\.env.local" -Raw
$token = ($env -split "`n" | Where-Object { $_ -match "TELEGRAM_BOT_TOKEN=" } | ForEach-Object { $_ -replace "TELEGRAM_BOT_TOKEN=", "" }).Trim()
$chatId = ($env -split "`n" | Where-Object { $_ -match "TELEGRAM_CHAT_ID=" } | ForEach-Object { $_ -replace "TELEGRAM_CHAT_ID=", "" }).Trim()

if (!$Mesaj) { $Mesaj = Read-Host "Mesaj" }
$body = @{chat_id=$chatId; text=$Mesaj} | ConvertTo-Json
Invoke-RestMethod -Uri "https://api.telegram.org/bot$token/sendMessage" -Method Post -Body $body -ContentType "application/json"
