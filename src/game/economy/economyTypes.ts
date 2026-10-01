export const TransactionDirection = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;
export type TransactionDirection = typeof TransactionDirection[keyof typeof TransactionDirection];

export const TransactionCategory = {
  FUNDING: 'FUNDING',
  ARTIFACT: 'ARTIFACT',
  EQUIPMENT: 'EQUIPMENT',
  WORKER: 'WORKER',
  EXCAVATION: 'EXCAVATION',
  PRESERVATION: 'PRESERVATION',
  LABORATORY: 'LABORATORY',
  MISSION: 'MISSION',
  GRANT: 'GRANT',
  CAMP: 'CAMP',
  MUSEUM: 'MUSEUM',
  OTHER: 'OTHER',
} as const;
export type TransactionCategory = typeof TransactionCategory[keyof typeof TransactionCategory];

export type Transaction = {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  direction: TransactionDirection;
  category: TransactionCategory;
  description: string;
  timestamp: number;
};
