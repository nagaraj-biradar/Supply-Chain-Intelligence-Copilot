# Copilot Studio Setup - Step-by-Step Checklist

**Complete Implementation Checklist**  
**Date Started**: ****\_\_\_****  
**Completed**: ****\_\_\_****

---

## Phase 1: Prerequisites (5 minutes)

### ✅ Server Setup

- [ ] Node.js installed (v14+)
  ```powershell
  node --version
  ```
- [ ] Project folder opened in PowerShell
  ```powershell
  cd "Supply Chain Intelligence"
  ```
- [ ] npm dependencies installed
  ```powershell
  npm install
  ```

### ✅ MCP Server Running

- [ ] Started MCP server
  ```powershell
  npm run start-mcp
  ```
- [ ] Server running on port 3001
  ```powershell
  # Should see message: "🚀 Supply Chain MCP Server running on http://localhost:3001"
  ```

### ✅ Server Health Verified

- [ ] Health endpoint responds
  ```powershell
  curl http://localhost:3001/health
  ```
- [ ] Response shows `"status": "healthy"`
- [ ] All endpoints are accessible

**Troubleshooting**: If server won't start

```powershell
# Check if port 3001 is in use
Get-NetTCPConnection -LocalPort 3001

# Kill existing process
Stop-Process -Id [PID] -Force

# Restart MCP server
npm run start-mcp
```

---

## Phase 2: Copilot Studio Agent Setup (5 minutes)

### ✅ Access Copilot Studio

- [ ] Browser opened to https://copilotstudio.microsoft.com/
- [ ] Signed in with organization account
- [ ] Dashboard visible

### ✅ Create New Agent

- [ ] Clicked **+ Create**
- [ ] Selected **New agent**
- [ ] Filled in details:
  - [ ] Name: `Supply Chain Intelligence`
  - [ ] Description: `AI-powered assistant for supply chain operations`
  - [ ] Tone: Professional
  - [ ] Language: English
- [ ] Agent created successfully
- [ ] In agent edit view

---

## Phase 3: Create REST Connection (5 minutes)

### ✅ Navigate to Connection Settings

- [ ] Clicked **Settings** ⚙️ (top right)
- [ ] Found **Connections** / **Integrations** tab
- [ ] Clicked **+ Add Connection** or **New connection**

### ✅ Configure REST API Connection

- [ ] Selected **REST API** connection type
- [ ] Filled in connection details:

| Field           | Value                 | ✅  |
| --------------- | --------------------- | --- |
| Connection Name | Supply Chain MCP      | [ ] |
| Base URL        | http://localhost:3001 | [ ] |
| Authentication  | None                  | [ ] |
| API Key         | (leave empty)         | [ ] |

### ✅ Test Connection

- [ ] Clicked **Test Connection**
- [ ] Result shows **Success** ✓
- [ ] Status shows **Ready**
- [ ] Connection saved

**If test fails:**

```powershell
# Verify MCP server is still running
curl http://localhost:3001/health

# Check Windows firewall
# Settings → Privacy & Security → Windows Defender Firewall
# → Allow an app through firewall
```

---

## Phase 4: Create Actions (15 minutes)

Actions are the API calls that connect Copilot Studio to your MCP server.

### ✅ Action 1: Get Suppliers

- [ ] Went to **Actions** tab
- [ ] Clicked **+ New action**
- [ ] Filled in:

| Field            | Value                                           |
| ---------------- | ----------------------------------------------- |
| Action Name      | `Get List of Suppliers`                         |
| Description      | Retrieve all suppliers with performance metrics |
| Connection       | `Supply Chain MCP`                              |
| HTTP Method      | GET                                             |
| Relative URL     | `/api/suppliers`                                |
| Input Parameters | (none)                                          |

- [ ] Clicked **Save**

### ✅ Action 2: Track Order

- [ ] Clicked **+ New action**
- [ ] Filled in:

| Field          | Value                   |
| -------------- | ----------------------- |
| Action Name    | `Track Order`           |
| HTTP Method    | GET                     |
| URL            | `/api/orders/{orderId}` |
| Parameter Name | `orderId`               |
| Parameter Type | String                  |
| Required       | ✓ Yes                   |
| Sample Value   | `ORD-2026-001`          |

- [ ] Clicked **Save**

### ✅ Action 3: Get Inventory

- [ ] Created new action:

