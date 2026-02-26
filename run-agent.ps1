# Supply Chain Intelligence Copilot - Enhanced Startup Script
# Starts MCP Server and UI server for development/testing

Write-Host "🚀 Supply Chain Intelligence Copilot - Startup Script`n" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "✓ Checking prerequisites..." -ForegroundColor Green
$nodeCheck = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 14+ first." -ForegroundColor Red
    exit 1
}
Write-Host "  Node.js version: $nodeCheck"

$npmCheck = npm --version 2>$null
Write-Host "  npm version: $npmCheck`n"

# Check if npm dependencies are installed
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing npm dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install npm dependencies" -ForegroundColor Red
        exit 1
    }
}

# Create logs directory if it doesn't exist
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

Write-Host "✓ Prerequisites verified`n" -ForegroundColor Green

# Menu
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Select startup option:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start MCP Server ONLY (port 3001)"
Write-Host "2. Start UI Server ONLY (port 8000)"
Write-Host "3. Start BOTH servers in parallel"
Write-Host "4. Health check"
Write-Host "5. Test API endpoints"
Write-Host "0. Exit"
Write-Host ""

$choice = Read-Host "Enter option (0-5)"

switch ($choice) {
    "1" {
        Write-Host "`n🚀 Starting MCP Server on port 3001..." -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop`n" -ForegroundColor Yellow
        npm run start-mcp
    }
    "2" {
        Write-Host "`n🚀 Starting UI Server on port 8000..." -ForegroundColor Green
        Write-Host "Open: http://localhost:8000/ui/`n" -ForegroundColor Yellow
        Write-Host "Press Ctrl+C to stop`n" -ForegroundColor Yellow
        npm run start-ui
    }
    "3" {
        Write-Host "`n🚀 Starting both servers in parallel..." -ForegroundColor Green
        Write-Host "  MCP Server: http://localhost:3001/health" -ForegroundColor Cyan
        Write-Host "  UI Server: http://localhost:8000/ui/" -ForegroundColor Cyan
        Write-Host "`nPress Ctrl+C to stop both servers`n" -ForegroundColor Yellow
        npm run start
    }
    "4" {
        Write-Host "`n🔍 Checking MCP Server health..." -ForegroundColor Green
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -Method Get -ErrorAction Stop
            $data = $response.Content | ConvertFrom-Json
            Write-Host "✓ MCP Server is healthy!" -ForegroundColor Green
            Write-Host "  Status: $($data.status)"
            Write-Host "  Service: $($data.service)"
            Write-Host "  Timestamp: $($data.timestamp)"
        }
        catch {
            Write-Host "❌ MCP Server is not responding" -ForegroundColor Red
            Write-Host "  Make sure to start the MCP server first: npm run start-mcp" -ForegroundColor Yellow
        }
    }
    "5" {
        Write-Host "`n🧪 Testing API Endpoints..." -ForegroundColor Green
        Write-Host ""
        
        $endpoints = @(
            @{name="Suppliers"; path="/api/suppliers"},
            @{name="Inventory"; path="/api/inventory"},
            @{name="Orders"; path="/api/orders"},
            @{name="Shipments"; path="/api/shipments"},
            @{name="Risks"; path="/api/risks"},
            @{name="Cost Opportunities"; path="/api/cost-opportunities"},
            @{name="Metrics"; path="/api/metrics"}
        )
        
        foreach ($endpoint in $endpoints) {
            try {
                $response = Invoke-WebRequest -Uri "http://localhost:3001$($endpoint.path)" -Method Get -ErrorAction Stop
                $data = $response.Content | ConvertFrom-Json
                $count = $data.data.Count
                Write-Host "✓ $($endpoint.name): $count items" -ForegroundColor Green
            }
            catch {
                Write-Host "❌ $($endpoint.name): Unable to reach" -ForegroundColor Red
            }
        }
    }
    "0" {
        Write-Host "Goodbye!" -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "Invalid option. Please try again." -ForegroundColor Red
    }
}
