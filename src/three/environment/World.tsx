import { Sky } from '@react-three/drei';
import { WORLD_CONFIG } from '../config/constants';
import { LocationsMap } from './LocationsMap';

export function World() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
        position={[50, 50, 20]}
        intensity={1.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-WORLD_CONFIG.bounds}
        shadow-camera-right={WORLD_CONFIG.bounds}
        shadow-camera-top={WORLD_CONFIG.bounds}
        shadow-camera-bottom={-WORLD_CONFIG.bounds}
        shadow-bias={-0.0001}
      />
      
      <Sky sunPosition={[50, 50, 20]} turbidity={0.5} rayleigh={1.2} />
      <fog attach="fog" args={['#e0d3c1', 20, 80]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.1, 0]}>
        <planeGeometry args={[WORLD_CONFIG.bounds * 2, WORLD_CONFIG.bounds * 2]} />
        <meshStandardMaterial color="#9b856c" roughness={0.9} />
      </mesh>

      <LocationsMap />
    </>
  );
}
