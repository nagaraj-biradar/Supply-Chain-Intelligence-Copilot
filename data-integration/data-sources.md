# Supply Chain Intelligence Copilot - Data Integration Specifications

## Data Sources Overview

The copilot integrates with multiple enterprise systems to provide comprehensive supply chain visibility:

| System Type      | Purpose                               | Priority | Real-time | Frequency    |
| ---------------- | ------------------------------------- | -------- | --------- | ------------ |
| ERP              | Master data, procurement, inventory   | P0       | No        | Hourly       |
| WMS              | Warehouse inventory, stock movements  | P0       | Yes       | 30 min       |
| OMS              | Order management and fulfillment      | P0       | Yes       | Hourly       |
| TMS              | Transportation and shipment tracking  | P0       | Yes       | Real-time    |
| Quality System   | Quality metrics, inspections, defects | P1       | No        | Daily        |
| Financial System | Supplier financial data, costs        | P1       | No        | Daily        |
| External APIs    | Weather, news, commodity prices       | P1       | No        | Daily/Hourly |

---

## ERP Integration

### System: SAP/Oracle/NetSuite/Dynamics 365

**Connection Method**: REST API or OData

**Authentication**:

- OAuth 2.0 for cloud instances
- Kerberos for on-premises (SAP)
- Service account with read-only permissions

**Data Mapped**:

#### Supplier Master Data

```json
{
  "fields": [
    "SupplierID",
    "SupplierName",
    "SupplierCountry",
    "SupplierCity",
    "SupplierStatus",
    "PrimaryContact",
    "ContactEmail",
    "ContactPhone",
    "PaymentTerms",
    "Currency",
    "CreditLimit",
    "SupplierCategory",
    "SupplierRating",
    "OnboardingDate",
    "Certifications"
  ],
  "frequency": "Hourly",
  "lastModifiedTracking": true
}
```

#### Product Master Data

```json
{
  "fields": [
    "SKU",
    "ProductName",
    "ProductCategory",
    "UnitOfMeasure",
    "CurrentPrice",
    "LeadTime",
    "MinimumOrderQuantity",
    "SafetyStock",
    "ReorderPoint",
    "ShelfLife",
    "Supplier",
    "Status",
    "CreationDate"
  ],
  "frequency": "Daily",
  "lastModifiedTracking": true
}
```

#### Purchase Order Data

```json
{
  "fields": [
    "PONumber",
    "SupplierID",
    "PODate",
    "RequestedDeliveryDate",
    "POStatus",
    "TotalAmount",
    "Currency",
    "Items[SKU, Quantity, UnitPrice, DeliveryDate]",
    "DeliveryLocation",
    "InvoiceStatus",
    "PaymentStatus"
  ],
  "frequency": "Real-time for creation; Hourly for updates",
  "lastModifiedTracking": true
}
```

#### Cost Data

```json
{
  "fields": [
    "PONumber",
    "MaterialCost",
    "TransportationCost",
    "HandlingCost",
    "TaxAmount",
    "DiscountAmount",
    "NetCost",
    "CostPerUnit"
  ],
  "frequency": "With PO updates",
  "historicalData": "24 months minimum"
}
```

**Reconciliation**:

- Scheduled daily reconciliation at 2 AM
- Alert if >5% variance in key metrics
- Manual review for high-value POs

---

## Warehouse Management System (WMS)

### System: Manhattan Associates / Blue Yonder / Infor

**Connection Method**: REST API or SFTP for batch

**Authentication**: API Key + IP whitelisting

**Real-time Data Feeds**:

#### Inventory Levels

```json
{
  "fields": [
    "WarehouseID",
    "SKU",
    "CurrentQty",
    "ReservedQty",
    "AvailableQty",
    "DamagedQty",
    "Location",
    "BinNumber",
    "Lot",
    "SerialNumber",
    "ExpirationDate",
    "LastCountDate",
    "LastMovementDate"
  ],
  "frequency": "Every 30 minutes",
  "multiLocation": true
}
```

#### Stock Movements

```json
{
  "fields": [
    "MovementID",
    "MODate",
    "MOTime",
    "SKU",
    "Quantity",
    "FromLocation",
    "ToLocation",
    "MovementType[Inbound, Outbound, Transfer, Adjustment]",
    "Reference[PONumber, OrderNumber, etc]",
    "WarehouseID"
  ],
  "frequency": "Real-time",
  "requiredForDashboard": true
}
```

#### Warehouse Capacity

