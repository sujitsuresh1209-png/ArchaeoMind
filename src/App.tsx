import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { MainScene } from './three/scenes/MainScene';
import { useGameStore } from './store/useGameStore';
import { useInteractionStore } from './store/useInteractionStore';
import { useInventoryStore } from './store/useInventoryStore';
import { useEffect } from 'react';
import { InventoryPanel } from './components/inventory/InventoryPanel';
import { WorldInspectPanel } from './components/inventory/WorldInspectPanel';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'run', keys: ['Shift'] },
  { name: 'interact', keys: ['KeyE'] },
  { name: 'inventory', keys: ['KeyI'] },
];

function UI() {
  const playerState = useGameStore((state) => state.playerState);
  const currentLocationName = useGameStore((state) => state.currentLocationName);

  const activeId = useInteractionStore(state => state.activeInteractableId);
  const interactables = useInteractionStore(state => state.registeredInteractables);
  const feedbackMessage = useInteractionStore(state => state.feedbackMessage);
  const setFeedbackMessage = useInteractionStore(state => state.setFeedbackMessage);

  const activeItem = activeId ? interactables[activeId] : null;

  useEffect(() => {
    if (feedbackMessage) {
      const t = setTimeout(() => setFeedbackMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [feedbackMessage, setFeedbackMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyI' && !e.repeat) {
        useInventoryStore.getState().toggleInventory();
      }
      if (e.code === 'Escape' && !e.repeat) {
        const store = useInventoryStore.getState();
        if (store.isOpen) store.closeInventory();
        if (store.worldInspectItem) store.closeWorldInspect();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-6 overflow-hidden">
      <div className="flex justify-between items-start w-full">
        <div className="text-white drop-shadow-md">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-amber-50">ArchaeoMind</h1>
          <p className="text-sm text-amber-200/80">3D Archaeological Exploration</p>
        </div>
      </div>
      
      {/* Location Announcer */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <div className={`transition-opacity duration-1000 ${currentLocationName ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl font-light tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase text-center">
            {currentLocationName || 'Wasteland'}
          </h2>
        </div>
      </div>

      {/* Feedback Message */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`transition-all duration-500 ${feedbackMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {feedbackMessage && (
            <div className="bg-amber-900/80 text-amber-100 px-6 py-2 rounded border border-amber-500/50 backdrop-blur-md shadow-lg text-center font-light tracking-wider">
              {feedbackMessage}
            </div>
          )}
        </div>
      </div>

      {/* Interaction Prompt */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`transition-all duration-300 ${activeItem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {activeItem && (
            <div className="bg-black/70 text-white px-6 py-3 rounded-lg border border-amber-500/30 backdrop-blur-sm shadow-lg flex items-center">
              <span className="bg-amber-500 text-black font-bold px-2 py-1 rounded text-sm mr-3">E</span>
              <span className="tracking-wide">{activeItem.prompt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pointer Lock Overlay */}
      <div className="absolute top-4 right-4 bg-black/50 px-4 py-2 rounded text-white text-xs border border-white/20 text-right z-50">
        <span className="opacity-70">Click game to lock camera</span><br/>
        <span className="opacity-70">ESC to unlock</span>
      </div>

      <div className="flex justify-between items-end w-full">
        <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/10">
          <p className="text-white text-sm mb-2 font-semibold">Controls</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-300">
            <span>W A S D</span>
            <span>Move</span>
            <span>Shift</span>
            <span>Run</span>
            <span>E</span>
            <span>Interact</span>
          </div>
        </div>

        <div className="bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
          <span className="text-xs text-gray-300 uppercase tracking-wider">State: <span className="text-amber-300 font-bold">{playerState}</span></span>
        </div>
      </div>
      
      <InventoryPanel />
      <WorldInspectPanel />
    </div>
  );
}

function App() {
  return (
    <div className="w-full h-screen bg-neutral-900 overflow-hidden relative">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
          <MainScene />
        </Canvas>
        <UI />
      </KeyboardControls>
    </div>
  );
}

export default App;
