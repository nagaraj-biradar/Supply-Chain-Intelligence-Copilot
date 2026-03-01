# Copilot Studio MCP Connection Setup Guide

**Complete Step-by-Step Instructions**  
**Version**: 1.0.0  
**Updated**: February 26, 2026

---

## 🎯 Overview

This guide walks you through configuring the **Supply Chain Intelligence Agent** in Microsoft Copilot Studio with the MCP (Model Context Protocol) server connection.

### Prerequisites

- ✅ MCP Server running on `http://localhost:3001`
- ✅ Microsoft Copilot Studio account access
- ✅ Agent created in Copilot Studio

---

## 📋 Implementation Roadmap

```
1. Start MCP Server       (5 min)
   ↓
2. Create Agent           (2 min)
   ↓
3. Add REST Connection    (5 min)
   ↓
4. Create Actions         (10 min)
   ↓
5. Build Topics           (15 min)
   ↓
6. Test Workflows         (10 min)
```

---

## 🚀 Step 1: Verify MCP Server is Running

### 1A. Start the Server

```powershell
# In PowerShell, navigate to project folder
cd "D:\development\2026-projects\AI agents\Agent League\SCM\Supply Chain Intelligence"

# Start MCP Server
npm run start-mcp
```

### 1B. Verify Server Health

```powershell
# In another PowerShell terminal
Invoke-WebRequest -Uri "http://localhost:3001/health" -Method Get | ForEach-Object {
    $response = $_.Content | ConvertFrom-Json
    Write-Host "✓ Server Status: $($response.status)" -ForegroundColor Green
    Write-Host "  Service: $($response.service)"
    Write-Host "  URL: http://localhost:3001"
}
```

**Expected Output:**

```
✓ Server Status: healthy
  Service: supply-chain-mcp-server
  URL: http://localhost:3001
```

---

## 🎮 Step 2: Create Agent in Copilot Studio

### 2A. Access Copilot Studio

1. Open browser → https://copilotstudio.microsoft.com/
2. Sign in with your organization account
3. You should see the home dashboard

### 2B. Create New Agent

1. Click **+ Create** (top left)
2. Select **New agent**
3. Fill in:
   - **Name**: `Supply Chain Intelligence`
   - **Description**: `AI-powered assistant for supply chain operations`
   - **Tone**: Professional
   - **Language**: English
4. Click **Create**

### 2C. Agent Created

You should see your agent in a new edit view.

---

## 🔌 Step 3: Add REST API Connection

### 3A. Navigate to Connections

1. In your agent, click **Settings** ⚙️ (top right)
2. Look for one of these tabs:
   - **Connections**
   - **Connected resources**
   - **Integrations**
   - **Data connections**

### 3B. Create New Connection

1. Click **+ New connection** or **+ Add**
2. Select **REST API** (or HTTP)
3. Name it: `Supply Chain MCP`

### 3C. Configure REST API Settings

| Setting             | Value                   | Notes                                     |
| ------------------- | ----------------------- | ----------------------------------------- |
| **Connection Name** | Supply Chain MCP        | Unique identifier                         |
| **Base URL**        | `http://localhost:3001` | Your MCP server URL                       |
| **Authentication**  | None                    | For development (use OAuth in production) |
| **API Key**         | (leave empty)           | Not needed for development                |

### 3D. Test Connection

1. Click **Test Connection**
2. Wait for result

**Expected:**

- ✅ Connection successful (green checkmark)
- Status: Ready

---

## ⚙️ Step 4: Create Actions for Each API Endpoint

Actions are the bridge between Copilot Studio topics and your MCP server.

### 4A. Create Action 1: Get Suppliers

1. Go to **Actions** tab
2. Click **+ New action**
3. Fill in:
   - **Action Name**: `Get List of Suppliers`
   - **Description**: Retrieve all active suppliers with performance metrics
   - **Connection**: Select `Supply Chain MCP`
   - **HTTP Method**: `GET`
   - **Relative URL Path**: `/api/suppliers`

