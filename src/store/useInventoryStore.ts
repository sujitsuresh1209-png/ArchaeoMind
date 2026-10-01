import { create } from 'zustand';
import type { Artifact } from '../game/artifacts/artifactTypes';

interface InventoryState {
  items: Artifact[];
  capacity: number;
  isOpen: boolean;
  worldInspectItem: Artifact | null; // Set when inspecting an item in the world
  inventoryInspectItem: Artifact | null; // Set when viewing details in inventory
  
  toggleInventory: () => void;
  openInventory: () => void;
  closeInventory: () => void;
  
  inspectWorldItem: (artifact: Artifact) => void;
  closeWorldInspect: () => void;
  
  inspectInventoryItem: (artifact: Artifact | null) => void;
  
  addItem: (artifact: Artifact) => boolean;
  removeItem: (id: string) => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [],
  capacity: 30,
  isOpen: false,
  worldInspectItem: null,
  inventoryInspectItem: null,
  
  toggleInventory: () => {
    const { isOpen, worldInspectItem } = get();
    if (worldInspectItem) return; // Don't toggle inventory if inspecting in world
    set({ isOpen: !isOpen, inventoryInspectItem: null });
  },
  openInventory: () => set({ isOpen: true }),
  closeInventory: () => set({ isOpen: false, inventoryInspectItem: null }),
  
  inspectWorldItem: (artifact) => set({ worldInspectItem: artifact }),
  closeWorldInspect: () => set({ worldInspectItem: null }),
  
  inspectInventoryItem: (artifact) => set({ inventoryInspectItem: artifact }),
  
  addItem: (artifact) => {
    const state = get();
    if (state.items.length >= state.capacity) {
      return false;
    }
    // Prevent duplicate additions
    if (state.items.find(i => i.id === artifact.id)) {
      return false;
    }
    set({ items: [...state.items, artifact] });
    return true;
  },
  
  removeItem: (id) => {
    set((state) => ({ items: state.items.filter(i => i.id !== id) }));
  }
}));
