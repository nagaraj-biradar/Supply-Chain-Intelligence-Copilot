# Example 1: Supplier Risk Assessment Query

## User Query

```
"I'm concerned about supplier ABC Electronics. Are they reliable?
What's their risk level?"
```

## System Processing

### 1. Intent Recognition

- **Intent**: supplier_risk_assessment
- **Entity**: supplier_id = "ABC-ELEC-001"
- **Context**: Risk evaluation requested
- **Urgency**: Normal (no immediate deadline mentioned)

### 2. Data Retrieval

System retrieves from integrated sources:

- ERP: Supplier master data, 24-month PO history, costs
- Quality System: Defect rates, rejection data, audit scores
- Financial Data: Credit score, financial ratios, D&B report
- News API: Recent news, alerts, regulatory changes
- Performance DB: Lead times, on-time delivery %, trends

### 3. Analysis

**Financial Risk Score: 65/100 (HIGH)**

- Credit Rating: A- (Good, but downgraded from A last quarter)
- Debt-to-Equity: 1.8 (Above industry avg of 1.2)
- Quick Ratio: 1.1 (Adequate but declining)
- Days Cash On Hand: 25 (Getting tight)
- Red Flag: Working capital decreased 18% YoY

**Quality Risk Score: 72/100 (HIGH)**

- Defect Rate: 8.2% (Target: 5%, industry avg: 3-4%)
- Rejection Rate: 6.5% (Up from 3% last year - 117% increase)
- Last Audit Score: 72/100 (Below 80% threshold)
- Recent Quality Alerts: 5 in last 30 days (Unusual pattern)
- Trend: Declining quality (not improving)

**Delivery Risk Score: 58/100 (MEDIUM-HIGH)**

- On-Time Delivery: 89% (Target: 95%, down from 92% last quarter)
- Lead Time Consistency: 78% (Very volatile)
- Average Lead Time: 35 days (Up from 30 days)
- Delayed Shipments Last Month: 4 out of 24 (17%)
- Reason: Production capacity issues

**Compliance Risk Score: 45/100 (MEDIUM)**

- Current Certifications: ISO 9001 (Valid), IATF (Expires Dec 2026)
- Compliance Issues: 1 minor finding, 0 major findings
- Audit Status: Scheduled for Q2 2026
- Regulatory Issues: None

**External Risk Score: 35/100 (LOW-MEDIUM)**

- Geographic Risk: Located in Taiwan (Geopolitical: MEDIUM)
- Market Risk: Electronics component market stable
- Commodity Price Impact: Minimal (not commodity-dependent)
- News: No recent adverse news
- Weather Risk: Low (Taiwan typhoon risk is seasonal)

### 4. Overall Risk Calculation

```
Overall Risk Score =
  (65 × 0.25) +      // Financial: 25% weight
  (72 × 0.30) +      // Quality: 30% weight
  (58 × 0.25) +      // Delivery: 25% weight
  (45 × 0.12) +      // Compliance: 12% weight
  (35 × 0.08)        // External: 8% weight
= 62.05 / 100 = 62 → HIGH RISK
```

### 5. Risk Classification

- **Risk Level**: HIGH (Threshold: 60-79)
- **Status**: Requires close monitoring and mitigation plan
- **Trend**: Declining (Score increased from 52 to 62 in 6 months)
- **Peer Comparison**: Worse than 72% of similar suppliers

---

## Copilot Response

