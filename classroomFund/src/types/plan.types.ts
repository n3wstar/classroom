export type Room = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Plan = {
  id: string;
  name: string;
  image: string;
  rooms: Room[];
};