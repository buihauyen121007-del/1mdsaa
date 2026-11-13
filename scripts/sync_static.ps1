$ErrorActionPreference = "Stop"
$rootDir = Resolve-Path (Join-Path $PSScriptRoot "..")
$webDir = Join-Path $rootDir "web"
$pubDir = Join-Path $rootDir "public"

if (-not (Test-Path $pubDir)) {
    New-Item -ItemType Directory -Path $pubDir -Force | Out-Null
}

$files = Get-ChildItem -Path $webDir -File
foreach ($f in $files) {
    Copy-Item -Path $f.FullName -Destination (Join-Path $pubDir $f.Name) -Force
    Copy-Item -Path $f.FullName -Destination (Join-Path $rootDir $f.Name) -Force
    Write-Output ("Synchronized: " + $f.Name)
}
Write-Output "Static assets synchronized successfully."

