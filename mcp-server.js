/**
 * Supply Chain MCP Server
 * Provides real-time supply chain data through Model Context Protocol
 * Serves mock data for: Orders, Inventory, Suppliers, Shipments
 */

const http = require("http");
const url = require("url");

const PORT = process.env.MCP_PORT || 3001;

// ============================================================================
// MOCK DATA LAYER
// ============================================================================

class SupplyChainDataService {
  constructor() {
    this.initializeMockData();
  }

  initializeMockData() {
    // Initialize suppliers
    this.suppliers = [
      {
        id: "SUP001",
        name: "Global Electronic Components Ltd",
        country: "China",
        leadTime: 21,
        onTimeDeliveryRate: 94.2,
        qualityScore: 8.7,
        riskLevel: "medium",
        lastAuditDate: "2026-01-15",
        certifications: ["ISO9001", "ISO14001"],
      },
      {
        id: "SUP002",
        name: "Advanced Manufacturing Inc",
        country: "Germany",
        leadTime: 14,
        onTimeDeliveryRate: 98.5,
        qualityScore: 9.4,
        riskLevel: "low",
        lastAuditDate: "2026-02-01",
        certifications: ["ISO9001", "ISO45001", "ISO14001"],
      },
      {
        id: "SUP003",
        name: "Pacific Logistics Partners",
        country: "Vietnam",
        leadTime: 28,
        onTimeDeliveryRate: 89.1,
        qualityScore: 7.9,
        riskLevel: "high",
        lastAuditDate: "2025-10-20",
        certifications: ["ISO9001"],
      },
      {
        id: "SUP004",
        name: "Nordic Components AB",
        country: "Sweden",
        leadTime: 10,
        onTimeDeliveryRate: 99.2,
        qualityScore: 9.8,
        riskLevel: "low",
        lastAuditDate: "2026-01-28",
        certifications: ["ISO9001", "ISO14001", "ISO45001"],
      },
      {
        id: "SUP005",
        name: "Midwest Industrial Supply",
        country: "USA",
        leadTime: 5,
        onTimeDeliveryRate: 96.3,
        qualityScore: 8.5,
        riskLevel: "low",
        lastAuditDate: "2026-02-10",
        certifications: ["ISO9001"],
      },
    ];

    // Initialize inventory
    this.inventory = [
      {
        sku: "CHIP-A100",
        name: "Microprocessor A100",
        totalQty: 12500,
        warehouseLocations: [
          { warehouse: "WH-USA-NY", qty: 5000, lastRestockDate: "2026-02-20" },
          { warehouse: "WH-EU-DE", qty: 4200, lastRestockDate: "2026-02-18" },
          { warehouse: "WH-ASIA-SG", qty: 3300, lastRestockDate: "2026-02-22" },
        ],
        reorderPoint: 3000,
        leadTime: 14,
        unitCost: 125.5,
        turnoverRate: 4.2,
        status: "optimal",
      },
      {
        sku: "CONN-USB-C",
        name: "USB-C Connector (1000 pack)",
        totalQty: 2400,
        warehouseLocations: [
          { warehouse: "WH-USA-NY", qty: 800, lastRestockDate: "2026-02-21" },
          { warehouse: "WH-EU-DE", qty: 950, lastRestockDate: "2026-02-19" },
          { warehouse: "WH-ASIA-SG", qty: 650, lastRestockDate: "2026-02-21" },
        ],
        reorderPoint: 1000,
        leadTime: 7,
        unitCost: 8.75,
        turnoverRate: 8.1,
        status: "optimal",
      },
      {
        sku: "CAP-ELEC-100U",
        name: "Capacitor 100µF (tape)",
        totalQty: 850,
        warehouseLocations: [
          { warehouse: "WH-USA-NY", qty: 250, lastRestockDate: "2026-02-15" },
          { warehouse: "WH-EU-DE", qty: 350, lastRestockDate: "2026-02-16" },
          { warehouse: "WH-ASIA-SG", qty: 250, lastRestockDate: "2026-02-14" },
        ],
        reorderPoint: 2000,
        leadTime: 21,
        unitCost: 0.45,
        turnoverRate: 12.3,
        status: "low",
      },
      {
        sku: "PCB-MAIN-V2",
        name: "Main Circuit Board V2",
        totalQty: 3200,
        warehouseLocations: [
          { warehouse: "WH-USA-NY", qty: 1200, lastRestockDate: "2026-02-22" },
          { warehouse: "WH-EU-DE", qty: 1000, lastRestockDate: "2026-02-21" },
          { warehouse: "WH-ASIA-SG", qty: 1000, lastRestockDate: "2026-02-20" },
        ],
        reorderPoint: 500,
        leadTime: 10,
        unitCost: 45.99,
        turnoverRate: 6.8,
        status: "optimal",
      },
    ];

    // Initialize orders
    this.orders = [
      {
        orderId: "ORD-2026-001",
        customerId: "CUST-USA-100",
        customerName: "TechCorp Manufacturing",
        orderDate: "2026-02-20",
        requiredDate: "2026-03-05",
        shippedDate: "2026-02-22",
        deliveryDate: "2026-03-04",
        status: "in-transit",
        items: [
          { sku: "CHIP-A100", qty: 500, unitPrice: 125.5 },
          { sku: "PCB-MAIN-V2", qty: 200, unitPrice: 45.99 },
        ],
        totalValue: 71475,
        carrier: "DHL Express",
        trackingNumber: "1Z999AA10123456784",
        estimatedDelivery: "2026-03-03",
        delayDays: 0,
      },
      {
        orderId: "ORD-2026-002",
        customerId: "CUST-EU-200",
        customerName: "EuroTech Solutions",
        orderDate: "2026-02-18",
        requiredDate: "2026-02-28",
        shippedDate: "2026-02-24",
        deliveryDate: null,
        status: "shipped",
        items: [
          { sku: "CONN-USB-C", qty: 150, unitPrice: 8.75 },
          { sku: "CAP-ELEC-100U", qty: 5000, unitPrice: 0.45 },
        ],
        totalValue: 3937.5,
        carrier: "FedEx International",
        trackingNumber: "794629070000",
        estimatedDelivery: "2026-03-02",
        delayDays: 2,
      },
      {
        orderId: "ORD-2026-003",
        customerId: "CUST-ASIA-300",
        customerName: "AsianTech Industries",
        orderDate: "2026-02-21",
        requiredDate: "2026-03-10",
        shippedDate: null,
        deliveryDate: null,
        status: "pending",
        items: [
          { sku: "PCB-MAIN-V2", qty: 300, unitPrice: 45.99 },
          { sku: "CHIP-A100", qty: 250, unitPrice: 125.5 },
        ],
        totalValue: 45145,
        carrier: null,
        trackingNumber: null,
        estimatedDelivery: "2026-03-15",
        delayDays: 0,
      },
      {
        orderId: "ORD-2026-004",
        customerId: "CUST-USA-100",
        customerName: "TechCorp Manufacturing",
        orderDate: "2026-02-22",
        requiredDate: "2026-03-08",
        shippedDate: null,
        deliveryDate: null,
        status: "processing",
        items: [
          { sku: "CONN-USB-C", qty: 200, unitPrice: 8.75 },
          { sku: "CAP-ELEC-100U", qty: 10000, unitPrice: 0.45 },
        ],
        totalValue: 6750,
        carrier: null,
        trackingNumber: null,
        estimatedDelivery: "2026-03-10",
        delayDays: 0,
      },
    ];

    // Initialize shipments
    this.shipments = [
      {
        shipmentId: "SHIP-2026-0001",
        orderId: "ORD-2026-001",
        origin: "Shanghai, China",
        destination: "New York, USA",
        carrier: "DHL Express",
        status: "in-transit",
        currentLocation: "Pacific Ocean (Day 8/12)",
        lastUpdate: "2026-02-25T14:30:00Z",
        estimatedArrival: "2026-03-03",
        weight: 150,
        volume: 0.85,
      },
      {
        shipmentId: "SHIP-2026-0002",
        orderId: "ORD-2026-002",
        origin: "Hamburg, Germany",
        destination: "Paris, France",
        carrier: "FedEx International",
        status: "shipped",
        currentLocation: "In transit to sorting facility",
        lastUpdate: "2026-02-25T10:15:00Z",
        estimatedArrival: "2026-03-02",
        weight: 75,
        volume: 0.42,
      },
    ];

    // Initialize supplier risks
    this.supplierRisks = [
      {
        supplierId: "SUP003",
        riskType: "delivery",
        severity: "high",
        description: "On-time delivery rate below target (89.1% vs 95% target)",
        trend: "declining",
        impact: "delayed orders",
        recommendedAction: "Performance review meeting and improvement plan",
        detectedDate: "2026-02-20",
      },
      {
        supplierId: "SUP001",
        riskType: "quality",
        severity: "medium",
        description:
          "Quality score fluctuating (recent decline from 9.1 to 8.7)",
        trend: "declining",
        impact: "potential defect increases",
        recommendedAction: "Increase quality audits and supplier training",
        detectedDate: "2026-02-18",
      },
      {
        supplierId: "SUP003",
        riskType: "geopolitical",
        severity: "medium",
        description: "Vietnam operations in flood-risk region",
        trend: "stable",
        impact: "supply disruption potential",
        recommendedAction: "Develop contingency sourcing plan",
        detectedDate: "2026-01-15",
      },
    ];

    // Initialize cost optimization opportunities
    this.costOpportunities = [
      {
        opportunityId: "COST-001",
        type: "consolidation",
        description: "Consolidate USB-C orders with single supplier",
        currentSupplier: "SUP001, SUP002",
        recommendedSupplier: "SUP002",
        savingsPotential: 12500,
        savingsPercentage: 18.3,
        implementationEffort: "low",
        priority: "high",
      },
      {
        opportunityId: "COST-002",
        type: "inventory-optimization",
        description: "Reduce safety stock on fast-moving capacitor",
        currentInventory: 850,
        optimizedInventory: 500,
        savingsPotential: 157.5,
        savingsPercentage: 25.0,
        implementationEffort: "medium",
        priority: "medium",
      },
      {
        opportunityId: "COST-003",
        type: "logistics",
        description: "Implement vendor-managed inventory for high-volume items",
        currentCost: 45000,
        projectedCost: 38500,
        savingsPotential: 6500,
        savingsPercentage: 14.4,
        implementationEffort: "high",
        priority: "medium",
      },
    ];
  }

