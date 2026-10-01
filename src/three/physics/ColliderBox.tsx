import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { registerCollider, unregisterCollider } from './CollisionSystem';
import type { Collider } from './CollisionSystem';

export function ColliderBox({ args }: { args: [number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const [width, depth] = args;
  
  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.updateMatrixWorld(true);
    const worldPos = new THREE.Vector3();
    const worldQuat = new THREE.Quaternion();
    ref.current.getWorldPosition(worldPos);
    ref.current.getWorldQuaternion(worldQuat);
    const euler = new THREE.Euler().setFromQuaternion(worldQuat, 'YXZ');
    
    const c: Collider = { x: worldPos.x, z: worldPos.z, w: width, d: depth, rotation: euler.y };
    registerCollider(c);
    
    return () => unregisterCollider(c);
  }, [width, depth]);
  
  return <group ref={ref} />;
}
