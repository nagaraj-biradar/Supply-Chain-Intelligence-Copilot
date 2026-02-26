# Supply Chain Intelligence Copilot - Deployment Guide

**Copilot Studio Implementation**  
**Version**: 1.0.0  
**Last Updated**: February 25, 2026

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Prerequisites](#prerequisites)
4. [Local Development Setup](#local-development-setup)
5. [Deploy to Copilot Studio](#deploy-to-copilot-studio)
6. [Configuration & Customization](#configuration--customization)
7. [Testing & Validation](#testing--validation)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### 1. Start the MCP Data Server (Development)

```bash
# Install dependencies
npm install

# Start the MCP server (serves on localhost:3001)
npm run start-mcp
```

**Expected Output:**

```
🚀 Supply Chain MCP Server running on http://localhost:3001
```

### 2. Configure Copilot Studio

1. Navigate to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com/)
2. Sign in with your organizational account
3. Create a new agent → "Supply Chain Intelligence"
4. Import configuration from `copilot-agent-definition.json`
5. Set MCP endpoint: `http://localhost:3001`

### 3. Test the Agent

Use the Copilot test chat to try these prompts:

```
- "Track order ORD-2026-001"
- "What's the inventory level for CHIP-A100?"
- "Show me high-risk suppliers"
- "Find cost savings opportunities"
- "What are the current supply chain metrics?"
```

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Microsoft 365 / Copilot Studio                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Supply Chain Intelligence Agent              │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  • Topic Routing                             │   │  │
│  │  │  • Natural Language Understanding            │   │  │
│  │  │  • Conversational Logic                      │   │  │
│  │  │  • Response Formatting                       │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           │ HTTP/REST                        │
├───────────────────────────┼──────────────────────────────────┤
│                           │                                  │
│          MCP Server (Node.js)                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Order Management API                             │  │
│  │  • Inventory Management API                         │  │
│  │  • Supplier Management API                          │  │
│  │  • Shipment Tracking API                            │  │
│  │  • Risk Analysis API                                │  │
│  │  • Cost Optimization API                            │  │
│  │  • Metrics & Reporting API                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
      ┌───────▼────────┐      ┌────────▼──────┐
      │  Mock Database │      │  Real Systems │
      │                │      │  (Enterprise) │
      │ • Orders       │      │  • ERP        │
      │ • Inventory    │      │  • WMS        │
      │ • Suppliers    │      │  • OMS        │
      │ • Shipments    │      │  • TMS        │
      └────────────────┘      └───────────────┘
```

### Data Flow

1. **User Query** → Copilot Agent
2. **Intent Recognition** → Topic Router
3. **Action Selection** → Workflow Engine
4. **API Calls** → MCP Server
5. **Data Processing** → Business Logic
6. **Response Formatting** → Adaptive Cards
7. **Display** → User

---

## Prerequisites

### Required

- **Copilot Studio License**: Access to Microsoft Copilot Studio environment
- **Microsoft 365 Tenant**: Active M365 tenant with Copilot enabled
- **Node.js**: v14+ (LTS recommended)
- **npm**: v6+
- **Azure Subscription** (optional, for cloud deployment)

### Recommended

- **Visual Studio Code**: For agent development and testing
- **Postman**: For API testing
- **Git**: For version control
- **GitHub Account**: For CI/CD integration

---

## Local Development Setup

### Step 1: Clone/Setup Project

```bash
# Navigate to project directory
cd "Supply Chain Intelligence"

# Install Node dependencies
npm install
```

### Step 2: Configure Environment

Create `.env` file in the root directory:

```env
# MCP Server Configuration
MCP_PORT=3001
MCP_HOST=localhost

# Copilot Configuration
COPILOT_AGENT_ID=supply-chain-intelligence-agent
COPILOT_ENDPOINT=https://copilotstudio.microsoft.com

# Optional: Real System Integration
# ERP_API_ENDPOINT=https://your-erp.company.com/api
# ERP_API_KEY=your-key-here
# WMS_API_ENDPOINT=https://your-wms.company.com/api
# OMS_API_ENDPOINT=https://your-oms.company.com/api
# TMS_API_ENDPOINT=https://your-tms.company.com/api
```

### Step 3: Start Development Server

```bash
# Terminal 1: Start MCP Server
npm run start-mcp

# Terminal 2: Run tests (optional)
npm run test

# Terminal 3: Monitor logs
npm run logs
```

### Step 4: Verify Health

```bash
# Check MCP server health
curl http://localhost:3001/health

# Expected Response:
# {
#   "status": "healthy",
#   "service": "supply-chain-mcp-server",
#   "timestamp": "2026-02-25T..."
# }
```

---

## Deploy to Copilot Studio

### Method 1: Manual Configuration

#### Step 1: Create New Agent in Copilot Studio

1. Go to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com/)
2. Click **+ Create** → **New agent**
3. Enter name: `Supply Chain Intelligence`
4. Description: `AI-powered assistant for supply chain operations`

#### Step 2: Import Agent Definition

1. In agent **Settings**, select **Import configuration**
2. Upload `copilot-agent-definition.json`
3. Review and confirm settings

#### Step 3: Configure Knowledge Sources

1. Go to **Knowledge** section
2. Add data sources:
   - **Supplier Directory**: Upload or connect supplier list
   - **Supply Chain Docs**: Link to internal documentation
   - **Inventory System**: Connect to WMS/ERP APIs

#### Step 4: Configure Actions

1. Go to **Actions** section
2. For each action, configure:
   - API Endpoint: `http://your-mcp-server:3001/api/{endpoint}`
   - Authentication: None (for development), OAuth (for production)
   - Parameters mapping

#### Step 5: Import Workflows

1. Go to **Workflows** section
2. Create 4 main topics:
   - **Order Tracking**: Import from `workflows/copilot-workflows.json`
   - **Inventory Management**: Configure inventory optimization flow
   - **Supplier Risk**: Configure supplier assessment flow
   - **Cost Optimization**: Configure cost analysis flow

#### Step 6: Configure Response Templates

1. Go to **Response Templates**
2. Import Adaptive Cards from `ui/adaptive-cards.json`
3. Map templates to each topic

### Method 2: Automated Deployment (CI/CD)

#### Using GitHub Actions

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Copilot Studio

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Validate configuration
        run: npm run validate-config

      - name: Deploy to Copilot Studio
        run: npm run deploy-copilot
        env:
          COPILOT_STUDIO_TOKEN: ${{ secrets.COPILOT_STUDIO_TOKEN }}
```

---

## Configuration & Customization

### Customize Agent Behavior

Edit `copilot-agent-definition.json`:

```json
{
  "system_prompt": "Customize this to match your organization's tone...",
  "settings": {
    "response_time_ms": 2000,
    "enable_proactive_alerts": true,
    "language_model": "gpt-4",
    "temperature": 0.7
  }
}
```

### Add New Actions

1. Add endpoint to `mcp-server.js`
2. Define action in `copilot-agent-definition.json`:

```json
{
  "id": "custom-action",
  "name": "Custom Action",
  "endpoint": "/api/custom-endpoint",
  "parameters": {}
}
```

### Customize Workflows

Edit `workflows/copilot-workflows.json`:

```json
{
  "workflow_id": "wf-custom",
  "steps": [
    {
      "step_id": 1,
      "name": "Your Custom Step",
      "type": "logic|api_call|output"
    }
  ]
}
```

---

## Testing & Validation

### Manual Testing

```bash
# Test MCP API endpoints
curl http://localhost:3001/api/suppliers
curl http://localhost:3001/api/inventory
curl http://localhost:3001/api/orders
curl http://localhost:3001/api/risks
curl http://localhost:3001/api/cost-opportunities
curl http://localhost:3001/api/metrics
```

### Automated Testing

```bash
# Run test suite
npm run test

# Run specific test
npm run test -- tests/workflows.test.js

# Test coverage
npm run test:coverage
```

### Copilot Studio Testing

1. Use built-in test chat
2. Test sample queries:
   - Order tracking scenarios
   - Inventory queries
   - Supplier analysis
   - Cost optimization

---

## Monitoring & Maintenance

### Enable Logging

```bash
# Set log level
LOG_LEVEL=debug npm run start-mcp

# View logs
npm run logs

# Tail logs in real-time
npm run logs:tail
```

### Monitor Agent Performance

1. **Copilot Studio Analytics**:
   - Go to **Analytics** dashboard
   - Monitor user interactions
   - Track query response times
   - Identify common issues

2. **MCP Server Metrics**:

```bash
curl http://localhost:3001/api/metrics
```

### Database Backups

```bash
# Export inventory data
npm run export:inventory

# Export orders
npm run export:orders

# Full data backup
npm run backup:data
```

---

## Troubleshooting

### Common Issues

#### 1. MCP Server Won't Start

```bash
# Check port availability
netstat -an | grep 3001

# Kill existing process
lsof -ti:3001 | xargs kill -9

# Restart
npm run start-mcp
```

#### 2. Connection Timeout

```bash
# Verify MCP endpoint in Copilot
# Ensure http://localhost:3001 is accessible

# Test connectivity
ping localhost:3001
```

#### 3. Authentication Errors

```bash
# Verify Azure AD configuration
# Check client credentials in .env

# Test auth flow
npm run test:auth
```

#### 4. Slow Responses

```bash
# Check server performance
npm run profile

# Monitor resource usage
npm run monitor

# Optimize queries
npm run optimize:queries
```

### Get Help

- **Documentation**: See [DEPLOYMENT-PLAN.md](./DEPLOYMENT-PLAN.md)
- **FAQ**: See [README.md](./README.md)
- **Logs**: Check `logs/` directory
- **Issues**: Report in [GitHub Issues](https://github.com/microsoft/agentsleague)

---

## Production Deployment Checklist

### Security

- [ ] Configure Azure AD authentication
- [ ] Enable MFA for all users
- [ ] Set up SSL/TLS certificates
- [ ] Configure WAF rules
- [ ] Enable audit logging

### Performance

- [ ] Load test MCP server
- [ ] Configure caching
- [ ] Optimize database queries
- [ ] Set up CDN for static assets

### Operations

- [ ] Set up monitoring/alerting
- [ ] Configure backup strategy
- [ ] Document runbooks
- [ ] Train support team
- [ ] Plan disaster recovery

### Compliance

- [ ] Data protection review
- [ ] GDPR compliance check
- [ ] SOC 2 certification
- [ ] Penetration testing
- [ ] Security audit

---

## Scaling for Enterprise

### Horizontal Scaling

```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: supply-chain-mcp-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: supply-chain-mcp
  template:
    metadata:
      labels:
        app: supply-chain-mcp
    spec:
      containers:
        - name: mcp-server
          image: supply-chain-mcp:latest
          ports:
            - containerPort: 3001
          env:
            - name: MCP_PORT
              value: "3001"
```

### Database Integration

For production, replace mock data with real systems:

```javascript
// In mcp-server.js, replace SupplyChainDataService with real connectors
const dataService = new RealERPConnector(config.erp);
const wmsConnector = new WMSConnector(config.wms);
const omsConnector = new OMSConnector(config.oms);
```

---

## Support & Resources

- **Microsoft Copilot Studio Docs**: https://learn.microsoft.com/microsoft-copilot-studio/
- **Agent Academy**: https://aka.ms/agentacademy
- **Copilot Dev Camp**: https://aka.ms/copilotdevcamp
- **GitHub Repository**: https://github.com/microsoft/agentsleague

---

## Version History

| Version | Date       | Changes                          |
| ------- | ---------- | -------------------------------- |
| 1.0.0   | 2026-02-25 | Initial release with 4 workflows |
| -       | TBD        | Multi-agent architecture         |
| -       | TBD        | Advanced ML/AI capabilities      |

---

**Document Owner**: Enterprise Supply Chain Team  
**Last Review**: February 25, 2026  
**Next Review**: March 25, 2026