4. Configure **Input Parameters**: (none required)
5. Configure **Response Parsing**:
   - **Response Type**: JSON
   - **Response Body**: Map to `data` array
6. Click **Save**

### 4B. Create Action 2: Track Order

1. Click **+ New action**
2. Fill in:
   - **Action Name**: `Track Order`
   - **Description**: Get order details and shipment tracking information
   - **Connection**: `Supply Chain MCP`
   - **HTTP Method**: `GET`
   - **Relative URL Path**: `/api/orders/{orderId}`

3. Configure **Input Parameters**:
   - Parameter name: `orderId`
   - Type: String
   - Required: ✓ Yes
   - Sample value: `ORD-2026-001`

4. Save

### 4C. Create Action 3: Get Inventory

1. Click **+ New action**
2. Fill in:
   - **Action Name**: `Get Inventory by SKU`
   - **Description**: Check inventory levels for a specific product
   - **Connection**: `Supply Chain MCP`
   - **HTTP Method**: `GET`
   - **Relative URL Path**: `/api/inventory/{sku}`

3. Input Parameters:
   - Parameter: `sku`
   - Type: String
   - Required: ✓ Yes
   - Sample: `CHIP-A100`

4. Save

### 4D. Create Action 4: Analyze Supplier Risk

1. Click **+ New action**
2. Fill in:
   - **Action Name**: `Analyze Supplier Risk`
   - **Description**: Get risk assessment for a supplier
   - **Connection**: `Supply Chain MCP`
   - **HTTP Method**: `GET`
   - **Relative URL Path**: `/api/risks?supplierId={supplierId}`

3. Input Parameters:
   - Parameter: `supplierId`
   - Type: String
   - Required: ✓ Yes
   - Sample: `SUP001`

4. Save

### 4E. Create Action 5: Get Cost Opportunities

1. Click **+ New action**
2. Fill in:
   - **Action Name**: `Get Cost Opportunities`
   - **Description**: Retrieve cost optimization recommendations
   - **Connection**: `Supply Chain MCP`
   - **HTTP Method**: `GET`
   - **Relative URL Path**: `/api/cost-opportunities`

3. No input parameters needed
4. Save

### 4F. Create Action 6: Get Metrics

1. Click **+ New action**
2. Fill in:
   - **Action Name**: `Get Supply Chain Metrics`
   - **Description**: Get key performance indicators and dashboard metrics
   - **Connection**: `Supply Chain MCP`
   - **HTTP Method**: `GET`
   - **Relative URL Path**: `/api/metrics`

3. No input parameters
4. Save

---

## 💬 Step 5: Build Conversation Topics

Topics define how the agent responds to user queries. Each topic has:

- **Trigger phrases** (what users say)
- **Logic** (how to respond)
- **Actions** (what to call)

### 5A. Create Topic 1: Order Tracking

1. Go to **Topics** tab (or Conversations)
2. Click **+ New topic**
3. Fill in:
   - **Topic Name**: `Order Tracking`
   - **Display Name**: `Track Orders`
   - **Description**: Help users track their orders

4. Add **Trigger phrases** (click to add each):
   - "Track my order"
   - "Where is order"
   - "Order status"
   - "Delivery tracking"
   - "When will order arrive"

5. Build **Topic Logic**:

   **Step 1: Ask User**

   ```
   Message: "Which order would you like to track? Please provide the order ID (e.g., ORD-2026-001)"
   Variable: orderId
   ```

   **Step 2: Call Action**

   ```
   Action: Track Order
   Input: orderId (from user)
   Output variable: orderData
   ```

   **Step 3: Send Response Card**

   ```
   Use Adaptive Card template: order-status-card.json
   (the template is defined inside `ui/adaptive-cards.json` under the
   `order-status-card` key; you can extract it as a separate file if desired)
   Map fields:
     - orderId → orderData.orderId
     - status → orderData.status
     - customerName → orderData.customerName
     - estimatedDelivery → orderData.estimatedDelivery
     - carrier → orderData.carrier
     - trackingNumber → orderData.trackingNumber
   ```

