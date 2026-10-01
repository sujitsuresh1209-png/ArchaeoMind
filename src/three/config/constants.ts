export const WORLD_CONFIG = {
  bounds: 100, // half-size of the world
  gravity: -9.8,
};

export const PLAYER_CONFIG = {
  walkSpeed: 5,
  runSpeed: 10,
  rotationSpeed: 10, // interpolation speed
};

export const CAMERA_CONFIG = {
  offset: [0, 5, 10] as [number, number, number],
  lookAtOffset: [0, 1, 0] as [number, number, number],
  lerpSpeed: 5,
};