```json
{
  "fields": [
    "WarehouseID",
    "TotalCapacity",
    "UsedCapacity",
    "AvailableCapacity",
    "CapacityByZone",
    "UtilizationRate",
    "LastUpdateTime"
  ],
  "frequency": "Hourly",
  "alertThreshold": "85% utilization"
}
```

---

## Order Management System (OMS)

### System: Salesforce, Shopify, Custom Platform

**Connection Method**: REST API

**Authentication**: OAuth 2.0 + API Key

**Data Integration**:

#### Order Header

```json
{
  "fields": [
    "OrderID",
    "OrderNumber",
    "CustomerID",
    "CustomerName",
    "OrderDate",
    "RequestedDeliveryDate",
    "OrderStatus[Pending, Confirmed, Picked, Shipped, Delivered, Cancelled]",
    "DeliveryAddress",
    "BillingAddress",
    "ShippingMethod",
    "CurrentLocation",
    "TotalAmount",
    "Currency"
  ],
  "frequency": "Real-time for creation; Every 1-4 hours for status updates",
  "historicalData": "24 months"
}
```

#### Order Lines

```json
{
  "fields": [
    "OrderLineID",
    "OrderNumber",
    "LineNumber",
    "SKU",
    "ProductName",
    "QuantityOrdered",
    "QuantityShipped",
    "UnitPrice",
    "LineTotal",
    "RequestedDeliveryDate",
    "PromisedDeliveryDate",
    "ActualDeliveryDate",
    "LineStatus"
  ],
  "frequency": "Hourly",
  "requiredForReporting": true
}
```

#### Fulfillment Events

```json
{
  "fields": [
    "OrderNumber",
    "EventType[Ordered, Confirmed, Picked, Packed, Shipped, InTransit, Delivered, Returned]",
    "EventDate",
    "EventTime",
    "Location",
    "RelatedReference",
    "Notes"
  ],
  "frequency": "Real-time",
  "requiredForTracking": true
}
```

---

## Transportation Management System (TMS)

### Systems: FedEx, UPS, Flexport, FourKites, Custom

**Connection Method**:

- Carrier APIs (FedEx, UPS)
- SFTP for EDI
- REST API for TMS platforms

**Authentication**: Bearer token + API key

**Real-time Tracking Data**:

#### Shipment Master

```json
{
  "fields": [
    "ShipmentID",
    "TrackingNumber",
    "OrderNumber",
    "Carrier",
    "ShipmentDate",
    "PickupLocation",
    "DeliveryLocation",
    "PromisedDeliveryDate",
    "CurrentStatus",
    "CurrentLocation[Lat, Lng, City, Country]",
    "EstimatedDeliveryDate",
    "NumberOfPackages",
    "TotalWeight",
    "TotalDimensions",
    "ShipmentValue"
  ],
  "frequency": "Real-time",
  "locationTracking": "GPS-based"
}
```

#### Shipment Events

```json
{
  "fields": [
    "ShipmentID",
    "EventType[PickupScheduled, PickedUp, InTransit, OutForDelivery, Delivered, Exception, Returned, Cancelled]",
    "EventTimestamp",
    "Location[City, State, Country]",
    "Coordinates[Lat, Lng]",
    "DetailedStatus",
    "Reason[if exception]",
    "NextExpectedEvent"
  ],
  "frequency": "Real-time (as reported by carrier)",
  "requiredForAlert": true
}
```

#### Exceptions

```json
{
  "fields": [
    "ExceptionID",
    "ShipmentID",
    "ExceptionType[Delay, Damage, MissingItem, AddressIssue, WeatherDelay, CustomsIssue]",
    "SeverityLevel",
    "ReportedTime",
    "ExpectedResolution",
    "EstimatedImpactDate"
  ],
  "frequency": "Real-time, when exceptions occur",
  "escalationRequired": true
}
```

---

## Quality Management System

### Fields Tracked

```json
{
  "qualityMetrics": {
    "ById Supplier": [
      "DefectRate(%)",
      "RejectionRate(%)",
      "AcceptanceRate(%)",
      "PPM(PartsperMillion)",
      "CertificationStatus",
      "LastAuditDate",
      "AuditScore",
      "WarningIssues",
      "CriticalIssues",
      "TrendDirection"
    ],
    "ByProduct": [
      "SKU",
      "DefectsReported",
      "ReturnsReported",
      "RootCauseCategory",
      "CorrelatedSupplier",
      "ActionTaken",
      "Resolution Status"
    ]
  },
  "frequency": "Daily",
  "historicalData": "36 months"
}
```

