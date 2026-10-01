import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { MainScene } from './three/scenes/MainScene';
import { useGameStore } from './store/useGameStore';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'run', keys: ['Shift'] },
];

function UI() {
  const playerState = useGameStore((state) => state.playerState);
  const currentLocationName = useGameStore((state) => state.currentLocationName);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-6 overflow-hidden">
      <div className="flex justify-between items-start w-full">
        <div className="text-white drop-shadow-md">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-amber-50">ArchaeoMind</h1>
          <p className="text-sm text-amber-200/80">Phase 2: 3D Archaeological World</p>
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

      <div className="flex justify-between items-end w-full">
        <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/10">
          <p className="text-white text-sm mb-2 font-semibold">Controls</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-300">
            <span>W A S D</span>
            <span>Move</span>
            <span>Shift</span>
            <span>Run</span>
          </div>
        </div>

        <div className="bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
          <span className="text-xs text-gray-300 uppercase tracking-wider">State: <span className="text-amber-300 font-bold">{playerState}</span></span>
        </div>
      </div>
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