```
⚠️  SUPPLIER RISK ALERT: ABC Electronics

OVERALL RISK SCORE: 62/100 (HIGH - Requires Action)

Your supplier ABC Electronics has escalated to HIGH RISK status.
This represents a concerning trend - their risk score increased 19%
over the past 6 months. Here's what's driving the risk:

┌─ KEY RISK FACTORS ─────────────────────────────────────────────┐
│                                                                 │
│ 🔴 QUALITY ISSUES (CRITICAL)                                  │
│    • Defect rate up 117% YoY (now 8.2%, target 5%)            │
│    • 5 quality alerts in last 30 days                         │
│    • Last audit score: 72/100 (below 80% threshold)           │
│    • Trend: Declining (not recovering)                        │
│                                                                 │
│ 🔴 DELIVERY PERFORMANCE (HIGH)                                │
│    • On-time delivery dropped to 89% (target 95%)             │
│    • Lead time increased from 30 to 35 days                   │
│    • Recent delays: 4 of last 24 shipments (17%)              │
│    • Cause: Production capacity constraints                   │
│                                                                 │
│ 🟡 FINANCIAL HEALTH (HIGH)                                    │
│    • Credit rating downgraded Q4 2025 (A- trend)              │
│    • Working capital declining 18% YoY                        │
│    • Debt-to-Equity above industry average                    │
│    • Days cash on hand: 25 (getting tight)                    │
│                                                                 │
│ 🟡 GEOPOLITICAL EXPOSURE (MEDIUM)                            │
│    • Located in Taiwan (heightened geopolitical risk)         │
│    • Growing tensions in region                               │
│    • Supply continuity risk if situation escalates            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

POTENTIAL BUSINESS IMPACT:
• Quality Risk: Increased defect rates could impact your products
• Delivery Risk: Missed deadlines could affect customer orders
• Financial Risk: Supplier bankruptcy risk (15% probability within 12 months)
• Supply Risk: Capacity constraints may limit order fulfillment

RECOMMENDED ACTIONS (PRIORITIZED BY IMPACT):

1. 🔴 IMMEDIATE (This Week)
   ☐ Schedule urgent call with ABC Electronics management
   ☐ Discuss quality issues and corrective action plan
   ☐ Request detailed financial statements
   ☐ Review production capacity and timeline for improvement

2. 🟠 NEAR-TERM (This Month)
   ☐ Conduct on-site quality audit
   ☐ Assess financial health with external advisor
   ☐ Develop backup supplier strategy
   ☐ Reduce 30-day forward commitments by 20-30%

3. 🟡 MEDIUM-TERM (This Quarter)
   ☐ Qualify alternative suppliers (1-2 backup options)
   ☐ Negotiate performance improvement plan (PIP)
   ☐ Increase safety stock for critical components
   ☐ Consider gradual volume shift to proven suppliers

BACKUP SUPPLIER OPTIONS:
The system has identified 2 qualified alternatives for their key products:

Option A: Supplier DEF Components
  • Quality: 97% acceptance rate (vs ABC's 91%)
  • Lead time: 28 days (vs ABC's 35 days)
  • Cost: 8% premium ($12K additional cost/year)
  • Capacity: Can absorb 100% of volume
  • Recommendation: QUALIFIED BACKUP

Option B: Supplier GHI Electronics
  • Quality: 95% acceptance rate
  • Lead time: 32 days
  • Cost: 4% premium ($6K additional cost/year)
  • Capacity: Can absorb 70% of volume
  • Recommendation: QUALIFIED PARTIAL BACKUP

RISK MITIGATION PLAYBOOK:
1. Maintain ABC Electronics but with heightened monitoring
2. Qualify DEF Components as primary backup
3. Build 45-60 days of safety stock for critical items
4. Implement weekly supplier scorecard reviews
5. Prepare volume transition plan if performance doesn't improve

NEXT STEPS:
→ Do you want me to draft an email to ABC Electronics?
→ Should I prepare a backup supplier transition plan?
→ Would you like detailed financial analysis of ABC Electronics?

Questions I can help with:
• "Show me quality trend details"
• "Compare ABC to alternative suppliers"
• "What if we switch to DEF Components?"
• "How much inventory should we hold?"
```

---

## Follow-up Interaction

**User**: "Show me the quality trend details for ABC"

**System Response**:

```
ABC ELECTRONICS - QUALITY PERFORMANCE TREND

Defect Rate Trend (Last 12 Months):
Month    Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec
Rate     3.2  3.4  3.8  4.1  4.5  5.2  6.7  7.4  8.1  8.2  8.0  8.2 %
Target   5.0  5.0  5.0  5.0  5.0  5.0  5.0  5.0  5.0  5.0  5.0  5.0 %

[Chart showing upward trend with 117% increase over 12 months]

Key Observations:
• Linear deterioration starting Mar (when new production line added)
• Current rate is 1.64X target rate
• Trend showing no signs of stabilization or improvement
• Last 3 months plateau at 8.0-8.2% (stable but high)

Quality Alert Details:
┌─────────────────────────────────────────────────────────────┐
│ Date      │ Severity │ Issue                    │ Status    │
├───────────┼──────────┼──────────────────────────┼───────────┤
│ Feb 15    │ Minor    │ Surface defects          │ Resolved  │
│ Apr 03    │ Major    │ Dimensional variation    │ In Review │
│ Jun 22    │ Major    │ Material contamination   │ In Review │
│ Aug 10    │ Critical │ Component failure (5%)   │ Escalated │
│ Dec 01    │ Major    │ Inconsistent performance │ Open      │
└─────────────────────────────────────────────────────────────┘

Affected Product Categories:
• Power supplies: 12.3% defect rate (highest)
• Connectors: 7.8% defect rate
• Capacitors: 6.2% defect rate

Root Cause Analysis:
The quality issues began when ABC added a new production line in March.
Root causes identified:
1. Insufficient operator training (primary factor)
2. Equipment calibration issues (secondary)
3. Quality control check point gaps (tertiary)

ABC's Response:
• Retrained 15 operators (completed Nov)
• Recalibrated equipment (Dec)
• But quality hasn't improved (still 8.2% in Dec)
• This suggests deeper issue or incomplete fix

Recommendation:
Quality is NOT improving despite corrective actions.
This requires urgent escalation and possible on-site audit.
```

---

**Document Version**: 1.0.0  
**Last Updated**: February 19, 2026
