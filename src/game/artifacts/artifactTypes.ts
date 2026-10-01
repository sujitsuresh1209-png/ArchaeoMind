export const ArtifactType = {
  Coin: 'Coin',
  Pottery: 'Pottery',
  Ornament: 'Ornament',
  Tool: 'Tool',
  Weapon: 'Weapon',
  StatueFragment: 'Statue Fragment',
  Inscription: 'Inscription',
  Vessel: 'Vessel',
  Jewelry: 'Jewelry',
  Other: 'Other',
} as const;
export type ArtifactType = typeof ArtifactType[keyof typeof ArtifactType];

export const Material = {
  Bronze: 'Bronze',
  Copper: 'Copper',
  Iron: 'Iron',
  Gold: 'Gold',
  Silver: 'Silver',
  Stone: 'Stone',
  Clay: 'Clay',
  Ceramic: 'Ceramic',
  Wood: 'Wood',
  Bone: 'Bone',
  Glass: 'Glass',
  Unknown: 'Unknown',
} as const;
export type Material = typeof Material[keyof typeof Material];

export const Era = {
  '700_600_BC': '700–600 BC',
  '600_500_BC': '600–500 BC',
  '500_400_BC': '500–400 BC',
  Unknown: 'Unknown',
} as const;
export type Era = typeof Era[keyof typeof Era];

export const Rarity = {
  Common: 'Common',
  Uncommon: 'Uncommon',
  Rare: 'Rare',
  VeryRare: 'Very Rare',
  Unique: 'Unique',
} as const;
export type Rarity = typeof Rarity[keyof typeof Rarity];

export const HistoricalValue = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Exceptional: 'Exceptional',
} as const;
export type HistoricalValue = typeof HistoricalValue[keyof typeof HistoricalValue];

export type Artifact = {
  id: string;
  name: string;
  
  type: ArtifactType;
  material: Material;
  era: Era;
  rarity: Rarity;
  
  discoveryLocation: string;
  excavationLayer: string;
  discoveryMethod: string;
  discoveredBy: string;
  
  condition: number;
  preservationStatus: string;
  
  historicalValue: HistoricalValue;
  marketValue: number;
};
