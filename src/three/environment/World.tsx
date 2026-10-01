import { Sky } from '@react-three/drei';
import { WORLD_CONFIG } from '../config/constants';

export function World() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[50, 50, 20]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-WORLD_CONFIG.bounds}
        shadow-camera-right={WORLD_CONFIG.bounds}
        shadow-camera-top={WORLD_CONFIG.bounds}
        shadow-camera-bottom={-WORLD_CONFIG.bounds}
      />
      
      <Sky sunPosition={[50, 50, 20]} turbidity={0.1} rayleigh={0.5} />
      <fog attach="fog" args={['#d2c4b5', 20, 100]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[WORLD_CONFIG.bounds * 2, WORLD_CONFIG.bounds * 2]} />
        <meshStandardMaterial color="#5c4a3d" roughness={0.8} />
      </mesh>
    </>
  );
}
