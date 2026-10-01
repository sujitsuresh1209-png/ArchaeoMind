import { ArtifactObject } from './ArtifactObject';
import { INITIAL_ARTIFACTS } from '../../game/artifacts/artifactRegistry';

export function ArtifactPlacement() {
  const positions: Record<string, [number, number, number]> = {
    'coin_001': [-30, 0.1, -40],
    'pottery_001': [20, 0.3, 20],
    'ornament_001': [-35, 0.2, -25],
    'inscription_001': [0, 1.6, -35],
    'tool_001': [-20, 0.1, 30],
  };
  
  return (
    <>
      {INITIAL_ARTIFACTS.map(art => (
        <ArtifactObject key={art.id} artifact={art} position={positions[art.id]} />
      ))}
    </>
  );
}
