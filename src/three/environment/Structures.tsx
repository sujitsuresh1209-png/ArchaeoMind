// No React imports needed

export function Tent({ position, rotation = 0, color = "#dcd3b6" }: { position: [number, number, number], rotation?: number, color?: string }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Main tent body */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 4, 3]} />
        <meshStandardMaterial color={color} roughness={1.0} />
      </mesh>
      {/* Poles */}
      <mesh position={[-1.9, 1, 0]} castShadow><cylinderGeometry args={[0.05, 0.05, 2]}/><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[1.9, 1, 0]} castShadow><cylinderGeometry args={[0.05, 0.05, 2]}/><meshStandardMaterial color="#5c4033" /></mesh>
    </group>
  );
}

export function RuinColumn({ position, height = 4 }: { position: [number, number, number], height?: number }) {
  const segments = Math.floor(height);
  const elements = [];
  for(let i = 0; i < segments; i++) {
    const offsetX = (i === segments - 1) ? 0.1 : 0;
    const tilt = (i === segments - 1) ? 0.05 : 0;
    elements.push(
      <mesh key={i} position={[offsetX, i * 1.05 + 0.5, 0]} rotation={[0, 0, tilt]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 1, 8]} />
        <meshStandardMaterial color="#c2b8a3" roughness={0.9} />
      </mesh>
    );
  }
  return <group position={position}>{elements}</group>;
}

export function AncientWall({ position, length = 6, rotation = 0 }: { position: [number, number, number], length?: number, rotation?: number }) {
  const blocks = [];
  const rows = 3;
  for (let x = -length / 2; x < length / 2; x += 1.1) {
    for (let y = 0; y < rows; y++) {
      const seed = Math.abs(position[0] * 13 + position[2] * 7 + x * 3 + y * 5);
      if (y === rows - 1 && seed % 3 < 1.5) continue; 
      if (y === rows - 2 && seed % 10 < 1.5) continue;

      blocks.push(
        <mesh key={`${x}-${y}`} position={[x, y * 1.05 + 0.5, 0]} rotation={[0, (seed % 0.1) - 0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#b3a998" roughness={0.9} />
        </mesh>
      );
    }
  }
  return <group position={position} rotation={[0, rotation, 0]}>{blocks}</group>;
}

export function StonePath({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }: { position: [number, number, number], scale?: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <mesh position={position} scale={scale} rotation={rotation as any} receiveShadow>
      <boxGeometry args={[4, 0.05, 10]} />
      <meshStandardMaterial color="#948777" roughness={1} />
    </mesh>
  );
}

export function DirtMound({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const seed = Math.abs(position[0] * 17.1 + position[2] * 8.9);
  const rotation = [0, (seed % 2) * Math.PI, 0] as [number, number, number];
  
  return (
    <mesh position={position} scale={[scale * 1.5, scale * 0.4, scale * 1.5]} rotation={rotation} receiveShadow>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#846d54" roughness={1} />
    </mesh>
  );
}

export function ExcavationZone({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* The dug-out pit (darker dirt, slightly lower) */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8c7860" roughness={1} />
      </mesh>
      
      {/* Boundary strings and stakes */}
      <mesh position={[-5, 0.5, -5]} castShadow><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#4a4a4a" /></mesh>
      <mesh position={[5, 0.5, -5]} castShadow><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#4a4a4a" /></mesh>
      <mesh position={[-5, 0.5, 5]} castShadow><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#4a4a4a" /></mesh>
      <mesh position={[5, 0.5, 5]} castShadow><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#4a4a4a" /></mesh>
      <mesh position={[0, 0.8, -5]}><boxGeometry args={[10, 0.02, 0.02]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <mesh position={[0, 0.8, 5]}><boxGeometry args={[10, 0.02, 0.02]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <mesh position={[-5, 0.8, 0]} rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[10, 0.02, 0.02]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <mesh position={[5, 0.8, 0]} rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[10, 0.02, 0.02]} /><meshBasicMaterial color="#ffffff" /></mesh>

      {/* Dirt piles */}
      <DirtMound position={[-6, 0, 0]} scale={2} />
      <DirtMound position={[6, 0, 3]} scale={1.5} />
      
      {/* Rubble */}
      <Rock position={[1, 0.2, 2]} scale={0.4} />
      <Rock position={[-2, 0.1, -1]} scale={0.3} />
      
      {/* Wooden planks */}
      <mesh position={[0, 0.1, 4]} rotation={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 0.5]} />
        <meshStandardMaterial color="#6a523b" />
      </mesh>
    </group>
  );
}

export function RuinedHouse({ position, rotation = 0 }: { position: [number, number, number], rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <AncientWall position={[0, 0, -2]} length={4} />
      <AncientWall position={[0, 0, 2]} length={4} />
      <AncientWall position={[-2, 0, 0]} length={4} rotation={Math.PI / 2} />
      <AncientWall position={[2, 0, 1.5]} length={1} rotation={Math.PI / 2} />
      <AncientWall position={[2, 0, -1.5]} length={1} rotation={Math.PI / 2} />
      <Rock position={[0, 0, 0]} scale={0.8} />
      <Rock position={[-1, 0, 1]} scale={0.5} />
    </group>
  );
}

export function TempleStructure({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 1, 14]} />
        <meshStandardMaterial color="#b3a998" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.25, 7.5]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.5, 1]} />
        <meshStandardMaterial color="#b3a998" />
      </mesh>
      <RuinColumn position={[-7, 1, -5]} height={6} />
      <RuinColumn position={[-7, 1, 0]} height={3} />
      <RuinColumn position={[-7, 1, 5]} height={5} />
      <RuinColumn position={[7, 1, -5]} height={4} />
      <RuinColumn position={[7, 1, 0]} height={6} />
      <RuinColumn position={[7, 1, 5]} height={2} />
      <AncientWall position={[0, 1, -6]} length={14} />
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[3, 1, 2]} />
        <meshStandardMaterial color="#a09d98" />
      </mesh>
      <Rock position={[0, 2.2, 0]} scale={0.5} />
    </group>
  );
}