### 5B. Create Topic 2: Inventory Check

1. Click **+ New topic**
2. Fill in:
   - **Topic Name**: `Inventory Check`
   - **Description**: Check product inventory levels

3. Add **Trigger phrases**:
   - "What's our inventory"
   - "Stock level"
   - "Inventory check"
   - "Availability for"
   - "How many in stock"

4. Build **Logic**:

   **Step 1: Ask for SKU**

   ```
   Message: "Which product would you like to check? Provide the SKU code."
   Variable: sku
   Sample SKUs: CHIP-A100, CONN-USB-C, PCB-MAIN-V2
   ```

   **Step 2: Get Inventory**

   ```
   Action: Get Inventory by SKU
   Input: sku
   Output: inventoryData
   ```

   **Step 3: Display**

   ```
   Card: inventory-status-card.json
   Fields:
     - sku → inventoryData.sku
     - totalQty → inventoryData.totalQty
     - status → inventoryData.status
     - warehouse locations → inventoryData.warehouseLocations
   ```

### 5C. Create Topic 3: Supplier Analysis

1. Click **+ New topic**
2. Fill in:
   - **Topic Name**: `Supplier Analysis`
   - **Description**: Analyze supplier performance and risks

3. **Trigger phrases**:
   - "Supplier risk"
   - "Supplier performance"
   - "Quality assessment"
   - "Supplier rating"

4. **Logic**:

   **Step 1: Ask for Supplier**

   ```
   Message: "Which supplier would you like to analyze? (e.g., SUP001, SUP002)"
   Variable: supplierId
   ```

   **Step 2: Get Risks**

   ```
   Action: Analyze Supplier Risk
   Input: supplierId
   Output: riskData
   ```

   **Step 3: Display**

   ```
   Card: supplier-risk-card.json
   Fields:
     - supplier name
     - country
     - risk level
     - on-time delivery rate
     - quality score
     - risk factors
     - recommendations
   ```

### 5D. Create Topic 4: Cost Optimization

1. Click **+ New topic**
2. **Topic Name**: `Cost Optimization`

3. **Trigger phrases**:
   - "Find cost savings"
   - "Reduce costs"
   - "Cost opportunities"
   - "Where can we save money"

4. **Logic**:

   **Step 1: Call Action** (no user input needed)

   ```
   Action: Get Cost Opportunities
   ```

   **Step 2: Display**

   ```
   Card: cost-opportunity-card.json
   Show:
     - Top 3 opportunities
     - Savings amount
     - Implementation effort
     - ROI
   ```

### 5E. Create Topic 5: Metrics Dashboard

1. Click **+ New topic**
2. **Topic Name**: `Supply Chain Metrics`

3. **Trigger phrases**:
   - "Show metrics"
   - "Supply chain dashboard"
   - "Performance metrics"
   - "Supply chain summary"

4. **Logic**:

   **Step 1: Call Metrics Action**

   ```
   Action: Get Supply Chain Metrics
   ```

   **Step 2: Display**

   ```
   Card: metrics-card.json
   Show:
     - On-time delivery rate
     - Delayed orders count
     - Total orders
     - Inventory value
     - Active suppliers
     - High-risk suppliers
   ```

---

## 🧪 Step 6: Test Your Implementation

### 6A. Test in Agent Chat

1. In Copilot Studio, find **Test** button (usually top right)
2. Opens a test chat window

### 6B. Run Test Scenarios

**Test 1: Order Tracking**

```
User: "Track order ORD-2026-001"
Expected: Order details card with status, ETA, tracking info
```

**Test 2: Inventory**

```
User: "What's inventory for CHIP-A100"
Expected: Inventory card showing quantities by warehouse
```

**Test 3: Supplier Risk**

```
User: "Assess supplier SUP003"
Expected: Risk assessment card with performance metrics
```

**Test 4: Cost Savings**

```
User: "Find cost savings"
Expected: Card with 3 cost optimization opportunities
```

