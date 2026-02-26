# Supply Chain Intelligence Copilot - Quick Start Guide

## 🚀 Getting Started (5 Minutes)

### Step 1: Start the MCP Data Server

```powershell
# Open PowerShell terminal
cd "D:\development\2026-projects\AI agents\Agent League\SCM\Supply Chain Intelligence"

# Start the MCP server
npm run start-mcp
```

**Expected Output:**

```
🚀 Supply Chain MCP Server running on http://localhost:3001
📊 Health check: http://localhost:3001/health

Available endpoints:
  GET  /api/suppliers              - List all suppliers
  GET  /api/suppliers/:id          - Get supplier details
  GET  /api/inventory              - List inventory
  GET  /api/inventory/:sku         - Get SKU details
  GET  /api/orders                 - List orders
  GET  /api/orders/:id             - Get order details
  GET  /api/shipments              - List shipments
  GET  /api/risks                  - List supplier risks
  GET  /api/cost-opportunities     - List cost opportunities
  GET  /api/metrics                - Get supply chain metrics
```

### Step 2: Verify MCP Server is Running

Open a new terminal (PowerShell or cmd):

```powershell
# Test the health endpoint
curl.exe http://localhost:3001/health | ConvertFrom-Json | Format-List

# Or use this to get formatted output:
Invoke-WebRequest -Uri "http://localhost:3001/health" -Method Get | ForEach-Object {$_.Content | ConvertFrom-Json} | Format-List
```

### Step 3: Test Sample API Endpoints

```powershell
# Get all suppliers
Invoke-WebRequest -Uri "http://localhost:3001/api/suppliers" -Method Get | ForEach-Object {$_.Content | ConvertFrom-Json}

# Get inventory
Invoke-WebRequest -Uri "http://localhost:3001/api/inventory" -Method Get | ForEach-Object {$_.Content | ConvertFrom-Json}

# Get orders
Invoke-WebRequest -Uri "http://localhost:3001/api/orders" -Method Get | ForEach-Object {$_.Content | ConvertFrom-Json}

# Get supply chain metrics
Invoke-WebRequest -Uri "http://localhost:3001/api/metrics" -Method Get | ForEach-Object {$_.Content | ConvertFrom-Json}
```

### Step 4: Connect to Copilot Studio

1. **Sign In to Copilot Studio**
   - Navigate to: https://copilotstudio.microsoft.com/
   - Sign in with your organization account

2. **Create New Agent**
   - Click **+ Create**
   - Select **New agent**
   - Name: `Supply Chain Intelligence`
   - Description: `AI-powered assistant for supply chain operations`

3. **Configure MCP Connection**

   **Step A: Access Integration Settings**
   - In your agent, go to **Settings** (gear icon)
   - Select **Connected resources** or **Integrations** tab
   - Click **+ Add Connection** or **New connector**

   **Step B: Create REST/HTTP Connection**
   - Connection type: Select **REST API** or **HTTP**
   - Connection name: `Supply Chain MCP`
   - Base URL: `http://localhost:3001`
   - Authentication: `None` (for development)
   - Click **Test Connection** to verify

   **Step C: Add Actions from the MCP Server**
   - Go to **Actions** tab
   - Click **+ Add new action**
   - For each action, enter:
     - **Name**: (e.g., "Get Suppliers", "Track Order")
     - **Method**: `GET`
     - **Relative URL**: `/api/suppliers`, `/api/orders`, etc.
     - **Parameters**: Leave empty for mock data (or add filters like `?status=shipped`)
     - **Response type**: `JSON`

   **Quick Action Setup**:

   ```
   Action 1:
   - Name: Get Suppliers
   - Method: GET
   - URL: /api/suppliers

   Action 2:
   - Name: Track Order
   - Method: GET
   - URL: /api/orders/{orderId}
   - Parameters: orderId (required, string)

   Action 3:
   - Name: Get Inventory
   - Method: GET
   - URL: /api/inventory/{sku}
   - Parameters: sku (required, string)

   Action 4:
   - Name: Analyze Supplier Risk
   - Method: GET
   - URL: /api/risks?supplierId={supplierId}
   - Parameters: supplierId (required, string)

   Action 5:
   - Name: Get Cost Opportunities
   - Method: GET
   - URL: /api/cost-opportunities

   Action 6:
   - Name: Get Metrics
   - Method: GET
   - URL: /api/metrics
   ```

