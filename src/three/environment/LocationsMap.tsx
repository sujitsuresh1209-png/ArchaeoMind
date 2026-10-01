import { Tent, RuinColumn, StonePath, ExcavationZone, RuinedHouse, TempleStructure, PalaceRuins, BurialStructure, MarketStall, Rock, TunnelEntrance, EntranceSign, DirtMound } from './Structures';

export function LocationsMap() {
  return (
    <group>
      {/* Foreground/Entrance Details (0, 0, 40) */}
      <EntranceSign position={[0, 0, 43]} />
      <StonePath position={[0, 0, 35]} scale={[1, 1, 3]} />
      <DirtMound position={[-4, 0, 38]} scale={2} />
      <DirtMound position={[5, 0, 41]} scale={1.5} />
      <RuinColumn position={[-6, 1, 36]} height={3} />
      <Rock position={[-5, 0.5, 42]} scale={1.2} />
      
      {/* Camp (0, 0, 20) */}
      <Tent position={[-5, 0, 15]} color="#7a8b7d" /> {/* Command Tent */}
      {/* Storage Area */}
      <mesh position={[5, 0.5, 15]} castShadow><boxGeometry args={[2, 1, 2]}/><meshStandardMaterial color="#8b7355" /></mesh>
      <mesh position={[5, 1.5, 15]} castShadow><boxGeometry args={[1.5, 1, 1.5]}/><meshStandardMaterial color="#7a6245" /></mesh>
      <Tent position={[-5, 0, 25]} color="#c2b69d" /> {/* Workshop */}
      <RuinedHouse position={[5, 0, 25]} rotation={-Math.PI / 4} /> {/* Lab in a ruined house */}
      <Tent position={[0, 0, 28]} color="#a17556" /> {/* Shop */}
      <DirtMound position={[0, 0, 22]} scale={3} />
      
      {/* Excavation Sites */}
      <ExcavationZone position={[-20, 0, 0]} />
      <ExcavationZone position={[0, 0, -10]} />
      <ExcavationZone position={[20, 0, 0]} />

      {/* Burial Ground (-30, 0, -20) */}
      <BurialStructure position={[-30, 0, -20]} />
      <BurialStructure position={[-33, 0, -18]} rotation={0.2} />
      <BurialStructure position={[-28, 0, -24]} rotation={-0.1} />
      <BurialStructure position={[-35, 0, -22]} rotation={0.4} />
      <Rock position={[-27, 0, -19]} scale={1.5} />
      <DirtMound position={[-31, 0, -21]} scale={1.2} />

      {/* Marketplace (-30, 0, -40) */}
      <MarketStall position={[-30, 0, -40]} color="#b56262" />
      <MarketStall position={[-26, 0, -38]} rotation={-0.5} color="#5a7aab" />
      <MarketStall position={[-32, 0, -35]} rotation={0.8} color="#ab8a5a" />
      <StonePath position={[-29, 0, -38]} scale={[1.5, 1, 1]} rotation={[0, -0.4, 0]} />

      {/* Temple (0, 0, -40) */}
      <TempleStructure position={[0, 0, -40]} />
      <StonePath position={[0, 0, -30]} scale={[1.2, 1, 1.5]} />
      <DirtMound position={[8, 0, -38]} scale={3} />
      <Rock position={[-10, 0, -42]} scale={2.5} />

      {/* Residential (-50, 0, -40) */}
      <RuinedHouse position={[-50, 0, -40]} />
      <RuinedHouse position={[-45, 0, -45]} rotation={0.5} />
      <RuinedHouse position={[-55, 0, -35]} rotation={-0.3} />
      <DirtMound position={[-50, 0, -43]} scale={2} />

      {/* Royal Palace (0, 0, -60) */}
      <PalaceRuins position={[0, 0, -60]} />
      <DirtMound position={[-18, 0, -65]} scale={4} />

      {/* Underground (-20, 0, -60) */}
      <TunnelEntrance position={[-20, 0, -60]} rotation={0.2} />
      <DirtMound position={[-24, 0, -60]} scale={3} />
      <Rock position={[-16, 0, -58]} scale={2} />

      {/* Hidden Chamber Area (-40, 0, -60) */}
      <Rock position={[-40, 0, -60]} scale={5} />
      <Rock position={[-43, 0, -57]} scale={3} />
      <Rock position={[-37, 0, -63]} scale={4} />
      <DirtMound position={[-40, 0, -59]} scale={4} />
      
      {/* Decorative scatter (filling empty spaces) */}
      <Rock position={[10, 0, 10]} scale={1.5} />
      <DirtMound position={[12, 0, 12]} scale={2} />
      <Rock position={[-10, 0, 30]} scale={2} />
      <Rock position={[25, 0, -30]} scale={3} />
      <Rock position={[-15, 0, -25]} scale={1.2} />
      <Rock position={[15, 0, -20]} scale={1.8} />
      <DirtMound position={[-12, 0, 18]} scale={1.5} />
      <Rock position={[22, 0, 18]} scale={2.5} />
    </group>
  );
}