| Field     | Value                    |
| --------- | ------------------------ |
| Name      | `Get Inventory by SKU`   |
| Method    | GET                      |
| URL       | `/api/inventory/{sku}`   |
| Parameter | `sku` (string, required) |
| Sample    | `CHIP-A100`              |

- [ ] Saved

### ✅ Action 4: Analyzer Supplier Risk

- [ ] Created new action:

| Field     | Value                                |
| --------- | ------------------------------------ |
| Name      | `Analyze Supplier Risk`              |
| Method    | GET                                  |
| URL       | `/api/risks?supplierId={supplierId}` |
| Parameter | `supplierId` (string, required)      |
| Sample    | `SUP001`                             |

- [ ] Saved

### ✅ Action 5: Get Cost Opportunities

- [ ] Created new action:

| Field      | Value                     |
| ---------- | ------------------------- |
| Name       | `Get Cost Opportunities`  |
| Method     | GET                       |
| URL        | `/api/cost-opportunities` |
| Parameters | (none)                    |

- [ ] Saved

### ✅ Action 6: Get Metrics

- [ ] Created new action:

| Field      | Value                      |
| ---------- | -------------------------- |
| Name       | `Get Supply Chain Metrics` |
| Method     | GET                        |
| URL        | `/api/metrics`             |
| Parameters | (none)                     |

- [ ] Saved

**Verification**: All 6 actions visible in Actions list

---

## Phase 5: Create Topics (20 minutes)

Topics are conversational flows that handle user queries.

### ✅ Topic 1: Order Tracking

- [ ] Went to **Topics** / **Conversations**
- [ ] Clicked **+ New topic**
- [ ] Filled in:
  - [ ] Name: `Order Tracking`
  - [ ] Description: `Help users track their orders`

#### Trigger Phrases

- [ ] Added: "Track my order"
- [ ] Added: "Where is order"
- [ ] Added: "Order status"
- [ ] Added: "Delivery tracking"
- [ ] Added: "When will order arrive"

#### Topic Logic

- [ ] **Step 1**: Ask user message

  ```
  "Which order would you like to track? Please provide the order ID (e.g., ORD-2026-001)"
  Save to variable: orderId
  ```

- [ ] **Step 2**: Call Action

  ```
  Action: Track Order
  Input: orderId (from user)
  Output variable: orderData
  ```

- [ ] **Step 3**: Send Response

  ```
  Use Card: Order Status Card
  Map: orderData → card fields
  ```

- [ ] Saved topic

### ✅ Topic 2: Inventory Check

- [ ] Created new topic:
  - [ ] Name: `Inventory Check`
  - [ ] Description: `Check product inventory`

#### Trigger Phrases

- [ ] "What's our inventory"
- [ ] "Stock level"
- [ ] "Inventory check"
- [ ] "How many in stock"

#### Logic

- [ ] **Step 1**: Ask "Which product SKU?" → variable: sku
- [ ] **Step 2**: Call "Get Inventory by SKU" action
- [ ] **Step 3**: Display "Inventory Status Card"
- [ ] Saved

### ✅ Topic 3: Supplier Analysis

- [ ] Created new topic:
  - [ ] Name: `Supplier Analysis`
  - [ ] Description: `Analyze suppliers`

#### Trigger Phrases

- [ ] "Supplier risk"
- [ ] "Supplier performance"
- [ ] "Quality assessment"

#### Logic

- [ ] Ask "Which supplier ID?"
- [ ] Call "Analyze Supplier Risk" action
- [ ] Display "Supplier Risk Card"
- [ ] Saved

### ✅ Topic 4: Cost Optimization

- [ ] Created new topic:
  - [ ] Name: `Cost Optimization`

#### Trigger Phrases

- [ ] "Find cost savings"
- [ ] "Reduce costs"
- [ ] "Cost opportunities"

#### Logic

- [ ] Call "Get Cost Opportunities" (auto, no user input)
- [ ] Display "Cost Opportunity Card"
- [ ] Saved

### ✅ Topic 5: Supply Chain Metrics

- [ ] Created new topic:
  - [ ] Name: `Supply Chain Metrics`

#### Trigger Phrases

- [ ] "Show metrics"
- [ ] "Performance dashboard"
- [ ] "Supply chain summary"

#### Logic

- [ ] Call "Get Supply Chain Metrics" (auto)
- [ ] Display "Metrics Card"
- [ ] Saved