4. **Import Agent Definition** (Optional - or create topics manually)
   - Go to agent **Settings**
   - Look for **Import from JSON** or **Advanced settings**
   - Upload/paste content from `copilot-agent-definition.json`
   - Review and confirm

5. **Test in Copilot Chat**
   - Open the agent's test chat
   - Try these sample queries:
     ```
     "Track order ORD-2026-001"
     "Show inventory for CHIP-A100"
     "What are the current supply chain metrics?"
     "Analyze supplier SUP001"
     "Find cost savings opportunities"
     ```

---

## 🧪 Detailed Implementation & Testing

### **A. Before Configuring Copilot Studio**

Ensure MCP server is running and accessible:

```powershell
# Terminal 1: Start MCP Server
npm run start-mcp

# Terminal 2: Verify it's running
Invoke-WebRequest -Uri "http://localhost:3001/health" -Method Get | ForEach-Object {$_.Content | ConvertFrom-Json}
```

Expected Response:

```json
{
  "status": "healthy",
  "service": "supply-chain-mcp-server",
  "timestamp": "2026-02-26T..."
}
```

### **B. Copilot Studio Connection Setup (Detailed)**

#### **1. Navigate to Agent Settings**

- Open https://copilotstudio.microsoft.com/
- Select your **Supply Chain Intelligence** agent
- Click **Settings** (⚙️ icon in top right)

#### **2. Add Connection Resource**

In Copilot Studio, look for one of these tabs:

- **Connected resources**
- **Connectors**
- **Integrations**
- **API Integration**

Click **+ Add** or **New Connection**

#### **3. Create REST API Connection**

| Field               | Value                   |
| ------------------- | ----------------------- |
| **Connection Type** | REST API / HTTP Request |
| **Name**            | Supply Chain MCP Server |
| **Base URL**        | `http://localhost:3001` |
| **Auth Type**       | None                    |
| **Auth Method**     | No authentication       |

Click **Test Connection** and verify **Success** message

#### **4. Create Individual Actions**

For each endpoint, create an action:

```
ACTION 1: GET SUPPLIERS
─────────────────────
Name: Get List of Suppliers
HTTP Method: GET
URL Path: /api/suppliers
Response Mapping: Parse JSON response with array of suppliers
```

```
ACTION 2: GET INVENTORY
─────────────────────
Name: Get Inventory by SKU
HTTP Method: GET
URL Path: /api/inventory/{sku}
Input Parameters:
  - sku (required): Product SKU code
Response Mapping: Parse JSON inventory record
```

```
ACTION 3: TRACK ORDER
──────────────────────
Name: Track Order
HTTP Method: GET
URL Path: /api/orders/{orderId}
Input Parameters:
  - orderId (required): Order ID to track
Response Mapping: Parse JSON with order details and shipment info
```

### **C. Connect Actions to Topics**

In Copilot Studio, create 5 topics and link actions:

#### **Topic 1: Order Tracking**

- **Trigger phrases**:
  - "Track order"
  - "Where is my order"
  - "Order status"
  - "Delivery status"

- **Actions to use**:
  - Ask user for Order ID
  - Call "Track Order" action
  - Display order details in Adaptive Card

#### **Topic 2: Inventory Queries**

- **Trigger phrases**:
  - "Inventory level"
  - "Stock status"
  - "Check inventory"
  - "SKU availability"

- **Actions to use**:
  - Ask user for SKU
  - Call "Get Inventory" action
  - Show warehouse locations

#### **Topic 3: Supplier Analysis**

- **Trigger phrases**:
  - "Supplier risk"
  - "Supplier performance"
  - "Quality score"
  - "Assess supplier"

- **Actions to use**:
  - Ask user for Supplier ID
  - Call "Get Suppliers" action (filter)
  - Call "Get Risks" action
  - Display risk assessment

#### **Topic 4: Cost Optimization**

