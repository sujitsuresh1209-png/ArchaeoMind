import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { PLAYER_CONFIG, WORLD_CONFIG } from '../config/constants';
import { LOCATIONS } from '../config/locations';
import { useGameStore } from '../../store/useGameStore';
import { useInteractionStore } from '../../store/useInteractionStore';
import { CameraController } from '../camera/CameraController';
import { cameraState } from '../../store/cameraState';
import { resolveCollision } from '../physics/CollisionSystem';

// Reusable vectors to avoid instantiation in useFrame
const currentPosition = new THREE.Vector3();
const moveDirection = new THREE.Vector3();
const locationVec = new THREE.Vector3();

export function Player() {
  const groupRef = useRef<THREE.Group>(null);
  
  const [, getKeys] = useKeyboardControls();
  const setPlayerState = useGameStore((state) => state.setPlayerState);
  const setCurrentLocation = useGameStore((state) => state.setCurrentLocation);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const { forward, backward, left, right, run } = getKeys();
    
    // Movement logic
    moveDirection.set(0, 0, 0);
    if (forward) moveDirection.z -= 1;
    if (backward) moveDirection.z += 1;
    if (left) moveDirection.x -= 1;
    if (right) moveDirection.x += 1;

    let newState: 'idle' | 'walking' | 'running' = 'idle';

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize();
      newState = run ? 'running' : 'walking';
      
      const speed = run ? PLAYER_CONFIG.runSpeed : PLAYER_CONFIG.walkSpeed;
      
      const cameraYaw = cameraState.yaw;
      const moveX = moveDirection.x * Math.cos(cameraYaw) + moveDirection.z * Math.sin(cameraYaw);
      const moveZ = -moveDirection.x * Math.sin(cameraYaw) + moveDirection.z * Math.cos(cameraYaw);
      
      const finalMove = new THREE.Vector3(moveX, 0, moveZ);
      finalMove.normalize();
      
      groupRef.current.position.addScaledVector(finalMove, speed * delta);
      
      const targetAngle = Math.atan2(finalMove.x, finalMove.z);
      
      let currentAngle = groupRef.current.rotation.y;
      let diff = targetAngle - currentAngle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      
      groupRef.current.rotation.y += diff * Math.min(PLAYER_CONFIG.rotationSpeed * delta, 1);
    }

    resolveCollision(groupRef.current.position, 0.5);

    groupRef.current.position.x = THREE.MathUtils.clamp(groupRef.current.position.x, -WORLD_CONFIG.bounds, WORLD_CONFIG.bounds);
    groupRef.current.position.z = THREE.MathUtils.clamp(groupRef.current.position.z, -WORLD_CONFIG.bounds, WORLD_CONFIG.bounds);

    if (useGameStore.getState().playerState !== newState) {
      setPlayerState(newState);
    }

    // Camera logic moved to CameraController
    currentPosition.copy(groupRef.current.position);

    // Location detection
    let closestLoc = null;
    let minDistance = Infinity;

    for (const loc of LOCATIONS) {
      locationVec.set(loc.position[0], loc.position[1], loc.position[2]);
      const dist = currentPosition.distanceTo(locationVec);
      if (dist < loc.radius && dist < minDistance) {
        closestLoc = loc;
        minDistance = dist;
      }
    }

    const currentStoreLoc = useGameStore.getState().currentLocationId;
    if (closestLoc) {
      if (currentStoreLoc !== closestLoc.id) {
        setCurrentLocation(closestLoc.id, closestLoc.name);
      }
    } else {
      if (currentStoreLoc !== null) {
        setCurrentLocation(null, null);
      }
    }

    // Interaction detection
    const interactables = useInteractionStore.getState().registeredInteractables;
    let closestInteractableId = null;
    let minInteractableDist = Infinity;

    for (const key in interactables) {
      const item = interactables[key];
      locationVec.set(item.position[0], item.position[1], item.position[2]);
      const dist = currentPosition.distanceTo(locationVec);
      if (dist <= item.radius && dist < minInteractableDist) {
        closestInteractableId = item.id;
        minInteractableDist = dist;
      }
    }

    const currentActiveId = useInteractionStore.getState().activeInteractableId;
    if (currentActiveId !== closestInteractableId) {
      useInteractionStore.getState().setActiveInteractableId(closestInteractableId);
    }
  });

  return (
    <>
      <CameraController target={groupRef} />
      <group ref={groupRef} position={[0, 0, 40]}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshStandardMaterial color="#8a9a5b" />
        </mesh>
        <mesh position={[0, 1.5, -0.5]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.5]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
    </>
  );
}
