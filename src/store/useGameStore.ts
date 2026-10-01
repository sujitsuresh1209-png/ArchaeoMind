import { create } from 'zustand';

interface GameState {
  playerState: 'idle' | 'walking' | 'running';
  setPlayerState: (state: 'idle' | 'walking' | 'running') => void;
  
  currentLocationId: string | null;
  currentLocationName: string | null;
  setCurrentLocation: (id: string | null, name: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerState: 'idle',
  setPlayerState: (state) => set({ playerState: state }),
  
  currentLocationId: null,
  currentLocationName: null,
  setCurrentLocation: (id, name) => set({ currentLocationId: id, currentLocationName: name }),
}));