- **Trigger phrases**:
  - "Find cost savings"
  - "Reduce costs"
  - "Cost optimization"
  - "Budget opportunities"

- **Actions to use**:
  - Call "Get Cost Opportunities" action
  - Sort by savings potential
  - Display in Adaptive Card

#### **Topic 5: Metrics Dashboard**

- **Trigger phrases**:
  - "Show metrics"
  - "Supply chain summary"
  - "Performance dashboard"
  - "KPI report"

- **Actions to use**:
  - Call "Get Metrics" action
  - Display key metrics card

### **D. Map Adaptive Cards to Responses**

For each topic, configure response formatting:

```json
{
  "topicName": "Order Tracking",
  "responseType": "Adaptive Card",
  "cardTemplate": {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "text": "Order: ${orderId}",
        "weight": "bolder"
      },
      {
        "type": "TextBlock",
        "text": "Status: ${status}"
      }
      // ... more card elements
    ]
  }
}
```

---

## ✅ Validation Checklist

After configuring in Copilot Studio, verify:

- [ ] **Connection Test Passes**: Click "Test Connection" returns success
- [ ] **MCP Server Responds**: `curl http://localhost:3001/health` returns 200
- [ ] **Topics Load**: All 5 topics appear in agent configuration
- [ ] **Actions Available**: All 6+ actions appear in the actions list
- [ ] **Test Chat Works**: Open test chat and query doesn't show error
- [ ] **Sample Query Responds**: "Track order ORD-2026-001" returns order data
- [ ] **Adaptive Cards Display**: Order response shows formatted order card

---

## 🔧 Troubleshooting Connection Issues

### **Issue 1: "Connection failed - cannot reach server"**

```powershell
# 1. Verify MCP Server is running
curl http://localhost:3001/health

# 2. Check if port 3001 is in use
Get-NetTCPConnection -LocalPort 3001

# 3. If MCP server is running but connection fails:
#    → Firewall may be blocking localhost
#    → Try: netsh advfirewall set allprofiles state off (temporary)

# 4. For Copilot Studio on different machine:
#    → Use ngrok to expose localhost: ngrok http 3001
#    → Use the ngrok URL instead: https://xxxx-xx-xxx-xxx-xx.ngrok.io
```

### **Issue 2: "No data returned from action"**

```powershell
# Test the action URL directly
Invoke-WebRequest -Uri "http://localhost:3001/api/suppliers" | ForEach-Object {$_.Content | ConvertFrom-Json}

# Check MCP server logs for errors
npm run logs

# Verify JSON response format matches expected schema
```

### **Issue 3: "Topic trigger phrases not working"**

- Ensure trigger phrases are exact matches (check capitalization)
- Test in chat: "Track order ORD-2026-001"
- If not recognized, refresh the agent
- Check NLP settings in agent configuration

### **Issue 4: "Adaptive Card not displaying"**

- Verify JSON structure is valid
- Check response field mapping matches action output
- Test card in Adaptive Card designer: https://adaptivecards.io/designer/
- Ensure field names match JSON response

---

## 📱 Deployment to Production

When ready for production deployment:

### **Step 1: Replace localhost with cloud endpoint**

```bash
# Instead of: http://localhost:3001
# Use: https://your-supply-chain-mcp.azurewebsites.net

# Or use ngrok for quick remote access:
ngrok http 3001
# Replace URL with: https://xxxx-xx-xxx-xxx-xx.ngrok.io
```

### **Step 2: Enable Authentication**

```json
{
  "authentication": {
    "type": "OAuthv2 / Service Principal",
    "endpoint": "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
    "clientId": "${AZURE_CLIENT_ID}",
    "clientSecret": "${AZURE_CLIENT_SECRET}"
  }
}
```

### **Step 3: Configure SSL/TLS**

- Obtain SSL certificate
- Configure HTTPS on MCP server
- Update all URLs from `http://` to `https://`

### **Step 4: Enable Audit Logging**

```javascript
// In mcp-server.js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
```

---

## 📊 Sample Integration Flow

Here's what happens when user asks "Track order ORD-2026-001":