**Test 5: Metrics**

```
User: "Show metrics"
Expected: Dashboard card with key KPIs
```

### 6C: Troubleshooting Tests

If test shows error:

**Error: "Connection failed"**

- Verify MCP server is running: `npm run start-mcp`
- Check URL is correct: `http://localhost:3001/health`

**Error: "No data returned"**

- Test action directly in PowerShell:
  ```powershell
  curl http://localhost:3001/api/suppliers
  ```
- Check MCP server logs for errors

**Error: "Topic not triggered"**

- Check trigger phrase is exact match
- Try exact phrase from configuration
- Refresh the agent

---

## 📊 Verification Checklist

After setup, verify all components:

### Connection

- [ ] REST Connection created: `Supply Chain MCP`
- [ ] Connection test passes
- [ ] Base URL: `http://localhost:3001`
- [ ] Authentication: None

### Actions (6 total)

- [ ] Get List of Suppliers
- [ ] Track Order
- [ ] Get Inventory by SKU
- [ ] Analyze Supplier Risk
- [ ] Get Cost Opportunities
- [ ] Get Supply Chain Metrics

### Topics (5 total)

- [ ] Order Tracking (with 5+ trigger phrases)
- [ ] Inventory Check (with 5+ trigger phrases)
- [ ] Supplier Analysis (with 4+ trigger phrases)
- [ ] Cost Optimization (with 4+ trigger phrases)
- [ ] Supply Chain Metrics (with 4+ trigger phrases)

### Response Cards (5 total)

- [ ] Order Status Card
- [ ] Inventory Status Card
- [ ] Supplier Risk Card
- [ ] Cost Opportunity Card
- [ ] Metrics Dashboard Card

### Testing

- [ ] Test chat accessible
- [ ] Sample queries trigger correct topics
- [ ] Actions execute without errors
- [ ] Response cards display correctly
- [ ] All metrics show real data

---

## 🚀 Publish & Deploy

Once everything is tested:

### 1. Publish Agent

- Click **Publish** in Copilot Studio
- Set deployment channel (Microsoft Teams, Web, etc.)
- Configure access permissions

### 2. Share Agent

- Get agent link from **Share** button
- Share with procurement team
- Add to Teams channel if desired

### 3. Monitor Usage

- Go to **Analytics**
- Monitor:
  - Total conversations
  - Most used topics
  - Response times
  - Error rates

---

## 🔒 Security & Production Setup

For production deployment:

### Enable Authentication

1. Change connection from "None" to "OAuth 2.0"
2. Set up Azure AD app registration
3. Configure client credentials
4. Enable token refresh

### Enable HTTPS

```
Current: http://localhost:3001
Production: https://your-domain.azurewebsites.net
```

### Set Up Monitoring

- Enable Copilot Studio analytics
- Configure Azure Monitor alerts
- Set up error logging

---

## 📞 Support & FAQ

### Q: How do I expose localhost to internet?

**A:** Use ngrok:

```bash
# Install: choco install ngrok
ngrok http 3001
# Use the provided HTTPS URL instead of localhost
```

### Q: Can I test without publishing?

**A:** Yes! Use the built-in **Test** button in Copilot Studio

### Q: How do I add more data sources?

**A:** Modify `mcp-server.js` to connect to real ERP/WMS systems

### Q: Can users access from mobile?

**A:** Yes, if deployed to cloud with HTTPS

### Q: How do I customize response cards?

**A:** Edit `ui/adaptive-cards.json` to modify card templates

---

## 📚 Additional Resources

- [Copilot Studio Docs](https://learn.microsoft.com/microsoft-copilot-studio/)
- [REST API Connections](https://learn.microsoft.com/microsoft-copilot-studio/advanced-add-custom-actions)
- [Adaptive Cards](https://adaptivecards.io/)
- [MCP Protocol](https://modelcontextprotocol.io/)

---

**Last Updated**: February 26, 2026  
**Status**: Ready for Implementation  
**Support**: See troubleshooting section above
