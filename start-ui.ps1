<#
PowerShell helper: start-ui.ps1
Starts the Node static server (npm start) and opens the UI in the default browser.
Usage: .\start-ui.ps1 [-Port 8000]
#>
param(
  [int]$Port = 8000
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $scriptDir

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "ERROR: 'npm' not found in PATH. Install Node.js and ensure npm is available." -ForegroundColor Red
  Pop-Location
  exit 1
}

# Export PORT for ui-server.js
$env:PORT = $Port

Write-Host "Starting UI server (npm start) in $scriptDir..." -ForegroundColor Cyan
Start-Process -FilePath npm -ArgumentList 'start' -WorkingDirectory $scriptDir -WindowStyle Normal

$url = "http://localhost:$Port/ui/"
Write-Host "Opening browser to $url" -ForegroundColor Green
Start-Sleep -Milliseconds 800
Start-Process $url

Pop-Location
Write-Host "Launcher started. Use Ctrl+C in server window to stop the server (if visible)." -ForegroundColor Yellow
