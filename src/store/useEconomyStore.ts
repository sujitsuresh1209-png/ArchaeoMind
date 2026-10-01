import { create } from 'zustand';
import { INITIAL_BALANCE } from '../game/economy/economyConfig';
import type { Transaction, TransactionCategory } from '../game/economy/economyTypes';
import { calculateNewBalance, canAfford } from '../game/economy/transactionRules';

interface EconomyState {
  balance: number;
  transactions: Transaction[];
  
  deposit: (amount: number, category: TransactionCategory, description: string) => boolean;
  withdraw: (amount: number, category: TransactionCategory, description: string) => boolean;
  canAfford: (cost: number) => boolean;
  
  resetEconomy: () => void;
}

let txCounter = 0; // Deterministic-friendly ID generator base

export const useEconomyStore = create<EconomyState>((set, get) => ({
  balance: INITIAL_BALANCE,
  transactions: [],
  
  deposit: (amount, category, description) => {
    try {
      const state = get();
      const newBalance = calculateNewBalance(state.balance, amount, false);
      
      const transaction: Transaction = {
        id: `tx_${Date.now()}_${++txCounter}`,
        type: 'DEPOSIT',
        amount,
        direction: 'INCOME',
        category,
        description,
        timestamp: Date.now(),
      };
      
      set({ balance: newBalance, transactions: [...state.transactions, transaction] });
      return true;
    } catch {
      return false;
    }
  },
  
  withdraw: (amount, category, description) => {
    try {
      const state = get();
      const newBalance = calculateNewBalance(state.balance, amount, true);
      
      const transaction: Transaction = {
        id: `tx_${Date.now()}_${++txCounter}`,
        type: 'WITHDRAWAL',
        amount,
        direction: 'EXPENSE',
        category,
        description,
        timestamp: Date.now(),
      };
      
      set({ balance: newBalance, transactions: [...state.transactions, transaction] });
      return true;
    } catch {
      return false;
    }
  },
  
  canAfford: (cost) => {
    return canAfford(get().balance, cost);
  },
  
  resetEconomy: () => {
    set({ balance: INITIAL_BALANCE, transactions: [] });
  }
}));
