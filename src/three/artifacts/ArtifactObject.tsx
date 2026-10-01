import React from 'react';
import { ArtifactType } from '../../game/artifacts/artifactTypes';
import type { Artifact } from '../../game/artifacts/artifactTypes';
import { Interactable } from '../components/Interactable';
import { useInventoryStore } from '../../store/useInventoryStore';

export function ArtifactObject({ artifact, position }: { artifact: Artifact, position: [number, number, number] }) {
  const isCollected = useInventoryStore(state => state.items.some(i => i.id === artifact.id));
  const inspectWorldItem = useInventoryStore(state => state.inspectWorldItem);
  const [rotation] = React.useState(() => [Math.random(), Math.random(), 0] as [number, number, number]);
  
  if (isCollected) return null;
  
  let geometry;
  let color = "#888888";
  
  switch (artifact.type) {
    case ArtifactType.Coin:
      geometry = <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />;
      color = "#c59c5d";
      break;
    case ArtifactType.Pottery:
      geometry = <capsuleGeometry args={[0.3, 0.4, 8, 16]} />;
      color = "#a05a2c";
      break;
    case ArtifactType.Inscription:
      geometry = <boxGeometry args={[0.8, 0.1, 1.2]} />;
      color = "#777777";
      break;
    case ArtifactType.Ornament:
      geometry = <octahedronGeometry args={[0.2]} />;
      color = "#c59c5d";
      break;
    case ArtifactType.Tool:
      geometry = <boxGeometry args={[0.1, 0.6, 0.2]} />;
      color = "#555555";
      break;
    default:
      geometry = <sphereGeometry args={[0.2]} />;
      break;
  }
  
  return (
    <group position={position}>
      {/* Gentle glow marker */}
      <pointLight distance={3} intensity={2} color={color} position={[0, 0.2, 0]} />
      <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={rotation}>
        {geometry}
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
      </mesh>
      
      <Interactable
        id={`artifact_${artifact.id}`}
        position={position}
        radius={2.5}
        prompt={`Examine ${artifact.name}`}
        onInteract={() => inspectWorldItem(artifact)}
        highlightOffset={[0, 0.5, 0]}
      />
    </group>
  );
}
