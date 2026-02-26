# Supply Chain Intelligence Copilot - Example User Queries

## Real-World Query Examples

### Supplier Queries

**Query 1: Find supplier**

```
User: "Show me our suppliers in Asia"
Analysis:
- Intent: supplier_search
- Parameters: region=Asia
- Required permissions: suppliers:read
- Data sources: ERP supplier master
- Expected runtime: <1 second
- Response: List of suppliers with location details
```

**Query 2: Evaluate supplier**

```
User: "How is our supplier XYZ performing?"
Analysis:
- Intent: supplier_evaluation
- Parameters: supplier_id=XYZ
- Context needed: Do they want quality, cost, delivery, or overall?
- Follow up: "Which metrics are most important to you? Quality, on-time delivery, cost, or overall performance?"
- Data sources: ERP, quality system, performance data
- Response: Scorecard with key metrics, trends, issues
```

**Query 3: Compare suppliers**

```
User: "Compare our automotive suppliers"
Analysis:
- Intent: supplier_comparison
- Parameters: category=automotive
- Implied metrics: quality, cost, reliability, lead time
- Data sources: ERP, quality, delivery data
- Response: Comparison table, rankings, recommendation
```

**Query 4: Risk assessment**

```
User: "Are we at risk with supplier X?"
Analysis:
- Intent: supplier_risk_assessment
- Parameters: supplier_id=X
- Risk factors to assess: financial, quality, delivery, external
- Data sources: Financial data, performance history, news feeds
- ML model: supplier-risk-v1
- Response: Risk score, risk factors, recommendations
```

**Query 5: Performance history**

```
User: "Show me supplier X's on-time delivery trend"
Analysis:
- Intent: performance_trend_analysis
- Parameters: supplier_id=X, metric=on-time-delivery, period=12-months
- Data sources: Historical delivery data
- Response: Chart/table showing trend, current status, forecast
```

---

### Inventory Queries

**Query 6: Check inventory level**

```
User: "How much inventory do we have for product SKU-123?"
Analysis:
- Intent: inventory_check
- Parameters: sku=SKU-123
- Clarification: "Do you want to see by location or total?"
- Data sources: WMS
- Response: Current level, by location, safety stock status, reorder point
```

**Query 7: Forecast demand**

```
User: "What's the demand forecast for product A?"
Analysis:
- Intent: demand_forecast
- Parameters: product_id=A, period=30-days
- Context: Used for reordering and planning
- ML model: demand-forecast-v1
- Response: Forecast with confidence intervals, seasonality notes
```

**Query 8: Stockout risk**

```
User: "Which products are at risk of running out?"
Analysis:
- Intent: stockout_risk_identification
- Parameters: risk_threshold: default 0.3
- Data sources: WMS, demand data, lead times
- ML model: stockout-risk-v1
- Response: List of at-risk products, risk level, days until stockout, recommended action
```

**Query 9: Inventory optimization**

```
User: "What's our optimal inventory level?"
Analysis:
- Intent: inventory_optimization
- Parameters: optimization_goal=minimize-cost (or maximize-availability, balanced)
- Calculations: EOQ, safety stock, rebalancing recommendations
- Data sources: Demand, lead time, cost data
- Response: Recommended inventory levels, cost impact, implementation steps
```

**Query 10: Slow-moving inventory**

```
User: "Show me our slow-moving inventory"
Analysis:
- Intent: identify_slow_movers
- Parameters: velocity_threshold=10 units/month, age_threshold=90 days
- Data sources: Inventory, sales data
- Response: Product list, current value, velocity, recommendations (liquidate, promote, etc.)
```

---

### Order Queries

**Query 11: Track order**

```
User: "Where's my order ORD-12345?"
Analysis:
- Intent: order_tracking
- Parameters: order_id=ORD-12345
- Data sources: OMS, TMS (real-time)
- Response: Current status, location, ETA, any issues
```

**Query 12: Order status**

```
User: "Show me all pending orders from customer ABC"
Analysis:
- Intent: order_search
- Parameters: customer=ABC, status=pending
- Data sources: OMS
- Response: List of orders with details, ETAs, any risks
```

**Query 13: Order exception**

```
User: "Is there a problem with order ORD-456?"
Analysis:
- Intent: exception_detection
- Parameters: order_id=ORD-456
- Data sources: OMS, TMS, WMS
- ML model: exception-detection-v1
- Response: "Yes/No" with details of any issues, recommendations
```

**Query 14: Delivery estimate**

```
User: "When will order ORD-789 arrive?"
Analysis:
- Intent: delivery_estimation
- Parameters: order_id=ORD-789
- Data sources: OMS, TMS, shipment tracking
- ML model: delivery-forecast-v1
- Response: Promised date, estimated date, confidence level, risk factors
```

**Query 15: Supplier orders**

```
User: "Show me all orders from supplier XYZ"
Analysis:
- Intent: supplier_order_query
- Parameters: supplier_id=XYZ, status=[optional]
- Data sources: OMS
- Response: Order list with status, amounts, ETAs, on-time performance
```

---

### Analytics & Reporting Queries

**Query 16: KPI dashboard**