  // Data retrieval methods
  getSuppliers(filter = {}) {
    let suppliers = this.suppliers;
    if (filter.riskLevel) {
      suppliers = suppliers.filter((s) => s.riskLevel === filter.riskLevel);
    }
    return suppliers;
  }

  getSupplierById(supplierId) {
    return this.suppliers.find((s) => s.id === supplierId);
  }

  getInventory(filter = {}) {
    let inventory = this.inventory;
    if (filter.status) {
      inventory = inventory.filter((i) => i.status === filter.status);
    }
    if (filter.warehouse) {
      inventory = inventory.map((item) => ({
        ...item,
        warehouseLocations: item.warehouseLocations.filter(
          (w) => w.warehouse === filter.warehouse,
        ),
      }));
    }
    return inventory;
  }

  getInventoryBySku(sku) {
    return this.inventory.find((i) => i.sku === sku);
  }

  getOrders(filter = {}) {
    let orders = this.orders;
    if (filter.status) {
      orders = orders.filter((o) => o.status === filter.status);
    }
    if (filter.customerId) {
      orders = orders.filter((o) => o.customerId === filter.customerId);
    }
    if (filter.delayedOnly) {
      orders = orders.filter((o) => o.delayDays > 0);
    }
    return orders;
  }

  getOrderById(orderId) {
    return this.orders.find((o) => o.orderId === orderId);
  }

