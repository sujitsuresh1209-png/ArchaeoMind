import { create } from 'zustand';

interface GameState {
  playerState: 'idle' | 'walking' | 'running';
  setPlayerState: (state: 'idle' | 'walking' | 'running') => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerState: 'idle',
  setPlayerState: (state) => set({ playerState: state }),
}));