```
User: "Show me our supply chain KPIs this month"
Analysis:
- Intent: kpi_dashboard
- Parameters: timeframe=this-month, metrics=default or custom list
- Data sources: Data warehouse
- Response: Dashboard with key metrics, trends, alerts, recommendations
```

**Query 17: Custom report**

```
User: "Generate a supplier performance report"
Analysis:
- Intent: report_generation
- Parameters: report_type=supplier-performance
- Clarifications: "Which time period? Which metrics? PDF or Excel?"
- Data sources: Data warehouse
- Response: Complete report with analysis and recommendations
```

**Query 18: Cost analysis**

```
User: "What were our logistics costs last quarter?"
Analysis:
- Intent: cost_analysis
- Parameters: cost_category=logistics, timeframe=last-quarter
- Breakdown: By mode, lane, carrier, region, etc.
- Data sources: Financial system, logistics data
- Response: Cost summary with breakdown, trends, benchmarks
```

**Query 19: Trend analysis**

```
User: "Show me procurement spend trends for the last year"
Analysis:
- Intent: trend_analysis
- Parameters: category=procurement, period=12-months
- Data sources: Financial data
- Response: Trend chart, key drivers, forecast, analysis
```

**Query 20: Scheduled report**

```
User: "Send me a weekly inventory report every Monday morning"
Analysis:
- Intent: schedule_report
- Parameters: report_type=inventory-health, schedule=weekly (Monday, 6am)
- Clarification: "What metrics? Who else should receive it?"
- Action: Create scheduled task
- Response: Confirmation with next delivery date
```

---

### Risk & Optimization Queries

**Query 21: Supply chain risk**

```
User: "What are our supply chain risks?"
Analysis:
- Intent: risk_assessment
- Parameters: scope=all (or specific category)
- Risk categories: supplier, demand, supply, logistics, compliance, geo
- Data sources: Multiple
- ML models: Risk scoring models
- Response: Risk summary by category, critical alerts, mitigation plan
```

**Query 22: Supply disruption**

```
User: "Are we at risk of supply disruption?"
Analysis:
- Intent: disruption_risk_assessment
- Risk factors: Geopolitical, weather, financial, regulatory changes
- Data sources: News feeds, weather, financial data, supplier data
- ML model: disruption-risk-v1
- Response: Risk alert with affected suppliers/products, timeline, impact
```

**Query 23: Cost optimization**

```
User: "What cost reduction opportunities do we have?"
Analysis:
- Intent: cost_optimization_analysis
- Areas: Procurement, inventory, logistics, labor
- Approach: Spend analysis, market benchmarking, process review
- Data sources: All operational systems, market data
- Response: Opportunity list with savings potential, effort, payback period
```

**Query 24: Logistics optimization**

```
User: "How can we optimize our routes?"
Analysis:
- Intent: logistics_optimization
- Optimization goals: Cost, time, sustainability
- Approach: Route analysis, consolidation opportunities, carrier evaluation
- Data sources: TMS, shipment data, carrier performance
- Response: Optimization recommendations with cost/time savings
```

**Query 25: Inventory optimization**

```
User: "Optimize our inventory levels to reduce costs"
Analysis:
- Intent: inventory_optimization
- Approach: EOQ calculation, safety stock optimization, rebalancing
- Data sources: Demand, lead time, cost data
- Constraints: Service level requirement (95%+)
- Response: Inventory recommendations by location/SKU, cost impact
```

---

### Domain-Specific Scenarios

## Pharmaceutical Supply Chain

```
Query: "Are we compliant with cold chain requirements for our pharma shipments?"
Analysis:
- Domain: Pharmaceutical
- Regulations: FDA guidelines, GxP requirements
- Data needed: Temperature monitoring, storage records, shipment logs
- Compliance checkpoints: Production, storage, transportation, distribution
- Response: Compliance status, any violations, recommendations for gaps

Query: "Show me product traceability for batch #XYZ"
Analysis:
- Domain: Pharmaceutical
- Requirement: FDA/EMA traceability
- Data: Supplier, manufacturing, storage, distribution until end-use
- Response: Complete trace from supplier to point of care
```

## Food & Beverage Supply Chain

```
Query: "Is there an allergen risk with supplier X?"
Analysis:
- Domain: Food & Beverage
- Regulations: FDA FSMA, FSIS requirements
- Risk factors: Facility certifications, product mix, allergen controls
- Response: Risk assessment, supplier compliance status, recommendations

Query: "Show me shelf-life tracking for product Y"
Analysis:
- Domain: Food & Beverage
- Calculation: Manufacturing date + shelf-life duration
- Data: Production dates, distribution, inventory aging
- Response: Products near expiration, recommendations (rotate, promote, liquidate)
```

## Automotive Supply Chain

```
Query: "Assess supplier X's ability to meet increased demand for component Y"
Analysis:
- Domain: Automotive
- Assessment: Capacity, quality, financial stability, lead time
- Requirements: IATF certification, quality controls
- Response: Capacity assessment, risk evaluation, recommendations

Query: "Show me supply risk for semiconductor components"
Analysis:
- Domain: Automotive (semiconductor-dependent)
- Critical issue: Current global semiconductor shortage
- Data: Supplier capacity, inventory, alternative sources
- Response: Risk assessment with specific SKUs, mitigation options
```

---

**Last Updated**: February 19, 2026  
**Version**: 1.0.0