  getShipments(filter = {}) {
    let shipments = this.shipments;
    if (filter.status) {
      shipments = shipments.filter((s) => s.status === filter.status);
    }
    if (filter.orderId) {
      shipments = shipments.filter((s) => s.orderId === filter.orderId);
    }
    return shipments;
  }

  getSupplierRisks(filter = {}) {
    let risks = this.supplierRisks;
    if (filter.supplierId) {
      risks = risks.filter((r) => r.supplierId === filter.supplierId);
    }
    if (filter.severity) {
      risks = risks.filter((r) => r.severity === filter.severity);
    }
    return risks;
  }

  getCostOpportunities(filter = {}) {
    let opportunities = this.costOpportunities;
    if (filter.priority) {
      opportunities = opportunities.filter(
        (o) => o.priority === filter.priority,
      );
    }
    if (filter.type) {
      opportunities = opportunities.filter((o) => o.type === filter.type);
    }
    return opportunities;
  }

  // Analytics methods
  getSupplyChainMetrics() {
    const onTimeOrders = this.orders.filter((o) => o.delayDays === 0).length;
    const onTimeRate = (onTimeOrders / this.orders.length) * 100;

    const totalInventoryValue = this.inventory.reduce(
      (sum, item) => sum + item.totalQty * item.unitCost,
      0,
    );

    const highRiskSuppliers = this.suppliers.filter(
      (s) => s.riskLevel === "high",
    ).length;

    return {
      totalOrders: this.orders.length,
      onTimeDeliveryRate: onTimeRate.toFixed(1),
      delayedOrders: this.orders.filter((o) => o.delayDays > 0).length,
      totalInventoryValue: totalInventoryValue.toFixed(2),
      activeSuppliers: this.suppliers.length,
      highRiskSuppliers: highRiskSuppliers,
    };
  }
}

// ============================================================================
// MCP SERVER IMPLEMENTATION
// ============================================================================

const dataService = new SupplyChainDataService();

function isJsonRequest(req) {
  return req.headers.accept && req.headers.accept.includes("application/json");
}

