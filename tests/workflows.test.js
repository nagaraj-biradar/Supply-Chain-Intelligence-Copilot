const { calculateRiskScore, determineRiskLevel } = require("../src/risk-utils");

describe("Risk utilities", () => {
  test("calculateRiskScore returns expected score for sample supplier", () => {
    const sample = {
      qualityScore: 8.0,
      onTimeDeliveryRate: 90,
      capacityUtilization: 80,
      country: "China",
    };
    const score = calculateRiskScore(sample);
    expect(typeof score).toBe("number");
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test("determineRiskLevel categories", () => {
    expect(determineRiskLevel(85)).toBe("Critical");
    expect(determineRiskLevel(65)).toBe("High");
    expect(determineRiskLevel(45)).toBe("Medium");
    expect(determineRiskLevel(20)).toBe("Low");
  });
});
