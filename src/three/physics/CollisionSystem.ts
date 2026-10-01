import * as THREE from 'three';

export type Collider = { x: number; z: number; w: number; d: number; rotation: number };

export const colliders: Collider[] = [];

export function registerCollider(c: Collider) {
  colliders.push(c);
}

export function unregisterCollider(c: Collider) {
  const i = colliders.indexOf(c);
  if (i >= 0) colliders.splice(i, 1);
}

export function resolveCollision(playerPos: THREE.Vector3, radius: number) {
  let iterations = 3;
  while (iterations-- > 0) {
    let resolved = false;
    for (const c of colliders) {
      const dx = playerPos.x - c.x;
      const dz = playerPos.z - c.z;
      
      const cos = Math.cos(-c.rotation);
      const sin = Math.sin(-c.rotation);
      const localX = dx * cos - dz * sin;
      const localZ = dx * sin + dz * cos;
      
      const hw = c.w / 2;
      const hd = c.d / 2;
      
      const closestX = Math.max(-hw, Math.min(localX, hw));
      const closestZ = Math.max(-hd, Math.min(localZ, hd));
      
      const diffX = localX - closestX;
      const diffZ = localZ - closestZ;
      const distSq = diffX * diffX + diffZ * diffZ;
      
      if (distSq < radius * radius && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const overlap = radius - dist;
        
        const pushX = (diffX / dist) * overlap;
        const pushZ = (diffZ / dist) * overlap;
        
        const wCos = Math.cos(c.rotation);
        const wSin = Math.sin(c.rotation);
        
        playerPos.x += pushX * wCos - pushZ * wSin;
        playerPos.z += pushX * wSin + pushZ * wCos;
        resolved = true;
      } else if (distSq === 0) {
        const distLeft = localX - (-hw);
        const distRight = hw - localX;
        const distTop = localZ - (-hd);
        const distBottom = hd - localZ;
        const min = Math.min(distLeft, distRight, distTop, distBottom);
        
        let pushX = 0, pushZ = 0;
        if (min === distLeft) pushX = -(distLeft + radius);
        else if (min === distRight) pushX = distRight + radius;
        else if (min === distTop) pushZ = -(distTop + radius);
        else if (min === distBottom) pushZ = distBottom + radius;
        
        const wCos = Math.cos(c.rotation);
        const wSin = Math.sin(c.rotation);
        
        playerPos.x += pushX * wCos - pushZ * wSin;
        playerPos.z += pushX * wSin + pushZ * wCos;
        resolved = true;
      }
    }
    if (!resolved) break;
  }
}
