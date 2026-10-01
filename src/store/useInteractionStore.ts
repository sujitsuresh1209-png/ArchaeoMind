import { create } from 'zustand';

export interface InteractableData {
  id: string;
  position: [number, number, number];
  radius: number;
  prompt: string;
}

interface InteractionState {
  registeredInteractables: Record<string, InteractableData>;
  registerInteractable: (data: InteractableData) => void;
  unregisterInteractable: (id: string) => void;
  
  activeInteractableId: string | null;
  setActiveInteractableId: (id: string | null) => void;
  
  feedbackMessage: string | null;
  setFeedbackMessage: (msg: string | null) => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  registeredInteractables: {},
  registerInteractable: (data) => set((state) => ({
    registeredInteractables: { ...state.registeredInteractables, [data.id]: data }
  })),
  unregisterInteractable: (id) => set((state) => {
    const copy = { ...state.registeredInteractables };
    delete copy[id];
    return { registeredInteractables: copy };
  }),
  
  activeInteractableId: null,
  setActiveInteractableId: (id) => set({ activeInteractableId: id }),
  
  feedbackMessage: null,
  setFeedbackMessage: (msg) => set({ feedbackMessage: msg }),
}));