**Verification**: All 5 topics visible in Topics list

---

## Phase 6: Testing & Validation (15 minutes)

### ✅ Open Test Chat

- [ ] Found **Test** button in Copilot Studio (top right)
- [ ] Test chat window opened
- [ ] Chat is ready for input

### ✅ Test Order Tracking

- [ ] Typed: `"Track order ORD-2026-001"`
- [ ] Agent recognized topic: `Order Tracking`
- [ ] Response showed: Order Status Card
- [ ] Card displayed:
  - [ ] Order ID
  - [ ] Status
  - [ ] Customer name
  - [ ] Carrier & Tracking
  - [ ] ETA

**If it doesn't work:**

```powershell
# Check MCP server is still running
npm run health-check

# Test API directly
curl http://localhost:3001/api/orders/ORD-2026-001
```

### ✅ Test Inventory Query

- [ ] Typed: `"Show inventory for CHIP-A100"`
- [ ] Topic triggered: `Inventory Check`
- [ ] Response showed: Inventory Card with:
  - [ ] Total quantity
  - [ ] Warehouse breakdown
  - [ ] Status (Optimal/Low/Critical)

### ✅ Test Supplier Risk

- [ ] Typed: `"Assess supplier SUP001"`
- [ ] Topic: `Supplier Analysis`
- [ ] Response: Supplier Risk Card with:
  - [ ] Performance metrics
  - [ ] Risk level
  - [ ] Recommendations

### ✅ Test Cost Analysis

- [ ] Typed: `"Find cost savings"`
- [ ] Topic: `Cost Optimization`
- [ ] Response: Cost Card with:
  - [ ] Top opportunities
  - [ ] Savings amounts
  - [ ] ROI

### ✅ Test Metrics

- [ ] Typed: `"Show metrics"`
- [ ] Topic: `Supply Chain Metrics`
- [ ] Response: Metrics Dashboard with:
  - [ ] On-time delivery rate
  - [ ] Delayed orders
  - [ ] Inventory value
  - [ ] High-risk suppliers

---

## Phase 7: Final Verification

### ✅ Connection Health

- [ ] Connection test still passes
- [ ] All actions callable
- [ ] No authentication errors

### ✅ Topic Coverage

- [ ] All 5 topics created
- [ ] All trigger phrases configured
- [ ] Each topic has proper flow

### ✅ Response Cards

- [ ] All 5 card templates working
- [ ] Data formatting correct
- [ ] No JSON errors

### ✅ Sample Data

- [ ] Can track orders (ORD-2026-001 through 004)
- [ ] Can check inventory (CHIP-A100, CONN-USB-C, CAP-ELEC-100U, PCB-MAIN-V2)
- [ ] Can analyze suppliers (SUP001 through SUP005)
- [ ] Cost opportunities display
- [ ] Metrics display

---

## 🎉 Completion Checklist

- [ ] All prerequisites met
- [ ] MCP server running on localhost:3001
- [ ] Copilot Studio agent created
- [ ] REST connection configured & tested
- [ ] All 6 actions created
- [ ] All 5 topics created with trigger phrases
- [ ] All test scenarios pass
- [ ] Ready for production deployment

---

## 📝 Notes & Issues Found

Use this section to document any issues or customizations:

```
Issue 1: ________________________________
Resolution: ______________________________

Issue 2: ________________________________
Resolution: ______________________________

Customization 1: _________________________
Details: _________________________________
```

---

## 🚀 Next Steps

Once everything is working:

1. **Publish Agent**
   - [ ] Click **Publish** button
   - [ ] Select deployment channel
   - [ ] Configure permissions

2. **Connect to Real Data** (Optional)
   - [ ] Modify mcp-server.js to connect to real ERP/WMS/OMS
   - [ ] Enable Azure AD authentication
   - [ ] Update connection from localhost to cloud URL

3. **Enable Monitoring**
   - [ ] Set up Copilot Studio analytics
   - [ ] Configure error logging
   - [ ] Monitor user interactions

4. **Train Users**
   - [ ] Share agent link with team
   - [ ] Provide sample queries documentation
   - [ ] Set up support process

---

**Implementation Status**:

- Start Date: ****\_\_\_****
- Completion Date: ****\_\_\_****
- Ready for Production: [ ] Yes [ ] No

**Prepared By**: ****\_\_\_****  
**Reviewed By**: ****\_\_\_****
