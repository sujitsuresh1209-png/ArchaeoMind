import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { cameraState } from '../../store/cameraState';

export function CameraController({ target }: { target: React.RefObject<THREE.Group | null> }) {
  const { gl, camera } = useThree();
  const currentCameraPos = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement === gl.domElement) {
        cameraState.yaw -= e.movementX * cameraState.sensitivity;
        cameraState.pitch += e.movementY * cameraState.sensitivity; // Invert Y
        cameraState.pitch = THREE.MathUtils.clamp(cameraState.pitch, 0.1, Math.PI / 2.2);
      }
    };
    
    const handleClick = () => {
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('click', handleClick);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!target.current) return;
    
    const t = target.current.position;
    const targetY = t.y + 1.5;

    const idealX = t.x + Math.sin(cameraState.yaw) * cameraState.distance * Math.cos(cameraState.pitch);
    const idealY = targetY + Math.sin(cameraState.pitch) * cameraState.distance;
    const idealZ = t.z + Math.cos(cameraState.yaw) * cameraState.distance * Math.cos(cameraState.pitch);
    
    const idealPos = new THREE.Vector3(idealX, idealY, idealZ);
    
    if (currentCameraPos.current.lengthSq() === 0) {
      currentCameraPos.current.copy(idealPos);
    }

    currentCameraPos.current.lerp(idealPos, 15 * delta);
    camera.position.copy(currentCameraPos.current);
    camera.lookAt(t.x, targetY, t.z);
  });

  return null;
}
