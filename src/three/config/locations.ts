export interface LocationConfig {
  id: string;
  name: string;
  position: [number, number, number];
  radius: number;
}

export const LOCATIONS: LocationConfig[] = [
  { id: 'entrance', name: 'Archaeological Entrance', position: [0, 0, 40], radius: 10 },
  { id: 'camp', name: 'Archaeological Camp', position: [0, 0, 20], radius: 20 },
  { id: 'command_tent', name: 'Command Tent', position: [-5, 0, 15], radius: 4 },
  { id: 'storage', name: 'Storage Area', position: [5, 0, 15], radius: 4 },
  { id: 'workshop', name: 'Workshop', position: [-5, 0, 25], radius: 4 },
  { id: 'laboratory', name: 'Laboratory', position: [5, 0, 25], radius: 4 },
  { id: 'shop', name: 'Shop', position: [0, 0, 28], radius: 4 },
  { id: 'excavation_a', name: 'Excavation Site A', position: [-20, 0, 0], radius: 10 },
  { id: 'excavation_b', name: 'Excavation Site B', position: [0, 0, -10], radius: 10 },
  { id: 'excavation_c', name: 'Excavation Site C', position: [20, 0, 0], radius: 10 },
  { id: 'burial_ground', name: 'Burial Ground', position: [-30, 0, -20], radius: 12 },
  { id: 'marketplace', name: 'Marketplace', position: [-30, 0, -40], radius: 12 },
  { id: 'temple', name: 'Ancient Temple Ruins', position: [0, 0, -40], radius: 15 },
  { id: 'residential_area', name: 'Residential Village', position: [-50, 0, -40], radius: 15 },
  { id: 'royal_palace', name: 'Royal Palace Ruins', position: [0, 0, -60], radius: 18 },
  { id: 'underground', name: 'Underground Tunnel', position: [-20, 0, -60], radius: 8 },
  { id: 'hidden_chamber', name: 'Hidden Chamber', position: [-40, 0, -60], radius: 10 },
];
