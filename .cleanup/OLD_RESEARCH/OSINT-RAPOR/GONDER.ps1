param(
    [Parameter(Position=0)]
    [string]$FirmaAdi,
    [switch]$Test,
    [switch]$List
)

$nodeScript = Join-Path $PSScriptRoot "send.js"

if ($List) {
    node $nodeScript --list
} elseif ($Test) {
    node $nodeScript "$FirmaAdi" --test
} elseif ($FirmaAdi) {
    node $nodeScript "$FirmaAdi"
} else {
    node $nodeScript --list
}
