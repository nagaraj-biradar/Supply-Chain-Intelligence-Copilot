#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "docs");
const outputFile = path.join(outputDir, "API-REFERENCE.md");

const endpoints = [
  {
    method: "GET",
    path: "/health",
    description: "Service health check",
    query: [],
  },
  {
    method: "GET",
    path: "/api/suppliers",
    description: "List suppliers",
    query: ["riskLevel=low|medium|high"],
  },
  {
    method: "GET",
    path: "/api/suppliers/{supplierId}",
    description: "Get supplier by ID",
    query: [],
  },
  {
    method: "GET",
    path: "/api/inventory",
    description: "List inventory items",
    query: ["status=optimal|low|critical", "warehouse=WH-USA-NY|WH-EU-DE|WH-ASIA-SG"],
  },
  {
    method: "GET",
    path: "/api/inventory/{sku}",
    description: "Get inventory by SKU",
    query: [],
  },
  {
    method: "GET",
    path: "/api/orders",
    description: "List orders",
    query: ["status=pending|processing|shipped|in-transit|delivered", "customerId={id}", "delayedOnly=true|false"],
  },
  {
    method: "GET",
    path: "/api/orders/{orderId}",
    description: "Get order by ID",
    query: [],
  },
  {
    method: "GET",
    path: "/api/shipments",
    description: "List shipments",
    query: ["status=shipped|in-transit|delivered", "orderId={orderId}"],
  },
  {
    method: "GET",
    path: "/api/risks",
    description: "List supplier risks",
    query: ["supplierId={supplierId}", "severity=low|medium|high"],
  },
  {
    method: "GET",
    path: "/api/cost-opportunities",
    description: "List cost optimization opportunities",
    query: ["priority=high|medium|low", "type=consolidation|logistics|inventory-optimization"],
  },
  {
    method: "GET",
    path: "/api/metrics",
    description: "Get aggregated supply chain metrics",
    query: [],
  },
];

function buildMarkdown() {
  const now = new Date().toISOString();
  const lines = [];

  lines.push("# API Reference");
  lines.push("");
  lines.push(`Generated: \`${now}\``);
  lines.push("");
  lines.push("Base URL:");
  lines.push("");
  lines.push("```text");
  lines.push("http://localhost:3001");
  lines.push("```");
  lines.push("");
  lines.push("## Endpoints");
  lines.push("");

  for (const endpoint of endpoints) {
    lines.push(`### ${endpoint.method} ${endpoint.path}`);
    lines.push("");
    lines.push(endpoint.description);
    lines.push("");
    if (endpoint.query.length > 0) {
      lines.push("Query parameters:");
      lines.push("");
      for (const queryParam of endpoint.query) {
        lines.push(`- \`${queryParam}\``);
      }
      lines.push("");
    }
    lines.push("Example:");
    lines.push("");
    lines.push("```bash");
    lines.push(`curl "http://localhost:3001${endpoint.path.replace("{supplierId}", "SUP001").replace("{sku}", "CHIP-A100").replace("{orderId}", "ORD-2026-001")}"`);
    lines.push("```");
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const markdown = buildMarkdown();
  fs.writeFileSync(outputFile, markdown, "utf8");
  console.log(`API documentation generated: ${outputFile}`);
}

main();