---

## External Data Sources

### Weather API (OpenWeatherMap / Weather.com)

```
Purpose: Identify weather-related supply disruptions
Data: Real-time weather, forecasts (14-day), historical
Frequency: Daily + Real-time alerts
Coverage: All shipper/supplier locations
Alerts: Severe weather, natural disasters
Integration: REST API
```

### News API (MediaStack / NewsAPI)

```
Purpose: Geopolitical and news-based supplier risks
Data: News articles, industry alerts
Frequency: Daily
Search Terms: Supplier names, regions, commodities
Sentiment Analysis: Yes
Alerts: Major adverse events, regulatory changes
Integration: REST API
```

### Commodity Pricing (Quandl / Trading Economics)

```
Purpose: Monitor commodity cost trends
Data: Oil, metals, agricultural prices
Frequency: Daily
Currencies: Multiple
Alerts: >10% price change
Integration: REST API or SFTP
```

### Financial Data (D&B, S&P / Credit Bureaus)

```
Purpose: Supplier financial health assessment
Data: Credit scores, financial ratios, industry data
Frequency: Monthly
Updates: Real-time for critical changes
Compliance: GDPR, CCPA
Integration: REST API with auth
```

---

## Data Warehouse Schema

### Fact Tables

#### OrderDetailsFact

```
Dimensions: OrderID, OrderDate, CustomerID, WarehouseID
Metrics: OrderAmount, ItemCount, DeliveryDaysActual, OnTimeFlag, QualityFlag
```

#### ShipmentDetailsFact

```
Dimensions: ShipmentID, ShipmentDate, CarrierID, OriginID, DestinationID
Metrics: ShipmentCost, DeliveryDaysPlanned, DeliveryDaysActual, ExceptionFlag
```

#### InventoryFact

```
Dimensions: InventoryDate, WarehouseID, SKUID
Metrics: QuantityOnHand, QuantityReserved, QuantityAvailable, CarryingCost
```

#### SupplierPerformanceFact

```
Dimensions: PerformanceDate, SupplierID, CategoryID
Metrics: OnTimeDelivery, QualityScore, CostPerUnit, LeadTime, RiskScore
```

### Dimension Tables

- DimDate: Calendar dimensions
- DimCustomer: Customer details
- DimSupplier: Supplier master
- DimProduct: Product details
- DimLocation: Warehouse/region
- DimCarrier: Transportation carriers

---

## Data Quality Standards

### Validation Rules

| Data Element | Rule                       | Exception Handling         |
| ------------ | -------------------------- | -------------------------- |
| SupplierID   | Not null, unique           | Quarantine, alert          |
| OrderDate    | Valid date, ≤ today        | Reject, manual review      |
| Quantity     | Not null, > 0              | Reject, escalate           |
| DeliveryDate | Valid date, ≥ order date   | Flag, review               |
| Price        | Not null, reasonable range | Flag, review               |
| Coordinates  | Valid lat/long pair        | Accept null, resolve later |

### Data Reconciliation

- Daily reconciliation of key figures vs source systems
- Monthly audit of data completeness
- Quarterly data quality assessment
- Annual data governance review

---

## Data Refresh Schedule

```
REAL-TIME (Continuously):
├─ Shipment tracking updates
├─ Order status changes
└─ Inventory movements

HOURLY:
├─ ERP synchronization
├─ OMS order updates
├─ Warehouse capacity
└─ TMS exception updates

EVERY 4 HOURS:
├─ Pricing updates
└─ Order fulfillment status

DAILY:
├─ Quality metrics
├─ Weather data update
├─ News feed scan
├─ Commodity pricing
├─ Financial data updates
└─ Data warehouse refresh

WEEKLY:
├─ Master data reconciliation
└─ Data quality audit

MONTHLY:
├─ External financial data
├─ Market benchmarking
└─ Compliance validation
```

---

## API Rate Limiting & Optimization

### Connection Pooling

- Pool size: 20-50 connections
- Timeout: 30 seconds
- Retry logic: 3 attempts with exponential backoff

### Batch Processing

- Batch size: 1000-5000 records
- Compression: GZIP enabled
- Pagination: Cursor-based where available

### Caching Strategy

- Query cache: 15 minutes TTL
- Reference data cache: 24 hours TTL
- Real-time data: No cache
- Cache invalidation: Event-based

---

**Document Version**: 1.0.0  
**Last Updated**: February 19, 2026  
**Status**: Deployment Ready
