import type { Artifact } from '../artifacts/artifactTypes';

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isValidAmount(amount: number): boolean {
  return Number.isInteger(amount) && amount > 0;
}

export function getArtifactValue(artifact: Artifact): number {
  return artifact.marketValue;
}

export function explainArtifactValue(artifact: Artifact): string {
  return `Base artifact market value: ₹${artifact.marketValue}
Condition: ${artifact.condition}%
Rarity: ${artifact.rarity}`;
}
