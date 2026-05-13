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
  previewImage: string;
  previewImageName: string; 
  schemas: Schema[]; // пока пустые
};

export type Schema = {
  id: string;
  floor: number;
  image: string;
  rooms: Room[];
};