import { isValidAmount } from './economyUtils';

export function canAfford(balance: number, cost: number): boolean {
  if (!isValidAmount(cost)) return false;
  return balance >= cost;
}

export function calculateNewBalance(balance: number, amount: number, isExpense: boolean): number {
  if (!isValidAmount(amount)) {
    throw new Error('Invalid transaction amount');
  }
  if (isExpense) {
    if (balance < amount) {
      throw new Error('Insufficient funds');
    }
    return balance - amount;
  } else {
    return balance + amount;
  }
}
