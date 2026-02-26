# Copilot Studio MCP Connection - Quick Reference Card

**Print this page for quick lookup during setup**

---

## 🔌 Connection Configuration

```
Connection Type:   REST API / HTTP Request
Connection Name:   Supply Chain MCP
Base URL:          http://localhost:3001
Authentication:    None (development)
Test URL:          http://localhost:3001/health
```

---

## ⚙️ Actions to Create (6 Total)

### Action 1: Get Suppliers

```
Name:    Get List of Suppliers
Method:  GET
URL:     /api/suppliers
Params:  None
```

### Action 2: Track Order

```
Name:    Track Order
Method:  GET
URL:     /api/orders/{orderId}
Params:  orderId (string, required)
Example: ORD-2026-001
```

### Action 3: Get Inventory

```
Name:    Get Inventory by SKU
Method:  GET
URL:     /api/inventory/{sku}
Params:  sku (string, required)
Example: CHIP-A100
```

### Action 4: Analyze Supplier Risk

```
Name:    Analyze Supplier Risk
Method:  GET
URL:     /api/risks?supplierId={supplierId}
Params:  supplierId (string, required)
Example: SUP001
```

### Action 5: Get Cost Opportunities

```
Name:    Get Cost Opportunities
Method:  GET
URL:     /api/cost-opportunities
Params:  None
```

### Action 6: Get Metrics

```
Name:    Get Supply Chain Metrics
Method:  GET
URL:     /api/metrics
Params:  None
```

---

## 💬 Topics to Create (5 Total)

### Topic 1: Order Tracking

**Trigger Phrases:**

- Track my order
- Where is order
- Order status
- Delivery tracking
- When will order arrive

**Flow:**

1. Ask: "Which order would you like to track?"
2. Call: Track Order action
3. Display: Order Status Card

---

### Topic 2: Inventory Check

**Trigger Phrases:**

- What's our inventory
- Stock level
- Inventory check
- Availability for
- How many in stock

**Flow:**

1. Ask: "Which product SKU?"
2. Call: Get Inventory action
3. Display: Inventory Status Card

---

### Topic 3: Supplier Analysis

**Trigger Phrases:**

- Supplier risk
- Supplier performance
- Quality assessment
- Supplier rating

**Flow:**

1. Ask: "Which supplier ID?"
2. Call: Analyze Supplier Risk action
3. Display: Supplier Risk Card

---

### Topic 4: Cost Optimization

**Trigger Phrases:**

- Find cost savings
- Reduce costs
- Cost opportunities
- Where can we save

**Flow:**

1. Call: Get Cost Opportunities (auto)
2. Display: Cost Opportunity Card

---

### Topic 5: Supply Chain Metrics

**Trigger Phrases:**

- Show metrics
- Supply chain dashboard
- Performance metrics
- Supply chain summary

**Flow:**

1. Call: Get Supply Chain Metrics (auto)
2. Display: Metrics Dashboard Card

---

## 📋 Sample Data Reference

### Suppliers (use these IDs)

```
SUP001 → Global Electronic Components (China, MEDIUM risk)
SUP002 → Advanced Manufacturing (Germany, LOW risk)
SUP003 → Pacific Logistics (Vietnam, HIGH risk)
SUP004 → Nordic Components (Sweden, LOW risk)
SUP005 → Midwest Industrial (USA, LOW risk)
```

### Products (use these SKUs)

```
CHIP-A100       → Microprocessor (12,500 units)
CONN-USB-C      → USB-C Connector (2,400 units)
CAP-ELEC-100U   → Capacitor (850 units - LOW stock)
PCB-MAIN-V2     → Circuit Board (3,200 units)
```

### Orders (use these IDs)

```
ORD-2026-001 → In Transit (TechCorp)
ORD-2026-002 → Shipped, Delayed (EuroTech) ⚠️
ORD-2026-003 → Pending (AsianTech)
ORD-2026-004 → Processing (TechCorp)
```

---

## 🧪 Test Commands

### Verify MCP Server Running

```powershell
curl http://localhost:3001/health
```

### Test Each API Endpoint

```powershell
# Suppliers
curl http://localhost:3001/api/suppliers

# Single Supplier
curl http://localhost:3001/api/suppliers/SUP001

# Inventory
curl http://localhost:3001/api/inventory

# Single SKU
curl http://localhost:3001/api/inventory/CHIP-A100

# Orders
curl http://localhost:3001/api/orders

# Single Order
curl http://localhost:3001/api/orders/ORD-2026-001

# Risks
curl http://localhost:3001/api/risks

# Cost Opportunities
curl http://localhost:3001/api/cost-opportunities

# Metrics
curl http://localhost:3001/api/metrics
```

---

## ✅ Setup Checklist

### Pre-Setup

- [ ] MCP Server installed (`npm install` completed)
- [ ] MCP Server running (`npm run start-mcp`)
- [ ] Server health check passes
- [ ] Copilot Studio account accessible

### Copilot Studio Configuration

- [ ] REST Connection created and tested
- [ ] All 6 Actions created
- [ ] All 5 Topics created with trigger phrases
- [ ] Adaptive Card templates linked

### Testing

- [ ] "Track order ORD-2026-001" → Works
- [ ] "Show inventory CHIP-A100" → Works
- [ ] "Analyze SUP001" → Works
- [ ] "Find cost savings" → Works
- [ ] "Show metrics" → Works

---

## 🚨 Troubleshooting Quick Fix

| Issue                   | Solution                                     |
| ----------------------- | -------------------------------------------- |
| **Port 3001 in use**    | `netstat -an \| grep 3001` then kill process |
| **Connection fails**    | Check `http://localhost:3001/health`         |
| **No data returned**    | Test API endpoint directly in PowerShell     |
| **Topic not triggered** | Verify exact trigger phrase match            |
| **Card not displaying** | Validate JSON in Adaptive Card Designer      |

---

## 🔗 Key URLs

| Resource                   | URL                                  |
| -------------------------- | ------------------------------------ |
| **Copilot Studio**         | https://copilotstudio.microsoft.com/ |
| **MCP Health Check**       | http://localhost:3001/health         |
| **Adaptive Card Designer** | https://adaptivecards.io/designer/   |
| **Full Setup Guide**       | COPILOT-STUDIO-SETUP.md              |

---

**Print Date**: February 26, 2026  
**Copilot Studio Version**: 1.0+  
**MCP Server URL**: http://localhost:3001