export function PalaceRuins({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[30, 1, 20]} />
        <meshStandardMaterial color="#b3a998" />
      </mesh>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[26, 0.5, 16]} />
        <meshStandardMaterial color="#c2b8a3" />
      </mesh>
      <RuinColumn position={[-10, 1.25, -6]} height={8} />
      <RuinColumn position={[-5, 1.25, -6]} height={4} />
      <RuinColumn position={[0, 1.25, -6]} height={9} />
      <RuinColumn position={[5, 1.25, -6]} height={3} />
      <RuinColumn position={[10, 1.25, -6]} height={7} />
      <AncientWall position={[-13, 1.25, 0]} length={8} rotation={Math.PI / 2} />
      <AncientWall position={[13, 1.25, 0]} length={8} rotation={Math.PI / 2} />
      <Rock position={[-6, 2, 0]} scale={1.5} />
      <Rock position={[8, 1.5, 2]} scale={2} />
    </group>
  );
}

export function BurialStructure({ position, rotation = 0 }: { position: [number, number, number], rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[2, 0.4, 4]} />
        <meshStandardMaterial color="#a09d98" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.8, -1.6]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 0.3]} />
        <meshStandardMaterial color="#888580" roughness={0.9} />
      </mesh>
      <Rock position={[0, 0.5, 0]} scale={0.2} />
    </group>
  );
}

export function MarketStall({ position, rotation = 0, color="#d3a76f" }: { position: [number, number, number], rotation?: number, color?: string }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#6a523b" />
      </mesh>
      <mesh position={[-1.4, 0.4, 0]} castShadow><boxGeometry args={[0.1, 0.8, 1.2]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[1.4, 0.4, 0]} castShadow><boxGeometry args={[0.1, 0.8, 1.2]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[-1.4, 1.5, -0.6]} castShadow><cylinderGeometry args={[0.05, 0.05, 2.5]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[1.4, 1.5, -0.6]} castShadow><cylinderGeometry args={[0.05, 0.05, 2.5]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[0, 2.5, 0]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 0.05, 2]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
      <Rock position={[-0.8, 1, 0]} scale={0.3} />
      <Rock position={[0.2, 0.9, -0.2]} scale={0.2} />
      <Rock position={[0.5, 0.9, 0.3]} scale={0.25} />
    </group>
  );
}

export function Rock({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const seed = Math.abs(position[0] * 73.1 + position[2] * 37.9);
  const rotation = [(seed % 2) * Math.PI, ((seed * 1.3) % 2) * Math.PI, 0] as [number, number, number];
  return (
    <mesh position={position} scale={[scale, scale * 0.8, scale * 1.2]} rotation={rotation} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#968f86" roughness={1} />
    </mesh>
  );
}

export function TunnelEntrance({ position, rotation = 0 }: { position: [number, number, number], rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 2]} />
        <meshStandardMaterial color="#8b857a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.5, 1.01]}>
        <boxGeometry args={[3, 3, 0.1]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[-1.6, 1.5, 1.1]} castShadow><boxGeometry args={[0.2, 3, 0.4]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[1.6, 1.5, 1.1]} castShadow><boxGeometry args={[0.2, 3, 0.4]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[0, 3.1, 1.1]} castShadow><boxGeometry args={[3.4, 0.2, 0.4]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[-2, 1.5, 1.15]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[1, 0.8, 0.05]} />
        <meshStandardMaterial color="#c4a572" />
      </mesh>
    </group>
  );
}

export function EntranceSign({ position, rotation = 0 }: { position: [number, number, number], rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[-2, 1.5, 0]} castShadow><cylinderGeometry args={[0.1, 0.1, 3]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[2, 1.5, 0]} castShadow><cylinderGeometry args={[0.1, 0.1, 3]} /><meshStandardMaterial color="#5c4033" /></mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[4.5, 1, 0.2]} />
        <meshStandardMaterial color="#c8baaa" />
      </mesh>
      <mesh position={[1.8, 0.5, 0.5]} castShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#8b6c4b" /></mesh>
      <mesh position={[1.2, 0.4, 1.2]} rotation={[0, 0.4, 0]} castShadow><boxGeometry args={[0.8, 0.8, 0.8]} /><meshStandardMaterial color="#8b6c4b" /></mesh>
    </group>
  );
}
