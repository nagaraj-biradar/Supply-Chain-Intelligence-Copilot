# API Reference

Generated: `2026-03-09T09:10:39.588Z`

Base URL:

```text
http://localhost:3001
```

## Endpoints

### GET /health

Service health check

Example:

```bash
curl "http://localhost:3001/health"
```

### GET /api/suppliers

List suppliers

Query parameters:

- `riskLevel=low|medium|high`

Example:

```bash
curl "http://localhost:3001/api/suppliers"
```

### GET /api/suppliers/{supplierId}

Get supplier by ID

Example:

```bash
curl "http://localhost:3001/api/suppliers/SUP001"
```

### GET /api/inventory

List inventory items

Query parameters:

- `status=optimal|low|critical`
- `warehouse=WH-USA-NY|WH-EU-DE|WH-ASIA-SG`

Example:

```bash
curl "http://localhost:3001/api/inventory"
```

### GET /api/inventory/{sku}

Get inventory by SKU

Example:

```bash
curl "http://localhost:3001/api/inventory/CHIP-A100"
```

### GET /api/orders

List orders

Query parameters:

- `status=pending|processing|shipped|in-transit|delivered`
- `customerId={id}`
- `delayedOnly=true|false`

Example:

```bash
curl "http://localhost:3001/api/orders"
```

### GET /api/orders/{orderId}

Get order by ID

Example:

```bash
curl "http://localhost:3001/api/orders/ORD-2026-001"
```

### GET /api/shipments

List shipments

Query parameters:

- `status=shipped|in-transit|delivered`
- `orderId={orderId}`

Example:

```bash
curl "http://localhost:3001/api/shipments"
```

### GET /api/risks

List supplier risks

Query parameters:

- `supplierId={supplierId}`
- `severity=low|medium|high`

Example:

```bash
curl "http://localhost:3001/api/risks"
```

### GET /api/cost-opportunities

List cost optimization opportunities

Query parameters:

- `priority=high|medium|low`
- `type=consolidation|logistics|inventory-optimization`

Example:

```bash
curl "http://localhost:3001/api/cost-opportunities"
```

### GET /api/metrics

Get aggregated supply chain metrics

Example:

```bash
curl "http://localhost:3001/api/metrics"
```