```
1. User Query (Copilot Chat)
   ↓
2. NLP Processing (Copilot Studio)
   → Detects: "Track order" → Routes to "Order Tracking" topic
   ↓
3. Topic Execution
   → Extract Order ID: "ORD-2026-001"
   ↓
4. Call MCP Action
   → HTTP GET /api/orders/ORD-2026-001
   ↓
5. MCP Server Response
   → Returns JSON with order details
   ↓
6. Data Processing
   → Extract relevant fields
   → Format for display
   ↓
7. Response Rendering
   → Render Adaptive Card with order status
   → Display tracking info, ETA, alerts
   ↓
8. User Sees
   ┌─────────────────────────┐
   │ Order Tracking Card     │
   │                         │
   │ Order: ORD-2026-001     │
   │ Status: In Transit      │
   │ ETA: 2026-03-03         │
   │ Location: Pacific Ocean │
   └─────────────────────────┘
```

---

## 📊 Test Scenarios (Sample Queries)

### 1. Order Tracking & Exception Management

**User Query**: "Track order ORD-2026-002"

**Agent Response**:

```
Order Status: SHIPPED
Customer: EuroTech Solutions
Order Date: 2026-02-18
Estimated Delivery: 2026-03-02

Items:
- USB-C Connector (1000 pack) x 150 units
- Capacitor 100µF (tape) x 5,000 units

Shipment Details:
- Carrier: FedEx International
- Tracking: 794629070000
- Current Location: In transit to sorting facility
- Status: DELAYED (2 days behind schedule)

⚠️ Alert: This shipment is 2 days delayed. Recommend escalating to carrier for update.
```

### 2. Inventory Visibility

**User Query**: "What's our inventory level for CHIP-A100?"

**Agent Response**:

```
Product: Microprocessor A100 (CHIP-A100)
Total Inventory: 12,500 units
Status: ✅ OPTIMAL

Warehouse Distribution:
- New York (WH-USA-NY): 5,000 units (Last Restock: 2026-02-20)
- Hamburg (WH-EU-DE): 4,200 units (Last Restock: 2026-02-18)
- Singapore (WH-ASIA-SG): 3,300 units (Last Restock: 2026-02-22)

Lead Time: 14 days | Unit Cost: $125.50 | Turnover Rate: 4.2x/year
```

### 3. Supplier Risk Assessment

**User Query**: "Assess supplier SUP001"

**Agent Response**:

```
Supplier: Global Electronic Components Ltd
Country: China | Risk Level: MEDIUM

Performance Metrics:
- On-Time Delivery: 94.2%
- Quality Score: 8.7/10
- Lead Time: 21 days
- Certifications: ISO9001, ISO14001

⚠️ Risk Factors:
1. Quality Score declining (down from 9.1 to 8.7 last month)
2. On-time delivery below 95% target
3. Extended lead time (21 days vs 14-day average)

Recommendations:
✓ Schedule quality audit meeting
✓ Increase inspection sampling to 20%
✓ Develop contingency sourcing plan
✓ Performance review meeting recommended
```

### 4. Cost Optimization

**User Query**: "Find cost savings opportunities"

**Agent Response**:

```
Cost Optimization Analysis

Top Opportunities:
1. SUPPLIER CONSOLIDATION
   Current: Multiple suppliers for USB-C
   Recommendation: Single source with SUP002
   Annual Savings: $12,500 (18.3%)
   Implementation Effort: Low

2. INVENTORY OPTIMIZATION
   Current: 850 units capacitors
   Optimized: 500 units (maintain 30-day supply)
   Cash Release: $157.50
   Implementation Effort: Medium

3. LOGISTICS OPTIMIZATION
   Program: Vendor-Managed Inventory
   Current Cost: $45,000/year
   Projected Cost: $38,500/year
   Annual Savings: $6,500 (14.4%)
   Implementation Effort: High

Total Annual Savings Potential: $19,157.50
Portfolio ROI: 285%
```

### 5. Supply Chain Metrics Dashboard

**User Query**: "Show supply chain metrics"

**Agent Response**:

```
📊 Supply Chain Intelligence Metrics

Performance KPMs:
- On-Time Delivery Rate: 75.0%
- Delayed Orders: 1 out of 4 orders
- Total Orders This Month: 4

Inventory Status:
- Total Inventory Value: $627,248
- Optimal Inventory: 2 SKUs
- Low Inventory: 1 SKU
- Critical Inventory: 0 SKUs

Supplier Health:
- Active Suppliers: 5
- High-Risk Suppliers: 1 (SUP003)
- Medium-Risk Suppliers: 1 (SUP001)
- Low-Risk Suppliers: 3

⚠️ Actions Needed:
• Monitor On-Time Delivery (below 95% target)
• Address Capacitor stock levels
• Performance review with SUP003
```

---

## 🔌 API Reference

All endpoints serve mock data for development/testing. Switch to real connectors in production.

### Base URL

```
http://localhost:3001
```

### 1. Suppliers

```bash
# Get all suppliers
GET /api/suppliers

# Get specific supplier
GET /api/suppliers/{supplierId}

# Query parameters:
# - riskLevel: low|medium|high
```

**Response**:

```json
{
  "data": [
    {
      "id": "SUP001",
      "name": "Global Electronic Components Ltd",
      "country": "China",
      "leadTime": 21,
      "onTimeDeliveryRate": 94.2,
      "qualityScore": 8.7,
      "riskLevel": "medium",
      "certifications": ["ISO9001", "ISO14001"]
    }
  ]
}
```

### 2. Inventory

```bash
# Get all inventory
GET /api/inventory

# Get specific SKU
GET /api/inventory/{sku}

# Query parameters:
# - status: optimal|low|critical
# - warehouse: WH-USA-NY|WH-EU-DE|WH-ASIA-SG
```

### 3. Orders

```bash
# List all orders
GET /api/orders

# Get specific order
GET /api/orders/{orderId}

# Query parameters:
# - status: pending|processing|shipped|in-transit|delivered
# - customerId: {customerId}
# - delayedOnly: true
```

### 4. Shipments

```bash
# List shipments
GET /api/shipments

# Query parameters:
# - status: shipped|in-transit|delivered
# - orderId: {orderId}
```

### 5. Risks

```bash
# List supplier risks
GET /api/risks

# Query parameters:
# - supplierId: {supplierId}
# - severity: low|medium|high
```

### 6. Cost Opportunities

```bash
# List cost opportunities
GET /api/cost-opportunities

# Query parameters:
# - priority: high|medium|low
# - type: consolidation|logistics|inventory-optimization
```

### 7. Metrics

```bash
# Get supply chain metrics
GET /api/metrics
```

---

## 📂 Project Structure

```
Supply Chain Intelligence/
├── mcp-server.js                          # MCP Server (Node.js) - Core API
├── copilot-agent-definition.json         # Agent Definition for Copilot Studio
├── COPILOT-STUDIO-DEPLOYMENT.md          # Complete deployment guide
├── package.json                           # NPM scripts and dependencies
│
├── workflows/
│   └── copilot-workflows.json            # 4 Main workflows (defined in Copilot Studio)
│
├── configuration/
│   ├── manifest.json                     # Complete Copilot manifest
│   ├── authentication.json               # RBAC & security config
│   └── settings.json                     # Feature flags & NLP config
│
├── ui/
│   ├── adaptive-cards.json               # Rich card templates
│   ├── app.js                            # UI application (if needed)
│   ├── index.html                        # Web UI
│   └── styles.css                        # Styling
│
├── actions/
│   ├── order-actions.json                # Order management actions
│   ├── inventory-actions.json            # Inventory actions
│   ├── supplier-actions.json             # Supplier actions
│   ├── risk-actions.json                 # Risk analysis actions
│   └── analytics-actions.json            # Analytics & reporting
│
├── docs/
│   ├── 01-DESIGN.md                      # Complete design document
│   ├── 02-CAPABILITIES.md                # Capabilities matrix
│   ├── 03-WORKFLOWS.md                   # Detailed workflows
│   ├── 04-SECURITY.md                    # Security & compliance
│   └── 05-DEPLOYMENT.md                  # Original deployment guide
│
├── examples/
│   ├── MOCK-DEMO.md                      # Mock data demonstration
│   └── supplier-risk-example.md          # Risk assessment example
│
├── data-integration/
│   └── data-sources.md                   # Data source documentation
│
└── README.md                             # Main project documentation
```

