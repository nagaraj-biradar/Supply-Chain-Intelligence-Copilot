// Utility functions for calculating supplier risk scores and levels

const geopoliticalRiskMatrix = {
  China: 0.15,
  Germany: 0.05,
  Vietnam: 0.2,
  Sweden: 0.03,
  USA: 0.02,
};

/**
 * Compute a weighted risk score (0-100) for a supplier.
 * @param {object} params
 * @param {number} params.qualityScore (0-10)
 * @param {number} params.onTimeDeliveryRate (0-100)
 * @param {number} params.capacityUtilization (0-100)
 * @param {string} params.country
 * @param {object} [weights]
 */
function calculateRiskScore(
  { qualityScore, onTimeDeliveryRate, capacityUtilization, country },
  weights = {
    quality: 0.3,
    delivery: 0.35,
    capacity: 0.15,
    geopolitical: 0.2,
  },
) {
  // normalize quality (higher score = lower risk)
  const qualityRisk = 1 - Math.min(Math.max(qualityScore / 10, 0), 1);
  const deliveryRisk = 1 - Math.min(Math.max(onTimeDeliveryRate / 100, 0), 1);
  const capacityRisk = Math.min(Math.max(capacityUtilization / 100, 0), 1);
  const geopoliticalRisk =
    geopoliticalRiskMatrix[country] !== undefined
      ? geopoliticalRiskMatrix[country]
      : 0.1;

  const score =
    qualityRisk * weights.quality +
    deliveryRisk * weights.delivery +
    capacityRisk * weights.capacity +
    geopoliticalRisk * weights.geopolitical;

  // convert to 0-100 scale
  return Math.round(score * 100);
}

function determineRiskLevel(score) {
  if (score >= 80) return "Critical";
  if (score >= 60) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

module.exports = {
  calculateRiskScore,
  determineRiskLevel,
};