function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data, null, 2));
}

function sendErrorResponse(res, statusCode, message) {
  sendJsonResponse(res, statusCode, {
    error: true,
    message: message,
    timestamp: new Date().toISOString(),
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    });
    res.end();
    return;
  }

  // API key authentication (optional)
  if (process.env.MCP_API_KEY && pathname !== "/health") {
    const incomingKey = req.headers["x-api-key"];
    if (incomingKey !== process.env.MCP_API_KEY) {
      sendErrorResponse(res, 401, "Unauthorized: invalid or missing API key");
      return;
    }
  }

  // Suppliers endpoints
  if (pathname === "/api/suppliers" && req.method === "GET") {
    const suppliers = dataService.getSuppliers(query);
    sendJsonResponse(res, 200, { data: suppliers });
    return;
  }

  if (pathname.match(/^\/api\/suppliers\/[^\/]+$/) && req.method === "GET") {
    const supplierId = pathname.split("/").pop();
    const supplier = dataService.getSupplierById(supplierId);
    if (supplier) {
      sendJsonResponse(res, 200, { data: supplier });
    } else {
      sendErrorResponse(res, 404, `Supplier ${supplierId} not found`);
    }
    return;
  }

  // Inventory endpoints
  if (pathname === "/api/inventory" && req.method === "GET") {
    const inventory = dataService.getInventory(query);
    sendJsonResponse(res, 200, { data: inventory });
    return;
  }

  if (pathname.match(/^\/api\/inventory\/[^\/]+$/) && req.method === "GET") {
    const sku = pathname.split("/").pop();
    const item = dataService.getInventoryBySku(sku);
    if (item) {
      sendJsonResponse(res, 200, { data: item });
    } else {
      sendErrorResponse(res, 404, `SKU ${sku} not found`);
    }
    return;
  }

  // Orders endpoints
  if (pathname === "/api/orders" && req.method === "GET") {
    const orders = dataService.getOrders(query);
    sendJsonResponse(res, 200, { data: orders });
    return;
  }

  if (pathname.match(/^\/api\/orders\/[^\/]+$/) && req.method === "GET") {
    const orderId = pathname.split("/").pop();
    const order = dataService.getOrderById(orderId);
    if (order) {
      sendJsonResponse(res, 200, { data: order });
    } else {
      sendErrorResponse(res, 404, `Order ${orderId} not found`);
    }
    return;
  }

  // Shipments endpoints
  if (pathname === "/api/shipments" && req.method === "GET") {
    const shipments = dataService.getShipments(query);
    sendJsonResponse(res, 200, { data: shipments });
    return;
  }

  // Risks endpoints
  if (pathname === "/api/risks" && req.method === "GET") {
    const risks = dataService.getSupplierRisks(query);
    sendJsonResponse(res, 200, { data: risks });
    return;
  }

  // Cost opportunities endpoints
  if (pathname === "/api/cost-opportunities" && req.method === "GET") {
    const opportunities = dataService.getCostOpportunities(query);
    sendJsonResponse(res, 200, { data: opportunities });
    return;
  }

  // Metrics endpoint
  if (pathname === "/api/metrics" && req.method === "GET") {
    const metrics = dataService.getSupplyChainMetrics();
    sendJsonResponse(res, 200, { data: metrics });
    return;
  }

  // Health check
  if (pathname === "/health" && req.method === "GET") {
    sendJsonResponse(res, 200, {
      status: "healthy",
      service: "supply-chain-mcp-server",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // 404
  sendErrorResponse(res, 404, "Endpoint not found");
});

function startServer(port = PORT) {
  return server.listen(port, "localhost", () => {
    console.log(
      `🚀 Supply Chain MCP Server running on http://localhost:${port}`,
    );
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log("");
    console.log("Available endpoints:");
    console.log("  GET  /api/suppliers              - List all suppliers");
    console.log("  GET  /api/suppliers/:id          - Get supplier details");
    console.log("  GET  /api/inventory              - List inventory");
    console.log("  GET  /api/inventory/:sku         - Get SKU details");
    console.log("  GET  /api/orders                 - List orders");
    console.log("  GET  /api/orders/:id             - Get order details");
    console.log("  GET  /api/shipments              - List shipments");
    console.log("  GET  /api/risks                  - List supplier risks");
    console.log("  GET  /api/cost-opportunities     - List cost opportunities");
    console.log(
      "  GET  /api/metrics                - Get supply chain metrics",
    );
  });
}

// If run directly from node, start the server. Otherwise export for tests
if (require.main === module) {
  startServer();
}

module.exports = { startServer, server, SupplyChainDataService };

process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down MCP server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