---

## 🛠️ Development Commands

```powershell
# Start MCP server
npm run start-mcp

# Start UI server (on port 8000)
npm run start-ui

# Start both processes in parallel
npm run start

# Run in development mode with auto-reload
npm run dev

# Run all tests
npm run test

# Validate configuration files
npm run validate-config

# Check server health
npm run health-check

# Generate API documentation
npm run api-docs

# Export data
npm run export:inventory
npm run export:orders
npm run export:suppliers

# Backup all data
npm run backup:data
```

---

## 🔐 Security Considerations

### Development Environment

Current setup uses **mock data** with **no authentication** - suitable for development only.

For production:

1. **Enable Azure AD Authentication**

   ```json
   {
     "authentication": {
       "type": "azure-ad",
       "tenantId": "${AZURE_TENANT_ID}",
       "clientId": "${AZURE_CLIENT_ID}",
       "scopes": ["api://supply-chain-copilot/access"]
     }
   }
   ```

2. **Implement OAuth 2.0**
   - Use MSAL for token management
   - Implement token refresh logic
   - Secure credential storage

3. **Enable HTTPS**
   - Configure SSL/TLS certificates
   - Use HTTPS for all requests

4. **Set Up Audit Logging**
   - Log all API calls
   - Monitor agent interactions
   - Track data access

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue**: MCP server won't start on port 3001

Solution:

```powershell
# Find process using port 3001
Get-NetTCPConnection -LocalPort 3001

# Kill the process
Stop-Process -Id 12345 -Force

# Restart
npm run start-mcp
```

**Issue**: Copilot can't connect to MCP server

Solution:

- Ensure MCP server is running: `npm run health-check`
- Check firewall rules
- Verify endpoint URL in Copilot settings
- For remote deployment, use public IP instead of localhost

**Issue**: Queries returning empty results

Solution:

- Check that MCP server is running
- Verify mock data is loaded
- Check API endpoint URLs
- Enable debug mode: `npm run dev`

### Resources

- **Full Deployment Guide**: [COPILOT-STUDIO-DEPLOYMENT.md](./COPILOT-STUDIO-DEPLOYMENT.md)
- **Design Documentation**: [docs/01-DESIGN.md](./docs/01-DESIGN.md)
- **Security Guidelines**: [docs/04-SECURITY.md](./docs/04-SECURITY.md)
- **Microsoft Copilot Studio Docs**: https://learn.microsoft.com/microsoft-copilot-studio/
- **Agent Academy**: https://aka.ms/agentacademy
- **GitHub Issues**: https://github.com/microsoft/agentsleague/issues

---

## 📝 Next Steps

1. ✅ **Start MCP Server**: `npm run start-mcp`
2. ✅ **Test Endpoints**: Use curl or Postman
3. ✅ **Sign into Copilot Studio**: https://copilotstudio.microsoft.com/
4. ✅ **Create Agent**: Import `copilot-agent-definition.json`
5. ✅ **Test Workflows**: Try sample queries
6. ✅ **Customize**: Modify workflows and responses
7. ✅ **Deploy**: Follow [COPILOT-STUDIO-DEPLOYMENT.md](./COPILOT-STUDIO-DEPLOYMENT.md)

---

## 📅 Implementation Timeline

| Phase                    | Timeline  | Activities                                     |
| ------------------------ | --------- | ---------------------------------------------- |
| **Phase 1: Development** | Weeks 1-2 | Setup, MCP server, agent definition            |
| **Phase 2: Integration** | Weeks 2-3 | Connect to Copilot Studio, configure workflows |
| **Phase 3: Testing**     | Week 4    | User acceptance testing, refinements           |
| **Phase 4: Deployment**  | Week 5    | Production deployment, training                |

---

**Created**: February 25, 2026  
**Version**: 1.0.0  
**Status**: Ready for Copilot Studio Deployment
