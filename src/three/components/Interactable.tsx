import { useEffect, useRef } from 'react';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface InteractableProps {
  id: string;
  position: [number, number, number];
  radius?: number;
  prompt: string;
  onInteract: () => void;
  highlightOffset?: [number, number, number];
}

export function Interactable({ id, position, radius = 3, prompt, onInteract, highlightOffset = [0, 2, 0] }: InteractableProps) {
  const register = useInteractionStore(state => state.registerInteractable);
  const unregister = useInteractionStore(state => state.unregisterInteractable);
  const isActive = useInteractionStore(state => state.activeInteractableId === id);
  const markerRef = useRef<THREE.Mesh>(null);
  const [posX, posY, posZ] = position;

  useEffect(() => {
    register({ id, position: [posX, posY, posZ], radius, prompt });
    return () => unregister(id);
  }, [id, posX, posY, posZ, radius, prompt, register, unregister]);

  useEffect(() => {
    if (isActive) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'KeyE' && !e.repeat) {
          onInteract();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isActive, onInteract]);

  useFrame((state) => {
    if (isActive && markerRef.current) {
      markerRef.current.position.y = highlightOffset[1] + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      markerRef.current.rotation.y += 0.05;
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={markerRef} position={[position[0] + highlightOffset[0], position[1] + highlightOffset[1], position[2] + highlightOffset[2]]}>
      <coneGeometry args={[0.3, 0.6, 4]} />
      <meshBasicMaterial color="#fcd34d" />
      <mesh scale={1.3}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        <meshBasicMaterial color="#fcd34d" transparent opacity={0.4} />
      </mesh>
    </mesh>
  );
}
